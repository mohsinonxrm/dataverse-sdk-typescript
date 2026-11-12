import type {
  CsdlSchema,
  CsdlAction,
  CsdlFunction,
  CsdlParameter as _CsdlParameter,
} from "../parsers/csdl-types.js";
import { resolve, join } from "path";
import { compareStrings } from "../parsers/canonical.js";
import {
  csdlTypeToTs,
  csdlTypeToTsWithExpansion as _csdlTypeToTsWithExpansion,
  toPascalCase as _toPascalCase,
  toCamelCase,
  getEntitySetName,
  isCollectionType,
  extractEntityTypeName,
} from "../utils/typescript-writer.js";
import {
  bindingDoc,
  parametersArgument,
  parametersInterface,
  parametersInterfaceName,
  REQUEST_BODY_MODULE,
  REQUEST_BODY_SOURCE,
  requestBodyExpression,
} from "../utils/operation-parameters.js";
import { writeTypeScriptFile, purgeDirectory } from "../utils/file-writer.js";
import { bodyEnumType, ENUM_BODY_MODULE, enumBodySource } from "../utils/enum-body.js";
import {
  exportedEnumNames,
  exportedTypeNames,
  rootTypeExports,
} from "./complex-types-generator.js";
import {
  ENTITY_PAYLOAD_MODULE,
  ENTITY_PAYLOAD_SOURCE,
  entityParameterType,
} from "../utils/entity-payload.js";
import { ENTITY_REFERENCE_EXPORT, ENTITY_REFERENCE_IMPORT } from "../utils/entity-reference.js";
import { operationNames } from "../utils/overloads.js";
import { polymorphicParameterType } from "../utils/polymorphism.js";
import { messageResponseClass, operationReturn } from "../utils/operation-return.js";
import {
  collectionBinding,
  coreImport,
  ENTITY_SET_PARAM,
  isRecordBound,
  recordSegment,
} from "../utils/binding.js";
import {
  functionSignature,
  functionUrlStatements,
  ODATA_LITERAL_MODULE,
  ODATA_LITERAL_SOURCE,
} from "../utils/function-request.js";
import { isQueryFunction } from "./query-functions-generator.js";

/**
 * The hand-written messages, in `src/handwritten/` of the messages package (#344). They aren't Web
 * API actions or functions, so the CSDL can't describe them: the CRUD messages (and Upsert, #435)
 * are HTTP verbs on entity sets, and ExecuteMultiple / ExecuteTransaction are `$batch` requests.
 * RetrievePrincipalAccess is one message for the function's three bindings, as in .NET, and
 * CheckPrivilege runs RetrieveUserPrivilegeByPrivilegeName (#435). The generator keeps
 * the folder when it purges, re-exports `exports` from the index, and refuses a generated message
 * named like one of them.
 */
