import type {
  CsdlSchema,
  CsdlComplexType,
  CsdlEntityType,
  CsdlEnumType,
} from "../parsers/csdl-types.js";
import { resolve, join } from "path";
import { compareStrings } from "../parsers/canonical.js";
import { csdlTypeToTs, toPascalCase as _toPascalCase } from "../utils/typescript-writer.js";
import { writeTypeScriptFile, purgeDirectory } from "../utils/file-writer.js";
import { concreteTypesOf, generatedBaseType, typedUnionName } from "../utils/polymorphism.js";
import { ENTITY_PAYLOAD_MODULE, entityParameterType } from "../utils/entity-payload.js";
import { ENTITY_REFERENCE_IMPORT } from "../utils/entity-reference.js";

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
  const { complexTypes, entityTypes, enumTypes, entityFile } = crmTypes(csdl);

  console.log(`📝 Generating complex types, entity types, and enums...`);

  // Purge output directory if requested
  if (purge) {
    console.log(`\n  🗑️  Purging ${absolutePath}...`);
    await purgeDirectory(absolutePath);
    console.log(`  ✅ Directory purged`);
  }

  // Generate one file per complex type
  for (const complexType of complexTypes) {
    const content = generateComplexTypeInterface(csdl, complexType, entityFile);
    const filename = `${complexType.name}.ts`;
    await writeTypeScriptFile(join(absolutePath, filename), content);
  }

  // Generate one file per entity type (with conflict resolution)
  for (const entityType of entityTypes) {
    const content = generateEntityTypeInterface(csdl, entityType);
    // On a case conflict (case-insensitive filesystems) the file is suffixed with _entity
    const filename = `${entityFile(entityType.name)}.ts`;
    await writeTypeScriptFile(join(absolutePath, filename), content);
  }

  // Generate one file per enum type
  for (const enumType of enumTypes) {
    const content = generateEnumTypeDefinition(enumType);
    const filename = `${enumType.name}.ts`;
    await writeTypeScriptFile(join(absolutePath, filename), content);
  }

  // Generate index.ts that exports all types with correct filenames
  await writeTypeScriptFile(join(absolutePath, "index.ts"), generateIndexFile(csdl));

  console.log(`  ✅ Generated ${String(complexTypes.length)} complex type files`);
  console.log(`  ✅ Generated ${String(entityTypes.length)} entity type files`);
  console.log(`  ✅ Generated ${String(enumTypes.length)} enum type files`);
  console.log(`  ✅ Generated index.ts`);
}

/**
 * The CRM types the `types/` folder holds: the complex types, the entity types (not the abstract
 * system ones) and the enums, and the file of each entity type.
 */
function crmTypes(csdl: CsdlSchema): {
  complexTypes: CsdlComplexType[];
  entityTypes: CsdlEntityType[];
  enumTypes: CsdlEnumType[];
  /** The file of an entity type: `<name>_entity` when it would collide with another type. */
  entityFile: (name: string) => string;
} {
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
  const entityFile = (name: string): string =>
    existingTypeNames.has(name.toLowerCase()) && name.toLowerCase() in caseConflicts
      ? `${name}_entity`
      : name;
  return { complexTypes, entityTypes, enumTypes, entityFile };
}

/** One type that `types/index.ts` exports. */
interface TypeIndexEntry {
  /** The exported name: the CSDL name, with a `_` prefix when it is a reserved word. */
  name: string;
  /** The file it is in, without `.ts`. */
  file: string;
  kind: "complex" | "entity" | "enum";
  /** The `Typed<Name>` union the file also exports, for a type other types derive from (#73). */
  union?: string;
}

/**
 * The types `types/index.ts` exports, sorted by name. A name that differs only in case from an
 * earlier one (complex types, then enums, then entity types) is left out when both would be in
 * the same file on a case-insensitive filesystem; an entity type written to `<name>_entity.ts`,
 * such as `solution` next to the complex type `Solution`, has its own file and is exported (#333).
 */
