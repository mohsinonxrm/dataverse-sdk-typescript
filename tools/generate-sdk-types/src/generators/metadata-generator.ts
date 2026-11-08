import type { CsdlSchema, CsdlEntityType, CsdlComplexType } from "../parsers/csdl-types.js";
import { resolve, join } from "path";
import { csdlTypeToTs, toPascalCase as _toPascalCase } from "../utils/typescript-writer.js";
import { writeTypeScriptFile, generateIndexFile, purgeDirectory } from "../utils/file-writer.js";
import { METADATA_HELPER_FILES } from "./metadata-helpers.js";

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

  // The metadata types (#385): the metadata entity types, the types the hand-written helpers and
  // the metadata operations MetadataClient calls use, and every type those reference or that
  // derives from them. Not every Microsoft.Dynamics.CRM complex type: most of those are other
  // messages' responses, which the actions, functions and messages packages have.
  const included = metadataTypeNames(csdl);
  const metadataEntityTypes = csdl.entityTypes.filter(
    (et) => et.namespace === CRM && included.has(et.name)
  );
  const metadataComplexTypes = csdl.complexTypes.filter(
    (ct) => ct.namespace === CRM && included.has(ct.name)
  );
  const metadataEnumTypes = csdl.enumTypes.filter(
    (et) => et.namespace === CRM && included.has(et.name)
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

const CRM = "Microsoft.Dynamics.CRM";

/**
 * The metadata operations `MetadataClient` calls. Their parameter and return types are part of the
 * package (#385); other operations' types are in the actions, functions and messages packages.
 */
export const METADATA_OPERATIONS: readonly string[] = [
  "CanBeReferenced",
  "CanBeReferencing",
  "CanManyToMany",
  "CreateCustomerRelationships",
  "CreatePolymorphicLookupAttribute",
  "DeleteOptionValue",
  "GetValidManyToMany",
  "GetValidReferencedEntities",
  "GetValidReferencingEntities",
  "InsertOptionValue",
  "InsertStatusValue",
  "OrderOption",
  "RetrieveMetadataChanges",
  "UpdateOptionValue",
];

/** Whether an entity type is a metadata type (`EntityMetadata`, `Label`, ...), not a table. */
function isMetadataEntityType(name: string): boolean {
  return (
    name.endsWith("Metadata") ||
    ["Label", "LocalizedLabel", "crmmodelbaseentity", "MetadataBase"].includes(name)
  );
}

/** The type a CSDL type reference names, without `Collection(...)` and the namespace. */
function referencedName(type: string): string | undefined {
  const inner = type.startsWith("Collection(") ? type.slice("Collection(".length, -1) : type;
  return inner.startsWith("Edm.") ? undefined : inner.split(".").pop();
}

/**
 * The names of the types the metadata package generates (#385). It starts from the metadata
 * entity types, the types the hand-written helpers import and the parameter and return types of
 * `METADATA_OPERATIONS`, then adds, until nothing changes, every type one of them references (base
 * type, properties, navigation properties) and every type derived from one of them (the
 * `Complex*AttributeMetadata` types in a `RetrieveMetadataChanges` response, for example). Entity
 * types other than the metadata ones (tables) are never included.
 */
export function metadataTypeNames(csdl: CsdlSchema): Set<string> {
  const crm = <T extends { namespace: string; name: string }>(types: T[]): Map<string, T> =>
    new Map(types.filter((t) => t.namespace === CRM).map((t) => [t.name, t]));
  const entities = crm(csdl.entityTypes.filter((et) => isMetadataEntityType(et.name)));
  const complex = crm(csdl.complexTypes.filter((ct) => !ct.name.endsWith("[]")));
  const enums = crm(csdl.enumTypes);
  const structured = [...entities.values(), ...complex.values()];

  const names = new Set<string>();
  const queue: string[] = [];
  const add = (name: string | undefined): void => {
    if (name === undefined || names.has(name)) return;
    if (!entities.has(name) && !complex.has(name) && !enums.has(name)) return;
    names.add(name);
    queue.push(name);
  };

  for (const name of entities.keys()) add(name);
  for (const helper of METADATA_HELPER_FILES) {
    for (const [, imported] of helper.content.matchAll(/from "\.\/([\w-]+)\.js"/g)) add(imported);
  }
  for (const op of [...csdl.actions, ...csdl.functions]) {
    if (op.namespace !== CRM || !METADATA_OPERATIONS.includes(op.name)) continue;
    for (const p of op.parameters) add(referencedName(p.type));
    if (op.returnType) add(referencedName(op.returnType));
  }

  for (let name = queue.shift(); name !== undefined; name = queue.shift()) {
    const type = entities.get(name) ?? complex.get(name);
    if (!type) continue;
    if (type.baseType) add(referencedName(type.baseType));
    for (const p of [...type.properties, ...type.navigationProperties]) add(referencedName(p.type));
    for (const derived of structured) {
      if (derived.baseType && referencedName(derived.baseType) === name) add(derived.name);
    }
  }
  return names;
}

/** A change to one generated property: its TS type, whether it's required, and a JSDoc line. */
interface PropertyOverride {
  type?: string;
  required?: boolean;
  doc?: string;
}

/** Corrections to a CSDL type that $metadata can't express. */
interface TypeOverride {
  /** Lines emitted first in the interface body, as written (indented, with a trailing newline). */
  leading?: string;
  properties?: Partial<Record<string, PropertyOverride>>;
}

/**
 * Corrections to generated metadata types (#171, #209).
 *
 * - `@odata.type` isn't a CSDL property, but payloads carry it: responses use it to name the
 *   derived type, and create payloads need it (the create types in metadata-helpers.ts require it).
 * - A label is only valid with its text and language, though CSDL marks both nullable, and
 *   `UserLocalizedLabel` comes back as `null` when the user's language has no label.
 */
const TYPE_OVERRIDES: Partial<Record<string, TypeOverride>> = {
  MetadataBase: {
    leading:
      "  /**\n" +
      '   * The derived metadata type. Responses carry it as `"#Microsoft.Dynamics.CRM.<Type>"` when the\n' +
      "   * value's type differs from the declared one (attributes in a collection, for example).\n" +
      '   * Create payloads use the create types, which require it as `"Microsoft.Dynamics.CRM.<Type>"`.\n' +
      "   */\n" +
      '  "@odata.type"?: string;\n',
  },
  Label: {
    leading:
      "  /** Optional in payloads; the Web API samples send it. */\n" +
      '  "@odata.type"?: "Microsoft.Dynamics.CRM.Label";\n',
    properties: { UserLocalizedLabel: { type: "LocalizedLabel | null" } },
  },
  LocalizedLabel: {
    leading:
      "  /** Optional in payloads; the Web API samples send it. */\n" +
      '  "@odata.type"?: "Microsoft.Dynamics.CRM.LocalizedLabel";\n',
    properties: {
      Label: { required: true, doc: "The label text." },
      LanguageCode: { required: true, doc: "The language, as an LCID such as `1033`." },
    },
  },
};

/**
 * Generate the property lines of an entity or complex type, applying TYPE_OVERRIDES.
 */
function generateProperties(
  typeName: string,
  properties: ReadonlyArray<{ name: string; type: string; nullable?: boolean }>
): string {
  const override = TYPE_OVERRIDES[typeName];
  let code = override?.leading ?? "";
  for (const prop of properties) {
    const change = override?.properties?.[prop.name];
    const tsType = change?.type ?? csdlTypeToTs(prop.type);
    const required = change?.required ?? prop.nullable === false;
    if (change?.doc) code += `  /** ${change.doc} */\n`;
    code += `  ${prop.name}${required ? "" : "?"}: ${tsType};\n`;
  }
  return code;
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

  code += generateProperties(entityType.name, entityType.properties);

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

  code += generateProperties(complexType.name, complexType.properties);

  code += `}\n`;

  return code;
}

/**
 * Generate the declaration for a CSDL enum type (#66, #209).
 *
 * The Web API reads and writes enum members only by name: a create body with a number is rejected
 * (`0x80048d19`), and responses return names. So each enum is a const object whose values are the
 * member names, plus a union type of those names. `X.Member` still works, a plain `"Member"` is
 * accepted, and each member's JSDoc keeps its numeric value.
 */
export function generateEnumTypeDeclaration(enumType: {
  name: string;
  members: Array<{ name: string; value: number }>;
}): string {
  const { name, members } = enumType;
  let code = `/**\n * ${name}\n`;
  const example = members.at(0)?.name;
  if (example !== undefined) {
    code += ` *\n`;
    code += ` * The Web API reads and writes enum members by name (\`"${example}"\`), never by number,\n`;
    code += ` * so this is a string union. \`${name}.${example}\` is the name; each member's comment\n`;
    code += ` * gives its numeric value.\n`;
  }
  code += ` */\n`;
  code += `export const ${name} = {\n`;
  for (const member of members) {
    code += `  /** ${String(member.value)} */\n`;
    code += `  ${member.name}: "${member.name}",\n`;
  }
  code += `} as const;\n\n`;
  code += `export type ${name} = (typeof ${name})[keyof typeof ${name}];\n`;
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
 * Write the hand-written helper files (see metadata-helpers.ts) that don't exist in CSDL.
 */
async function generateManualHelperFiles(
  outputPath: string,
  generatedFiles: string[]
): Promise<void> {
  for (const helper of METADATA_HELPER_FILES) {
    await writeTypeScriptFile(join(outputPath, `${helper.name}.ts`), helper.content);
    generatedFiles.push(helper.name);
  }
}
