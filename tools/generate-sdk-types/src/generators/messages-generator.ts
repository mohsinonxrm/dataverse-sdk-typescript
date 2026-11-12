import type {
  CsdlSchema,
  CsdlAction,
  CsdlFunction,
  CsdlParameter as _CsdlParameter,
} from "../parsers/csdl-types.js";
import { resolve, join } from "path";
import { compareStrings } from "../parsers/canonical.js";
import {
  csdlTypeToTsWithExpansion as _csdlTypeToTsWithExpansion,
  toPascalCase as _toPascalCase,
  toCamelCase,
} from "../utils/typescript-writer.js";
import {
  bindingDoc,
  parametersInterface,
  parametersInterfaceName,
  REQUEST_BODY_MODULE,
  REQUEST_BODY_SOURCE,
} from "../utils/operation-parameters.js";
import { writeTypeScriptFile, purgeDirectory } from "../utils/file-writer.js";
import { ENUM_BODY_MODULE, enumBodySource } from "../utils/enum-body.js";
import {
  exportedEnumNames,
  exportedTypeNames,
  rootTypeExports,
} from "./complex-types-generator.js";
import { ENTITY_PAYLOAD_MODULE, ENTITY_PAYLOAD_SOURCE } from "../utils/entity-payload.js";
import { ENTITY_REFERENCE_EXPORT, ENTITY_REFERENCE_IMPORT } from "../utils/entity-reference.js";
import { operationNames } from "../utils/overloads.js";
import { messageResponseClass, operationReturn } from "../utils/operation-return.js";
import { coreImport, isRecordBound } from "../utils/binding.js";
import {
  functionHelperImports,
  functionRequestMethod,
  functionSignature,
  ODATA_LITERAL_MODULE,
  ODATA_LITERAL_SOURCE,
} from "../utils/function-request.js";
import {
  actionImports,
  actionParameterTsType,
  actionRequestMethod,
  constructorArguments,
  operationArguments,
  parameterImports,
  splitArguments,
  typeImportLine,
} from "../utils/operation-request.js";
import { isQueryFunction } from "./query-functions-generator.js";

/**
 * The hand-written messages, in `src/handwritten/` of the messages package (#344). They aren't Web
 * API actions or functions, so the CSDL can't describe them: the CRUD messages are HTTP verbs on
 * entity sets, and ExecuteMultiple / ExecuteTransaction are `$batch` requests. The generator keeps
 * the folder when it purges, re-exports `exports` from the index, and refuses a generated message
 * named like one of them.
 */
export const HAND_WRITTEN_MESSAGES = {
  /** The folder, under the package's `src`. */
  folder: "handwritten",
  /** Message names: each has `<Name>Request` and `<Name>Response`. */
  names: [
    "Associate",
    "Create",
    "Delete",
    "Disassociate",
    "ExecuteMultiple",
    "ExecuteTransaction",
    "Retrieve",
    "RetrieveMultiple",
    "Update",
  ],
  /** What the index re-exports from the folder's `index.ts`. */
  exports: [
    "AssociateRequest",
    "type AssociateRequestParameters",
    "AssociateResponse",
    "CreateRequest",
    "type CreateRequestParameters",
    "CreateResponse",
    "type CreateResult",
    "DeleteRequest",
    "type DeleteRequestParameters",
    "DeleteResponse",
    "DisassociateRequest",
    "type DisassociateRequestParameters",
    "DisassociateResponse",
    "type ExecuteResponses",
    "ExecuteMultipleRequest",
    "type ExecuteMultipleRequestParameters",
    "ExecuteMultipleResponse",
    "type ExecuteMultipleResponseItem",
    "type ExecuteMultipleResult",
    "type ExecuteMultipleSettings",
    "ExecuteTransactionRequest",
    "type ExecuteTransactionRequestParameters",
    "ExecuteTransactionResponse",
    "RetrieveRequest",
    "type RetrieveRequestParameters",
    "RetrieveResponse",
    "type RetrieveResult",
    "RetrieveMultipleRequest",
    "type RetrieveMultipleRequestParameters",
    "RetrieveMultipleResponse",
    "type RetrieveMultipleResult",
    "UpdateRequest",
    "type UpdateRequestParameters",
    "UpdateResponse",
  ],
} as const;