function typeIndexEntries(csdl: CsdlSchema): TypeIndexEntry[] {
  const { complexTypes, entityTypes, enumTypes, entityFile } = crmTypes(csdl);
  const all = [
    ...complexTypes.map((t) => ({ name: t.name, file: t.name, kind: "complex" as const })),
    ...enumTypes.map((t) => ({ name: t.name, file: t.name, kind: "enum" as const })),
    ...entityTypes.map((t) => ({
      name: t.name,
      file: entityFile(t.name),
      kind: "entity" as const,
    })),
  ];
  // Keep the first type per file (case-insensitive) and per exported name
  const files = new Set<string>();
  const names = new Set<string>();
  const entries: Array<TypeIndexEntry & { csdlName: string }> = [];
  for (const type of all) {
    const name = makeCodeSafe(type.name);
    if (files.has(type.file.toLowerCase()) || names.has(name)) continue;
    files.add(type.file.toLowerCase());
    names.add(name);
    const union =
      type.kind !== "enum" && concreteTypesOf(csdl, type.name).length > 0
        ? typedUnionName(type.name)
        : undefined;
    entries.push({ name, file: type.file, kind: type.kind, union, csdlName: type.name });
  }
  // By CSDL name: `_import` sorts as `import`
  return entries.sort((a, b) => compareStrings(a.csdlName, b.csdlName));
}

/**
 * The type-only names `types/index.ts` exports: the complex and entity types and their
 * `Typed<Name>` unions, sorted like the index. The package roots re-export them (#333).
 */
export function exportedTypeNames(csdl: CsdlSchema): string[] {
  return typeIndexEntries(csdl)
    .filter((t) => t.kind !== "enum")
    .flatMap((t) => (t.union ? [t.name, t.union] : [t.name]));
}

/**
 * The CRM enum types that `types/index.ts` exports (an enum whose name differs only in case from a
 * complex type is shadowed by it there), sorted like the index.
 */
export function exportedEnumNames(csdl: CsdlSchema): string[] {
  const complexNames = new Set(
    csdl.complexTypes
      .filter((ct) => ct.namespace === "Microsoft.Dynamics.CRM" && !ct.name.endsWith("[]"))
      .map((ct) => ct.name.toLowerCase())
  );
  const seen = new Set<string>();
  const names: string[] = [];
  for (const et of csdl.enumTypes) {
    const lower = et.name.toLowerCase();
    if (et.namespace !== "Microsoft.Dynamics.CRM" || complexNames.has(lower) || seen.has(lower)) {
      continue;
    }
    seen.add(lower);
    names.push(et.name);
  }
  return names.sort(compareStrings);
}

/**
 * Generate TypeScript interface for a complex type.
 */
function generateComplexTypeInterface(
  csdl: CsdlSchema,
  complexType: CsdlComplexType,
  entityFile: (name: string) => string
): string {
  const safeName = makeCodeSafe(complexType.name);
  const baseTypeName = generatedBaseType(csdl, complexType.name);
  const concreteTypes = concreteTypesOf(csdl, complexType.name);

  // Collect complex types used by this complex type
  const importsNeeded = new Set<string>(
    inheritanceImports(complexType.name, baseTypeName, concreteTypes)
  );
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

  // Entity-valued members (#231), typed like entity-typed action parameters
  const navigation = complexType.navigationProperties.map((nav) => ({
    nav,
    ...navigationType(csdl, nav.type),
  }));
  const files = new Map([...importsNeeded].map((t) => [t, t] as const));
  for (const n of navigation) if (n.entity) files.set(n.entity, entityFile(n.entity));
  const payloads = [...new Set(navigation.flatMap((n) => n.payload))].sort();
  const needsReference = navigation.some((n) => n.tsType.includes("EntityReference"));

  let code = "";

  // Add imports if needed
  if (files.size > 0 || needsReference || payloads.length > 0) {
    for (const [typeName, file] of [...files].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))) {
      // Use escaped name for the import identifier
      const safeTypeName = makeCodeSafe(typeName);
      code += `import type { ${safeTypeName} } from './${file}.js';\n`;
    }
    if (needsReference) {
      code += ENTITY_REFERENCE_IMPORT;
    }
    if (payloads.length > 0) {
      code += `import type { ${payloads.join(", ")} } from './${ENTITY_PAYLOAD_MODULE}.js';\n`;
    }
    code += `\n`;
  }

  code += `/**\n`;
  code += ` * ${complexType.name} complex type\n`;
  code += ` */\n`;
  code += `export interface ${safeName}${extendsClause(baseTypeName)} {\n`;

  if (complexType.properties.length === 0 && navigation.length === 0) {
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
      code += `  ${prop.name}${optionalMark(prop)}: ${tsType};\n`;
    }
    for (const { nav, tsType } of navigation) {
      code += `  ${nav.name}${optionalMark(nav)}: ${tsType};\n`;
    }
  }

  code += `}\n`;
  code += typedUnion(complexType.name, concreteTypes);

  return code;
}

