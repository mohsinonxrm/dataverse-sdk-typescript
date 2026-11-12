/**
 * The request of a generated operation, built the same way for the actions, functions and messages
 * packages (#440): the constructor arguments (the record or entity set a bound operation runs on,
 * then the CSDL parameters), the URL of an unbound, record-bound or collection-bound operation, the
 * action body, the headers, and the type imports the parameters need.
 *
 * An action is `POST` with its parameters in a JSON body (#96); a function is `GET` with its
 * parameters in parameter aliases (`utils/function-request.ts`). `<Name>Action`, `<Name>Function`
 * and the `<Name>Request` messages of both build their requests here, so they can't drift.
 */
import type { CsdlAction, CsdlFunction, CsdlSchema } from "../parsers/csdl-types.js";
import { collectionBinding, ENTITY_SET_PARAM, recordSegment } from "./binding.js";
import { bodyEnumType, ENUM_BODY_MODULE } from "./enum-body.js";
import { ENTITY_PAYLOAD_MODULE, entityParameterType } from "./entity-payload.js";
import { ENTITY_REFERENCE_IMPORT } from "./entity-reference.js";
import {
  type OperationParameter,
  parametersArgument,
  REQUEST_BODY_MODULE,
  requestBodyExpression,
} from "./operation-parameters.js";
import { polymorphicParameterType, SYSTEM_ENTITIES } from "./polymorphism.js";
import {
  csdlTypeToTs,
  extractEntityTypeName,
  getEntitySetName,
  isCollectionType,
} from "./typescript-writer.js";

/** A Web API action or function. */
export type CsdlOperation = CsdlAction | CsdlFunction;

/** One argument of an operation's constructor: the binding (in the URL) or a CSDL parameter. */
export interface OperationArgument {
  /** Name of the constructor argument or of the parameters property. */
  name: string;
  /** The CSDL parameter name. */
  tsName: string;
  isBinding: boolean;
  /** TypeScript type. */
  type: string;
  /** A parameter the CSDL doesn't declare `Nullable="false"`: it may be left out (#68, #74). */
  optional?: boolean;
}

/**
 * Map Complex* types to their non-Complex EntityType equivalents.
 * Per Microsoft Web API documentation, use EntityMetadata (not ComplexEntityMetadata) for requests/responses.
 * EXCEPTION: ComplexLookupAttributeMetadata for customer lookup columns (per Microsoft docs).
 */