/**
 * The files of the messages package's `src` that the generator doesn't write: `purge` keeps them,
 * and tests that generate a messages package copy them next to the generated files.
 */
export const MESSAGES_HAND_WRITTEN_FILES = [
  "OrganizationRequest.ts",
  "types.ts",
  HAND_WRITTEN_MESSAGES.folder,
] as const;

/**
 * Generate SDK messages from Web API actions and functions.
 *
 * Generates request/response pairs for all Web API actions (`POST`) and functions (`GET` with
 * parameter aliases, #344), providing a C#-familiar IOrganizationService.execute() pattern for
 * TypeScript. The query functions (`LastXDays`, …) aren't messages: Dataverse runs them only inside
 * `$filter` (#342). The CRUD messages and ExecuteMultiple / ExecuteTransaction are hand-written
 * ({@link HAND_WRITTEN_MESSAGES}).
 *
 * Note: These are Web API actions (REST/OData), not .NET SDK messages (SOAP).
 * The IOrganizationService facade converts these to Web API calls internally.
 *
 * @param csdl - Parsed CSDL schema
 * @param outputPath - Output directory path
 * @param dryRun - If true, preview without writing
 * @param purge - If true, delete existing output before generating
 */
export async function generateMessages(
  csdl: CsdlSchema,
  outputPath: string,
  dryRun: boolean,
  purge = false
): Promise<void> {
  const absolutePath = resolve(outputPath);

  // Get all actions and functions from Microsoft.Dynamics.CRM namespace
  const allActions = csdl.actions.filter((a) => a.namespace === "Microsoft.Dynamics.CRM");
  const allFunctions = csdl.functions.filter(
    (f) => f.namespace === "Microsoft.Dynamics.CRM" && !isQueryFunction(f)
  );

  if (dryRun) {
    console.log(`  [DRY RUN] Would write to: ${absolutePath}`);
    console.log(
      `  [DRY RUN] Total messages: ${String(allActions.length + allFunctions.length)} ` +
        `(${String(allFunctions.length)} from functions)`
    );
    if (purge) {
      console.log(`  [DRY RUN] Would purge directory first`);
    }
    return;
  }

  // Purge output directory if requested
  if (purge) {
    console.log(`\n  🗑️  Purging ${absolutePath}...`);
    await purgeDirectory(absolutePath, [
      ...MESSAGES_HAND_WRITTEN_FILES,
      "types", // Don't delete the types folder (complex types are generated first)
    ]);
    console.log(`  ✅ Directory purged`);
  }

  // Enum values in bodies (#232) and in JSON function parameters (#358) are sent as member names
  await writeTypeScriptFile(
    join(absolutePath, "internal", `${ENUM_BODY_MODULE}.ts`),
    enumBodySource(csdl, "messages")
  );
  // Parameter-alias literals of the function-backed messages (#344)
  await writeTypeScriptFile(join(absolutePath, `${ODATA_LITERAL_MODULE}.ts`), ODATA_LITERAL_SOURCE);
  // Bodies leave out undefined parameters (#96)
  await writeTypeScriptFile(join(absolutePath, `${REQUEST_BODY_MODULE}.ts`), REQUEST_BODY_SOURCE);

  // The payload types of entity-typed parameters (#74). EntityReference comes from
  // entities-runtime (#295).
  await writeTypeScriptFile(
    join(absolutePath, "types", `${ENTITY_PAYLOAD_MODULE}.ts`),
    ENTITY_PAYLOAD_SOURCE
  );

  // Overloads with different bindings each get their own classes (#75)
  const stems = messageStems(allActions, allFunctions);

  // Generate all messages
  console.log(`\n  Generating ${String(allActions.length)} Web API action messages...`);
  for (const action of allActions) {
    const stem = stems.get(action) ?? action.name;
    const content = generateMessageClass(csdl, action, stem);
    const filename = `${stem}Message.ts`;
    await writeTypeScriptFile(join(absolutePath, filename), content);
  }
  console.log(`  Generating ${String(allFunctions.length)} Web API function messages...`);
  for (const func of allFunctions) {
    const stem = stems.get(func) ?? func.name;
    const content = generateFunctionMessageClass(csdl, func, stem);
    await writeTypeScriptFile(join(absolutePath, `${stem}Message.ts`), content);
  }

  // Generate index
  const indexContent = generateMessagesIndex(
    [...allActions, ...allFunctions],
    stems,
    exportedEnumNames(csdl),
    exportedTypeNames(csdl)
  );
  await writeTypeScriptFile(join(absolutePath, "index.ts"), indexContent);
  console.log(`  ✅ Generated index.ts`);

  console.log(`\n  Total: ${String(allActions.length + allFunctions.length)} messages`);
}