/**
 * The type of a navigation property of a complex type, such as `PrincipalAccess.Principal`
 * (#231). In a request body its value is an entity, so it is typed like an entity-typed action
 * parameter: a reference or a payload. `Collection(crmbaseentity)` is `Record<string, unknown>[]`,
 * and `principal` and the other abstract system types are references, also as for parameters.
 */
function navigationType(
  csdl: CsdlSchema,
  csdlType: string
): { tsType: string; entity?: string; payload: string[] } {
  const parameter = entityParameterType(csdl, csdlType);
  if (parameter) {
    return { tsType: parameter.tsType, entity: parameter.entity, payload: parameter.payload };
  }
  return csdlType.startsWith("Collection(")
    ? { tsType: "Record<string, unknown>[]", payload: [] }
    : { tsType: "EntityReference", payload: [] };
}

/**
 * Generate TypeScript interface for an entity type.
 */
function generateEntityTypeInterface(csdl: CsdlSchema, entityType: CsdlEntityType): string {
  const safeName = makeCodeSafe(entityType.name);
  const baseTypeName = generatedBaseType(csdl, entityType.name);
  const concreteTypes = concreteTypesOf(csdl, entityType.name);

  // Collect complex types used by this entity
  const importsNeeded = new Set<string>(
    inheritanceImports(entityType.name, baseTypeName, concreteTypes)
  );
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
  code += `export interface ${safeName}${extendsClause(baseTypeName)} {\n`;

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
      code += `  ${prop.name}${optionalMark(prop)}: ${tsType};\n`;
    }
  }

  code += `}\n`;
  code += typedUnion(entityType.name, concreteTypes);

  return code;
}

/**
 * `?` unless the CSDL says `Nullable="false"`: in CSDL a property without the facet is nullable
 * (#73), so Dataverse accepts it omitted from a request and may leave it out of a response.
 */
function optionalMark(prop: { nullable?: boolean }): string {
  return prop.nullable === false ? "" : "?";
}

/** ` extends Base` when the type derives from another generated type. */
function extendsClause(baseTypeName: string | undefined): string {
  return baseTypeName ? ` extends ${makeCodeSafe(baseTypeName)}` : "";
}

/** The base type and the derived types of the `Typed<Name>` union, which the file must import. */
function inheritanceImports(
  typeName: string,
  baseTypeName: string | undefined,
  concreteTypes: string[]
): string[] {
  const names = concreteTypes.filter((t) => t !== typeName);
  if (baseTypeName) names.push(baseTypeName);
  return names;
}

/**
 * For a type that other types derive from, a `Typed<Name>` union of its concrete types, each with a
 * required `@odata.type` literal. Parameters declared with the base type use it, so the request
 * says which derived type the value is (#73).
 */
function typedUnion(typeName: string, concreteTypes: string[]): string {
  if (concreteTypes.length === 0) return "";
  let code = `\n/**\n`;
  code += ` * A ${typeName} value: one of the concrete types below, with the \`@odata.type\` that tells\n`;
  code += ` * Dataverse which one it is.\n`;
  code += ` */\n`;
  code += `export type ${typedUnionName(typeName)} =\n`;
  for (const t of concreteTypes) {
    code += `  | (${makeCodeSafe(t)} & { "@odata.type": "Microsoft.Dynamics.CRM.${t}" })\n`;
  }
  code += `;\n`;
  return code;
}

