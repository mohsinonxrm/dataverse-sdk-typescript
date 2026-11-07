/**
 * Portions of this file are adapted from dataverse-gen by Scott Durow
 * (https://github.com/scottdurow/dataverse-gen), Copyright (c) 2020 Scott Durow, licensed under
 * the MIT License. See THIRD_PARTY_NOTICES.md in this package for the notice.
 */

import * as ejs from "ejs";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import {
  ACTION_BODY_MODULE,
  type ActionBodyTables,
  actionBodySource,
  actionBodyTables,
  bodyValueType,
} from "./action-body.js";
import type { SchemaModel } from "./schema-model.js";
import type {
  ActionType,
  DataverseGenConfig,
  EntityType,
  FunctionType,
  NavigationPropertyType,
  ParameterType,
  PropertyType,
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

/**
 * The local name for the runtime's `EntityMetadata` type in a file that also declares or imports
 * `names`: `EntityMetadata`, or `RuntimeEntityMetadata` when the `entity` table's
 * `EntityMetadata` const is among them (TS2440).
 */
function runtimeMetadataName(names: readonly string[]): string {
  return names.includes("EntityMetadata") ? "RuntimeEntityMetadata" : "EntityMetadata";
}

/** Annotations at the top of an entity response (#300). */
const ENTITY_ANNOTATIONS = `"@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string`;
/** Annotations on each record of an entity collection (#300). */
const RECORD_ANNOTATIONS = `"@odata.etag"?: string; "@odata.type"?: string`;

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

  /**
   * Import a name used only as a type, under `alias` when given (the runtime's `EntityMetadata`
   * beside a generated `EntityMetadata` const, for the `entity` table).
   */
  type(name: string, from: string, alias?: string): void {
    const names = this.namesFor(from);
    const specifier = alias && alias !== name ? `${name} as ${alias}` : name;
    if (!names.has(specifier)) names.set(specifier, false);
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
  /** `strictNulls` (#305): type operation responses exactly as the CSDL declares them. */
  private strictNulls: boolean;
  private outputNamesCache?: Map<string, string>;
  private actionBodyTablesCache?: ActionBodyTables;

  constructor(
    private model: SchemaModel,
    private config: DataverseGenConfig
  ) {
    this.outputRoot = config.output?.outputRoot ?? "./generated";
    this.fileSuffix = config.output?.fileSuffix ?? "";
    this.strictNulls = config.strictNulls === true;
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
      const typeName = this.entityTypeName(entity);
      const metadataName = `${typeName}Metadata`;
      const metadataType = runtimeMetadataName([typeName, metadataName]);
      imports.type("EntityMetadata", RUNTIME_PACKAGE, metadataType);

      const body = ejs.render(template, {
        ...this.helpers("entities", imports, typeName),
        entity,
        typeName,
        metadataName,
        metadataType,
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

    const names = this.operationNames(this.model.Actions);
    for (const action of this.model.Actions) {
      const imports = new ImportCollector();
      imports.value("ActionBase", RUNTIME_PACKAGE);
      imports.type("RequestInformation", RUNTIME_PACKAGE);
      const className = `${names.get(action) ?? toSafeIdentifier(action.Name)}Action`;

      const body = ejs.render(template, {
        ...this.helpers("actions", imports),
        ...this.operationHelpers(action, "actions", imports, className),
        action,
        className,
      });

      await this.writeFile(dir, className, imports, body);
    }

    // The bodyValue() helper the actions use, when one does
    const tables = this.actionBodyTables;
    const used = this.model.Actions.some((a) =>
      a.Parameters.some((p) => bodyValueType(tables, p.Type) !== undefined)
    );
    if (used) {
      const internal = path.join(this.outputRoot, "internal");
      await fs.mkdir(internal, { recursive: true });
      await fs.writeFile(
        path.join(internal, `${ACTION_BODY_MODULE}${this.fileSuffix}.ts`),
        actionBodySource(tables, RUNTIME_PACKAGE, `../metadata${this.fileSuffix}.js`),
        "utf-8"
      );
    }
  }

  /** What the actions' request bodies can hold that has to be converted (#361). */
  private get actionBodyTables(): ActionBodyTables {
    this.actionBodyTablesCache ??= actionBodyTables(this.model);
    return this.actionBodyTablesCache;
  }

  /**
   * Generate function classes
   */
  private async outputFunctions(): Promise<void> {
    const dir = path.join(this.outputRoot, "functions");
    await fs.mkdir(dir, { recursive: true });

    const template = await this.loadTemplate("function.ejs");

    const names = this.operationNames(this.model.Functions);
    for (const func of this.model.Functions) {
      const imports = new ImportCollector();
      imports.value("FunctionBase", RUNTIME_PACKAGE);
      imports.type("RequestInformation", RUNTIME_PACKAGE);
      const className = `${names.get(func) ?? toSafeIdentifier(func.Name)}Function`;

      const body = ejs.render(template, {
        ...this.helpers("functions", imports),
        ...this.operationHelpers(func, "functions", imports, className),
        func,
        className,
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

      const outputName = this.outputNames.get(complexType.Name);
      const body = ejs.render(template, {
        ...this.helpers("complextypes", imports, typeName),
        complexType,
        typeName,
        // A navigation property (PrincipalAccess.Principal) is set with a reference or a record,
        // as an entity parameter is (#361)
        propertyType: (prop: PropertyType) => {
          if (!prop.IsNavigation || prop.TypeScriptType.reference === undefined) {
            return this.formatType(prop.TypeScriptType, "complextypes", imports, typeName);
          }
          imports.type("EntityReference", RUNTIME_PACKAGE);
          const element = this.resolveReference(
            prop.TypeScriptType.reference,
            "complextypes",
            imports,
            typeName
          );
          return prop.TypeScriptType.isArray
            ? `Array<${element} | EntityReference>`
            : `${element} | EntityReference`;
        },
        // Only a complex base type can be extended; anything else is dropped.
        baseType: baseType && baseType !== "unknown" ? baseType : undefined,
        // strictNulls: the exact shape an operation returns, next to the interface parameters take
        output: outputName
          ? {
              name: outputName,
              baseType: complexType.BaseType
                ? this.outputReference(complexType.BaseType, "complextypes", imports, typeName)
                : undefined,
              formatType: (type: TypeScriptType) =>
                this.outputType(type, "complextypes", imports, typeName),
            }
          : undefined,
      });

      await this.writeFile(dir, typeName, imports, body);
    }
  }

  /**
   * Generate metadata cache file
   */
  private async outputMetadata(): Promise<void> {
    const imports = new ImportCollector();
    const entities = this.model.EntityTypes.map((entity) => {
      const typeName = this.entityTypeName(entity);
      imports.value(`${typeName}Metadata`, `./entities/${typeName}${this.fileSuffix}.js`);
      return { entity, typeName, metadataName: `${typeName}Metadata` };
    });
    const metadataType = runtimeMetadataName(entities.map((e) => e.metadataName));
    imports.type("EntityMetadata", RUNTIME_PACKAGE, metadataType);

    const actionNames = this.operationNames(this.model.Actions);
    const functionNames = this.operationNames(this.model.Functions);
    const template = await this.loadTemplate("metadata.ejs");
    const body = ejs.render(template, {
      ...this.helpers("entities", imports),
      entities,
      metadataType,
      actions: this.model.Actions.map((op) => ({ op, key: actionNames.get(op) ?? op.Name })),
      functions: this.model.Functions.map((op) => ({ op, key: functionNames.get(op) ?? op.Name })),
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
    const actionNames = this.operationNames(this.model.Actions);
    await this.outputFolderIndex(
      "actions",
      this.model.Actions.map((a) => `${actionNames.get(a) ?? a.Name}Action`)
    );
    const functionNames = this.operationNames(this.model.Functions);
    await this.outputFolderIndex(
      "functions",
      this.model.Functions.map((f) => `${functionNames.get(f) ?? f.Name}Function`)
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
    };
  }

  /**
   * How an operation's response is typed and read (#300). The same contract as the in-repo
   * generator (tools/generate-sdk-types, utils/operation-return.ts): `execute()` resolves the
   * value the operation returns, not the OData envelope around it.
   *
   * - no return type: `void` (the Web API answers 204 No Content);
   * - a primitive or an enum: the `value` of the body (an enum value is its member name);
   * - a collection: the `value` of the body, `[]` for a 204 (an output that wasn't set); each
   *   record keeps its `@odata.etag` and `@odata.type`;
   * - a complex type: the body itself, with its `@odata.context`;
   * - an entity: the body itself, with its annotations, or `null` for a 204 (an entity output
   *   that wasn't set: Dataverse answers 204 although the CSDL says `Nullable="false"`).
   *
   * The value's type is declared as `<Class>Response`.
   *
   * With `strictNulls` (#305), a complex value is typed with its `<Name>Output` interface (every
   * property present, `null` unless `Nullable="false"`), and a return the CSDL leaves nullable
   * adds `| null`: to the value for a primitive or a complex type (with `null` for a 204), to the
   * items for a collection of primitives, enums or complex types. Entities are `| null` anyway.
   */
  private operationReturn(
    returnType: TypeScriptType | undefined,
    nullable: boolean | undefined,
    folder: Folder,
    imports: ImportCollector,
    className: string,
    label: string
  ): { responseType: string; responseDeclaration: string; parseResponse: string } {
    if (!returnType) {
      return {
        responseType: "void",
        responseDeclaration: "",
        parseResponse:
          "  parseResponse(_response: Response): Promise<void> {\n" +
          "    // No return value: the Web API answers 204 No Content\n" +
          "    return Promise.resolve();\n" +
          "  }\n",
      };
    }

    const name = `${className}Response`;
    const ref = returnType.reference;
    let element: "primitive" | "enum" | "entity" | "complex" = "primitive";
    if (ref !== undefined) {
      if (this.model.EnumTypes.some((e) => e.Name === ref)) element = "enum";
      else if (this.model.AllEntityTypeNames.has(ref)) element = "entity";
      else if (this.model.ComplexTypes.some((c) => c.Name === ref)) element = "complex";
    }
    // The TypeScript name of the element type, imported (an entity that isn't generated is
    // IEntity; with strictNulls, a complex type is its Output interface)
    const resolved = (): string => {
      if (ref === undefined) return returnType.name;
      return (
        this.outputReference(ref, folder, imports) ?? this.resolveReference(ref, folder, imports)
      );
    };
    // strictNulls: the CSDL leaves the value (or a collection's items) nullable
    const orNull = this.strictNulls && nullable === true && element !== "entity";
    const NULLABLE_DOC =
      ' * `null` for a null value or a 204 No Content: the CSDL doesn\'t declare the return `Nullable="false"`.\n';

    let doc = `/**\n * Response from the ${toDocText(label)}.\n *\n`;
    let declaration: string;
    let kind: "primitive" | "collection" | "complex" | "entity";
    if (returnType.isArray) {
      kind = "collection";
      let item: string;
      if (element === "enum") item = "string";
      else if (element === "entity") item = `${resolved()} & { ${RECORD_ANNOTATIONS} }`;
      else item = resolved();
      doc += " * The collection, read from the `value` of the response body.\n";
      if (element === "entity") {
        doc += " * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.\n";
      }
      if (orNull) {
        item = `${item} | null`;
        doc +=
          ' * An item can be `null`: the CSDL doesn\'t declare the return `Nullable="false"`.\n';
      }
      const array = /^[\w$]+$/.test(item) ? `${item}[]` : `Array<${item}>`;
      declaration = `export type ${name} = ${array};\n`;
    } else if (element === "entity") {
      kind = "entity";
      doc +=
        " * The record: the response body itself, with its annotations (not wrapped in `value`).\n";
      doc +=
        " * `null` when the Web API answers 204 No Content (an entity output that wasn't set).\n";
      declaration = `export type ${name} = (${resolved()} & { ${ENTITY_ANNOTATIONS} }) | null;\n`;
    } else if (element === "complex") {
      kind = "complex";
      doc += " * The response body itself, with its `@odata.context` (not wrapped in `value`).\n";
      if (orNull) {
        doc += NULLABLE_DOC;
        declaration = `export type ${name} = (${resolved()} & { "@odata.context"?: string }) | null;\n`;
      } else {
        declaration = `export interface ${name} extends ${resolved()} {\n  "@odata.context"?: string;\n}\n`;
      }
    } else {
      kind = "primitive";
      doc += " * The value, read from the `value` of the response body.\n";
      if (element === "enum") {
        doc += ' * An enum value is its member name (names separated by ", " for flags).\n';
      }
      if (orNull) doc += NULLABLE_DOC;
      const value = element === "enum" ? "string" : resolved();
      declaration = `export type ${name} = ${orNull ? `${value} | null` : value};\n`;
    }

    const wrapped = `((await response.json()) as { value: ${name} }).value`;
    const body = `(await response.json()) as ${name}`;
    let parse = `  async parseResponse(response: Response): Promise<${name}> {\n`;
    switch (kind) {
      case "primitive":
        if (orNull) parse += "    if (response.status === 204) return null;\n";
        parse += '    // A primitive comes wrapped: { "@odata.context": "…", "value": … }\n';
        parse += `    return ${wrapped};\n`;
        break;
      case "collection":
        parse += "    // An output that wasn't set answers 204 No Content: an empty collection\n";
        parse += "    if (response.status === 204) return [];\n";
        parse += '    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }\n';
        parse += `    return ${wrapped};\n`;
        break;
      case "complex":
        if (orNull) parse += "    if (response.status === 204) return null;\n";
        parse += "    // The body is the complex value, with its @odata.context\n";
        parse += `    return ${body};\n`;
        break;
      case "entity":
        parse += "    // An entity output that wasn't set answers 204 No Content\n";
        parse += "    if (response.status === 204) return null;\n";
        parse += "    // The body is the record, with its annotations\n";
        parse += `    return ${body};\n`;
        break;
    }
    parse += "  }\n";

    return {
      responseType: name,
      responseDeclaration: `${doc} */\n${declaration}`,
      parseResponse: parse,
    };
  }

  /**
   * Unique class-name stems for operations. An operation name can be bound to several entity
   * types (`RetrieveUnpublished` is bound to a dozen); each overload gets the binding entity in
   * its name (`RetrieveUnpublished_savedquery`) instead of overwriting the others' file.
   */
  private operationNames<T extends ActionType | FunctionType>(operations: T[]): Map<T, string> {
    const counts = new Map<string, number>();
    for (const op of operations) counts.set(op.Name, (counts.get(op.Name) ?? 0) + 1);

    const names = new Map<T, string>();
    const used = new Set<string>();
    for (const op of operations) {
      let name = toSafeIdentifier(op.Name);
      if ((counts.get(op.Name) ?? 0) > 1 && op.BindingEntity) {
        name = `${name}_${op.BindingEntity}${op.IsCollectionBound ? "_collection" : ""}`;
      }
      const stem = name;
      for (let i = 2; used.has(name); i++) name = `${stem}_${String(i)}`;
      used.add(name);
      names.set(op, name);
    }
    return names;
  }

  /**
   * Helpers for action and function templates: the constructor arguments, the request path (with
   * the binding, for a bound operation) and how each parameter is serialized.
   *
   * As in the in-repo generator (#96), the constructor takes the record or entity set a bound
   * operation runs on (it goes in the URL) and then one `<Class>Parameters` object keyed by the
   * CSDL parameter names. A parameter without `Nullable="false"` is optional, and an undefined one
   * is left out of the body or the URL aliases. With only optional parameters the object can be
   * left out; with no parameters there is none.
   */
  private operationHelpers(
    op: ActionType | FunctionType,
    folder: Folder,
    imports: ImportCollector,
    className: string
  ) {
    const params = op.Parameters;
    const isFunction = folder === "functions";
    const kindOf = (param: ParameterType) => this.model.getStructuralType(param.Type);
    /** `.Name`, or `["na-me"]` for a name that isn't an identifier. */
    const access = (name: string) =>
      IDENTIFIER.test(name) ? `.${name}` : `[${JSON.stringify(name)}]`;
    const parameterType = (param: ParameterType) => {
      if (!isFunction && param.TypeScriptType.reference !== undefined) {
        const ref = param.TypeScriptType.reference;
        if (this.model.AllEntityTypeNames.has(ref)) {
          // An action's entity parameter is a reference or a record (#361), as in the in-repo
          // actions (#74).
          imports.type("EntityReference", RUNTIME_PACKAGE);
          const union = `${this.resolveReference(ref, folder, imports)} | EntityReference`;
          return param.TypeScriptType.isArray ? `Array<${union}>` : union;
        }
      }
      const tsType = this.formatType(param.TypeScriptType, folder, imports);
      // A function's entity-typed parameter is usually a reference ({"@odata.id": ...}).
      if (isFunction && kindOf(param) === "EntityType") {
        imports.type("EntityReference", RUNTIME_PACKAGE);
        return `${tsType} | EntityReference`;
      }
      return tsType;
    };
    // An action parameter that can hold an enum or an entity goes through bodyValue() (#361).
    const bodyValueTypeOf = (param: ParameterType): string | undefined =>
      isFunction ? undefined : bodyValueType(this.actionBodyTables, param.Type);
    if (params.some((p) => bodyValueTypeOf(p) !== undefined)) {
      imports.value("bodyValue", `../internal/${ACTION_BODY_MODULE}${this.fileSuffix}.js`);
    }
    /** The value sent for a parameter: `this.parameters.X`, through bodyValue() when needed. */
    const bodyExpression = (param: ParameterType): string => {
      const value = `this.parameters${access(param.Name)}`;
      const type = bodyValueTypeOf(param);
      return type === undefined ? value : `bodyValue(${value}, ${JSON.stringify(type)})`;
    };

    // The record or collection a bound operation is called on: the first constructor argument.
    let bindingDeclaration = "";
    let bindingDoc = "";
    let target = "";
    if (op.IsBound && op.BindingEntity) {
      const set = op.BindingEntitySetName;
      if (op.IsCollectionBound) {
        if (set) {
          target = `/${set}`;
        } else {
          bindingDeclaration = "public readonly entitySetName: string";
          bindingDoc =
            'The first argument is the entity set to call it on, for example "accounts".';
          target = "/${this.entitySetName}";
        }
      } else if (set) {
        imports.value("formatParameterAlias", RUNTIME_PACKAGE);
        const idName = `${toSafeIdentifier(op.BindingEntity)}Id`;
        bindingDeclaration = `public readonly ${idName}: string`;
        bindingDoc = `The first argument is the id of the ${toDocText(op.BindingEntity)} record to call it on.`;
        target = `/${set}(\${formatParameterAlias(this.${idName}, "Edm.Guid")})`;
      } else {
        imports.value("formatRecordPath", RUNTIME_PACKAGE);
        imports.type("EntityReference", RUNTIME_PACKAGE);
        bindingDeclaration = "public readonly target: EntityReference";
        bindingDoc = "The first argument is the record to call it on, with its entitySetName.";
        target = "/${formatRecordPath(this.target)}";
      }
    }
    const operationPath = op.IsBound
      ? `${target}/Microsoft.Dynamics.CRM.${op.Name}`
      : `/${op.Name}`;
    if (isFunction && params.length > 0) imports.value("formatParameterAlias", RUNTIME_PACKAGE);

    const parametersName = `${className}Parameters`;
    const optional = params.every((p) => p.Nullable === true) ? " = {}" : "";
    const constructorArguments = [
      ...(bindingDeclaration ? [bindingDeclaration] : []),
      ...(params.length > 0 ? [`public readonly parameters: ${parametersName}${optional}`] : []),
    ];

    return {
      ...this.operationReturn(
        op.ReturnType,
        op.ReturnTypeNullable,
        folder,
        imports,
        className,
        `${op.Name} ${isFunction ? "function" : "action"}`
      ),
      bindingDoc,
      constructorArguments,
      operationPath,
      parametersName,
      parameterType,
      bodyExpression,
      parameterKind: kindOf,
      access,
      getStructuralType: (type: string) => this.model.getStructuralType(type),
    };
  }

  /**
   * strictNulls (#305): the `<Name>Output` interface of each complex type an operation returns,
   * directly or nested (through properties and base types), by complex type name. Empty without
   * the option. Each name is unique among the names the generated index files export.
   */
  private get outputNames(): Map<string, string> {
    if (this.outputNamesCache) return this.outputNamesCache;
    const names = new Map<string, string>();
    this.outputNamesCache = names;
    if (!this.strictNulls) return names;

    const complexTypes = new Map(this.model.ComplexTypes.map((c) => [c.Name, c]));
    const returned = new Set<string>();
    const visit = (name: string | undefined): void => {
      const type = name === undefined ? undefined : complexTypes.get(name);
      if (!type || returned.has(type.Name)) return;
      returned.add(type.Name);
      visit(type.BaseType);
      for (const prop of type.Properties) visit(prop.TypeScriptType.reference);
    };
    for (const op of [...this.model.Actions, ...this.model.Functions]) {
      visit(op.ReturnType?.reference);
    }

    const taken = new Set<string>([
      ...this.model.EntityTypes.flatMap((e) => {
        const typeName = this.entityTypeName(e);
        return [typeName, `${typeName}Metadata`];
      }),
      ...this.model.EnumTypes.map((e) => toSafeIdentifier(e.Name)),
      ...this.model.ComplexTypes.map((c) => toSafeIdentifier(c.Name)),
    ]);
    for (const type of this.model.ComplexTypes) {
      if (!returned.has(type.Name)) continue;
      const stem = `${toSafeIdentifier(type.Name)}Output`;
      let name = stem;
      for (let i = 2; taken.has(name); i++) name = `${stem}_${String(i)}`;
      taken.add(name);
      names.set(type.Name, name);
    }
    return names;
  }

  /**
   * strictNulls: the `<Name>Output` interface of a complex type, imported into a file in
   * `folder`, or `undefined` when it has none.
   */
  private outputReference(
    name: string,
    folder: Folder,
    imports: ImportCollector,
    selfName?: string
  ): string | undefined {
    const output = this.outputNames.get(name);
    if (output === undefined) return undefined;
    const typeName = toSafeIdentifier(name);
    if (!(folder === "complextypes" && typeName === selfName)) {
      imports.type(output, this.modulePath(folder, "complextypes", typeName));
    }
    return output;
  }

  /** strictNulls: a property type of an Output interface; a complex type is its Output too. */
  private outputType(
    type: TypeScriptType,
    folder: Folder,
    imports: ImportCollector,
    selfName?: string
  ): string {
    const output =
      type.reference === undefined
        ? undefined
        : this.outputReference(type.reference, folder, imports, selfName);
    if (output === undefined) return this.formatType(type, folder, imports, selfName);
    return type.isArray ? `${output}[]` : output;
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
    if (!type.isArray) return baseType;
    // A union element (`string | Date`) needs parentheses
    return /^[\w$]+$/.test(baseType) ? `${baseType}[]` : `(${baseType})[]`;
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
    const selfName = this.entityTypeName(self);
    // Resolved without importing first: a target that is not generated widens the type to
    // IEntity, which covers the others, and they would be unused imports.
    const resolved = [
      ...new Set(
        targets.map((t) => this.resolveReference(t, "entities", new ImportCollector(), selfName))
      ),
    ];
    const widened = resolved.includes("IEntity") || resolved.includes("unknown");
    const types = widened
      ? ["IEntity"]
      : [...new Set(targets.map((t) => this.resolveReference(t, "entities", imports, selfName)))];
    if (types.includes("IEntity")) imports.type("IEntity", RUNTIME_PACKAGE);
    const union = types.join(" | ");
    if (nav.IsCollection) return types.length > 1 ? `(${union})[]` : `${union}[]`;
    // A lookup is read as the related record (with $expand) and written as a reference, which
    // formatEntityForWrite() turns into `<nav>@odata.bind`.
    imports.type("EntityReference", RUNTIME_PACKAGE);
    return `${union} | EntityReference`;
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
