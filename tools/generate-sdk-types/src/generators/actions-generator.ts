import type {
  CsdlSchema,
  CsdlAction,
  CsdlParameter as _CsdlParameter,
} from "../parsers/csdl-types.js";
import { resolve, join } from "path";
import { compareStrings } from "../parsers/canonical.js";
import { toPascalCase as _toPascalCase } from "../utils/typescript-writer.js";
import {
  bindingDoc,
  parametersInterface,
  parametersInterfaceName,
  REQUEST_BODY_MODULE,
  REQUEST_BODY_SOURCE,
} from "../utils/operation-parameters.js";
import {
  writeTypeScriptFile,
  generateIndexFile as _generateIndexFile,
  purgeDirectory,
} from "../utils/file-writer.js";
import { operationReturn, parseResponseMethod } from "../utils/operation-return.js";
import { ENTITY_REFERENCE_EXPORT } from "../utils/entity-reference.js";
import { ENUM_BODY_MODULE, enumBodySource } from "../utils/enum-body.js";
import {
  exportedEnumNames,
  exportedTypeNames,
  rootTypeExports,
} from "./complex-types-generator.js";
import { operationNames } from "../utils/overloads.js";
import { ENTITY_PAYLOAD_MODULE, ENTITY_PAYLOAD_SOURCE } from "../utils/entity-payload.js";
import { coreImport, isRecordBound } from "../utils/binding.js";
import {
  actionImports,
  actionParameterTsType,
  actionRequestMethod,
  constructorArguments,
  operationArguments,
  parameterImports,
  splitArguments,
} from "../utils/operation-request.js";

/**
 * Generate typed Web API actions.
 *
 * Generates TypeScript classes for all actions (bound and unbound).
 *
 * @param csdl - Parsed CSDL schema
 * @param outputPath - Output directory path
 * @param dryRun - If true, preview without writing
 * @param purge - If true, delete existing output before generating
 */
