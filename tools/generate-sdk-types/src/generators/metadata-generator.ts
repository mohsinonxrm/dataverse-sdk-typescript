import type { CsdlSchema, CsdlEntityType, CsdlComplexType } from "../parsers/csdl-types.js";
import { resolve, join } from "path";
import { csdlTypeToTs, toPascalCase as _toPascalCase } from "../utils/typescript-writer.js";
import { writeTypeScriptFile, generateIndexFile, purgeDirectory } from "../utils/file-writer.js";

/**
 * Generate metadata API types.
 *
 * Generates TypeScript types for EntityMetadata, AttributeMetadata, etc.
 *
 * @param csdl - Parsed CSDL schema
 * @param outputPath - Output directory path
 * @param dryRun - If true, preview without writing
 * @param purge - If true, delete existing output before generating
 */
export async function generateMetadataTypes(
  csdl: CsdlSchema,
  outputPath: string,
  dryRun: boolean,
  purge = false
): Promise<void> {
  const absolutePath = resolve(outputPath);

  // Filter to Microsoft.Dynamics.CRM types only - include ALL metadata-related types
  // This includes MetadataEntityTypes (22), all ComplexTypes, and all EnumTypes
  const metadataEntityTypes = csdl.entityTypes.filter(
    (et) =>
      et.namespace === "Microsoft.Dynamics.CRM" &&
      // Include all metadata entity types
      (et.name.endsWith("Metadata") ||
        et.name === "Label" ||
        et.name === "LocalizedLabel" ||
        et.name === "OptionMetadata" ||
        et.name === "BooleanOptionSetMetadata" ||
        et.name === "OptionSetMetadata" ||
        et.name === "crmmodelbaseentity" ||
        et.name === "MetadataBase")
  );

  // For metadata package, include ALL Microsoft.Dynamics.CRM complex types
  // (metadata types reference many other complex types)
  const metadataComplexTypes = csdl.complexTypes.filter(
    (ct) => ct.namespace === "Microsoft.Dynamics.CRM" && !ct.name.endsWith("[]")
  );

  // For metadata package, include ALL Microsoft.Dynamics.CRM enums
  // (complex types reference many enums beyond just metadata-specific ones)
  const metadataEnumTypes = csdl.enumTypes.filter(
    (et) => et.namespace === "Microsoft.Dynamics.CRM"
  );

  if (dryRun) {
    console.log(`  [DRY RUN] Would write to: ${absolutePath}`);
    console.log(`  [DRY RUN] Entity types: ${String(metadataEntityTypes.length)}`);
    console.log(`  [DRY RUN] Complex types: ${String(metadataComplexTypes.length)}`);
    console.log(`  [DRY RUN] Enum types: ${String(metadataEnumTypes.length)}`);
    if (purge) {
      console.log(`  [DRY RUN] Would purge directory first`);
    }
    return;
  }

  // Purge output directory if requested
  if (purge) {
    console.log(`\n  🗑️  Purging ${absolutePath}...`);
    await purgeDirectory(absolutePath);
    console.log(`  ✅ Directory purged`);
  }

  const generatedFiles: string[] = [];

  // Generate entity types
  for (const entityType of metadataEntityTypes) {
    const content = generateEntityTypeInterface(entityType);
    const filename = `${entityType.name}.ts`;
    await writeTypeScriptFile(join(absolutePath, filename), content);
    generatedFiles.push(entityType.name);
  }

  // Generate complex types
  for (const complexType of metadataComplexTypes) {
    const content = generateComplexTypeInterface(complexType);
    const filename = `${complexType.name}.ts`;
    await writeTypeScriptFile(join(absolutePath, filename), content);
    generatedFiles.push(complexType.name);
  }

  // Generate enum types
  for (const enumType of metadataEnumTypes) {
    const content = generateEnumTypeDeclaration(enumType);
    const filename = `${enumType.name}.ts`;
    await writeTypeScriptFile(join(absolutePath, filename), content);
    generatedFiles.push(enumType.name);
  }

  // Generate manual helper files (not in CSDL)
  await generateManualHelperFiles(absolutePath, generatedFiles);

  // Generate index.ts with all files including manual helpers
  const indexContent = generateIndexFile(generatedFiles);
  await writeTypeScriptFile(join(absolutePath, "index.ts"), indexContent);

  console.log(`\n  📊 Summary:`);
  console.log(`  - Entity types: ${String(metadataEntityTypes.length)}`);
  console.log(`  - Complex types: ${String(metadataComplexTypes.length)}`);
  console.log(`  - Enum types: ${String(metadataEnumTypes.length)}`);
  console.log(
    `  - Manual helpers: ${String(generatedFiles.length - metadataEntityTypes.length - metadataComplexTypes.length - metadataEnumTypes.length)}`
  );
  console.log(`  - Total files: ${String(generatedFiles.length)}`);
  console.log(`  ✅ Generated metadata types`);
}

