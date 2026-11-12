import type {
  CsdlSchema,
  CsdlFunction,
  CsdlParameter as _CsdlParameter,
} from "../parsers/csdl-types.js";
import { resolve, join } from "path";
import { compareStrings } from "../parsers/canonical.js";
import { toPascalCase as _toPascalCase } from "../utils/typescript-writer.js";
import {
  writeTypeScriptFile,
  generateIndexFile as _generateIndexFile,
  purgeDirectory,
} from "../utils/file-writer.js";
import { operationReturn, parseResponseMethod } from "../utils/operation-return.js";
import { ENTITY_REFERENCE_EXPORT, ENTITY_REFERENCE_IMPORT } from "../utils/entity-reference.js";
import { ENTITY_PAYLOAD_MODULE, ENTITY_PAYLOAD_SOURCE } from "../utils/entity-payload.js";
import { operationNames } from "../utils/overloads.js";
import {
  exportedEnumNames,
  exportedTypeNames,
  rootTypeExports,
} from "./complex-types-generator.js";
import { coreImport, isRecordBound } from "../utils/binding.js";
import { ENUM_BODY_MODULE, enumBodySource } from "../utils/enum-body.js";
import {
  functionHelperImports,
  functionRequestMethod,
  functionSignature,
  ODATA_LITERAL_MODULE,
  ODATA_LITERAL_SOURCE,
} from "../utils/function-request.js";
import {
  bindingDoc,
  parametersInterface,
  parametersInterfaceName,
} from "../utils/operation-parameters.js";
import {
  constructorArguments,
  splitArguments,
  typeImportLine,
} from "../utils/operation-request.js";
import {
  QUERY_FUNCTIONS_MODULE,
  isQueryFunction,
  queryFunctionsSource,
} from "./query-functions-generator.js";

export { ODATA_LITERAL_MODULE, ODATA_LITERAL_SOURCE };

/**
 * Generate typed Web API functions.
 *
 * Generates TypeScript classes for all functions (bound and unbound), except the query functions
 * (`LastXDays`, …): Dataverse runs those only inside `$filter`, so they become the
 * `queryFunctions` helpers instead (#342).
 *
 * @param csdl - Parsed CSDL schema
 * @param outputPath - Output directory path
 * @param dryRun - If true, preview without writing
 * @param purge - If true, delete existing output before generating
 */
export async function generateFunctions(
  csdl: CsdlSchema,
  outputPath: string,
  dryRun: boolean,
  purge = false
): Promise<void> {
  const absolutePath = resolve(outputPath);

  // Filter to Microsoft.Dynamics.CRM functions. The query functions answer 404 when called, so
  // they get no class: they are $filter expressions in queryFunctions (#342).
  const crmFunctions = csdl.functions.filter((f) => f.namespace === "Microsoft.Dynamics.CRM");
  const functions = crmFunctions.filter((f) => !isQueryFunction(f));
  const queryFunctions = crmFunctions.filter(isQueryFunction);

  if (dryRun) {
    console.log(`  [DRY RUN] Would write to: ${absolutePath}`);
    console.log(`  [DRY RUN] Files: One .ts file per function (alphabetical)`);
    console.log(`  [DRY RUN] Count: ${String(functions.length)} functions`);
    console.log(`  [DRY RUN] Query functions: ${String(queryFunctions.length)} $filter helpers`);
    if (purge) {
      console.log(`  [DRY RUN] Would purge directory first`);
    }
    return;
  }

  // Purge output directory if requested (exclude types folder)
  if (purge) {
    console.log(`\n  🗑️  Purging ${absolutePath}...`);
    await purgeDirectory(absolutePath, ["types"]);
    console.log(`  ✅ Directory purged`);
  }

  // The entity payload types: navigation properties of complex types use them (#231).
  // EntityReference comes from entities-runtime (#295).
  await writeTypeScriptFile(
    join(absolutePath, "types", `${ENTITY_PAYLOAD_MODULE}.ts`),
    ENTITY_PAYLOAD_SOURCE
  );

  // Runtime helper the generated functions use to format parameter-alias literals
  await writeTypeScriptFile(join(absolutePath, `${ODATA_LITERAL_MODULE}.ts`), ODATA_LITERAL_SOURCE);
  // Enum values in JSON parameters are sent as member names (#358)
  await writeTypeScriptFile(
    join(absolutePath, "internal", `${ENUM_BODY_MODULE}.ts`),
    enumBodySource(csdl, "functions")
  );

  const generatedFiles: string[] = [];

  // One file per function; overloads with different bindings each get their own (#75)
  const stems = operationNames(functions);
  for (const func of functions) {
    const stem = stems.get(func) ?? func.name;
    const content = generateFunctionClass(csdl, func, stem);
    const filename = `${stem}Function.ts`;
    await writeTypeScriptFile(join(absolutePath, filename), content);
    generatedFiles.push(`${stem}Function`);
    console.log(`  ✅ Generated ${filename}`);
  }

  // The query functions, as $filter expression helpers (#342)
  if (queryFunctions.length > 0) {
    await writeTypeScriptFile(
      join(absolutePath, `${QUERY_FUNCTIONS_MODULE}.ts`),
      queryFunctionsSource(queryFunctions)
    );
    console.log(`  ✅ Generated ${QUERY_FUNCTIONS_MODULE}.ts`);
  }

  // Generate index.ts
  const indexContent = generateFunctionsIndex(
    functions,
    stems,
    exportedEnumNames(csdl),
    exportedTypeNames(csdl),
    queryFunctions.length > 0
  );
  await writeTypeScriptFile(join(absolutePath, "index.ts"), indexContent);
  console.log(`  ✅ Generated index.ts`);

  console.log(`  Total: ${String(functions.length)} function files`);
  console.log(`  Query functions: ${String(queryFunctions.length)} $filter helpers`);
}