export function mapComplexTypeToEntityType(typeName: string): string {
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

/** What the parameters of an operation import. */
export interface ParameterImports {
  /** Types from `./types/index.js`. */
  typeImports: string[];
  /** Entity payload types from `./types/entityPayload.js` (#74). */
  payloadTypes: string[];
  /** A parameter is, or takes, an `EntityReference`. */
  needsEntityReference: boolean;
}

/**
 * The imports the parameters of an operation need: the complex and entity types they name (a
 * `Typed<Base>` union for a base type, #73), the entity payload types of entity-typed parameters
 * (#74), and whether one is an `EntityReference`.
 *
 * @param exclude - Names declared in the file, which aren't imported.
 */
export function parameterImports(
  csdl: CsdlSchema,
  op: CsdlOperation,
  exclude: readonly string[] = []
): ParameterImports {
  const typeImports = new Set<string>();
  const payloadTypes = new Set<string>();
  // Single entity references, not Collections
  let needsEntityReference = op.parameters.some(
    (p) => !isCollectionType(p.type) && csdlTypeToTs(p.type, false) === "EntityReference"
  );
  for (const param of op.parameters) {
    // A parameter of a base type takes the Typed<Base> union of its derived types (#73)
    const polymorphic = polymorphicParameterType(csdl, param.type);
    if (polymorphic) {
      typeImports.add(polymorphic.union);
      continue;
    }
    const baseType = csdlTypeToTs(param.type).replace("[]", "");
    if (
      !["string", "number", "boolean", "any", "unknown"].includes(baseType) &&
      baseType !== "EntityReference" &&
      !SYSTEM_ENTITIES.includes(baseType.toLowerCase()) &&
      !exclude.includes(baseType)
    ) {
      // Map Complex* types to non-Complex EntityType versions
      typeImports.add(mapComplexTypeToEntityType(baseType));
    }
    // Entity-typed parameters take an entity payload or a reference (#74)
    const entityParam =
      param.name === op.bindingParameter?.name ? undefined : entityParameterType(csdl, param.type);
    if (entityParam) {
      for (const t of entityParam.payload) payloadTypes.add(t);
      if (entityParam.tsType.includes("EntityReference")) needsEntityReference = true;
    }
  }
  return { typeImports: [...typeImports], payloadTypes: [...payloadTypes], needsEntityReference };
}

/**
 * The constructor arguments of an operation class: the record or entity set a bound operation
 * runs on (in the URL), then one entry per CSDL parameter, which go in one parameters object (#96).
 *
 * @param recordIdName - Name of the record-id argument of an operation bound to one record, from
 *   its table (`systemuser` → `systemuserId`).
 * @param parameterType - TypeScript type of a parameter of a CSDL type.
 */
export function operationArguments(
  csdl: CsdlSchema,
  op: CsdlOperation,
  recordIdName: (table: string) => string,
  parameterType: (csdlType: string) => string
): OperationArgument[] {
  const args: OperationArgument[] = [];
  const isCollectionBound =
    op.isBound && op.bindingParameter && isCollectionType(op.bindingParameter.type);
  if (op.isBound && op.bindingParameter && !isCollectionBound) {
    // Single-entity bound: First parameter is the entity ID
    const entityTypeName = extractEntityTypeName(op.bindingParameter.type);
    args.push({
      name: recordIdName(entityTypeName),
      type: "string",
      tsName: op.bindingParameter.name,
      isBinding: true,
    });
  }
  // Collection-bound: called on an entity set (#69)
  if (
    isCollectionBound &&
    op.bindingParameter &&
    collectionBinding(csdl, op.bindingParameter.type).needsEntitySetName
  ) {
    // Bound to Collection(mscrm.crmbaseentity): the caller names the entity set
    args.push({
      name: ENTITY_SET_PARAM,
      type: "string",
      tsName: op.bindingParameter.name,
      isBinding: true,
    });
  }

  for (const param of op.parameters) {
    if (!param.name) continue; // Skip unnamed parameters
    // Skip binding parameter (it's already handled above as the record id)
    if (param.name === op.bindingParameter?.name && !isCollectionBound) continue;
    args.push({
      name: param.name,
      type: parameterType(param.type),
      tsName: param.name,
      isBinding: false,
      // In CSDL a parameter without Nullable="false" may be left out (#68, #74)
      optional: param.nullable !== false,
    });
  }
  return args;
}

/**
 * TypeScript type of an action parameter: the `Typed<Base>` union of a base type (#73), an entity
 * payload or a reference for an entity type (#74), or the type itself.
 */
export function actionParameterTsType(csdl: CsdlSchema, csdlType: string): string {
  return (
    polymorphicParameterType(csdl, csdlType)?.tsType ??
    entityParameterType(csdl, csdlType)?.tsType ??
    csdlTypeToTs(csdlType, true)
  );
}

/** An operation's constructor arguments, split into the binding and the parameters object. */
export interface SplitArguments {
  /** The record id or entity set in the URL. */
  binding: OperationArgument[];
  /** The CSDL parameters, as the `<Class>Parameters` interface has them (#96). */
  parameters: OperationParameter[];
}

/** Split an operation's constructor arguments into its binding and its parameters object. */
export function splitArguments(args: readonly OperationArgument[]): SplitArguments {
  return {
    binding: args.filter((p) => p.isBinding),
    parameters: args
      .filter((p) => !p.isBinding)
      .map((p) => ({ name: p.tsName, type: p.type, optional: p.optional === true })),
  };
}

/**
 * The constructor's argument list: the binding, then the parameters object when there are
 * parameters.
 *
 * @param modifier - Modifier of the binding arguments (`public readonly`, or `public` in a
 *   message) and, with `parametersModifier` left out, of the parameters object.
 */
export function constructorArguments(
  split: SplitArguments,
  parametersName: string,
  modifier: string,
  parametersModifier = modifier
): string[] {
  return [
    ...split.binding.map((p) => `${modifier} ${p.name}: ${p.type}`),
    ...(split.parameters.length > 0
      ? [parametersArgument(parametersModifier, parametersName, split.parameters)]
      : []),
  ];
}

/**
 * The statement of `toRequestInformation` that starts the URL: the operation on its record
 * (`/{entityset}({id})/Microsoft.Dynamics.CRM.{name}`), on its entity set (#69) or on the service
 * root.
 *
 * @param kind - `action` (`const url`) or `function` (`let url`: the parameter aliases follow).
 */
export function operationUrlStatement(
  csdl: CsdlSchema,
  op: CsdlOperation,
  args: readonly OperationArgument[],
  kind: "action" | "function"
): string {
  const declaration = kind === "function" ? "let" : "const";
  const isCollectionBound =
    op.isBound && op.bindingParameter && isCollectionType(op.bindingParameter.type);
  let code = "";

  if (op.isBound && op.bindingParameter && !isCollectionBound) {
    // Single-entity bound - construct URL with entity ID
    const bindingParam = args.find((p) => p.isBinding);
    if (!bindingParam) {
      throw new Error(`Bound ${kind} ${op.name} missing binding parameter`);
    }

    code += `    // Bound ${kind}\n`;

    // The entity set from the CSDL; not pluralized by hand (#76)
    const entitySetName = getEntitySetName(op.bindingParameter.type, csdl.entitySetMap);

    if (entitySetName) {
      code += `    ${declaration} url = \`\${baseUrl}/${recordSegment(entitySetName, bindingParam.name)}/Microsoft.Dynamics.CRM.${op.name}\`;\n\n`;
    } else {
      // Fallback: extract entity type name from binding parameter type
      const entityTypeName = extractEntityTypeName(op.bindingParameter.type);
      code += `    // WARNING: Entity set not found in metadata, using entity type name as fallback\n`;
      code += `    ${declaration} url = \`\${baseUrl}/${recordSegment(`${entityTypeName}s`, bindingParam.name)}/Microsoft.Dynamics.CRM.${op.name}\`;\n\n`;
    }
  } else if (isCollectionBound && op.bindingParameter) {
    // Collection-bound: /{entityset}/Microsoft.Dynamics.CRM.{name} (#69)
    const collection = collectionBinding(csdl, op.bindingParameter.type);
    code += `    // Bound ${kind} (entity collection)\n`;
    if (collection.warning) code += `    // ${collection.warning}\n`;
    code += `    ${declaration} url = \`\${baseUrl}/${collection.segment}/Microsoft.Dynamics.CRM.${op.name}\`;\n\n`;
  } else {
    // Unbound
    code += `    ${declaration} url = \`\${baseUrl}/${op.name}\`;\n\n`;
  }
  return code;
}

/**
 * The `toRequestInformation` method of an operation class.
 *
 * @param statements - The statements that build `url` (and `body`).
 * @param method - `POST` for an action, `GET` for a function.
 * @param hasBody - The statements build a `body`.
 */
export function requestInformationMethod(
  statements: string,
  method: "POST" | "GET",
  hasBody = false
): string {
  let code = `  toRequestInformation(baseUrl: string): RequestInformation {\n`;
  code += statements;
  code += `    return {\n`;
  code += `      method: '${method}',\n`;
  code += `      url,\n`;
  code += `      headers: {\n`;
  // An action's content-type is lower-case, like the names the core sends: an explicit header then
  // replaces the core's JSON default instead of being sent next to it under a second casing (#23).
  code +=
    method === "POST"
      ? `        'content-type': 'application/json',\n`
      : `        'Accept': 'application/json',\n`;
  code += `      },\n`;
  if (hasBody) {
    code += `      body,\n`;
  }
  code += `    };\n`;
  code += `  }\n`;
  return code;
}

/**
 * The `toRequestInformation` method of an action, or of an action-backed message: `POST` to the
 * action, with the parameters by their CSDL names in the body, without the undefined ones (#96)
 * and with enum values as member names (#232).
 *
 * @param source - Where the parameter values are read: `this.parameters` (actions package) or
 *   `this.Parameters` (messages).
 */
export function actionRequestMethod(
  csdl: CsdlSchema,
  action: CsdlAction,
  args: readonly OperationArgument[],
  source: string
): string {
  let code = operationUrlStatement(csdl, action, args, "action");
  const { parameters } = splitArguments(args);
  if (parameters.length > 0) {
    const enumTypeOf = (name: string): string | undefined => {
      const csdlType = action.parameters.find((p) => p.name === name)?.type;
      return csdlType ? bodyEnumType(csdl, csdlType) : undefined;
    };
    code += `    const body = ${requestBodyExpression(source, parameters, enumTypeOf)};\n\n`;
  }
  return requestInformationMethod(code, "POST", parameters.length > 0);
}

/**
 * The import lines of an action or action-backed message after the core import: `EntityReference`,
 * the body helpers, the entity payload types and the types the parameters and the return use.
 */
export function actionImports(
  csdl: CsdlSchema,
  action: CsdlAction,
  imports: ParameterImports
): string {
  let code = "";
  if (imports.needsEntityReference) code += ENTITY_REFERENCE_IMPORT;
  if (action.parameters.some((p) => p.name)) {
    code += `import { requestBody } from './${REQUEST_BODY_MODULE}.js';\n`;
  }
  if (action.parameters.some((p) => bodyEnumType(csdl, p.type))) {
    code += `import { enumBody } from './internal/${ENUM_BODY_MODULE}.js';\n`;
  }
  if (imports.payloadTypes.length > 0) {
    code += `import type { ${[...imports.payloadTypes].sort().join(", ")} } from './types/${ENTITY_PAYLOAD_MODULE}.js';\n`;
  }
  code += typeImportLine(imports.typeImports);
  return code;
}

/** The `import type { … } from './types/index.js'` line, sorted, without `EntityReference`. */
export function typeImportLine(types: Iterable<string>): string {
  const sorted = [...new Set(types)].filter((t) => t !== "EntityReference").sort();
  return sorted.length > 0 ? `import type { ${sorted.join(", ")} } from './types/index.js';\n` : "";
}
