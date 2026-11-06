import * as ejs from "ejs";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import type { SchemaModel } from "./schema-model.js";
import type {
  DataverseGenConfig,
  EntityType,
  NavigationPropertyType,
  TypeScriptType,
} from "./types.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** The package generated code imports its base types from. */
export const RUNTIME_PACKAGE = "@mohsinonxrm/dataverse-sdk-entities-runtime";

type Folder = "entities" | "enums" | "actions" | "functions" | "complextypes";

// Reserved words that cannot name a type, a class or a variable. Contextual keywords such as
// `type` or `of` are valid identifiers and are not listed.
const RESERVED_WORDS = new Set([
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "else",
  "enum",
  "export",
  "extends",
  "false",
  "finally",
  "for",
  "function",
  "if",
  "implements",
  "import",
  "in",
  "instanceof",
  "interface",
  "let",
  "new",
  "null",
  "package",
  "private",
  "protected",
  "public",
  "return",
  "static",
  "super",
  "switch",
  "this",
  "throw",
  "true",
  "try",
  "typeof",
  "var",
  "void",
  "while",
  "with",
  "yield",
]);

const IDENTIFIER = /^[A-Za-z_$][\w$]*$/;

/** A name usable as a type, class or variable name (`import` becomes `_import`). */
export function toSafeIdentifier(name: string): string {
  let safe = name.replace(/[^\w$]/g, "_");
  if (safe.length === 0 || /^\d/.test(safe) || RESERVED_WORDS.has(safe)) safe = `_${safe}`;
  return safe;
}

/** A property key: the name itself when it is an identifier, otherwise a quoted string. */
export function toPropertyKey(name: string): string {
  return IDENTIFIER.test(name) ? name : JSON.stringify(name);
}