/**
 * Generate TypeScript interface for an entity type.
 */
function generateEntityTypeInterface(entityType: CsdlEntityType): string {
  // Collect all referenced types
  const imports = new Set<string>();

  // Add base type import
  if (entityType.baseType) {
    const baseTypeName = entityType.baseType.split(".").pop();
    if (baseTypeName) imports.add(baseTypeName);
  }

  // Add property type imports
  for (const prop of entityType.properties) {
    const importType = extractImportType(prop.type);
    if (importType) imports.add(importType);
  }

  // Add navigation property imports
  for (const navProp of entityType.navigationProperties) {
    const importType = extractImportType(navProp.type);
    if (importType) imports.add(importType);
  }

  // Generate imports (exclude self-reference)
  let code = "";
  const filteredImports = Array.from(imports)
    .filter((i) => i !== entityType.name)
    .sort();
  if (filteredImports.length > 0) {
    for (const imp of filteredImports) {
      code += `import type { ${imp} } from './${imp}.js';\n`;
    }
    code += "\n";
  }

  code += `/**\n * ${entityType.name}\n`;
  if (entityType.baseType) {
    code += ` * Extends: ${entityType.baseType.split(".").pop() ?? ""}\n`;
  }
  code += ` */\n`;

  // If has base type, extend it
  if (entityType.baseType) {
    const baseTypeName = entityType.baseType.split(".").pop() ?? "";
    code += `export interface ${entityType.name} extends ${baseTypeName} {\n`;
  } else {
    code += `export interface ${entityType.name} {\n`;
  }

  // Add properties
  for (const prop of entityType.properties) {
    const tsType = csdlTypeToTs(prop.type);
    const optional = prop.nullable !== false ? "?" : "";
    code += `  ${prop.name}${optional}: ${tsType};\n`;
  }

  // Add navigation properties as optional references
  for (const navProp of entityType.navigationProperties) {
    const tsType = csdlTypeToTs(navProp.type);
    code += `  ${navProp.name}?: ${tsType};\n`;
  }

  code += `}\n`;

  return code;
}

/**
 * Generate TypeScript interface for a complex type.
 */
function generateComplexTypeInterface(complexType: CsdlComplexType): string {
  // Collect all referenced types
  const imports = new Set<string>();

  // Add base type import
  if (complexType.baseType) {
    const baseTypeName = complexType.baseType.split(".").pop();
    if (baseTypeName) imports.add(baseTypeName);
  }

  // Add property type imports
  for (const prop of complexType.properties) {
    const importType = extractImportType(prop.type);
    if (importType) imports.add(importType);
  }

  // Generate imports (exclude self-reference)
  let code = "";
  const filteredImports = Array.from(imports)
    .filter((i) => i !== complexType.name)
    .sort();
  if (filteredImports.length > 0) {
    for (const imp of filteredImports) {
      code += `import type { ${imp} } from './${imp}.js';\n`;
    }
    code += "\n";
  }

  code += `/**\n * ${complexType.name}\n`;
  if (complexType.baseType) {
    code += ` * Extends: ${complexType.baseType.split(".").pop() ?? ""}\n`;
  }
  code += ` */\n`;

  // If has base type, extend it
  if (complexType.baseType) {
    const baseTypeName = complexType.baseType.split(".").pop() ?? "";
    code += `export interface ${complexType.name} extends ${baseTypeName} {\n`;
  } else {
    code += `export interface ${complexType.name} {\n`;
  }

  // Add properties
  for (const prop of complexType.properties) {
    const tsType = csdlTypeToTs(prop.type);
    const optional = prop.nullable !== false ? "?" : "";
    code += `  ${prop.name}${optional}: ${tsType};\n`;
  }

  code += `}\n`;

  return code;
}

