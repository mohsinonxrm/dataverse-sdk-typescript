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
  functionSignature,
  functionUrlStatements,
  ODATA_LITERAL_MODULE,
  ODATA_LITERAL_SOURCE,
} from "../utils/function-request.js";
import {
  bindingDoc,
  parametersArgument,
  parametersInterface,
  parametersInterfaceName,
} from "../utils/operation-parameters.js";
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

  // Collect all complex type and entity type references used in this file
  const complexTypesUsed = new Set<string>();

  // Return type: the value execute() resolves (#300)
  const ret = operationReturn(
    csdl,
    func.returnType,
    responseInterfaceName,
    `${func.name} function`,
    [],
    func.name
  );
  for (const t of ret.imports) complexTypesUsed.add(t);

  // The constructor arguments: the record or entity set a bound function runs on (in the URL),
  // then one object with the CSDL parameters (#96)
  const signature = functionSignature(csdl, func, (table) => `${table}Id`);
  for (const t of signature.typeImports) complexTypesUsed.add(t);

  const core = coreImport(isRecordBound(func));
  let code = core;
  // EntityReference is needed by the return type's declaration or by a parameter
  const needsEntityReference = ret.needsEntityReference || signature.needsEntityReference;

  if (needsEntityReference) {
    code += ENTITY_REFERENCE_IMPORT;
  }

  // Import complex types from types folder (excluding EntityReference)
  const complexTypesToImport = Array.from(complexTypesUsed)
    .filter((t) => t !== "EntityReference")
    .sort();
  if (complexTypesToImport.length > 0) {
    code += `import type { ${complexTypesToImport.join(", ")} } from './types/index.js';\n`;
  }

  code += `\n`;

  // Generate response interface
  code += ret.declaration;
  code += `\n`;

  const constructorParams = signature.args;
  const bindingParams = constructorParams.filter((p) => p.isBinding);
  const aliasParams = constructorParams
    .filter((p) => !p.isBinding)
    .map((p) => ({ name: p.tsName, type: p.type, optional: p.optional === true }));
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

  const ctorArgs = [
    ...bindingParams.map((p) => `public readonly ${p.name}: ${p.type}`),
    ...(aliasParams.length > 0
      ? [parametersArgument("public readonly", parametersName, aliasParams)]
      : []),
  ];
  if (ctorArgs.length > 0) {
    code += `  constructor(\n`;
    for (const arg of ctorArgs) code += `    ${arg},\n`;
    code += `  ) {}\n\n`;
  }

  // Generate toRequestInformation method
  code += `  toRequestInformation(baseUrl: string): RequestInformation {\n`;

  const url = functionUrlStatements(csdl, func, constructorParams, "this.parameters", "functions");
  code += url.code;

  code += `    return {\n`;
  code += `      method: 'GET',\n`;
  code += `      url,\n`;
  code += `      headers: {\n`;
  code += `        'Accept': 'application/json',\n`;
  code += `      },\n`;
  code += `    };\n`;
  code += `  }\n\n`;

  // Generate parseResponse method
  code += parseResponseMethod(ret, responseInterfaceName);

  code += `}\n`;

  if (url.usesAliasLiteral) {
    code =
      core +
      (url.usesEnumBody ? `import { enumBody } from './internal/${ENUM_BODY_MODULE}.js';\n` : "") +
      `import { formatParameterAlias } from './${ODATA_LITERAL_MODULE}.js';\n` +
      code.slice(core.length);
  }

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