/**
 * Generate TypeScript class for a function.
 */
function generateFunctionClass(csdl: CsdlSchema, func: CsdlFunction, stem = func.name): string {
  const className = `${stem}Function`;
  const responseInterfaceName = `${stem}Response`;

  // Return type: the value execute() resolves (#300)
  const ret = operationReturn(
    csdl,
    func.returnType,
    responseInterfaceName,
    `${func.name} function`,
    [],
    func.name
  );

  // The constructor arguments: the record or entity set a bound function runs on (in the URL),
  // then one object with the CSDL parameters (#96)
  const signature = functionSignature(csdl, func, (table) => `${table}Id`);
  const request = functionRequestMethod(csdl, func, signature.args, "this.parameters", "functions");

  let code = coreImport(isRecordBound(func));
  code += functionHelperImports(request);
  // EntityReference is needed by the return type's declaration or by a parameter
  if (ret.needsEntityReference || signature.needsEntityReference) {
    code += ENTITY_REFERENCE_IMPORT;
  }
  code += typeImportLine([...ret.imports, ...signature.typeImports]);

  code += `\n`;

  // Generate response interface
  code += ret.declaration;
  code += `\n`;

  const split = splitArguments(signature.args);
  const bindingParams = split.binding;
  const aliasParams = split.parameters;
  const parametersName = parametersInterfaceName(className);
  if (aliasParams.length > 0) {
    code += parametersInterface(parametersName, `${func.name} function`, aliasParams);
    code += `\n`;
  }

  // Generate function class
  code += `/**\n`;
  code += ` * ${func.name} function\n`;
  code += ` *\n`;
  code += ` * ${func.isBound ? "Bound" : "Unbound"} function\n`;
  if (func.bindingParameter) {
    code += ` * Binding parameter: ${func.bindingParameter.name || "unnamed"} (${func.bindingParameter.type})\n`;
  }
  code += bindingDoc(bindingParams[0]?.name, func.bindingParameter?.type);
  code += ` */\n`;
  code += `export class ${className} implements Executable<${responseInterfaceName}> {\n`;

  const ctorArgs = constructorArguments(split, parametersName, "public readonly");
  if (ctorArgs.length > 0) {
    code += `  constructor(\n`;
    for (const arg of ctorArgs) code += `    ${arg},\n`;
    code += `  ) {}\n\n`;
  }

  // GET with the parameters in aliases (shared with the function-backed messages)
  code += request.code;
  code += `\n`;

  // Generate parseResponse method
  code += parseResponseMethod(ret, responseInterfaceName);

  code += `}\n`;

  return code;
}

/**
 * Generate index.ts with all exports.
 */
function generateFunctionsIndex(
  operations: CsdlFunction[],
  stems: Map<CsdlFunction, string>,
  enumNames: string[],
  typeNames: string[],
  hasQueryFunctions = false
): string {
  let code = `/**\n`;
  code += ` * @mohsinonxrm/dataverse-sdk-functions\n`;
  code += ` *\n`;
  code += ` * Auto-generated typed Web API functions.\n`;
  code += ` */\n\n`;

  // One export per class: overloads have their own (#75), and a name with no unbound overload
  // has no plain-name export (#286)
  const entries = operations
    .map((op) => ({
      stem: stems.get(op) ?? op.name,
      hasParameters: op.parameters.some((p) => p.name),
    }))
    .sort((a, b) => compareStrings(a.stem, b.stem));
  for (const { stem, hasParameters } of entries) {
    // The parameters interface of the constructor (#96)
    const parameters = hasParameters ? `, type ${parametersInterfaceName(`${stem}Function`)}` : "";
    code += `export { ${stem}Function${parameters}, type ${stem}Response } from './${stem}Function.js';\n`;
  }

  // The query functions are $filter expressions, not classes (#342)
  if (hasQueryFunctions) {
    code += `\nexport { queryFunctions } from './${QUERY_FUNCTIONS_MODULE}.js';\n`;
  }

  // The SDK's one EntityReference (#295), re-exported from entities-runtime
  code += `\n${ENTITY_REFERENCE_EXPORT}`;
  code += `export type { AnyEntityPayload, EntityPayload } from './types/${ENTITY_PAYLOAD_MODULE}.js';\n`;

  // Enum parameters take these values (EntityFilters.Entity | EntityFilters.Attributes) (#67)
  if (enumNames.length > 0) {
    code += `\nexport { ${enumNames.join(", ")} } from './types/index.js';\n`;
  }

  const responses = new Set(entries.map(({ stem }) => `${stem}Response`));
  code += rootTypeExports(typeNames, code, responses);

  return code;
}
