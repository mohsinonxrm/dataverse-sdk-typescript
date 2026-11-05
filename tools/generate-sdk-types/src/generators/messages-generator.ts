import type {
  CsdlSchema,
  CsdlAction,
  CsdlParameter as _CsdlParameter,
} from "../parsers/csdl-types.js";
import { resolve, join } from "path";
import {
  csdlTypeToTs,
  csdlTypeToTsWithExpansion as _csdlTypeToTsWithExpansion,
  toPascalCase as _toPascalCase,
  toCamelCase,
  getEntitySetName as _getEntitySetName,
  isCollectionType,
  extractEntityTypeName,
} from "../utils/typescript-writer.js";
import { writeTypeScriptFile, purgeDirectory } from "../utils/file-writer.js";
import { polymorphicParameterType } from "../utils/polymorphism.js";
import { collectionBinding, ENTITY_SET_PARAM } from "../utils/binding.js";

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
 * Generate SDK messages from Web API actions.
 *
 * Generates request/response pairs for all Web API actions, providing
 * a C#-familiar IOrganizationService.execute() pattern for TypeScript.
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

  // Get all actions from Microsoft.Dynamics.CRM namespace
  const allActions = csdl.actions.filter((a) => a.namespace === "Microsoft.Dynamics.CRM");

  if (dryRun) {
    console.log(`  [DRY RUN] Would write to: ${absolutePath}`);
    console.log(`  [DRY RUN] Total messages: ${String(allActions.length)}`);
    if (purge) {
      console.log(`  [DRY RUN] Would purge directory first`);
    }
    return;
  }

  // Purge output directory if requested
  if (purge) {
    console.log(`\n  🗑️  Purging ${absolutePath}...`);
    await purgeDirectory(absolutePath, [
      "OrganizationRequest.ts",
      "EntityReference.ts",
      "types.ts",
      "types", // Don't delete the types folder (complex types are generated first)
    ]);
    console.log(`  ✅ Directory purged`);
  }

  // Generate all messages
  console.log(`\n  Generating ${String(allActions.length)} Web API action messages...`);
  for (const action of allActions) {
    const content = generateMessageClass(csdl, action);
    const filename = `${action.name}Message.ts`;
    await writeTypeScriptFile(join(absolutePath, filename), content);
  }

  // Generate index
  const indexContent = generateMessagesIndex(allActions);
  await writeTypeScriptFile(join(absolutePath, "index.ts"), indexContent);
  console.log(`  ✅ Generated index.ts`);

  console.log(`\n  Total: ${String(allActions.length)} messages`);
}

/**
 * Generate TypeScript class for a message (request + response).
 */
