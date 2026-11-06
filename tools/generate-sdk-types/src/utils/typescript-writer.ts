/**
 * TypeScript code generation helpers.
 */

/**
 * Convert CSDL type name to TypeScript type.
 *
 * @param csdlType - CSDL type (e.g., "Edm.String", "Microsoft.Dynamics.CRM.Entity")
 * @param isParameter - Whether this is a parameter type (affects Collection(crmbaseentity) handling)
 * @returns TypeScript type
 */
export function csdlTypeToTs(csdlType: string, isParameter = false): string {
  // System entities that should be mapped to EntityReference for single references
  const systemEntities = ["crmbaseentity", "principal", "crmmodelbaseentity", "expando"];

  // Handle Edm primitive types
  if (csdlType.startsWith("Edm.")) {
    const edmType = csdlType.substring(4);
    switch (edmType) {
      case "String":
        return "string";
      case "Int16":
      case "Int32":
      case "Int64":
      case "Decimal":
      case "Double":
        return "number";
      case "Boolean":
        return "boolean";
      case "Guid":
        return "string";
      case "DateTimeOffset":
        return "string"; // ISO 8601 date string
      case "Binary":
        return "string"; // Base64 encoded
      default:
        return "unknown";
    }
  }

  // Handle collection types
  if (csdlType.startsWith("Collection(")) {
    const innerType = csdlType.substring(11, csdlType.length - 1);
    const innerTypeName = extractEntityTypeName(innerType);

    // For Collection(crmbaseentity) in parameters, use Record<string, unknown>[]
    // This is for CreateMultiple, UpdateMultiple, etc. where we need full entity data
    if (isParameter && systemEntities.includes(innerTypeName.toLowerCase())) {
      return "Record<string, unknown>[]";
    }

    return `${csdlTypeToTs(innerType, isParameter)}[]`;
  }

  // Handle complex/entity types - extract just the type name
  // For complex types like "Microsoft.Dynamics.CRM.WhoAmIResponse" or "mscrm.WhoAmIResponse"
  // Return just "WhoAmIResponse" as a type reference
  if (csdlType.includes(".")) {
    const parts = csdlType.split(".");
    const typeName = parts[parts.length - 1]; // Extract just the type name

    // Map system entities to EntityReference (for single entity references)
    if (systemEntities.includes(typeName.toLowerCase())) {
      return "EntityReference";
    }

    return typeName;
  }

  // Fallback for any unrecognized type
  return "unknown";
}

/**
 * Convert CSDL type to TypeScript with inline expansion for complex types.
 * Used for response interface generation where we want to inline complex type properties.
 *
 * @param csdlType - CSDL type
 * @param csdlSchema - Schema containing complex type definitions
 * @param depth - Current recursion depth (to prevent infinite loops)
 * @returns TypeScript type or inline object
 */
export function csdlTypeToTsWithExpansion(
  csdlType: string,
  csdlSchema: {
    complexTypes: Array<{
      name: string;
      namespace: string;
      properties: Array<{ name: string; type: string; nullable?: boolean }>;
    }>;
  },
  depth = 0
): string {
  // Prevent infinite recursion
  if (depth > 3) {
    return "any";
  }

  // Handle Edm primitive types
  if (csdlType.startsWith("Edm.")) {
    return csdlTypeToTs(csdlType);
  }

  // Handle collection types
  if (csdlType.startsWith("Collection(")) {
    const innerType = csdlType.substring(11, csdlType.length - 1);
    return `${csdlTypeToTsWithExpansion(innerType, csdlSchema, depth + 1)}[]`;
  }

  // Handle complex types - try to expand them
  const normalizedType = csdlType.replace("mscrm.", "Microsoft.Dynamics.CRM.");
  const complexType = csdlSchema.complexTypes.find(
    (ct) => `${ct.namespace}.${ct.name}` === normalizedType
  );

  if (complexType) {
    // For now, just return the type name as a reference
    // In the future, we could inline the properties
    return complexType.name;
  }

  // For entity types or unrecognized types, return just the name
  return csdlTypeToTs(csdlType);
}

/**
 * Convert a name to PascalCase.
 *
 * @param name - Name to convert
 * @returns PascalCase name
 */
export function toPascalCase(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

/**
 * Convert a name to camelCase.
 *
 * @param name - Name to convert
 * @returns camelCase name
 */
export function toCamelCase(name: string): string {
  return name.charAt(0).toLowerCase() + name.slice(1);
}

/**
 * Generate JSDoc comment.
 *
 * @param description - Description text
 * @param params - Parameter descriptions
 * @param returns - Return description
 * @returns JSDoc comment string
 */
export function generateJsDoc(
  description: string,
  params?: Array<{ name: string; type: string; description: string }>,
  returns?: string
): string {
  let doc = "/**\n";
  doc += ` * ${description}\n`;

  if (params && params.length > 0) {
    doc += " *\n";
    for (const param of params) {
      doc += ` * @param ${param.name} - ${param.description}\n`;
    }
  }

  if (returns) {
    doc += " *\n";
    doc += ` * @returns ${returns}\n`;
  }

  doc += " */";
  return doc;
}

/**
 * Check if a type is a Collection type.
 *
 * @param type - CSDL type string
 * @returns True if type is Collection(...)
 */
export function isCollectionType(type: string): boolean {
  return type.startsWith("Collection(");
}

/**
 * Extract inner type from Collection(...).
 *
 * @param type - Collection type string
 * @returns Inner type or original if not a collection
 */
export function extractCollectionType(type: string): string {
  if (type.startsWith("Collection(")) {
    return type.substring(11, type.length - 1);
  }
  return type;
}

/**
 * Extract entity type name from full type, handling Collection wrappers.
 *
 * @param type - Full type (e.g., "Microsoft.Dynamics.CRM.workflow" or "Collection(Microsoft.Dynamics.CRM.account)")
 * @returns Entity type name (e.g., "workflow", "account")
 */
export function extractEntityTypeName(type: string): string {
  // Remove Collection wrapper if present
  const cleanType = extractCollectionType(type);

  // Extract type name from namespace
  const parts = cleanType.split(".");
  return parts[parts.length - 1] || "entity";
}

/**
 * Get entity set name from binding parameter type.
 *
 * @param bindingParameterType - Full type from binding parameter (e.g., "Microsoft.Dynamics.CRM.workflow")
 * @param entitySetMap - Map of entity type names to entity set names
 * @returns Entity set name or undefined if not found
 */
export function getEntitySetName(
  bindingParameterType: string,
  entitySetMap: Map<string, string>
): string | undefined {
  // Extract entity type name, handling Collection types
  const entityTypeName = extractEntityTypeName(bindingParameterType);

  if (!entityTypeName) {
    return undefined;
  }

  // Look up in entity set map (case-insensitive)
  return entitySetMap.get(entityTypeName.toLowerCase());
}

/**
 * Constructor parameter lines. Optional arguments must come last: an optional parameter followed
 * by a required one stays positional but accepts `undefined`. Either way `undefined` is left out
 * of the JSON body.
 */
export function constructorParameterList(
  params: ReadonlyArray<{ name: string; type: string; optional?: boolean }>,
  modifier: string
): string {
  let code = "";
  params.forEach((param, i) => {
    const trailing = params.slice(i).every((p) => p.optional === true);
    if (param.optional && trailing) {
      code += `    ${modifier} ${param.name}?: ${param.type},\n`;
    } else if (param.optional) {
      code += `    ${modifier} ${param.name}: ${param.type} | undefined,\n`;
    } else {
      code += `    ${modifier} ${param.name}: ${param.type},\n`;
    }
  });
  return code;
}