/**
 * Generate TypeScript enum declaration from a CSDL enum type.
 */
function generateEnumTypeDeclaration(enumType: {
  name: string;
  members: Array<{ name: string; value: number }>;
}): string {
  let code = `/**\n * ${enumType.name}\n */\n`;
  code += `export enum ${enumType.name} {\n`;

  for (const member of enumType.members) {
    code += `  ${member.name} = ${String(member.value)},\n`;
  }

  code += `}\n`;
  return code;
}

/**
 * Extract import type from CSDL type string.
 * Returns the type name if it's a complex type reference.
 * Handles array types by stripping [] suffix for import path.
 */
function extractImportType(csdlType: string): string | null {
  // Handle Collection(Type)
  if (csdlType.startsWith("Collection(")) {
    const innerType = csdlType.slice(11, -1);
    return extractImportType(innerType);
  }

  // Handle Edm.* primitive types - no import needed
  if (csdlType.startsWith("Edm.")) {
    return null;
  }

  // Handle qualified type names (Microsoft.Dynamics.CRM.TypeName)
  if (csdlType.includes(".")) {
    const typeName = csdlType.split(".").pop() ?? null;
    // Strip array suffix from type name for import path
    // E.g., "Collection_String_String[]" → "Collection_String_String"
    return typeName ? typeName.replace("[]", "") : null;
  }

  return null;
}

/**
 * Generate manual helper files that don't exist in CSDL.
 * These are type aliases, base types, and parameter interfaces needed by MetadataClient.
 */