function generateMessageClass(csdl: CsdlSchema, action: CsdlAction): string {
  const requestClassName = `${action.name}Request`;
  const responseClassName = `${action.name}Response`;

  // System entities that are filtered out and should be treated as 'any'
  const systemEntities = ["crmbaseentity", "principal", "crmmodelbaseentity", "expando"];

  // Collect all complex type references used in this file
  const complexTypesUsed = new Set<string>();
  let needsEntityReference = false;

  let code = `import { OrganizationRequest, OrganizationResponse } from './OrganizationRequest.js';\n`;
  code += `import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';\n`;

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

  // Check return type for complex types
  if (action.returnType) {
    const returnType = csdlTypeToTs(action.returnType);
    const baseType = returnType.replace("[]", "");
    if (baseType === "EntityReference") {
      needsEntityReference = true;
    } else if (
      !["string", "number", "boolean", "any", "unknown"].includes(baseType) &&
      baseType !== responseClassName && // Exclude if it matches the response class we're generating
      !systemEntities.includes(baseType.toLowerCase())
    ) {
      // Map Complex* types to non-Complex EntityType versions
      const mappedType = mapComplexTypeToEntityType(baseType);
      complexTypesUsed.add(mappedType);
    }
  }

  // Add import for EntityReference if needed
  if (needsEntityReference) {
    code += `import type { EntityReference } from './EntityReference.js';\n`;
  }

  // Import complex types from local types folder (following actions package pattern)
  if (complexTypesUsed.size > 0) {
    const sortedTypes = Array.from(complexTypesUsed).sort();
    code += `import type { ${sortedTypes.join(", ")} } from './types/index.js';\n`;
  }

  code += `\n`;

  // Generate request class
  code += `/**\n`;
  code += ` * ${action.name} request message\n`;
  code += ` *\n`;
  code += ` * Web API Action: ${action.name}\n`;
  // Collection-bound: called on an entity set (#69)
  const collection =
    action.isBound && action.bindingParameter && isCollectionType(action.bindingParameter.type)
      ? collectionBinding(csdl, action.bindingParameter.type)
      : undefined;
  if (collection?.needsEntitySetName) {
    code += ` *\n`;
    code += ` * The first argument is the entity set to call it on, for example "accounts".\n`;
  }
  code += ` */\n`;
  code += `export class ${requestClassName} extends OrganizationRequest implements Executable<${responseClassName}> {\n`;

  // Generate constructor parameters
  // For bound actions, the binding parameter becomes entityId: string (just the GUID)
  // All other parameters stay as-is
  const constructorParams: Array<{
    name: string;
    type: string;
    tsName: string;
    isBinding: boolean;
    nullable: boolean;
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
      name: toCamelCase(param.name),
      type: polymorphicParameterType(csdl, param.type)?.tsType ?? csdlTypeToTs(param.type, true),
      tsName: param.name,
      isBinding: false,
      nullable: param.nullable ?? false,
    });
  }

  code += `  constructor(\n`;
  for (const param of constructorParams) {
    const optional = param.nullable ? "?" : "";
    code += `    public ${param.name}${optional}: ${param.type},\n`;
  }
  code += `  ) {\n`;
  code += `    super('${action.name}');\n`;
  code += `  }\n\n`;

  // Generate toRequestInformation method (for Executable<T> interface)
  code += generateToRequestInformation(csdl, action, constructorParams);
  code += `\n`;

  // Generate parseResponse method (for Executable<T> interface)
  code += generateParseResponse(action, responseClassName);
  code += `\n`;

  // Generate toRequestBody method
  code += `  toRequestBody(): Record<string, unknown> {\n`;
  code += `    return {\n`;
  for (const param of constructorParams) {
    // The entity set of a collection-bound message is part of the URL, not a parameter
    if (param.isBinding && param.name === ENTITY_SET_PARAM) continue;
    if (param.nullable) {
      code += `      ...(this.${param.name} !== undefined && { ${param.tsName}: this.${param.name} }),\n`;
    } else {
      code += `      ${param.tsName}: this.${param.name},\n`;
    }
  }
  code += `    };\n`;
  code += `  }\n`;
  code += `}\n\n`;

  // Generate response class
  code += `/**\n`;
  code += ` * ${action.name} response message\n`;
  code += ` */\n`;
  code += `export class ${responseClassName} extends OrganizationResponse {\n`;

  if (action.returnType) {
    const returnType = csdlTypeToTs(action.returnType);
    code += `  constructor(\n`;
    code += `    public result: ${returnType}\n`;
    code += `  ) {\n`;
    code += `    super('${action.name}');\n`;
    code += `  }\n\n`;
    code += `  static fromResponse(data: unknown): ${responseClassName} {\n`;
    code += `    return new ${responseClassName}((data as any).value);\n`;
    code += `  }\n`;
  } else {
    code += `  constructor() {\n`;
    code += `    super('${action.name}');\n`;
    code += `  }\n\n`;
    code += `  static fromResponse(_data: unknown): ${responseClassName} {\n`;
    code += `    return new ${responseClassName}();\n`;
    code += `  }\n`;
  }

  code += `}\n`;

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

    // Extract entity type name and build entity set name using simple pluralization
    const entityTypeName = extractEntityTypeName(action.bindingParameter.type);
    const entitySetName = `${entityTypeName.toLowerCase()}s`; // Simple pluralization

    code += `    const url = \`\${baseUrl}/${entitySetName}(\${this.${bindingParam.name}})/Microsoft.Dynamics.CRM.${action.name}\`;\n\n`;
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

  // Build request body - exclude binding parameter
  const bodyParams = constructorParams.filter((p) => !p.isBinding);

  if (bodyParams.length > 0) {
    code += `    const body: Record<string, unknown> = {\n`;
    for (const param of bodyParams) {
      if (param.nullable) {
        code += `      ...(this.${param.name} !== undefined && { ${param.tsName}: this.${param.name} }),\n`;
      } else {
        code += `      ${param.tsName}: this.${param.name},\n`;
      }
    }
    code += `    };\n\n`;
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
 * Generate parseResponse method for Executable<T> interface.
 * This is the same logic as in actions-generator.ts.
 */
function generateParseResponse(action: CsdlAction, responseClassName: string): string {
  let code = `  async parseResponse(response: Response): Promise<${responseClassName}> {\n`;

  if (action.returnType) {
    code += `    const data = await response.json();\n`;
    code += `    return ${responseClassName}.fromResponse(data);\n`;
  } else {
    code += `    // No return value (204 No Content)\n`;
    code += `    return new ${responseClassName}();\n`;
  }

  code += `  }\n`;

  return code;
}

/**
 * Generate index.ts for messages.
 */
function generateMessagesIndex(actions: CsdlAction[]): string {
  const sorted = actions.sort((a, b) => a.name.localeCompare(b.name));

  let code = `/**\n`;
  code += ` * Web API Action Messages\n`;
  code += ` *\n`;
  code += ` * Auto-generated TypeScript wrappers for Dataverse Web API actions.\n`;
  code += ` * Use with IOrganizationService.execute() for C#-familiar patterns.\n`;
  code += ` */\n\n`;

  // Export base classes and types
  code += `// Base classes and types\n`;
  code += `export { OrganizationRequest, OrganizationResponse } from './OrganizationRequest.js';\n`;
  code += `export type { EntityReference } from './EntityReference.js';\n`;
  code += `export { createEntityReference } from './EntityReference.js';\n`;
  code += `export type { MessageRequest, MessageResponse } from './types.js';\n\n`;

  // Export all message classes
  code += `// Message classes\n`;

  // Dedupe by action name (handle overloads for bound actions)
  const seen = new Set<string>();
  for (const action of sorted) {
    if (!seen.has(action.name)) {
      code += `export { ${action.name}Request, ${action.name}Response } from './${action.name}Message.js';\n`;
      seen.add(action.name);
    }
  }

  return code;
}