/**
 * The class-name stem of each message: the operation name, or `<Name>_<table>` for an overload
 * (#75). Actions and functions share the package, so a stem two of them would get, or one that a
 * hand-written message has, is an error rather than a file that overwrites another.
 */
export function messageStems(
  actions: readonly CsdlAction[],
  functions: readonly CsdlFunction[]
): Map<CsdlAction | CsdlFunction, string> {
  const stems = new Map<CsdlAction | CsdlFunction, string>([
    ...operationNames(actions),
    ...operationNames(functions),
  ]);
  const owner = new Map<string, string>(
    HAND_WRITTEN_MESSAGES.names.map((name) => [name, "a hand-written message"])
  );
  for (const [op, stem] of stems) {
    const kind = actions.some((action) => action === op) ? "action" : "function";
    const taken = owner.get(stem);
    if (taken) {
      throw new Error(
        `messages: the ${kind} ${op.name} would be ${stem}Request, which is already ${taken}. ` +
          "Decide which one keeps the name (#344)."
      );
    }
    owner.set(stem, `the ${kind} ${op.name}`);
  }
  return stems;
}

/**
 * Generate TypeScript class for a message (request + response).
 */
function generateMessageClass(csdl: CsdlSchema, action: CsdlAction, stem = action.name): string {
  const requestClassName = `${stem}Request`;
  const responseClassName = `${stem}Response`;

  // Return type: `result` is the value the action of the same name resolves (#70, #300)
  const resultName = `${stem}Result`;
  const ret = operationReturn(
    csdl,
    action.returnType,
    resultName,
    `${action.name} action`,
    [requestClassName, responseClassName],
    action.name
  );
  const response = messageResponseClass(ret, responseClassName, resultName, action.name);

  // The imports as in the action of the same name; a parameter type named like the response
  // class isn't imported
  const params = parameterImports(csdl, action, [responseClassName]);
  let code = `import { OrganizationRequest, OrganizationResponse } from './OrganizationRequest.js';\n`;
  code += coreImport(isRecordBound(action));
  code += actionImports(csdl, action, {
    typeImports: [...params.typeImports, ...ret.imports],
    payloadTypes: params.payloadTypes,
    needsEntityReference: params.needsEntityReference || ret.needsEntityReference,
  });

  code += `\n`;

  // Constructor arguments: the record or entity set a bound action runs on (in the URL), then
  // one object with the CSDL parameters, which becomes the request's `Parameters` (#96). A
  // `MessageName` parameter is a property of `Parameters`, so it doesn't shadow
  // OrganizationRequest.messageName.
  const constructorParams = operationArguments(
    csdl,
    action,
    (table) => `${toCamelCase(table)}Id`,
    (type) => actionParameterTsType(csdl, type)
  );
  const split = splitArguments(constructorParams);
  const bindingParams = split.binding;
  const bodyParams = split.parameters;
  const parametersName = parametersInterfaceName(requestClassName);
  if (bodyParams.length > 0) {
    code += parametersInterface(parametersName, `${action.name} message`, bodyParams);
    code += `\n`;
  }

  // Generate request class
  code += `/**\n`;
  code += ` * ${action.name} request message\n`;
  code += ` *\n`;
  code += ` * Web API Action: ${action.name}\n`;
  code += bindingDoc(bindingParams[0]?.name, action.bindingParameter?.type);
  code += ` */\n`;
  code += `export class ${requestClassName} extends OrganizationRequest implements Executable<${responseClassName}> {\n`;

  if (bodyParams.length > 0) {
    // The parameters by their CSDL names, as OrganizationRequest.Parameters (#96)
    code += `  declare readonly Parameters: Readonly<${parametersName}>;\n\n`;
  }
  const ctorArgs = constructorArguments(split, parametersName, "public", "");
  code += `  constructor(\n`;
  for (const arg of ctorArgs) code += `    ${arg},\n`;
  code += `  ) {\n`;
  code +=
    bodyParams.length > 0
      ? `    super('${action.name}', { ...parameters });\n`
      : `    super('${action.name}');\n`;
  code += `  }\n\n`;

  // The request of the action of the same name (for the Executable<T> interface)
  code += actionRequestMethod(csdl, action, constructorParams, "this.Parameters");
  code += `\n`;

  // Generate parseResponse method (for Executable<T> interface)
  code += response.parseResponse;
  code += `}\n\n`;

  // The value of the response, then the response class
  if (ret.kind !== "none") {
    code += ret.declaration;
    code += `\n`;
  }
  code += response.responseClass;

  return code;
}

