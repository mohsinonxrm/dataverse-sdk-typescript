import type {
  CsdlSchema,
  CsdlFunction,
  CsdlParameter as _CsdlParameter,
} from "../parsers/csdl-types.js";
import { resolve, join } from "path";
import {
  csdlTypeToTs,
  csdlTypeToTsWithExpansion,
  toPascalCase as _toPascalCase,
  toCamelCase,
  getEntitySetName,
  isCollectionType,
  extractEntityTypeName,
} from "../utils/typescript-writer.js";
import {
  writeTypeScriptFile,
  generateIndexFile as _generateIndexFile,
  purgeDirectory,
} from "../utils/file-writer.js";

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
 * Generate typed Web API functions.
 *
 * Generates TypeScript classes for all functions (bound and unbound).
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

  // Filter to Microsoft.Dynamics.CRM functions
  const functions = csdl.functions.filter((f) => f.namespace === "Microsoft.Dynamics.CRM");

  if (dryRun) {
    console.log(`  [DRY RUN] Would write to: ${absolutePath}`);
    console.log(`  [DRY RUN] Files: One .ts file per function (alphabetical)`);
    console.log(`  [DRY RUN] Count: ${String(functions.length)} functions`);
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

  // Ensure EntityReference.ts exists in types folder
  await ensureEntityReferenceType(absolutePath);

  const generatedFiles: string[] = [];

  // Generate one file per function
  for (const func of functions) {
    const content = generateFunctionClass(csdl, func);
    const filename = `${func.name}Function.ts`;
    await writeTypeScriptFile(join(absolutePath, filename), content);
    generatedFiles.push(`${func.name}Function`);
    console.log(`  ✅ Generated ${filename}`);
  }

  // Generate index.ts
  const indexContent = generateFunctionsIndex(functions);
  await writeTypeScriptFile(join(absolutePath, "index.ts"), indexContent);
  console.log(`  ✅ Generated index.ts`);

  console.log(`  Total: ${String(functions.length)} function files`);
}

/**
 * Generate TypeScript class for a function.
 */
