import type {
  CsdlSchema,
  CsdlComplexType,
  CsdlEntityType,
  CsdlEnumType,
} from "../parsers/csdl-types.js";
import { resolve, join } from "path";
import { csdlTypeToTs, toPascalCase as _toPascalCase } from "../utils/typescript-writer.js";
import { writeTypeScriptFile, purgeDirectory } from "../utils/file-writer.js";

/**
 * Generate TypeScript interfaces for all complex types, entity types, AND enums from CSDL.
 * These types are needed when they're referenced as parameters or return types.
 *
 * @param csdl - Parsed CSDL schema
 * @param outputPath - Output directory path
 * @param purge - If true, delete existing output before generating
 */
export async function generateComplexTypes(
  csdl: CsdlSchema,
  outputPath: string,
  purge = false
): Promise<void> {
  const absolutePath = resolve(outputPath);

  // Filter to Microsoft.Dynamics.CRM types and exclude system entities
  // Case-sensitive conflicts: entity types that collide with complex/enum types on case-insensitive filesystems
  // Format: { entityName: conflictingTypeName }
  const caseConflicts: Record<string, string> = {
    solution: "Solution",
    serviceplan: "ServicePlan",
    relationshipattribute: "RelationshipAttribute",
  };

  const systemEntities = ["crmbaseentity", "principal", "crmmodelbaseentity", "expando"];
  const complexTypes = csdl.complexTypes.filter(
    (ct) => ct.namespace === "Microsoft.Dynamics.CRM" && !ct.name.endsWith("[]")
  );
  const entityTypes = csdl.entityTypes.filter(
    (et) =>
      et.namespace === "Microsoft.Dynamics.CRM" && !systemEntities.includes(et.name.toLowerCase())
  );
  const enumTypes = csdl.enumTypes.filter((et) => et.namespace === "Microsoft.Dynamics.CRM");

  // Build a map of existing type names (case-insensitive) from complex types and enums
  const existingTypeNames = new Set<string>();
  for (const ct of complexTypes) {
    existingTypeNames.add(ct.name.toLowerCase());
  }
  for (const et of enumTypes) {
    existingTypeNames.add(et.name.toLowerCase());
  }

  console.log(`📝 Generating complex types, entity types, and enums...`);

  // Purge output directory if requested
  if (purge) {
    console.log(`\n  🗑️  Purging ${absolutePath}...`);
    await purgeDirectory(absolutePath);
    console.log(`  ✅ Directory purged`);
  }

  // Generate one file per complex type
  for (const complexType of complexTypes) {
    const content = generateComplexTypeInterface(complexType);
    const filename = `${complexType.name}.ts`;
    await writeTypeScriptFile(join(absolutePath, filename), content);
  }

  // Generate one file per entity type (with conflict resolution)
  const entityTypeMetadata: Array<{ type: CsdlEntityType; filename: string }> = [];
  for (const entityType of entityTypes) {
    const content = generateEntityTypeInterface(entityType);
    let filename = `${entityType.name}.ts`;

    // Check for case conflicts on case-insensitive filesystems
    if (
      existingTypeNames.has(entityType.name.toLowerCase()) &&
      entityType.name.toLowerCase() in caseConflicts
    ) {
      // Suffix with _entity to avoid collision
      filename = `${entityType.name}_entity.ts`;
    }

    await writeTypeScriptFile(join(absolutePath, filename), content);
    entityTypeMetadata.push({ type: entityType, filename: filename.replace(".ts", "") });
  }

  // Generate one file per enum type
  for (const enumType of enumTypes) {
    const content = generateEnumTypeDefinition(enumType);
    const filename = `${enumType.name}.ts`;
    await writeTypeScriptFile(join(absolutePath, filename), content);
  }

  // Generate index.ts that exports all types with correct filenames
  const indexContent = generateIndexFile(
    complexTypes.map((ct) => ({ name: ct.name, filename: ct.name })),
    enumTypes.map((et) => ({ name: et.name, filename: et.name })),
    entityTypeMetadata.map((et) => ({ name: et.type.name, filename: et.filename }))
  );
  await writeTypeScriptFile(join(absolutePath, "index.ts"), indexContent);

  console.log(`  ✅ Generated ${String(complexTypes.length)} complex type files`);
  console.log(`  ✅ Generated ${String(entityTypes.length)} entity type files`);
  console.log(`  ✅ Generated ${String(enumTypes.length)} enum type files`);
  console.log(`  ✅ Generated index.ts`);
}

/**
 * Generate TypeScript interface for a complex type.
 */
function generateComplexTypeInterface(complexType: CsdlComplexType): string {
  const safeName = makeCodeSafe(complexType.name);

  // Collect complex types used by this complex type
  const importsNeeded = new Set<string>();
  for (const prop of complexType.properties) {
    const tsType = csdlTypeToTs(prop.type);
    // Extract base type if it's an array
    const baseType = tsType.replace("[]", "");

    // If it's not a primitive type and not a system entity, it's a complex type that needs to be imported
    if (
      !["string", "number", "boolean", "any", "unknown"].includes(baseType) &&
      baseType !== safeName
    ) {
      importsNeeded.add(baseType);
    }
  }

  let code = "";

  // Add imports if needed
  if (importsNeeded.size > 0) {
    for (const typeName of Array.from(importsNeeded).sort()) {
      // Use escaped name for the import identifier
      const safeTypeName = makeCodeSafe(typeName);
      code += `import type { ${safeTypeName} } from './${typeName}.js';\n`;
    }
    code += `\n`;
  }

  code += `/**\n`;
  code += ` * ${complexType.name} complex type\n`;
  code += ` */\n`;
  code += `export interface ${safeName} {\n`;

  if (complexType.properties.length === 0) {
    code += `  // No properties defined\n`;
  } else {
    for (const prop of complexType.properties) {
      let tsType = csdlTypeToTs(prop.type);
      // Apply makeCodeSafe to non-primitive types (handles reserved words)
      const baseType = tsType.replace("[]", "");
      if (!["string", "number", "boolean", "any", "unknown"].includes(baseType)) {
        const safeName = makeCodeSafe(baseType);
        tsType = tsType.endsWith("[]") ? `${safeName}[]` : safeName;
      }
      const optional = prop.nullable ? "?" : "";
      code += `  ${prop.name}${optional}: ${tsType};\n`;
    }
  }

  code += `}\n`;

  return code;
}