async function generateManualHelperFiles(
  outputPath: string,
  generatedFiles: string[]
): Promise<void> {
  // 1. RelationshipMetadataBase - base type not in CSDL
  const relationshipBase = `import type { MetadataBase } from "./MetadataBase.js";

/**
 * RelationshipMetadataBase - base interface for relationship metadata
 * (Not present in CSDL - manually maintained)
 */
export interface RelationshipMetadataBase extends MetadataBase {
  IsCustomRelationship?: boolean;
  IsCustomizable?: { Value: boolean; CanBeChanged: boolean };
  IsManaged?: boolean;
  IsValidForAdvancedFind?: boolean;
  SchemaName?: string;
  SecurityTypes?: string;
  RelationshipType?: string;
  IntroducedVersion?: string;
}
`;
  await writeTypeScriptFile(join(outputPath, "RelationshipMetadataBase.ts"), relationshipBase);
  generatedFiles.push("RelationshipMetadataBase");

  // 2. OptionSetMetadataBase - base type not in CSDL
  const optionSetBase = `import type { MetadataBase } from "./MetadataBase.js";

/**
 * OptionSetMetadataBase - base interface for option set metadata
 * (Not present in CSDL - manually maintained)
 */
export interface OptionSetMetadataBase extends MetadataBase {
  Description?: { LocalizedLabels?: Array<{ Label?: string; LanguageCode?: number }> };
  DisplayName?: { LocalizedLabels?: Array<{ Label?: string; LanguageCode?: number }> };
  IsCustomOptionSet?: boolean;
  IsCustomizable?: { Value: boolean };
  IsGlobal?: boolean;
  IsManaged?: boolean;
  Name?: string;
  OptionSetType?: number;
  IntroducedVersion?: string;
  ExternalTypeName?: string;
}
`;
  await writeTypeScriptFile(join(outputPath, "OptionSetMetadataBase.ts"), optionSetBase);
  generatedFiles.push("OptionSetMetadataBase");

  // 3. metadata-params.ts - Parameter interfaces for actions
  const metadataParams = `import type { Label } from "./Label.js";

/**
 * Parameters for InsertOptionValue action
 */
export interface InsertOptionValueParams {
  EntityLogicalName?: string;
  AttributeLogicalName?: string;
  Label: Label;
  Value?: number;
  SolutionUniqueName?: string;
}

/**
 * Parameters for UpdateOptionValue action
 */
export interface UpdateOptionValueParams {
  EntityLogicalName?: string;
  AttributeLogicalName?: string;
  Value: number;
  Label?: Label;
  Description?: Label;
  MergeLabels?: boolean;
}

/**
 * Parameters for DeleteOptionValue action
 */
export interface DeleteOptionValueParams {
  EntityLogicalName?: string;
  AttributeLogicalName?: string;
  Value: number;
}

/**
 * Parameters for OrderOption action
 */
export interface OrderOptionParams {
  EntityLogicalName: string;
  AttributeLogicalName: string;
  Values: number[];
  SolutionUniqueName?: string;
}

/**
 * Parameters for InsertStatusValue action
 */
export interface InsertStatusValueParams {
  EntityLogicalName: string;
  AttributeLogicalName: string;
  Label: Label;
  StateCode: number;
  Value?: number;
  SolutionUniqueName?: string;
}

/**
 * Parameters for CreateCustomerRelationships action
 */
export interface CreateCustomerRelationshipsParams {
  Lookup: { SchemaName: string };
  OneToManyRelationships: Array<{
    ReferencedEntity: string;
    ReferencingEntity: string;
    SchemaName: string;
  }>;
}

/**
 * Parameters for CreatePolymorphicLookupAttribute action
 */
export interface CreatePolymorphicLookupAttributeParams {
  Lookup: {
    SchemaName: string;
    DisplayName: Label;
    Description?: Label;
  };
  OneToManyRelationships: Array<{
    ReferencedEntity: string;
    ReferencingEntity: string;
    SchemaName: string;
  }>;
  SolutionUniqueName?: string;
}
`;
  await writeTypeScriptFile(join(outputPath, "metadata-params.ts"), metadataParams);
  generatedFiles.push("metadata-params");

  // 4-8. Type aliases for Create/Update operations
  // Note: Per Microsoft Web API documentation, use EntityType versions (not Complex) for POST/PUT
  // ComplexLookupAttributeMetadata is the ONLY exception for customer lookup columns
  const typeAliases = [
    {
      name: "EntityMetadataCreate",
      content: `import type { EntityMetadata } from "./EntityMetadata.js";

/**
 * EntityMetadataCreate - type for creating a new entity
 * Uses EntityMetadata (per Microsoft Web API documentation)
 */
export type EntityMetadataCreate = EntityMetadata;
`,
    },
    {
      name: "EntityMetadataUpdate",
      content: `import type { EntityMetadata } from "./EntityMetadata.js";

/**
 * EntityMetadataUpdate - type for updating an entity
 * Uses EntityMetadata (per Microsoft Web API documentation)
 */
export type EntityMetadataUpdate = EntityMetadata;
`,
    },
    {
      name: "AttributeMetadataCreateTypes",
      content: `import type { AttributeMetadata } from "./AttributeMetadata.js";
import type { BigIntAttributeMetadata } from "./BigIntAttributeMetadata.js";
import type { BooleanAttributeMetadata } from "./BooleanAttributeMetadata.js";
import type { DateTimeAttributeMetadata } from "./DateTimeAttributeMetadata.js";
import type { DecimalAttributeMetadata } from "./DecimalAttributeMetadata.js";
import type { DoubleAttributeMetadata } from "./DoubleAttributeMetadata.js";
import type { IntegerAttributeMetadata } from "./IntegerAttributeMetadata.js";
import type { LookupAttributeMetadata } from "./LookupAttributeMetadata.js";
import type { ComplexLookupAttributeMetadata } from "./ComplexLookupAttributeMetadata.js";
import type { MemoAttributeMetadata } from "./MemoAttributeMetadata.js";
import type { MoneyAttributeMetadata } from "./MoneyAttributeMetadata.js";
import type { StringAttributeMetadata } from "./StringAttributeMetadata.js";
import type { FileAttributeMetadata } from "./FileAttributeMetadata.js";
import type { ImageAttributeMetadata } from "./ImageAttributeMetadata.js";
import type { EnumAttributeMetadata } from "./EnumAttributeMetadata.js";
import type { PicklistAttributeMetadata } from "./PicklistAttributeMetadata.js";
import type { ManagedPropertyAttributeMetadata } from "./ManagedPropertyAttributeMetadata.js";
import type { UniqueIdentifierAttributeMetadata } from "./UniqueIdentifierAttributeMetadata.js";

/**
 * AttributeMetadataCreateTypes - union of all attribute create types
 * Uses EntityType versions per Microsoft Web API documentation
 * Exception: ComplexLookupAttributeMetadata for customer lookup columns
 */
export type AttributeMetadataCreateTypes =
  | AttributeMetadata
  | BigIntAttributeMetadata
  | BooleanAttributeMetadata
  | DateTimeAttributeMetadata
  | DecimalAttributeMetadata
  | DoubleAttributeMetadata
  | IntegerAttributeMetadata
  | LookupAttributeMetadata
  | ComplexLookupAttributeMetadata
  | MemoAttributeMetadata
  | MoneyAttributeMetadata
  | StringAttributeMetadata
  | FileAttributeMetadata
  | ImageAttributeMetadata
  | EnumAttributeMetadata
  | PicklistAttributeMetadata
  | ManagedPropertyAttributeMetadata
  | UniqueIdentifierAttributeMetadata;
`,
    },
    {
      name: "OneToManyRelationshipMetadataCreate",
      content: `import type { OneToManyRelationshipMetadata } from "./OneToManyRelationshipMetadata.js";

/**
 * OneToManyRelationshipMetadataCreate - type for creating a 1:N relationship
 * Uses OneToManyRelationshipMetadata (per Microsoft Web API documentation)
 */
export type OneToManyRelationshipMetadataCreate = OneToManyRelationshipMetadata;
`,
    },
    {
      name: "OneToManyRelationshipMetadataUpdate",
      content: `import type { OneToManyRelationshipMetadata } from "./OneToManyRelationshipMetadata.js";

/**
 * OneToManyRelationshipMetadataUpdate - type for updating a 1:N relationship
 * Uses OneToManyRelationshipMetadata (per Microsoft Web API documentation)
 */
export type OneToManyRelationshipMetadataUpdate = OneToManyRelationshipMetadata;
`,
    },
    {
      name: "ManyToManyRelationshipMetadataCreate",
      content: `import type { ManyToManyRelationshipMetadata } from "./ManyToManyRelationshipMetadata.js";

/**
 * ManyToManyRelationshipMetadataCreate - type for creating an N:N relationship
 * Uses ManyToManyRelationshipMetadata (per Microsoft Web API documentation)
 */
export type ManyToManyRelationshipMetadataCreate = ManyToManyRelationshipMetadata;
`,
    },
    {
      name: "ManyToManyRelationshipMetadataUpdate",
      content: `import type { ManyToManyRelationshipMetadata } from "./ManyToManyRelationshipMetadata.js";

/**
 * ManyToManyRelationshipMetadataUpdate - type for updating an N:N relationship
 * Uses ManyToManyRelationshipMetadata (per Microsoft Web API documentation)
 */
export type ManyToManyRelationshipMetadataUpdate = ManyToManyRelationshipMetadata;
`,
    },
    {
      name: "OptionSetMetadataCreate",
      content: `import type { OptionSetMetadata } from "./OptionSetMetadata.js";

/**
 * OptionSetMetadataCreate - type for creating an option set
 * Uses OptionSetMetadata (per Microsoft Web API documentation)
 */
export type OptionSetMetadataCreate = OptionSetMetadata;
`,
    },
  ];

  for (const alias of typeAliases) {
    await writeTypeScriptFile(join(outputPath, `${alias.name}.ts`), alias.content);
    generatedFiles.push(alias.name);
  }
}