function generateFunctionClass(csdl: CsdlSchema, func: CsdlFunction): string {
  const className = `${func.name}Function`;
  const responseInterfaceName = `${func.name}Response`;

  // System entities that are filtered out and should be treated as 'any'
  const systemEntities = ["crmbaseentity", "principal", "crmmodelbaseentity", "expando"];

  // Collect all complex type and entity type references used in this file
  const complexTypesUsed = new Set<string>();

  // Check return type
  if (func.returnType) {
    const normalizedReturnType = func.returnType.replace("mscrm.", "Microsoft.Dynamics.CRM.");
    const complexType = csdl.complexTypes.find(
      (ct) => `${ct.namespace}.${ct.name}` === normalizedReturnType
    );

    if (complexType) {
      // Collect types from complex type properties
      for (const prop of complexType.properties) {
        const typeName = csdlTypeToTsWithExpansion(prop.type, csdl);
        // Extract base type name (remove[] suffix if array)
        const baseType = typeName.replace("[]", "");
        // If it's not a primitive type, add it
        if (!["string", "number", "boolean", "any", "unknown"].includes(baseType)) {
          complexTypesUsed.add(baseType);
        }
      }
    } else {
      // Return type might be an entity type or other type not expanded
      const tsType = csdlTypeToTs(func.returnType);
      const baseType = tsType.replace("[]", "");
      if (
        !["string", "number", "boolean", "any", "unknown"].includes(baseType) &&
        !systemEntities.includes(baseType.toLowerCase())
      ) {
        // Map Complex* types to non-Complex EntityType versions
        const mappedType = mapComplexTypeToEntityType(baseType);
        complexTypesUsed.add(mappedType);
      }
    }
  }

  // Check parameters
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  for (const param of func.parameters || []) {
    const typeName = csdlTypeToTs(param.type);
    const baseType = typeName.replace("[]", "");
    if (
      !["string", "number", "boolean", "any", "unknown"].includes(baseType) &&
      baseType !== "EntityReference" &&
      !systemEntities.includes(baseType.toLowerCase())
    ) {
      // Map Complex* types to non-Complex EntityType versions
      const mappedType = mapComplexTypeToEntityType(baseType);
      complexTypesUsed.add(mappedType);
    }
  }

  let code = `import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';\n`;

  // Check if EntityReference is needed (from return type or parameters)
  let needsEntityReference = false;

  // Check return type for EntityReference
  if (func.returnType) {
    const tsType = csdlTypeToTs(func.returnType, false);
    const baseType = tsType.replace("[]", "");
    if (baseType === "EntityReference") {
      needsEntityReference = true;
    }
  }

  // Check parameters for EntityReference (single entity references, not Collections)
  if (!needsEntityReference) {
    needsEntityReference = func.parameters.some(
      (p) => !isCollectionType(p.type) && csdlTypeToTs(p.type, false) === "EntityReference"
    );
  }

  if (needsEntityReference) {
    code += `import type { EntityReference } from './types/EntityReference.js';\n`;
    code += `import { getEntitySetNameFromReference } from './types/EntityReference.js';\n`;
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
  code += generateResponseInterface(csdl, func, responseInterfaceName);
  code += `\n`;

  // Generate function class
  code += `/**\n`;
  code += ` * ${func.name} function\n`;
  code += ` *\n`;
  code += ` * ${func.isBound ? "Bound" : "Unbound"} function\n`;
  if (func.bindingParameter) {
    code += ` * Binding parameter: ${func.bindingParameter.name || "unnamed"} (${func.bindingParameter.type})\n`;
  }
  code += ` */\n`;
  code += `export class ${className} implements Executable<${responseInterfaceName}> {\n`;

  // Generate constructor parameters
  // For bound functions, the binding parameter becomes entityId: string (just the GUID)
  // All other parameters stay as-is
  const constructorParams: Array<{
    name: string;
    type: string;
    tsName: string;
    isBinding: boolean;
  }> = [];

  // Check if binding parameter is a Collection type
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const isCollectionBound =
    func.isBound && func.bindingParameter && isCollectionType(func.bindingParameter.type);

  if (func.isBound && func.bindingParameter && !isCollectionBound) {
    // Single-entity bound: First parameter is the entity ID
    const entityTypeName = extractEntityTypeName(func.bindingParameter.type);
    constructorParams.push({
      name: `${entityTypeName}Id`,
      type: "string",
      tsName: func.bindingParameter.name,
      isBinding: true,
    });
  }

  // Add all non-binding parameters
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  for (const param of func.parameters || []) {
    if (!param.name) continue; // Skip unnamed parameters

    // Skip binding parameter (it's already handled above as entityId)
    if (param.name === func.bindingParameter?.name && !isCollectionBound) {
      continue;
    }

    constructorParams.push({
      name: toCamelCase(param.name),
      type: csdlTypeToTs(param.type, true),
      tsName: param.name,
      isBinding: false,
    });
  }

  if (constructorParams.length > 0) {
    code += `  constructor(\n`;
    for (const param of constructorParams) {
      code += `    public readonly ${param.name}: ${param.type},\n`;
    }
    code += `  ) {}\n\n`;
  }

  // Generate toRequestInformation method
  code += `  toRequestInformation(baseUrl: string): RequestInformation {\n`;

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (func.isBound && func.bindingParameter && !isCollectionBound) {
    // Single-entity bound function - construct URL with entity ID
    const bindingParam = constructorParams.find((p) => p.isBinding);
    if (!bindingParam) {
      throw new Error(`Bound function ${func.name} missing binding parameter`);
    }

    code += `    // Bound function\n`;

    // Get entity set name from binding parameter type
    const entitySetName = getEntitySetName(func.bindingParameter.type, csdl.entitySetMap);

    if (entitySetName) {
      code += `    let url = \`\${baseUrl}/${entitySetName}(\${this.${bindingParam.name}})/Microsoft.Dynamics.CRM.${func.name}\`;\n\n`;
    } else {
      // Fallback: extract entity type name from binding parameter type
      const entityTypeName = extractEntityTypeName(func.bindingParameter.type);
      code += `    // WARNING: Entity set not found in metadata, using entity type name as fallback\n`;
      code += `    let url = \`\${baseUrl}/${entityTypeName}s(\${this.${bindingParam.name}})/Microsoft.Dynamics.CRM.${func.name}\`;\n\n`;
    }

    // Add query parameters for non-binding parameters using parameter aliases
    const queryParams = constructorParams.filter((p) => !p.isBinding);
    if (queryParams.length > 0) {
      code += `    // Build query parameters using parameter aliases\n`;
      code += `    const params = new URLSearchParams();\n`;
      code += `    const aliases: string[] = [];\n`;
      let aliasIndex = 1;
      for (const param of queryParams) {
        const alias = `@p${String(aliasIndex++)}`;
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        const paramDef = func.parameters?.find((p) => p.name === param.tsName);
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        const paramType = paramDef?.type ?? "";

        // Determine parameter type category
        const isEntityRef =
          paramType === "mscrm.crmbaseentity" ||
          csdlTypeToTs(paramType, false) === "EntityReference";
        const isPrimitive = paramType.startsWith("Edm.");
        const isEnum = csdl.enumTypes.some(
          (et) => `${et.namespace}.${et.name}` === paramType || `mscrm.${et.name}` === paramType
        );
        const isComplexType = !isPrimitive && !isEnum && !isEntityRef && paramType.includes(".");

        code += `    if (this.${param.name} !== undefined) {\n`;
        if (isEntityRef) {
          // EntityReference needs special @odata.id handling using helper function
          code += `      aliases.push(\`${param.tsName}=${alias}\`);\n`;
          code += `      params.append('${alias}', JSON.stringify({ '@odata.id': \`\${getEntitySetNameFromReference(this.${param.name})}(\${this.${param.name}.id})\` }));\n`;
        } else if (isComplexType) {
          // Complex types need JSON serialization
          code += `      aliases.push(\`${param.tsName}=${alias}\`);\n`;
          code += `      params.append('${alias}', JSON.stringify(this.${param.name}));\n`;
        } else {
          // Primitives, enums, and other types
          code += `      aliases.push(\`${param.tsName}=${alias}\`);\n`;
          code += `      params.append('${alias}', typeof this.${param.name} === 'string' ? \`'\${this.${param.name}}'\` : String(this.${param.name}));\n`;
        }
        code += `    }\n`;
      }
      code += `    if (aliases.length > 0) {\n`;
      code += `      url += \`(\${aliases.join(',')})?\${params.toString()}\`;\n`;
      code += `    }\n\n`;
    }
  } else {
    // Unbound function
    code += `    let url = \`\${baseUrl}/${func.name}\`;\n\n`;

    // Add query parameters using parameter aliases
    if (constructorParams.length > 0) {
      code += `    // Build query parameters using parameter aliases\n`;
      code += `    const params = new URLSearchParams();\n`;
      code += `    const aliases: string[] = [];\n`;
      let aliasIndex = 1;
      for (const param of constructorParams) {
        const alias = `@p${String(aliasIndex++)}`;
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        const paramDef = func.parameters?.find((p) => p.name === param.tsName);
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        const paramType = paramDef?.type ?? "";

        // Determine parameter type category
        const isEntityRef =
          paramType === "mscrm.crmbaseentity" ||
          csdlTypeToTs(paramType, false) === "EntityReference";
        const isPrimitive = paramType.startsWith("Edm.");
        const isEnum = csdl.enumTypes.some(
          (et) => `${et.namespace}.${et.name}` === paramType || `mscrm.${et.name}` === paramType
        );
        const isComplexType = !isPrimitive && !isEnum && !isEntityRef && paramType.includes(".");

        code += `    if (this.${param.name} !== undefined) {\n`;
        if (isEntityRef) {
          // EntityReference needs special @odata.id handling using helper function
          code += `      aliases.push(\`${param.tsName}=${alias}\`);\n`;
          code += `      params.append('${alias}', JSON.stringify({ '@odata.id': \`\${getEntitySetNameFromReference(this.${param.name})}(\${this.${param.name}.id})\` }));\n`;
        } else if (isComplexType) {
          // Complex types need JSON serialization
          code += `      aliases.push(\`${param.tsName}=${alias}\`);\n`;
          code += `      params.append('${alias}', JSON.stringify(this.${param.name}));\n`;
        } else {
          // Primitives, enums, and other types
          code += `      aliases.push(\`${param.tsName}=${alias}\`);\n`;
          code += `      params.append('${alias}', typeof this.${param.name} === 'string' ? \`'\${this.${param.name}}'\` : String(this.${param.name}));\n`;
        }
        code += `    }\n`;
      }
      code += `    if (aliases.length > 0) {\n`;
      code += `      url += \`(\${aliases.join(',')})?\${params.toString()}\`;\n`;
      code += `    }\n\n`;
    }
  }

  code += `    return {\n`;
  code += `      method: 'GET',\n`;
  code += `      url,\n`;
  code += `      headers: {\n`;
  code += `        'Accept': 'application/json',\n`;
  code += `      },\n`;
  code += `    };\n`;
  code += `  }\n\n`;

  // Generate parseResponse method
  code += `  async parseResponse(response: Response): Promise<${responseInterfaceName}> {\n`;
  code += `    const data = await response.json();\n`;
  code += `    return data as ${responseInterfaceName};\n`;
  code += `  }\n`;

  code += `}\n`;

  return code;
}

/**
 * Generate response interface.
 */
function generateResponseInterface(
  csdl: CsdlSchema,
  func: CsdlFunction,
  interfaceName: string
): string {
  let code = `/**\n`;
  code += ` * Response from ${func.name} function\n`;
  code += ` */\n`;
  code += `export interface ${interfaceName} {\n`;

  if (func.returnType) {
    // Check if return type is a complex type
    // Handle both namespace formats: mscrm.TypeName and Microsoft.Dynamics.CRM.TypeName
    const normalizedReturnType = func.returnType.replace("mscrm.", "Microsoft.Dynamics.CRM.");
    const complexType = csdl.complexTypes.find(
      (ct) => `${ct.namespace}.${ct.name}` === normalizedReturnType
    );

    if (complexType) {
      // Expand complex type properties
      for (const prop of complexType.properties) {
        const tsType = csdlTypeToTsWithExpansion(prop.type, csdl);
        const optional = prop.nullable ? "?" : "";
        code += `  ${prop.name}${optional}: ${tsType};\n`;
      }
    } else {
      // Primitive or collection type
      const tsType = csdlTypeToTs(func.returnType);
      code += `  value: ${tsType};\n`;
    }
  } else {
    code += `  // No value property (returns primitive or collection)\n`;
  }

  code += `}\n`;

  return code;
}

/**
 * Generate index.ts with all exports.
 */
function generateFunctionsIndex(functions: CsdlFunction[]): string {
  const sorted = functions.sort((a, b) => a.name.localeCompare(b.name));

  let code = `/**\n`;
  code += ` * @mohsinonxrm/dataverse-sdk-functions\n`;
  code += ` *\n`;
  code += ` * Auto-generated typed Web API functions.\n`;
  code += ` */\n\n`;

  // Deduplicate by function name
  const seen = new Set<string>();
  for (const func of sorted) {
    if (!seen.has(func.name)) {
      code += `export { ${func.name}Function, type ${func.name}Response } from './${func.name}Function.js';\n`;
      seen.add(func.name);
    }
  }

  // Export EntityReference type
  code += `\nexport { type EntityReference, createEntityReference, getEntitySetNameFromReference } from './types/EntityReference.js';\n`;

  return code;
}

/**
 * Ensure EntityReference.ts exists in the types folder.
 * This type is used by many functions for entity references.
 */
async function ensureEntityReferenceType(outputPath: string): Promise<void> {
  const { mkdir } = await import("fs/promises");
  const typesFolder = join(outputPath, "types");
  const entityRefPath = join(typesFolder, "EntityReference.ts");

  // Create types folder if it doesn't exist
  await mkdir(typesFolder, { recursive: true });

  const entityRefContent = `/**
 * Entity reference type for Dataverse Web API.
 * Used in bound functions and entity lookups.
 */
export interface EntityReference {
  "@odata.type": string;
  id: string;
  logicalName?: string;
  name?: string;
}

/**
 * Convert entity logical name to entity set name (pluralization).
 * Handles common Dataverse entity pluralization rules.
 */
function getEntitySetName(entityLogicalName: string): string {
  // Common irregular plurals in Dataverse
  const irregularPlurals: Record<string, string> = {
    opportunity: "opportunities",
    territory: "territories",
    currency: "currencies",
    activity: "activities",
    businessunit: "businessunits",
    systemuser: "systemusers",
    usersettingscollection: "usersettingscollection",
    principalobjectaccess: "principalobjectaccessset",
  };

  const lowerName = entityLogicalName.toLowerCase();

  // Check for irregular plurals
  if (irregularPlurals[lowerName]) {
    return irregularPlurals[lowerName];
  }

  // Handle entities ending in 'y' (e.g., opportunity -> opportunities)
  if (lowerName.endsWith("y") && lowerName.length > 1 && !"aeiou".includes(lowerName[lowerName.length - 2])) {
    return lowerName.slice(0, -1) + "ies";
  }

  // Handle entities ending in 's', 'x', 'z', 'ch', 'sh' (add 'es')
  if (lowerName.endsWith("s") || lowerName.endsWith("x") || lowerName.endsWith("z") || lowerName.endsWith("ch") || lowerName.endsWith("sh")) {
    return lowerName + "es";
  }

  // Default: add 's'
  return lowerName + "s";
}

/**
 * Create an EntityReference object.
 *
 * @param entityType - Logical entity name (e.g., "account", "contact")
 * @param id - Entity GUID
 * @param name - Optional entity name
 * @returns EntityReference object
 *
 * @example
 * const ref = createEntityReference("account", "abc-123", "Contoso");
 */
export function createEntityReference(
  entityType: string,
  id: string,
  name?: string
): EntityReference {
  return {
    "@odata.type": \`Microsoft.Dynamics.CRM.\${entityType}\`,
    id,
    logicalName: entityType,
    ...(name && { name }),
  };
}

/**
 * Get the entity set name for an EntityReference.
 * Uses smart pluralization logic.
 *
 * @param entityRef - The EntityReference object
 * @returns The entity set name (e.g., "accounts", "opportunities")
 *
 * @example
 * const ref = createEntityReference("account", "abc-123");
 * const entitySet = getEntitySetNameFromReference(ref); // "accounts"
 */
export function getEntitySetNameFromReference(entityRef: EntityReference): string {
  return getEntitySetName(entityRef.logicalName || "");
}
`;

  await writeTypeScriptFile(entityRefPath, entityRefContent);
}