/**
 * Generate the request + response classes of a message backed by a Web API function (#344): the
 * same `GET` with parameter aliases as the `<Name>Function` class of the functions package (shared
 * code, `utils/function-request.ts`), and the message contract of the action-backed ones: the
 * constructor takes the record id of a bound function, then one parameters object kept in
 * `Parameters`, and `response.result` is the value the function resolves (#300).
 */
function generateFunctionMessageClass(
  csdl: CsdlSchema,
  func: CsdlFunction,
  stem = func.name
): string {
  const requestClassName = `${stem}Request`;
  const responseClassName = `${stem}Response`;
  const resultName = `${stem}Result`;

  const ret = operationReturn(
    csdl,
    func.returnType,
    resultName,
    `${func.name} function`,
    [requestClassName, responseClassName],
    func.name
  );
  const response = messageResponseClass(ret, responseClassName, resultName, func.name, "function");

  // The record id of a bound function is named as in the action-backed messages
  const signature = functionSignature(csdl, func, (table) => `${toCamelCase(table)}Id`);
  const request = functionRequestMethod(csdl, func, signature.args, "this.Parameters", "messages");

  let code = `import { OrganizationRequest, OrganizationResponse } from './OrganizationRequest.js';\n`;
  code += coreImport(isRecordBound(func));
  if (ret.needsEntityReference || signature.needsEntityReference) code += ENTITY_REFERENCE_IMPORT;
  code += functionHelperImports(request);
  code += typeImportLine([...ret.imports, ...signature.typeImports]);
  code += `\n`;

  const split = splitArguments(signature.args);
  const bindingParams = split.binding;
  const aliasParams = split.parameters;
  const parametersName = parametersInterfaceName(requestClassName);
  if (aliasParams.length > 0) {
    code += parametersInterface(parametersName, `${func.name} message`, aliasParams);
    code += `\n`;
  }

  code += `/**\n`;
  code += ` * ${func.name} request message\n`;
  code += ` *\n`;
  code += ` * Web API Function: ${func.name}\n`;
  code += bindingDoc(bindingParams[0]?.name, func.bindingParameter?.type);
  code += ` */\n`;
  code += `export class ${requestClassName} extends OrganizationRequest implements Executable<${responseClassName}> {\n`;
  if (aliasParams.length > 0) {
    // The parameters by their CSDL names, as OrganizationRequest.Parameters (#96)
    code += `  declare readonly Parameters: Readonly<${parametersName}>;\n\n`;
  }
  const ctorArgs = constructorArguments(split, parametersName, "public", "");
  if (ctorArgs.length > 0) {
    code += `  constructor(\n`;
    for (const arg of ctorArgs) code += `    ${arg},\n`;
    code += `  ) {\n`;
  } else {
    code += `  constructor() {\n`;
  }
  code +=
    aliasParams.length > 0
      ? `    super('${func.name}', { ...parameters });\n`
      : `    super('${func.name}');\n`;
  code += `  }\n\n`;

  code += request.code;
  code += `\n`;

  code += response.parseResponse;
  code += `}\n\n`;

  if (ret.kind !== "none") {
    code += ret.declaration;
    code += `\n`;
  }
  code += response.responseClass;

  return code;
}