/**
 * Generate TypeScript interface for an entity type.
 */
function generateEntityTypeInterface(entityType: CsdlEntityType): string {
  const safeName = makeCodeSafe(entityType.name);

  // Collect complex types used by this entity
  const importsNeeded = new Set<string>();
  for (const prop of entityType.properties) {
    const tsType = csdlTypeToTs(prop.type);
    // Extract base type if it's an array
    const baseType = tsType.replace("[]", "");

    // If it's not a primitive type and not a system entity, it's a complex type that needs to be imported
    if (!["string", "number", "boolean", "any", "unknown"].includes(baseType)) {
      importsNeeded.add(baseType);
    }
  }

  let code = "";

  // Add imports if needed
  if (importsNeeded.size > 0) {
    for (const typeName of Array.from(importsNeeded).sort()) {
      // Use escaped name for the import identifier
      const safeTypeName = makeCodeSafe(typeName);
      code += `import type { ${safeTypeName} } from './${typeName}.js';\n`;
    }
    code += `\n`;
  }

  code += `/**\n`;
  code += ` * ${entityType.name} entity type\n`;
  code += ` */\n`;
  code += `export interface ${safeName} {\n`;

  if (entityType.properties.length === 0) {
    code += `  // No properties defined\n`;
  } else {
    for (const prop of entityType.properties) {
      let tsType = csdlTypeToTs(prop.type);
      // Apply makeCodeSafe to non-primitive types (handles reserved words)
      const baseType = tsType.replace("[]", "");
      if (!["string", "number", "boolean", "any", "unknown"].includes(baseType)) {
        const safeName = makeCodeSafe(baseType);
        tsType = tsType.endsWith("[]") ? `${safeName}[]` : safeName;
      }
      const optional = prop.nullable ? "?" : "";
      code += `  ${prop.name}${optional}: ${tsType};\n`;
    }
  }

  code += `}\n`;

  return code;
}

/**
 * Generate TypeScript enum for an enum type.
 */
function generateEnumTypeDefinition(enumType: CsdlEnumType): string {
  let code = `/**\n`;
  code += ` * ${enumType.name} enum\n`;
  code += ` */\n`;
  code += `export enum ${enumType.name} {\n`;

  for (const member of enumType.members) {
    code += `  ${member.name} = ${String(member.value)},\n`;
  }

  code += `}\n`;

  return code;
}

/**
 * Make a name code-safe (handle reserved words and special characters).
 */
function makeCodeSafe(name: string): string {
  // Reserved TypeScript/JavaScript keywords that need escaping
  const reservedWords = [
    "import",
    "export",
    "default",
    "class",
    "interface",
    "enum",
    "type",
    "const",
    "let",
    "var",
    "function",
    "return",
    "if",
    "else",
    "switch",
    "case",
    "break",
    "continue",
    "for",
    "while",
    "do",
    "try",
    "catch",
    "finally",
    "throw",
    "new",
    "this",
    "super",
    "extends",
    "implements",
    "package",
  ];

  // If it's a reserved word, prefix with underscore
  if (reservedWords.includes(name.toLowerCase())) {
    return `_${name}`;
  }

  return name;
}

/**
 * Generate index.ts that exports all types (complex + entity + enum).
 */
function generateIndexFile(
  complexTypes: Array<{ name: string; filename: string }>,
  enumTypes: Array<{ name: string; filename: string }>,
  entityTypes: Array<{ name: string; filename: string }>
): string {
  // Combine all types
  const allTypes = [...complexTypes, ...enumTypes, ...entityTypes];

  // Deduplicate by name (case-insensitive) - keep first occurrence
  // Also filter out array types (names ending with [])
  const seen = new Map<string, { name: string; filename: string }>();

  for (const type of allTypes) {
    const lowerName = type.name.toLowerCase();
    // Skip array types and duplicates
    if (!type.name.endsWith("[]") && !seen.has(lowerName)) {
      seen.set(lowerName, type);
    }
  }

  const deduplicated = Array.from(seen.values());
  const sorted = deduplicated.sort((a, b) => a.name.localeCompare(b.name));

  let code = `/**\n`;
  code += ` * Type definitions from Dataverse CSDL (Complex Types + Entity Types + Enums)\n`;
  code += ` * Auto-generated - do not modify manually\n`;
  code += ` */\n\n`;

  for (const type of sorted) {
    const safeName = makeCodeSafe(type.name);
    // When the safe name differs, the file exports safeName, not the original name
    // So we should export { safeName } without alias if they match,
    // or export { safeName } as well if they differ
    // Use the filename from metadata (may have _entity suffix for conflicts)
    if (safeName !== type.name) {
      // File exports safeName (escaped), we just export it as-is
      code += `export type { ${safeName} } from './${type.filename}.js';\n`;
    } else {
      code += `export type { ${type.name} } from './${type.filename}.js';\n`;
    }
  }

  return code;
}