/**
 * Generate the declaration for an enum type (#479): a const object and a type of the same name,
 * not a TypeScript `enum`, so the packages compile under `erasableSyntaxOnly` and Node's type
 * stripping. `X.Member` and `x: X` work as with an enum; only the reverse mapping (`X[14]`) is
 * gone.
 *
 * The values stay numbers in 2.x, so `X.Member` is sent as before (the generated code turns it
 * into the member name the Web API reads); they become names in 3.0. The type is the union of the
 * values, or `number` for a flags enum, whose members combine with `|`.
 */
export function generateEnumTypeDefinition(enumType: CsdlEnumType): string {
  const { name } = enumType;
  let code = `/**\n`;
  code += ` * ${name} enum\n`;
  if (enumType.isFlags === true) {
    code += ` *\n`;
    code += ` * A flags enum: combine members with \`|\`, so the type is \`number\`.\n`;
  }
  code += ` */\n`;
  code += `export const ${name} = {\n`;
  for (const member of enumType.members) {
    code += `  ${member.name}: ${String(member.value)},\n`;
  }
  code += `} as const;\n\n`;
  code +=
    enumType.isFlags === true
      ? `export type ${name} = number;\n`
      : `export type ${name} = (typeof ${name})[keyof typeof ${name}];\n`;
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
function generateIndexFile(csdl: CsdlSchema): string {
  let code = `/**\n`;
  code += ` * Type definitions from Dataverse CSDL (Complex Types + Entity Types + Enums)\n`;
  code += ` * Auto-generated - do not modify manually\n`;
  code += ` */\n\n`;

  for (const type of typeIndexEntries(csdl)) {
    if (type.kind === "enum") {
      // Enums are values too: callers need `EntityFilters.Entity` at runtime (#67)
      code += `export { ${type.name} } from './${type.file}.js';\n`;
    } else {
      // The file may have an _entity suffix (case conflicts), and also exports the Typed<Name>
      // union when other types derive from this one
      const union = type.union ? `, ${type.union}` : "";
      code += `export type { ${type.name}${union} } from './${type.file}.js';\n`;
    }
  }

  return code;
}

/** The names `code` exports: `export { a, type B }`, `export type { C }`, `x as Y` as `Y`. */
export function exportedNames(code: string): Set<string> {
  const names = new Set<string>();
  for (const m of code.matchAll(/export\s+(?:type\s+)?\{([^}]*)\}/g)) {
    for (const part of m[1].split(",")) {
      const name = part
        .trim()
        .replace(/^type\s+/, "")
        .split(/\s+as\s+/)
        .pop();
      if (name) names.add(name);
    }
  }
  return names;
}

/**
 * The package root's re-export of the CSDL complex and entity types (#333), appended to the
 * generated `index` code. The export is type-only, so it adds no runtime code.
 *
 * The rule for names: a CSDL type is exported under its own name unless the root already exports
 * that name. The only such names allowed are the operations' responses: a complex type
 * `<Operation>Response` (Dataverse declares one for each operation with several output
 * parameters) is left out where the package has that operation, whose `<Operation>Response` is what
 * `execute()` resolves. Any other collision throws, so a new snapshot can't shadow a type quietly.
 *
 * @param typeNames - The type-only names of `types/index.ts` ({@link exportedTypeNames}).
 * @param code - The index so far.
 * @param responses - The operations' `<stem>Response` names.
 */
export function rootTypeExports(
  typeNames: readonly string[],
  code: string,
  responses: ReadonlySet<string>
): string {
  const taken = exportedNames(code);
  const exported: string[] = [];
  for (const name of typeNames) {
    if (!taken.has(name)) exported.push(name);
    else if (!responses.has(name)) {
      throw new Error(
        `The CSDL type ${name} has the name of another export of the package root, which isn't an operation response. Decide how to export it (#333).`
      );
    }
  }
  if (exported.length === 0) return "";
  let out = `\n// The CSDL complex and entity types (#333), type-only. A complex type named like an operation's\n`;
  out += `// response (<Operation>Response) isn't re-exported: that name is the operation's response.\n`;
  out += `export type { ${exported.join(", ")} } from './types/index.js';\n`;
  return out;
}