/** Text that is safe inside a single-line JSDoc comment. */
export function toDocText(text: string): string {
  return text.replace(/\s+/g, " ").replace(/\*\//g, "*\\/").trim();
}

/**
 * Collects the imports one generated file needs and renders them, so templates only reference
 * types and never write import lines themselves.
 */
class ImportCollector {
  private readonly modules = new Map<string, Map<string, boolean>>();

  /** Import a name used only as a type. */
  type(name: string, from: string): void {
    const names = this.namesFor(from);
    if (!names.has(name)) names.set(name, false);
  }

  /** Import a name used as a value (a base class, a const). */
  value(name: string, from: string): void {
    this.namesFor(from).set(name, true);
  }

  render(): string {
    const specifiers = [...this.modules.keys()].sort((a, b) => {
      const aRelative = a.startsWith(".");
      const bRelative = b.startsWith(".");
      if (aRelative !== bRelative) return aRelative ? 1 : -1;
      return a.localeCompare(b);
    });
    return specifiers
      .map((from) => {
        const names = [...(this.modules.get(from) ?? new Map<string, boolean>())].sort(([a], [b]) =>
          a.localeCompare(b)
        );
        const allTypes = names.every(([, isValue]) => !isValue);
        const list = names
          .map(([name, isValue]) => (allTypes || isValue ? name : `type ${name}`))
          .join(", ");
        return `${allTypes ? "import type" : "import"} { ${list} } from ${JSON.stringify(from)};`;
      })
      .join("\n");
  }

  private namesFor(from: string): Map<string, boolean> {
    let names = this.modules.get(from);
    if (!names) {
      names = new Map<string, boolean>();
      this.modules.set(from, names);
    }
    return names;
  }
}

/**
 * Generates TypeScript code from schema model
 */
export class TypescriptGenerator {
  private outputRoot: string;
  private fileSuffix: string;

  constructor(
    private model: SchemaModel,
    private config: DataverseGenConfig
  ) {
    this.outputRoot = config.output?.outputRoot ?? "./generated";
    this.fileSuffix = config.output?.fileSuffix ?? "";
  }

  /**
   * Generate all TypeScript files
   */
  async generate(): Promise<void> {
    await this.outputEntities();
    await this.outputEnums();
    await this.outputActions();
    await this.outputFunctions();
    await this.outputComplexTypes();
    await this.outputMetadata();

    if (this.config.output?.generateIndex !== false) {
      await this.outputIndexFiles();
    }
  }

  /** TypeScript name of a generated entity: its schema name (`Account`), made safe. */
  entityTypeName(entity: EntityType): string {
    return toSafeIdentifier(entity.SchemaName ?? entity.Name);
  }

  /**
   * Generate entity interfaces
   */
  private async outputEntities(): Promise<void> {
    const dir = path.join(this.outputRoot, "entities");
    await fs.mkdir(dir, { recursive: true });

    const template = await this.loadTemplate("entity.ejs");

    for (const entity of this.model.EntityTypes) {
      const imports = new ImportCollector();
      imports.type("IEntity", RUNTIME_PACKAGE);
      imports.type("EntityMetadata", RUNTIME_PACKAGE);
      const typeName = this.entityTypeName(entity);

      const body = ejs.render(template, {
        ...this.helpers("entities", imports, typeName),
        entity,
        typeName,
        metadataName: `${typeName}Metadata`,
        navigationType: (nav: NavigationPropertyType) => this.navigationType(nav, imports, entity),
        getSourceTypeComment: (sourceType?: number) => this.getSourceTypeComment(sourceType),
      });

      await this.writeFile(dir, typeName, imports, body);
    }
  }

  /**
   * Generate enum types
   */
  private async outputEnums(): Promise<void> {
    const dir = path.join(this.outputRoot, "enums");
    await fs.mkdir(dir, { recursive: true });

    const template = await this.loadTemplate("enum.ejs");

    for (const enumType of this.model.EnumTypes) {
      const imports = new ImportCollector();
      const body = ejs.render(template, {
        ...this.helpers("enums", imports),
        enumType,
        typeName: toSafeIdentifier(enumType.Name),
      });
      await this.writeFile(dir, toSafeIdentifier(enumType.Name), imports, body);
    }
  }

  /**
   * Generate action classes
   */
  private async outputActions(): Promise<void> {
    const dir = path.join(this.outputRoot, "actions");
    await fs.mkdir(dir, { recursive: true });

    const template = await this.loadTemplate("action.ejs");

    for (const action of this.model.Actions) {
      const imports = new ImportCollector();
      imports.value("ActionBase", RUNTIME_PACKAGE);
      imports.type("RequestInformation", RUNTIME_PACKAGE);
      const className = `${toSafeIdentifier(action.Name)}Action`;

      const body = ejs.render(template, {
        ...this.helpers("actions", imports),
        action,
        className,
        getStructuralType: (type: string) => this.model.getStructuralType(type),
      });

      await this.writeFile(dir, className, imports, body);
    }
  }

  /**
   * Generate function classes
   */
  private async outputFunctions(): Promise<void> {
    const dir = path.join(this.outputRoot, "functions");
    await fs.mkdir(dir, { recursive: true });

    const template = await this.loadTemplate("function.ejs");

    for (const func of this.model.Functions) {
      const imports = new ImportCollector();
      imports.value("FunctionBase", RUNTIME_PACKAGE);
      imports.type("RequestInformation", RUNTIME_PACKAGE);
      const className = `${toSafeIdentifier(func.Name)}Function`;

      const body = ejs.render(template, {
        ...this.helpers("functions", imports),
        func,
        className,
        getStructuralType: (type: string) => this.model.getStructuralType(type),
      });

      await this.writeFile(dir, className, imports, body);
    }
  }

  /**
   * Generate complex type interfaces
   */
  private async outputComplexTypes(): Promise<void> {
    const dir = path.join(this.outputRoot, "complextypes");
    await fs.mkdir(dir, { recursive: true });

    const template = await this.loadTemplate("complextype.ejs");

    for (const complexType of this.model.ComplexTypes) {
      const imports = new ImportCollector();
      const typeName = toSafeIdentifier(complexType.Name);
      const baseType = complexType.BaseType
        ? this.resolveReference(complexType.BaseType, "complextypes", imports, typeName)
        : undefined;

      const body = ejs.render(template, {
        ...this.helpers("complextypes", imports, typeName),
        complexType,
        typeName,
        // Only a complex base type can be extended; anything else is dropped.
        baseType: baseType && baseType !== "unknown" ? baseType : undefined,
      });

      await this.writeFile(dir, typeName, imports, body);
    }
  }

  /**
   * Generate metadata cache file
   */
  private async outputMetadata(): Promise<void> {
    const imports = new ImportCollector();
    imports.type("EntityMetadata", RUNTIME_PACKAGE);
    const entities = this.model.EntityTypes.map((entity) => {
      const typeName = this.entityTypeName(entity);
      imports.value(`${typeName}Metadata`, `./entities/${typeName}${this.fileSuffix}.js`);
      return { entity, typeName, metadataName: `${typeName}Metadata` };
    });

    const template = await this.loadTemplate("metadata.ejs");
    const body = ejs.render(template, {
      ...this.helpers("entities", imports),
      entities,
      actions: this.model.Actions,
      functions: this.model.Functions,
    });

    await this.writeFile(this.outputRoot, "metadata", imports, body);
  }

  /**
   * Generate index barrel exports
   */
  private async outputIndexFiles(): Promise<void> {
    const suffix = this.fileSuffix;
    // Root index
    const rootIndexPath = path.join(this.outputRoot, "index.ts");
    const rootIndexContent = `export * from './entities/index.js';
export * from './enums/index.js';
export * from './actions/index.js';
export * from './functions/index.js';
export * from './complextypes/index.js';
export * from './metadata${suffix}.js';
`;
    await fs.writeFile(rootIndexPath, rootIndexContent, "utf-8");

    await this.outputFolderIndex(
      "entities",
      this.model.EntityTypes.map((e) => this.entityTypeName(e))
    );
    await this.outputFolderIndex(
      "enums",
      this.model.EnumTypes.map((e) => toSafeIdentifier(e.Name))
    );
    await this.outputFolderIndex(
      "actions",
      this.model.Actions.map((a) => `${toSafeIdentifier(a.Name)}Action`)
    );
    await this.outputFolderIndex(
      "functions",
      this.model.Functions.map((f) => `${toSafeIdentifier(f.Name)}Function`)
    );
    await this.outputFolderIndex(
      "complextypes",
      this.model.ComplexTypes.map((c) => toSafeIdentifier(c.Name))
    );
  }

  /**
   * Generate index file for a folder
   */
  private async outputFolderIndex(folder: string, names: string[]): Promise<void> {
    const dir = path.join(this.outputRoot, folder);
    const indexPath = path.join(dir, "index.ts");

    // An empty folder still needs a module, or `export * from './x/index.js'` fails.
    const exports =
      names.length > 0
        ? [...new Set(names)]
            .map((name) => `export * from './${name}${this.fileSuffix}.js';`)
            .join("\n")
        : "export {};";

    await fs.writeFile(indexPath, exports + "\n", "utf-8");
  }

  /** Helpers every template gets. Type helpers record the imports they need. */
  private helpers(folder: Folder, imports: ImportCollector, selfName?: string) {
    return {
      formatType: (type: TypeScriptType | undefined) =>
        this.formatType(type, folder, imports, selfName),
      propertyKey: toPropertyKey,
      identifier: toSafeIdentifier,
      literal: (value: unknown) => JSON.stringify(value),
      doc: (text: string | undefined) => toDocText(text ?? ""),
      returnsBody: (type: TypeScriptType) => this.returnsBody(type),
    };
  }

  /**
   * Whether an operation's response body is the return value itself (a complex type or an
   * entity). Primitive, enum and collection results come wrapped as `{ "value": ... }`.
   */
  private returnsBody(type: TypeScriptType): boolean {
    if (type.isArray || !type.reference) return false;
    const name = type.reference;
    return (
      this.model.AllEntityTypeNames.has(name) ||
      this.model.ComplexTypes.some((c) => c.Name === name)
    );
  }

  /** TypeScript for a resolved type, adding the imports it needs. */
  private formatType(
    type: TypeScriptType | undefined,
    folder: Folder,
    imports: ImportCollector,
    selfName?: string
  ): string {
    if (!type) return "void";
    const baseType = type.reference
      ? this.resolveReference(type.reference, folder, imports, selfName)
      : type.name;
    return type.isArray ? `${baseType}[]` : baseType;
  }

  /**
   * Resolve a schema type name (entity, complex or enum type) to the TypeScript name to use in
   * a file in `folder`, importing it. Entities that are not generated (and abstract ones such as
   * `crmbaseentity`) become `IEntity`; unknown names become `unknown`.
   */
  private resolveReference(
    name: string,
    folder: Folder,
    imports: ImportCollector,
    selfName?: string
  ): string {
    const entity = this.model.EntityTypes.find((e) => e.Name === name);
    if (entity) {
      const typeName = this.entityTypeName(entity);
      if (!(folder === "entities" && typeName === selfName)) {
        imports.type(typeName, this.modulePath(folder, "entities", typeName));
      }
      return typeName;
    }
    if (this.model.AllEntityTypeNames.has(name)) {
      imports.type("IEntity", RUNTIME_PACKAGE);
      return "IEntity";
    }
    if (this.model.ComplexTypes.some((c) => c.Name === name)) {
      const typeName = toSafeIdentifier(name);
      if (!(folder === "complextypes" && typeName === selfName)) {
        imports.type(typeName, this.modulePath(folder, "complextypes", typeName));
      }
      return typeName;
    }
    if (this.model.EnumTypes.some((e) => e.Name === name)) {
      const typeName = toSafeIdentifier(name);
      imports.type(typeName, this.modulePath(folder, "enums", typeName));
      return typeName;
    }
    return "unknown";
  }

  /** TypeScript type of a navigation property. */
  private navigationType(
    nav: NavigationPropertyType,
    imports: ImportCollector,
    self: EntityType
  ): string {
    const targets = nav.IsPolymorphic && nav.Targets?.length ? nav.Targets : [nav.TargetType];
    const resolved = [
      ...new Set(
        targets.map((t) => this.resolveReference(t, "entities", imports, this.entityTypeName(self)))
      ),
    ];
    // A target that is not generated widens the type to IEntity, which covers the others.
    const types =
      resolved.includes("IEntity") || resolved.includes("unknown") ? ["IEntity"] : resolved;
    if (types.includes("IEntity")) imports.type("IEntity", RUNTIME_PACKAGE);
    const union = types.join(" | ");
    if (!nav.IsCollection) return union;
    return types.length > 1 ? `(${union})[]` : `${union}[]`;
  }

  /** Import specifier from a file in `from` to a generated module in `to`. */
  private modulePath(from: Folder, to: Folder, name: string): string {
    const file = `${name}${this.fileSuffix}.js`;
    return from === to ? `./${file}` : `../${to}/${file}`;
  }

  private async writeFile(
    dir: string,
    name: string,
    imports: ImportCollector,
    body: string
  ): Promise<void> {
    const importBlock = imports.render();
    const content = importBlock ? `${importBlock}\n\n${body.trimStart()}` : body.trimStart();
    await fs.writeFile(path.join(dir, `${name}${this.fileSuffix}.ts`), content, "utf-8");
  }

  /**
   * Load EJS template
   */
  private async loadTemplate(name: string): Promise<string> {
    const templatePath = path.join(__dirname, "../templates", name);
    return await fs.readFile(templatePath, "utf-8");
  }

  /**
   * Get source type comment for calculated/rollup fields
   */
  private getSourceTypeComment(sourceType?: number): string {
    if (sourceType === 1) return " // Calculated";
    if (sourceType === 2) return " // Rollup";
    return "";
  }
}