export const HAND_WRITTEN_MESSAGES = {
  /** The folder, under the package's `src`. */
  folder: "handwritten",
  /** Message names: each has `<Name>Request` and `<Name>Response`. */
  names: [
    "Associate",
    "CheckPrivilege",
    "Create",
    "Delete",
    "Disassociate",
    "ExecuteMultiple",
    "ExecuteTransaction",
    "Retrieve",
    "RetrieveMultiple",
    "RetrievePrincipalAccess",
    "Update",
    "Upsert",
  ],
  /** What the index re-exports from the folder's `index.ts`. */
  exports: [
    "AssociateRequest",
    "type AssociateRequestParameters",
    "AssociateResponse",
    "type CheckPrivilegeGrant",
    "CheckPrivilegeRequest",
    "type CheckPrivilegeRequestParameters",
    "CheckPrivilegeResponse",
    "type CheckPrivilegeResult",
    "type PrivilegeDepthName",
    "type PrivilegeDepthValue",
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
    "RetrievePrincipalAccessRequest",
    "type RetrievePrincipalAccessRequestParameters",
    "RetrievePrincipalAccessResponse",
    "type RetrievePrincipalAccessResult",
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
    "UpsertRequest",
    "type UpsertRequestParameters",
    "UpsertResponse",
    "type UpsertResult",
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
 * Map Complex* types to their non-Complex EntityType equivalents.
 * Per Microsoft Web API documentation, use EntityMetadata (not ComplexEntityMetadata) for requests/responses.
 * EXCEPTION: ComplexLookupAttributeMetadata for customer lookup columns (per Microsoft docs).
 */
function mapComplexTypeToEntityType(typeName: string): string {
  // EXCEPTION: These Complex* types must remain as-is for customer relationship operations
  if (
    typeName === "ComplexLookupAttributeMetadata" ||
    typeName === "ComplexOneToManyRelationshipMetadata"
  ) {
    return typeName;
  }

  // Map Complex* metadata types to non-Complex versions
  const complexToEntityMap: Record<string, string> = {
    ComplexEntityMetadata: "EntityMetadata",
    ComplexAttributeMetadata: "AttributeMetadata",
    ComplexBigIntAttributeMetadata: "BigIntAttributeMetadata",
    ComplexBooleanAttributeMetadata: "BooleanAttributeMetadata",
    ComplexDateTimeAttributeMetadata: "DateTimeAttributeMetadata",
    ComplexDecimalAttributeMetadata: "DecimalAttributeMetadata",
    ComplexDoubleAttributeMetadata: "DoubleAttributeMetadata",
    ComplexIntegerAttributeMetadata: "IntegerAttributeMetadata",
    ComplexLookupAttributeMetadata: "LookupAttributeMetadata",
    ComplexMemoAttributeMetadata: "MemoAttributeMetadata",
    ComplexMoneyAttributeMetadata: "MoneyAttributeMetadata",
    ComplexStringAttributeMetadata: "StringAttributeMetadata",
    ComplexFileAttributeMetadata: "FileAttributeMetadata",
    ComplexImageAttributeMetadata: "ImageAttributeMetadata",
    ComplexEnumAttributeMetadata: "EnumAttributeMetadata",
    ComplexPicklistAttributeMetadata: "PicklistAttributeMetadata",
    ComplexManagedPropertyAttributeMetadata: "ManagedPropertyAttributeMetadata",
    ComplexUniqueIdentifierAttributeMetadata: "UniqueIdentifierAttributeMetadata",
    ComplexOneToManyRelationshipMetadata: "OneToManyRelationshipMetadata",
    ComplexManyToManyRelationshipMetadata: "ManyToManyRelationshipMetadata",
    ComplexOptionSetMetadata: "OptionSetMetadata",
    ComplexBooleanOptionSetMetadata: "BooleanOptionSetMetadata",
  };

  return complexToEntityMap[typeName] || typeName;
}

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

  // System entities that are filtered out and should be treated as 'any'
  const systemEntities = ["crmbaseentity", "principal", "crmmodelbaseentity", "expando"];

  // Collect all complex type references used in this file
  const complexTypesUsed = new Set<string>();
  const payloadTypes = new Set<string>();
  let needsEntityReference = false;

  let code = `import { OrganizationRequest, OrganizationResponse } from './OrganizationRequest.js';\n`;
  code += coreImport(isRecordBound(action));

  // Check parameters for complex types and EntityReference
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  for (const param of action.parameters || []) {
    // A parameter of a base type takes the Typed<Base> union of its derived types (#73)
    const polymorphic = polymorphicParameterType(csdl, param.type);
    if (polymorphic) {
      complexTypesUsed.add(polymorphic.union);
      continue;
    }
    const typeName = csdlTypeToTs(param.type, true);
    const baseType = typeName.replace("[]", "");

    // Entity-typed parameters take an entity payload or a reference (#74)
    const entityParam =
      param.name === action.bindingParameter?.name
        ? undefined
        : entityParameterType(csdl, param.type);
    if (entityParam) {
      for (const t of entityParam.payload) payloadTypes.add(t);
      if (entityParam.tsType.includes("EntityReference")) needsEntityReference = true;
    }

    // Check if this is EntityReference
    if (baseType === "EntityReference" || param.type === "Microsoft.Dynamics.CRM.crmbaseentity") {
      needsEntityReference = true;
    } else if (
      !["string", "number", "boolean", "any", "unknown", "Record<string, unknown>"].includes(
        baseType
      ) &&
      baseType !== responseClassName && // Exclude if it matches the response class we're generating
      !systemEntities.includes(baseType.toLowerCase())
    ) {
      // Map Complex* types to non-Complex EntityType versions
      const mappedType = mapComplexTypeToEntityType(baseType);
      complexTypesUsed.add(mappedType);
    }
  }

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
  for (const t of ret.imports) complexTypesUsed.add(t);
  if (ret.needsEntityReference) needsEntityReference = true;
  const response = messageResponseClass(ret, responseClassName, resultName, action.name);

  // Add import for EntityReference if needed
  if (needsEntityReference) {
    code += ENTITY_REFERENCE_IMPORT;
  }
  if (action.parameters.some((p) => p.name)) {
    code += `import { requestBody } from './${REQUEST_BODY_MODULE}.js';\n`;
  }
  if (action.parameters.some((p) => bodyEnumType(csdl, p.type))) {
    code += `import { enumBody } from './internal/${ENUM_BODY_MODULE}.js';\n`;
  }
  if (payloadTypes.size > 0) {
    code += `import type { ${[...payloadTypes].sort().join(", ")} } from './types/${ENTITY_PAYLOAD_MODULE}.js';\n`;
  }

  // Import complex types from local types folder (following actions package pattern)
  if (complexTypesUsed.size > 0) {
    const sortedTypes = Array.from(complexTypesUsed).sort();
    code += `import type { ${sortedTypes.join(", ")} } from './types/index.js';\n`;
  }

  code += `\n`;

  // Collection-bound: called on an entity set (#69)
  const collection =
    action.isBound && action.bindingParameter && isCollectionType(action.bindingParameter.type)
      ? collectionBinding(csdl, action.bindingParameter.type)
      : undefined;

  // Constructor arguments: the record or entity set a bound action runs on (in the URL), then
  // one object with the CSDL parameters, which becomes the request's `Parameters` (#96)
  const constructorParams: Array<{
    name: string;
    type: string;
    tsName: string;
    isBinding: boolean;
    nullable: boolean;
    optional?: boolean;
  }> = [];

  // Check if binding parameter is a Collection type
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const isCollectionBound =
    action.isBound && action.bindingParameter && isCollectionType(action.bindingParameter.type);

  if (action.isBound && action.bindingParameter && !isCollectionBound) {
    // Single-entity bound: First parameter is the entity ID
    const entityTypeName = extractEntityTypeName(action.bindingParameter.type);
    constructorParams.push({
      name: `${toCamelCase(entityTypeName)}Id`,
      type: "string",
      tsName: action.bindingParameter.name,
      isBinding: true,
      nullable: false,
    });
  }

  if (collection?.needsEntitySetName && action.bindingParameter) {
    // Bound to Collection(mscrm.crmbaseentity): the caller names the entity set
    constructorParams.push({
      name: ENTITY_SET_PARAM,
      type: "string",
      tsName: action.bindingParameter.name,
      isBinding: true,
      nullable: false,
    });
  }

  // Add all non-binding parameters
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  for (const param of action.parameters || []) {
    if (!param.name) continue; // Skip unnamed parameters

    // Skip binding parameter (it's already handled above as entityId)
    if (param.name === action.bindingParameter?.name && !isCollectionBound) {
      continue;
    }

    constructorParams.push({
      name: param.name,
      type:
        polymorphicParameterType(csdl, param.type)?.tsType ??
        entityParameterType(csdl, param.type)?.tsType ??
        csdlTypeToTs(param.type, true),
      tsName: param.name,
      isBinding: false,
      nullable: param.nullable ?? false,
      // In CSDL a parameter without Nullable="false" may be left out (#74, as #68 for functions).
      // A `MessageName` parameter is a property of `Parameters`, so it no longer shadows
      // OrganizationRequest.messageName.
      optional: param.nullable !== false,
    });
  }

  const bindingParams = constructorParams.filter((p) => p.isBinding);
  const bodyParams = constructorParams
    .filter((p) => !p.isBinding)
    .map((p) => ({ name: p.tsName, type: p.type, optional: p.optional === true }));
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
  const ctorArgs = [
    ...bindingParams.map((p) => `public ${p.name}: ${p.type}`),
    ...(bodyParams.length > 0 ? [parametersArgument("", parametersName, bodyParams)] : []),
  ];
  code += `  constructor(\n`;
  for (const arg of ctorArgs) code += `    ${arg},\n`;
  code += `  ) {\n`;
  code +=
    bodyParams.length > 0
      ? `    super('${action.name}', { ...parameters });\n`
      : `    super('${action.name}');\n`;
  code += `  }\n\n`;

  // Generate toRequestInformation method (for Executable<T> interface)
  code += generateToRequestInformation(csdl, action, constructorParams);
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
 * Generate toRequestInformation method for Executable<T> interface.
 * This matches the logic in actions-generator.ts.
 */
function generateToRequestInformation(
  csdl: CsdlSchema,
  action: CsdlAction,
  constructorParams: Array<{
    name: string;
    type: string;
    tsName: string;
    isBinding: boolean;
    nullable: boolean;
  }>
): string {
  let code = `  toRequestInformation(baseUrl: string): RequestInformation {\n`;

  // Check if binding parameter is a Collection type
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const isCollectionBound =
    action.isBound && action.bindingParameter && isCollectionType(action.bindingParameter.type);

  if (action.isBound && action.bindingParameter && !isCollectionBound) {
    // Single-entity bound action - construct URL with entity ID
    const bindingParam = constructorParams.find((p) => p.isBinding);
    if (!bindingParam) {
      throw new Error(`Bound action ${action.name} missing binding parameter`);
    }

    code += `    // Bound action\n`;

    // The entity set from the CSDL, as in the actions generator; not pluralized by hand (#76)
    const entitySetName = getEntitySetName(action.bindingParameter.type, csdl.entitySetMap);

    if (entitySetName) {
      code += `    const url = \`\${baseUrl}/${recordSegment(entitySetName, bindingParam.name)}/Microsoft.Dynamics.CRM.${action.name}\`;\n\n`;
    } else {
      // Fallback: extract entity type name from binding parameter type
      const entityTypeName = extractEntityTypeName(action.bindingParameter.type);
      code += `    // WARNING: Entity set not found in metadata, using entity type name as fallback\n`;
      code += `    const url = \`\${baseUrl}/${recordSegment(`${entityTypeName}s`, bindingParam.name)}/Microsoft.Dynamics.CRM.${action.name}\`;\n\n`;
    }
  } else if (isCollectionBound && action.bindingParameter) {
    // Collection-bound action: POST /{entityset}/Microsoft.Dynamics.CRM.{name} (#69)
    const collection = collectionBinding(csdl, action.bindingParameter.type);
    code += `    // Bound action (entity collection)\n`;
    if (collection.warning) code += `    // ${collection.warning}\n`;
    code += `    const url = \`\${baseUrl}/${collection.segment}/Microsoft.Dynamics.CRM.${action.name}\`;\n\n`;
  } else {
    // Unbound action
    code += `    const url = \`\${baseUrl}/${action.name}\`;\n\n`;
  }

  // Build request body: the parameters by their CSDL names, without the undefined ones (#96)
  const bodyParams = constructorParams
    .filter((p) => !p.isBinding)
    .map((p) => ({ name: p.tsName, type: p.type, optional: !p.nullable }));

  if (bodyParams.length > 0) {
    // Enum values are sent as member names (#232)
    const enumTypeOf = (name: string) => {
      const csdlType = action.parameters.find((p) => p.name === name)?.type;
      return csdlType ? bodyEnumType(csdl, csdlType) : undefined;
    };
    code += `    const body = ${requestBodyExpression("this.Parameters", bodyParams, enumTypeOf)};\n\n`;
  }

  code += `    return {\n`;
  code += `      method: 'POST',\n`;
  code += `      url,\n`;
  code += `      headers: {\n`;
  code += `        'content-type': 'application/json',\n`;
  code += `      },\n`;
  if (bodyParams.length > 0) {
    code += `      body,\n`;
  }
  code += `    };\n`;
  code += `  }\n`;

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
  const url = functionUrlStatements(csdl, func, signature.args, "this.Parameters", "messages");

  const typeImports = new Set([...ret.imports, ...signature.typeImports]);
  typeImports.delete("EntityReference");

  let code = `import { OrganizationRequest, OrganizationResponse } from './OrganizationRequest.js';\n`;
  code += coreImport(isRecordBound(func));
  if (ret.needsEntityReference || signature.needsEntityReference) code += ENTITY_REFERENCE_IMPORT;
  if (url.usesEnumBody) code += `import { enumBody } from './internal/${ENUM_BODY_MODULE}.js';\n`;
  if (url.usesAliasLiteral) {
    code += `import { formatParameterAlias } from './${ODATA_LITERAL_MODULE}.js';\n`;
  }
  if (typeImports.size > 0) {
    code += `import type { ${[...typeImports].sort().join(", ")} } from './types/index.js';\n`;
  }
  code += `\n`;

  const bindingParams = signature.args.filter((p) => p.isBinding);
  const aliasParams = signature.args
    .filter((p) => !p.isBinding)
    .map((p) => ({ name: p.tsName, type: p.type, optional: p.optional === true }));
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
  const ctorArgs = [
    ...bindingParams.map((p) => `public ${p.name}: ${p.type}`),
    ...(aliasParams.length > 0 ? [parametersArgument("", parametersName, aliasParams)] : []),
  ];
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

  code += `  toRequestInformation(baseUrl: string): RequestInformation {\n`;
  code += url.code;
  code += `    return {\n`;
  code += `      method: 'GET',\n`;
  code += `      url,\n`;
  code += `      headers: {\n`;
  code += `        'Accept': 'application/json',\n`;
  code += `      },\n`;
  code += `    };\n`;
  code += `  }\n\n`;

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