/**
 * Generate index.ts for messages.
 */
function generateMessagesIndex(
  operations: Array<CsdlAction | CsdlFunction>,
  stems: Map<CsdlAction | CsdlFunction, string>,
  enumNames: string[],
  typeNames: string[]
): string {
  let code = `/**\n`;
  code += ` * Organization Service messages\n`;
  code += ` *\n`;
  code += ` * Auto-generated TypeScript wrappers for Dataverse Web API actions and functions, and the\n`;
  code += ` * hand-written CRUD and ExecuteMultiple / ExecuteTransaction messages (./${HAND_WRITTEN_MESSAGES.folder}).\n`;
  code += ` * Use with IOrganizationService.execute() for C#-familiar patterns.\n`;
  code += ` */\n\n`;

  // Export base classes and types
  code += `// Base classes and types\n`;
  code += `export { OrganizationRequest, OrganizationResponse } from './OrganizationRequest.js';\n`;
  code += `export type { OrganizationRequestOptions } from './OrganizationRequest.js';\n`;
  // The SDK's one EntityReference (#295), re-exported from entities-runtime
  code += ENTITY_REFERENCE_EXPORT;
  code += `export type { AnyEntityPayload, EntityPayload } from './types/${ENTITY_PAYLOAD_MODULE}.js';\n`;
  code += `export type { MessageRequest, MessageResponse } from './types.js';\n\n`;

  // Export all message classes
  code += `// Message classes\n`;

  // One export per class: overloads have their own (#75), and a name with no unbound overload
  // has no plain-name export (#286)
  const entries = operations
    .map((op) => ({
      stem: stems.get(op) ?? op.name,
      hasParameters: op.parameters.some((p) => p.name),
      hasResult: op.returnType !== undefined,
    }))
    .sort((a, b) => compareStrings(a.stem, b.stem));
  for (const { stem, hasParameters, hasResult } of entries) {
    // The parameters interface of the constructor (#96), and the type of `result` (#300)
    const parameters = hasParameters ? `, type ${parametersInterfaceName(`${stem}Request`)}` : "";
    const result = hasResult ? `, type ${stem}Result` : "";
    code += `export { ${stem}Request${parameters}, ${stem}Response${result} } from './${stem}Message.js';\n`;
  }

  // The hand-written messages (#344): CRUD, and ExecuteMultiple / ExecuteTransaction over $batch
  code += `\n// Hand-written messages: CRUD on entity sets, ExecuteMultiple / ExecuteTransaction over $batch\n`;
  code += `export { ${HAND_WRITTEN_MESSAGES.exports.join(", ")} } from './${HAND_WRITTEN_MESSAGES.folder}/index.js';\n`;

  // Enum values for parameters, as in the functions package; bodies send member names (#232)
  if (enumNames.length > 0) {
    code += `\n// Enums\nexport { ${enumNames.join(", ")} } from './types/index.js';\n`;
  }

  // A message's response is the `<stem>Response` class, and the value it holds `<stem>Result`
  // (a function such as ValidateFetchXmlExpression returns a complex type of that name, #344)
  const responses = new Set([
    ...entries.map(({ stem }) => `${stem}Response`),
    ...entries.filter(({ hasResult }) => hasResult).map(({ stem }) => `${stem}Result`),
    ...HAND_WRITTEN_MESSAGES.names.map((name) => `${name}Response`),
  ]);
  code += rootTypeExports(typeNames, code, responses);

  return code;
}