export async function generateActions(
  csdl: CsdlSchema,
  outputPath: string,
  dryRun: boolean,
  purge = false
): Promise<void> {
  const absolutePath = resolve(outputPath);

  // Filter to Microsoft.Dynamics.CRM actions
  const actions = csdl.actions.filter((a) => a.namespace === "Microsoft.Dynamics.CRM");

  if (dryRun) {
    console.log(`  [DRY RUN] Would write to: ${absolutePath}`);
    console.log(`  [DRY RUN] Files: One .ts file per action (alphabetical)`);
    console.log(`  [DRY RUN] Count: ${String(actions.length)} actions`);
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

  // The payload types of entity-typed parameters (#74). EntityReference comes from
  // entities-runtime (#295).
  await writeTypeScriptFile(
    join(absolutePath, "types", `${ENTITY_PAYLOAD_MODULE}.ts`),
    ENTITY_PAYLOAD_SOURCE
  );
  // Enum values in bodies are sent as member names (#232)
  await writeTypeScriptFile(
    join(absolutePath, "internal", `${ENUM_BODY_MODULE}.ts`),
    enumBodySource(csdl)
  );
  // Bodies leave out undefined parameters (#96)
  await writeTypeScriptFile(join(absolutePath, `${REQUEST_BODY_MODULE}.ts`), REQUEST_BODY_SOURCE);

  const generatedFiles: string[] = [];

  // One file per action; overloads with different bindings each get their own (#75)
  const stems = operationNames(actions);
  for (const action of actions) {
    const stem = stems.get(action) ?? action.name;
    try {
      const content = generateActionClass(csdl, action, stem);
      const filename = `${stem}Action.ts`;
      await writeTypeScriptFile(join(absolutePath, filename), content);
      generatedFiles.push(`${stem}Action`);
      console.log(`  ✅ Generated ${filename}`);
    } catch (error) {
      console.error(`  ❌ Failed to generate ${stem}Action.ts:`, error);
      throw error;
    }
  }

  // Generate index.ts
  const indexContent = generateActionsIndex(
    actions,
    stems,
    exportedEnumNames(csdl),
    exportedTypeNames(csdl)
  );
  await writeTypeScriptFile(join(absolutePath, "index.ts"), indexContent);
  console.log(`  ✅ Generated index.ts`);

  console.log(`  Total: ${String(actions.length)} action files`);
}

/**
 * Generate TypeScript class for an action.
 */
function generateActionClass(csdl: CsdlSchema, action: CsdlAction, stem = action.name): string {
  const className = `${stem}Action`;
  const responseInterfaceName = `${stem}Response`;

  // Return type: the value execute() resolves (#300)
  const ret = operationReturn(
    csdl,
    action.returnType,
    responseInterfaceName,
    `${action.name} action`,
    [],
    action.name
  );

  // What the parameters import; EntityReference is needed by the return type's declaration too
  const params = parameterImports(csdl, action);
  let code = coreImport(isRecordBound(action));
  code += actionImports(csdl, action, {
    typeImports: [...ret.imports, ...params.typeImports],
    payloadTypes: params.payloadTypes,
    needsEntityReference: ret.needsEntityReference || params.needsEntityReference,
  });

  code += `\n`;

  // Generate response interface
  code += ret.declaration;
  code += `\n`;

  // Constructor arguments: the record or entity set a bound action runs on (in the URL), then
  // one object with the CSDL parameters (#96)
  const constructorParams = operationArguments(
    csdl,
    action,
    (table) => `${table}Id`,
    (type) => actionParameterTsType(csdl, type)
  );
  const split = splitArguments(constructorParams);
  const bindingParams = split.binding;
  const bodyParams = split.parameters;
  const parametersName = parametersInterfaceName(className);
  if (bodyParams.length > 0) {
    code += parametersInterface(parametersName, `${action.name} action`, bodyParams);
    code += `\n`;
  }

  // Generate action class
  code += `/**\n`;
  code += ` * ${action.name} action\n`;
  code += ` *\n`;
  code += ` * ${action.isBound ? "Bound" : "Unbound"} action\n`;
  if (action.bindingParameter) {
    code += ` * Binding parameter: ${action.bindingParameter.name || "unnamed"} (${action.bindingParameter.type})\n`;
  }
  code += bindingDoc(bindingParams[0]?.name, action.bindingParameter?.type);
  code += ` */\n`;
  code += `export class ${className} implements Executable<${responseInterfaceName}> {\n`;

  const ctorArgs = constructorArguments(split, parametersName, "public readonly");
  if (ctorArgs.length > 0) {
    code += `  constructor(\n`;
    for (const arg of ctorArgs) code += `    ${arg},\n`;
    code += `  ) {}\n\n`;
  }

  // POST with the parameters in the body (shared with the action-backed messages)
  code += actionRequestMethod(csdl, action, constructorParams, "this.parameters");
  code += `\n`;

  // Generate parseResponse method
  code += parseResponseMethod(ret, responseInterfaceName);

  code += `}\n`;

  return code;
}

/**
 * Generate index.ts with all exports.
 */
function generateActionsIndex(
  operations: CsdlAction[],
  stems: Map<CsdlAction, string>,
  enumNames: string[],
  typeNames: string[]
): string {
  let code = `/**\n`;
  code += ` * @mohsinonxrm/dataverse-sdk-actions\n`;
  code += ` *\n`;
  code += ` * Auto-generated typed Web API actions.\n`;
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
    const parameters = hasParameters ? `, type ${parametersInterfaceName(`${stem}Action`)}` : "";
    code += `export { ${stem}Action${parameters}, type ${stem}Response } from './${stem}Action.js';\n`;
  }

  // The SDK's one EntityReference (#295), re-exported from entities-runtime
  code += `\n${ENTITY_REFERENCE_EXPORT}`;
  code += `export type { AnyEntityPayload, EntityPayload } from './types/${ENTITY_PAYLOAD_MODULE}.js';\n`;

  // Enum values for parameters (AccessRights.ReadAccess | AccessRights.WriteAccess), as in the
  // functions package; bodies send them as member names (#232)
  if (enumNames.length > 0) {
    code += `\nexport { ${enumNames.join(", ")} } from './types/index.js';\n`;
  }

  const responses = new Set(entries.map(({ stem }) => `${stem}Response`));
  code += rootTypeExports(typeNames, code, responses);

  return code;
}
