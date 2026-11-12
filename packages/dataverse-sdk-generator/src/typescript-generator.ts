/**
 * Portions of this file are adapted from dataverse-gen by Scott Durow
 * (https://github.com/scottdurow/dataverse-gen), Copyright (c) 2020 Scott Durow, licensed under
 * the MIT License. See THIRD_PARTY_NOTICES.md in this package for the notice.
 */

import * as ejs from "ejs";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import {
  ACTION_BODY_MODULE,
  type ActionBodyTables,
  actionBodySource,
  actionBodyTables,
  bodyValueType,
  FUNCTION_PARAMETERS_MODULE,
  functionParametersSource,
} from "./action-body.js";
import {
  allExist,
  GENERATOR_VERSION,
  type GenerationStamp,
  hashOf,
  readStamp,
  removeStale,
  writeStamp,
} from "./incremental.js";
import {
  FORM_LAYOUT_MODULE,
  FORM_LAYOUT_UI,
  formLayoutHelpersSource,
} from "./form-layout-helpers.js";
import { isNoContentOperation, noContentDoc } from "./no-content-operations.js";
import type { SchemaModel } from "./schema-model.js";
import { loadTemplate, TEMPLATE_NAMES, type TemplateName } from "./templates.js";
import type {
  ActionType,
  DataverseGenConfig,
  EntityType,
  FormControlKind,
  FormLayoutType,
  FunctionType,
  NavigationPropertyType,
  ParameterType,
  PropertyType,
  TypeScriptType,
} from "./types.js";

/** The package generated code imports its base types from. */
export const RUNTIME_PACKAGE = "@mohsinonxrm/dataverse-sdk-entities-runtime";

/** The client package; the typed client (#312) takes its `DataverseClient`. */
const CORE_PACKAGE = "@mohsinonxrm/dataverse-sdk-core";

/** The typed client's interface and factory (`typedClient`, #312). */
const TYPED_CLIENT = "TypedDataverseClient";
const TYPED_CLIENT_FACTORY = "createTypedClient";

type Folder = "entities" | "enums" | "actions" | "functions" | "complextypes" | "forms";

/**
 * A constructor argument of a generated action or function, kept as a public readonly field. The
 * templates declare the field and assign it, rather than use a parameter property, which
 * `erasableSyntaxOnly` and Node's type stripping don't allow (#479).
 */
interface ConstructorParameter {
  name: string;
  type: string;
  /** Source of the default value (`{}` when every parameter is optional). */
  defaultValue?: string;
}

/** The names of an entity's form types (`formContext`, #347). */
interface FormNames {
  attributes: string;
  controls: string;
  context: string;
}

/** The names of a form layout's types (`formLayouts`, #430). */
interface FormLayoutNames {
  attributes: string;
  controls: string;
  tabs: string;
  context: string;
}

/** The Xrm control type of a form control that isn't bound to a column, and its doc. */
const UNBOUND_CONTROLS: Readonly<Record<FormControlKind, { type: string; doc: string }>> = {
  subgrid: { type: "Xrm.Controls.GridControl", doc: "A subgrid" },
  webResource: { type: "Xrm.Controls.IframeControl", doc: "A web resource" },
  iframe: { type: "Xrm.Controls.IframeControl", doc: "An IFRAME" },
  quickView: { type: "Xrm.Controls.QuickFormControl", doc: "A quick view form" },
  timeline: { type: "Xrm.Controls.TimelineWall", doc: "The timeline" },
  other: { type: "Xrm.Controls.Control", doc: "A control" },
  // A column control without a column (no datafieldname)
  column: { type: "Xrm.Controls.StandardControl", doc: "A control" },
};

/**
 * The Xrm attribute and control types of a column on a form that the table-wide form types don't
 * have, by its `AttributeTypeName`: a party list is a lookup (`to`, `requiredattendees`); a file or
 * image column, which `@types/xrm` has no type for, and anything else is a plain attribute with a
 * standard control.
 */
function xrmColumnTypes(columnType: string | undefined): { attribute: string; control: string } {
  switch (columnType?.replace(/Type$/, "")) {
    case "PartyList":
    case "Lookup":
    case "Customer":
    case "Owner":
      return { attribute: "Xrm.Attributes.LookupAttribute", control: "Xrm.Controls.LookupControl" };
    case "String":
    case "Memo":
      return { attribute: "Xrm.Attributes.StringAttribute", control: "Xrm.Controls.StringControl" };
    case "Integer":
    case "BigInt":
    case "Decimal":
    case "Double":
    case "Money":
      return { attribute: "Xrm.Attributes.NumberAttribute", control: "Xrm.Controls.NumberControl" };
    case "DateTime":
      return { attribute: "Xrm.Attributes.DateAttribute", control: "Xrm.Controls.DateControl" };
    case "Boolean":
      return {
        attribute: "Xrm.Attributes.BooleanAttribute",
        control: "Xrm.Controls.StandardControl",
      };
    case "Picklist":
    case "State":
    case "Status":
      return {
        attribute: "Xrm.Attributes.OptionSetAttribute",
        control: "Xrm.Controls.OptionSetControl",
      };
    case "MultiSelectPicklist":
      return {
        attribute: "Xrm.Attributes.MultiSelectOptionSetAttribute",
        control: "Xrm.Controls.MultiSelectOptionSetControl",
      };
    default:
      return { attribute: "Xrm.Attributes.Attribute", control: "Xrm.Controls.StandardControl" };
  }
}

/** A form's name as an identifier part: `Sales Insights` → `SalesInsights`; `Form` when empty. */
function pascalCase(text: string): string {
  const words = text.split(/[^\p{L}\p{N}]+/u).filter((w) => w.length > 0);
  const joined = words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("");
  return toSafeIdentifier(joined).replace(/^_+/, "") || "Form";
}

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
 * Compare by UTF-16 code unit, not `localeCompare`, so the generated files don't depend on the
 * machine's locale.
 */
function compareCodeUnits(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

/**
 * Collects the imports one generated file needs and renders them, so templates only reference
 * types and never write import lines themselves.
 */
export class ImportCollector {
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
      return compareCodeUnits(a, b);
    });
    return specifiers
      .map((from) => {
        const names = [...(this.modules.get(from) ?? new Map<string, boolean>())].sort(([a], [b]) =>
          compareCodeUnits(a, b)
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
  private writeTypeNamesCache?: Map<EntityType, { create: string; update: string }>;
  private formNamesCache?: Map<EntityType, FormNames>;
  private formLayoutNamesCache?: Map<EntityType, FormLayoutNames[]>;
  private columnTypeNamesCache?: Map<EntityType, string>;
  /** Every file this run wrote or kept, relative to the output folder, with `/`. */
  private readonly written = new Set<string>();
  /** Incremental generation: the tables whose files are kept as they are. */
  private readonly unchanged = new Set<EntityType>();

  /**
   * After {@link generate} with `output.incremental`: the logical names of the tables whose
   * files were kept, because neither their metadata nor the settings changed since the last run.
   */
  readonly unchangedTables: string[] = [];
  private actionBodyTablesCache?: ActionBodyTables;
  private functionParameterTablesCache?: ActionBodyTables;

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
    const incremental = this.config.output?.incremental === true;
    const previous = incremental ? await readStamp(this.outputRoot) : undefined;
    const tables: GenerationStamp["tables"] = {};
    const settings = incremental ? await this.settingsHash() : "";
    if (incremental) {
      const reusable = previous?.generator === GENERATOR_VERSION && previous.settings === settings;
      for (const entity of this.model.EntityTypes) {
        const files = this.tableFiles(entity);
        const hash = hashOf(JSON.stringify(entity), JSON.stringify(this.tableDependencies(entity)));
        tables[entity.LogicalName] = { hash, files };
        const before = previous?.tables[entity.LogicalName];
        if (
          reusable &&
          before?.hash === hash &&
          before.files.join("\n") === files.join("\n") &&
          (await allExist(this.outputRoot, files))
        ) {
          this.unchanged.add(entity);
          this.unchangedTables.push(entity.LogicalName);
          for (const file of files) this.written.add(file);
        }
      }
    }

    await this.outputEntities();
    await this.outputEnums();
    await this.outputActions();
    await this.outputFunctions();
    await this.outputComplexTypes();
    await this.outputMetadata();
    if (this.formContext) await this.outputForms();
    if (this.formLayouts) await this.outputFormLayouts();
    if (this.config.typedClient === true) await this.outputClient();

    if (this.config.output?.generateIndex !== false) {
      await this.outputIndexFiles();
    }

    if (incremental) {
      if (previous) await removeStale(this.outputRoot, previous.files, this.written);
      await writeStamp(this.outputRoot, {
        format: 1,
        generator: GENERATOR_VERSION,
        settings,
        tables,
        files: [...this.written].sort(),
      });
    }
  }

  /**
   * Incremental generation: a hash of what every table's files depend on besides the table
   * itself: the generator options, the templates (custom ones included) and the names of the
   * generated tables, which the tables' files import from each other.
   *
   * The enums and complex types aren't in it (#501): `$metadata` declares far more of them than
   * the generated tables use, and a table's files depend only on the ones it uses, which
   * {@link tableDependencies} puts in that table's hash. A choice or complex type that no
   * generated table uses can come and go without regenerating any table. (The enum, complex type,
   * operation and index files aren't per table and are written on every run.)
   */
  private async settingsHash(): Promise<string> {
    const templates = await Promise.all(TEMPLATE_NAMES.map((name) => this.loadTemplate(name)));
    const settings = {
      fileSuffix: this.fileSuffix,
      strictNulls: this.strictNulls,
      formContext: this.formContext,
      formLayouts: this.formLayouts,
      typedClient: this.config.typedClient === true,
      tables: this.model.EntityTypes.map((e) => [e.Name, e.LogicalName, this.entityTypeName(e)]),
    };
    return hashOf(JSON.stringify(settings), ...templates);
  }

  /**
   * Incremental generation: what a table's files depend on besides its schema model and the
   * settings (#501): the names of its create, update and form types (unique among all the
   * generated names, so another type can change them), and each type its columns, choices and
   * lookups refer to: what the name resolves to in its files, and the enum or complex type itself,
   * with the types a complex type refers to in turn (its properties and base type).
   */
  private tableDependencies(entity: EntityType): unknown {
    const enums = new Map(this.model.EnumTypes.map((e) => [e.Name, e]));
    const complexTypes = new Map(this.model.ComplexTypes.map((c) => [c.Name, c]));
    const pending: string[] = [];
    for (const prop of entity.Properties) {
      if (prop.TypeScriptType.reference !== undefined) pending.push(prop.TypeScriptType.reference);
      if (prop.EnumName) pending.push(prop.EnumName);
    }
    for (const nav of entity.NavigationProperties) {
      pending.push(nav.TargetType, ...(nav.Targets ?? []));
    }

    const types = new Map<string, unknown>();
    for (let name = pending.pop(); name !== undefined; name = pending.pop()) {
      if (types.has(name)) continue;
      const complexType = complexTypes.get(name);
      types.set(name, {
        as: this.resolveReference(name, "entities", new ImportCollector()),
        enum: enums.get(name),
        complexType,
      });
      if (complexType) {
        if (complexType.BaseType) pending.push(complexType.BaseType);
        for (const prop of complexType.Properties) {
          const reference = prop.TypeScriptType.reference;
          if (reference !== undefined) pending.push(reference);
        }
      }
    }
    return {
      write: this.writeTypeNames.get(entity),
      form: this.formNames.get(entity),
      formLayouts: this.formLayoutNames.get(entity),
      types: [...types].sort(([a], [b]) => compareCodeUnits(a, b)),
    };
  }

  /** The files generated from one table, relative to the output folder. */
  private tableFiles(entity: EntityType): string[] {
    const typeName = this.entityTypeName(entity);
    const files = [`entities/${typeName}${this.fileSuffix}.ts`];
    if (this.formContext) files.push(`forms/${typeName}Form${this.fileSuffix}.ts`);
    if (this.formLayouts) files.push(`forms/${typeName}Forms${this.fileSuffix}.ts`);
    return files;
  }

  /** The table-wide form context types (`formContext`), which `formLayouts` builds on. */
  private get formContext(): boolean {
    return this.config.formContext === true || this.formLayouts;
  }

  /** A form context type per form layout (`formLayouts`, #430). */
  private get formLayouts(): boolean {
    return this.config.formLayouts === true;
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
      if (this.unchanged.has(entity)) continue;
      const imports = new ImportCollector();
      imports.type("IEntity", RUNTIME_PACKAGE);
      const typeName = this.entityTypeName(entity);
      const metadataName = `${typeName}Metadata`;
      const metadataType = runtimeMetadataName([typeName, metadataName]);
      imports.type("EntityMetadata", RUNTIME_PACKAGE, metadataType);

      const writeNames = this.writeTypeNames.get(entity) ?? {
        create: `${typeName}Create`,
        update: `${typeName}Update`,
      };
      const body = ejs.render(template, {
        ...this.helpers("entities", imports, typeName),
        entity,
        typeName,
        metadataName,
        metadataType,
        createName: writeNames.create,
        updateName: writeNames.update,
        writeColumns: (mode: "create" | "update") =>
          this.writeColumns(entity, mode, imports, typeName),
        navigationType: (nav: NavigationPropertyType) => this.navigationType(nav, imports, entity),
        getSourceTypeComment: (sourceType?: number) => this.getSourceTypeComment(sourceType),
      });

      await this.writeFile(dir, typeName, imports, body);
    }
  }

  /**
   * The names of each entity's create and update types (#347): `<Entity>Create` and
   * `<Entity>Update`, or with a `_2` suffix when another generated type has that name.
   */
  private get writeTypeNames(): Map<EntityType, { create: string; update: string }> {
    if (this.writeTypeNamesCache) return this.writeTypeNamesCache;
    const taken = new Set<string>([
      ...this.model.EntityTypes.flatMap((e) => {
        const typeName = this.entityTypeName(e);
        return [typeName, `${typeName}Metadata`];
      }),
      ...this.model.EnumTypes.map((e) => toSafeIdentifier(e.Name)),
      ...this.model.ComplexTypes.map((c) => toSafeIdentifier(c.Name)),
    ]);
    const unique = (stem: string): string => {
      let name = stem;
      for (let i = 2; taken.has(name); i++) name = `${stem}_${String(i)}`;
      taken.add(name);
      return name;
    };
    const names = new Map<EntityType, { create: string; update: string }>();
    for (const entity of this.model.EntityTypes) {
      const typeName = this.entityTypeName(entity);
      names.set(entity, {
        create: unique(`${typeName}Create`),
        update: unique(`${typeName}Update`),
      });
    }
    this.writeTypeNamesCache = names;
    return names;
  }

  /**
   * With `formContext`, the names of each entity's form types (#347): `<Entity>Attributes`,
   * `<Entity>Controls` and `<Entity>FormContext`, with a `_2` suffix when another generated type
   * has that name. Empty without the option.
   */
  private get formNames(): Map<EntityType, FormNames> {
    if (this.formNamesCache) return this.formNamesCache;
    const names = new Map<EntityType, FormNames>();
    this.formNamesCache = names;
    if (!this.formContext) return names;
    const taken = new Set<string>([
      ...this.model.EntityTypes.flatMap((e) => {
        const typeName = this.entityTypeName(e);
        return [typeName, `${typeName}Metadata`];
      }),
      ...this.model.EnumTypes.map((e) => toSafeIdentifier(e.Name)),
      ...this.model.ComplexTypes.map((c) => toSafeIdentifier(c.Name)),
      ...[...this.writeTypeNames.values()].flatMap((n) => [n.create, n.update]),
    ]);
    const unique = (stem: string): string => {
      let name = stem;
      for (let i = 2; taken.has(name); i++) name = `${stem}_${String(i)}`;
      taken.add(name);
      return name;
    };
    for (const entity of this.model.EntityTypes) {
      const typeName = this.entityTypeName(entity);
      names.set(entity, {
        attributes: unique(`${typeName}Attributes`),
        controls: unique(`${typeName}Controls`),
        context: unique(`${typeName}FormContext`),
      });
    }
    return names;
  }

  /**
   * With `typedClient`, the name of each entity's column union (#312): `<Entity>Column`, with a
   * `_2` suffix when another generated type has that name. Empty without the option.
   */
  private get columnTypeNames(): Map<EntityType, string> {
    if (this.columnTypeNamesCache) return this.columnTypeNamesCache;
    const names = new Map<EntityType, string>();
    this.columnTypeNamesCache = names;
    if (this.config.typedClient !== true) return names;
    const taken = new Set<string>([
      ...this.model.EntityTypes.flatMap((e) => {
        const typeName = this.entityTypeName(e);
        return [typeName, `${typeName}Metadata`];
      }),
      ...this.model.EnumTypes.map((e) => toSafeIdentifier(e.Name)),
      ...this.model.ComplexTypes.map((c) => toSafeIdentifier(c.Name)),
      ...[...this.writeTypeNames.values()].flatMap((n) => [n.create, n.update]),
      ...[...this.formNames.values()].flatMap((n) => [n.attributes, n.controls, n.context]),
      TYPED_CLIENT,
      TYPED_CLIENT_FACTORY,
    ]);
    for (const entity of this.model.EntityTypes) {
      const stem = `${this.entityTypeName(entity)}Column`;
      let name = stem;
      for (let i = 2; taken.has(name); i++) name = `${stem}_${String(i)}`;
      taken.add(name);
      names.set(entity, name);
    }
    return names;
  }

  /**
   * With `typedClient` (#312): `client.ts`, with `createTypedClient(client)` and one
   * `EntitySetClient` per generated table, typed by the table's interface, create and update
   * types and column union.
   */
  private async outputClient(): Promise<void> {
    const imports = new ImportCollector();
    imports.type("DataverseClient", CORE_PACKAGE);
    imports.value("EntitySetClient", RUNTIME_PACKAGE);
    imports.value("EntityMetadataCache", `./metadata${this.fileSuffix}.js`);
    const tables = this.model.EntityTypes.map((entity) => {
      const typeName = this.entityTypeName(entity);
      const module = `./entities/${typeName}${this.fileSuffix}.js`;
      const write = this.writeTypeNames.get(entity) ?? {
        create: `${typeName}Create`,
        update: `${typeName}Update`,
      };
      const metadataName = `${typeName}Metadata`;
      imports.type(typeName, module);
      imports.type(write.create, module);
      imports.type(write.update, module);
      imports.value(metadataName, module);
      return {
        entity,
        typeName,
        metadataName,
        createName: write.create,
        updateName: write.update,
        columnName: this.columnTypeNames.get(entity) ?? `${typeName}Column`,
        columns: [...new Set(entity.Properties.map((p) => p.Name))],
      };
    });
    const first = tables.at(0);
    const template = await this.loadTemplate("client.ejs");
    const body = ejs.render(template, {
      ...this.helpers("entities", imports),
      tables,
      clientName: TYPED_CLIENT,
      factoryName: TYPED_CLIENT_FACTORY,
      sample: first?.entity.EntitySetName ?? "accounts",
      sampleColumn: first?.entity.PrimaryNameAttribute ?? first?.columns.at(0) ?? "name",
    });
    await this.writeFile(this.outputRoot, "client", imports, body);
  }

  /**
   * With `formContext` (#347): a `forms/<Entity>Form.ts` per table, with the table's columns
   * typed as Xrm attributes and controls (`@types/xrm`) and a form context whose
   * `getAttribute()` / `getControl()` take a column's logical name.
   */
  private async outputForms(): Promise<void> {
    const dir = path.join(this.outputRoot, "forms");
    await fs.mkdir(dir, { recursive: true });
    const template = await this.loadTemplate("form.ejs");

    for (const entity of this.model.EntityTypes) {
      const names = this.formNames.get(entity);
      if (!names || this.unchanged.has(entity)) continue;
      const imports = new ImportCollector();
      const typeName = this.entityTypeName(entity);
      const columns = this.formColumns(entity, imports);
      const body = ejs.render(template, {
        ...this.helpers("forms", imports),
        entity,
        columns,
        attributesName: names.attributes,
        controlsName: names.controls,
        contextName: names.context,
        sample: entity.PrimaryNameAttribute ?? columns.at(0)?.name ?? "name",
      });
      // A triple-slash directive is read only at the top of the file, before the imports
      await this.writeFile(
        dir,
        `${typeName}Form`,
        imports,
        body,
        '/// <reference types="xrm" />\n\n'
      );
    }
  }

  /**
   * The columns a form can show and their Xrm types: text, number, date, two-option, choice
   * (typed with the column's enum when it has one), choices and lookup columns. A lookup is keyed
   * by its logical name (`contoso_parentaccountid`), as the form names it. Primary keys, the
   * read-only name columns beside a lookup or choice (`AttributeOf`), and other virtual columns
   * aren't on forms.
   */
  private formColumns(
    entity: EntityType,
    imports: ImportCollector
  ): Array<{ name: string; attribute: string; control: string; doc: string }> {
    const columns: Array<{ name: string; attribute: string; control: string; doc: string }> = [];
    const names = new Set<string>();
    const add = (name: string, attribute: string, control: string, doc: string) => {
      if (names.has(name)) return;
      names.add(name);
      columns.push({ name, attribute, control, doc });
    };
    const enumOf = (prop: PropertyType): string => {
      const enumType = prop.EnumName
        ? this.model.EnumTypes.find((e) => e.Name === prop.EnumName)
        : undefined;
      return enumType ? this.resolveReference(enumType.Name, "forms", imports) : "number";
    };

    for (const prop of entity.Properties) {
      if (prop.AttributeOf || prop.Name.startsWith("_")) continue;
      const doc = [prop.Description, prop.DisplayName, prop.LogicalName].find((t) => t) ?? "";
      const kind = prop.IsMultiSelect === true ? "MultiSelect" : (prop.AttributeType ?? "");
      switch (kind) {
        case "String":
        case "Memo":
          add(prop.Name, "Xrm.Attributes.StringAttribute", "Xrm.Controls.StringControl", doc);
          break;
        case "Integer":
        case "BigInt":
        case "Decimal":
        case "Double":
        case "Money":
          add(prop.Name, "Xrm.Attributes.NumberAttribute", "Xrm.Controls.NumberControl", doc);
          break;
        case "DateTime":
          add(prop.Name, "Xrm.Attributes.DateAttribute", "Xrm.Controls.DateControl", doc);
          break;
        case "Boolean":
          add(prop.Name, "Xrm.Attributes.BooleanAttribute", "Xrm.Controls.StandardControl", doc);
          break;
        case "Picklist":
        case "State":
        case "Status":
          add(
            prop.Name,
            `Xrm.Attributes.OptionSetAttribute<${enumOf(prop)}>`,
            "Xrm.Controls.OptionSetControl",
            doc
          );
          break;
        case "MultiSelect":
          add(
            prop.Name,
            `Xrm.Attributes.MultiSelectOptionSetAttribute<${enumOf(prop)}>`,
            "Xrm.Controls.MultiSelectOptionSetControl",
            doc
          );
          break;
        default:
          break;
      }
    }
    for (const nav of entity.NavigationProperties) {
      if (nav.LookupAttribute === undefined) continue;
      const targets = nav.LookupTargets?.length ? nav.LookupTargets : [nav.TargetType];
      add(
        nav.LookupAttribute,
        "Xrm.Attributes.LookupAttribute",
        "Xrm.Controls.LookupControl",
        `Lookup to ${targets.join(", ")}`
      );
    }
    return columns;
  }

  /**
   * With `formLayouts` (#430): a `forms/<Entity>Forms.ts` per table with, for each of its main and
   * quick create forms, the attributes, controls and tabs on that form and a form context whose
   * `getAttribute()`, `getControl()` and `ui.tabs.get()` take them; and `forms/form-layout.ts`
   * with the helper types they use.
   */
  private async outputFormLayouts(): Promise<void> {
    const dir = path.join(this.outputRoot, "forms");
    await fs.mkdir(dir, { recursive: true });
    await this.writeFile(dir, FORM_LAYOUT_MODULE, new ImportCollector(), formLayoutHelpersSource());
    const template = await this.loadTemplate("form-layouts.ejs");

    for (const entity of this.model.EntityTypes) {
      const tableNames = this.formNames.get(entity);
      if (!tableNames || this.unchanged.has(entity)) continue;
      const imports = new ImportCollector();
      const typeName = this.entityTypeName(entity);
      const layoutNames = this.formLayoutNames.get(entity) ?? [];
      const forms = (entity.Forms ?? []).map((form, i) => ({
        ...this.formLayoutMembers(entity, form, tableNames),
        form,
        names: layoutNames[i] ?? this.formLayoutBaseNames(`${typeName}_${String(i)}`),
        kindLabel: form.Kind === "main" ? "main" : "quick create",
      }));
      if (forms.length > 0) {
        const tableModule = this.modulePath("forms", "forms", `${typeName}Form`);
        imports.type(tableNames.attributes, tableModule);
        imports.type(tableNames.controls, tableModule);
        imports.type(FORM_LAYOUT_UI, this.modulePath("forms", "forms", FORM_LAYOUT_MODULE));
      }
      const body = ejs.render(template, {
        ...this.helpers("forms", imports),
        entity,
        forms,
        tableAttributes: tableNames.attributes,
        tableControls: tableNames.controls,
        uiType: FORM_LAYOUT_UI,
      });
      await this.writeFile(
        dir,
        `${typeName}Forms`,
        imports,
        body,
        forms.length > 0 ? '/// <reference types="xrm" />\n\n' : ""
      );
    }
  }

  /**
   * The attributes, controls and tabs of a form layout, with their Xrm types. A column the
   * table-wide types have is typed as there (`AccountAttributes["name"]`, with its choice's enum);
   * another one (a party list, file or image column) by its column type. Each column is an
   * attribute once, however many controls it has.
   */
  private formLayoutMembers(
    entity: EntityType,
    form: FormLayoutType,
    tableNames: FormNames
  ): {
    attributes: Array<{ key: string; type: string; doc: string }>;
    controls: Array<{ key: string; type: string; doc: string }>;
    tabs: Array<{ key: string; sections: string; doc: string }>;
    sampleAttribute?: string;
    sampleTab?: string;
  } {
    const tableColumns = new Map(
      this.formColumns(entity, new ImportCollector()).map((c) => [c.name, c.doc])
    );
    const properties = new Map(entity.Properties.map((p) => [p.Name, p]));
    const columnDoc = (column: string): string => {
      const prop = properties.get(column);
      return (
        [prop?.Description, prop?.DisplayName].find((t) => t) ?? tableColumns.get(column) ?? ""
      );
    };
    const attributes: Array<{ key: string; type: string; doc: string }> = [];
    const controls: Array<{ key: string; type: string; doc: string }> = [];
    for (const control of form.Controls) {
      const column = control.DataField;
      if (control.Kind === "column" && column !== undefined) {
        const known = tableColumns.has(column);
        const xrm = xrmColumnTypes(control.ColumnType);
        const name = JSON.stringify(column);
        const described = columnDoc(column);
        const where = control.Location === "header" ? " (header)" : "";
        if (!attributes.some((a) => a.key === column)) {
          attributes.push({
            key: column,
            type: known ? `${tableNames.attributes}[${name}]` : xrm.attribute,
            doc: described && described !== column ? `${column}: ${described}` : column,
          });
        }
        controls.push({
          key: control.Id,
          type: known ? `${tableNames.controls}[${name}]` : xrm.control,
          doc: `The control of ${column}${where}`,
        });
        continue;
      }
      const unbound = UNBOUND_CONTROLS[control.Kind];
      controls.push({ key: control.Id, type: unbound.type, doc: unbound.doc });
    }
    const tabs = form.Tabs.map((tab) => ({
      key: tab.Name,
      sections:
        tab.Sections.length > 0
          ? tab.Sections.map((s) => JSON.stringify(s.Name)).join(" | ")
          : "never",
      doc:
        (tab.Label ? `${tab.Label}: ` : "") +
        (tab.Sections.length > 0
          ? `sections ${tab.Sections.map((s) => (s.Label ? `${s.Name} (${s.Label})` : s.Name)).join(", ")}`
          : "no named sections"),
    }));
    return {
      attributes,
      controls,
      tabs,
      sampleAttribute: attributes.at(0)?.key,
      sampleTab: tabs.at(0)?.key,
    };
  }

  /**
   * With `formLayouts`, the type names of each table's form layouts (#430), in the order of
   * `entity.Forms`: `<Entity><Kind>_<Form>` (`AccountMain_Account`,
   * `ContactQuickCreate_ContactQuickCreate`) + `Attributes`, `Controls`, `Tabs`, `FormContext`,
   * with a `_2` suffix on the stem when another generated type has one of those names. Empty
   * without the option.
   */
  private get formLayoutNames(): Map<EntityType, FormLayoutNames[]> {
    if (this.formLayoutNamesCache) return this.formLayoutNamesCache;
    const names = new Map<EntityType, FormLayoutNames[]>();
    this.formLayoutNamesCache = names;
    if (!this.formLayouts) return names;
    const taken = new Set<string>([
      ...this.model.EntityTypes.flatMap((e) => {
        const typeName = this.entityTypeName(e);
        return [typeName, `${typeName}Metadata`];
      }),
      ...this.model.EnumTypes.map((e) => toSafeIdentifier(e.Name)),
      ...this.model.ComplexTypes.map((c) => toSafeIdentifier(c.Name)),
      ...[...this.writeTypeNames.values()].flatMap((n) => [n.create, n.update]),
      ...[...this.formNames.values()].flatMap((n) => [n.attributes, n.controls, n.context]),
      ...this.columnTypeNames.values(),
      ...this.outputNames.values(),
      ...(this.config.typedClient === true ? [TYPED_CLIENT, TYPED_CLIENT_FACTORY] : []),
    ]);
    for (const entity of this.model.EntityTypes) {
      const typeName = this.entityTypeName(entity);
      const forms = (entity.Forms ?? []).map((form) => {
        const stem = `${typeName}${form.Kind === "main" ? "Main" : "QuickCreate"}_${pascalCase(form.Name)}`;
        let candidate = this.formLayoutBaseNames(stem);
        const all = (n: FormLayoutNames): string[] => [n.attributes, n.controls, n.tabs, n.context];
        for (let i = 2; all(candidate).some((n) => taken.has(n)); i++) {
          candidate = this.formLayoutBaseNames(`${stem}_${String(i)}`);
        }
        for (const name of all(candidate)) taken.add(name);
        return candidate;
      });
      names.set(entity, forms);
    }
    return names;
  }

  /** The four type names of a form layout, from its stem. */
  private formLayoutBaseNames(stem: string): FormLayoutNames {
    return {
      attributes: `${stem}Attributes`,
      controls: `${stem}Controls`,
      tabs: `${stem}Tabs`,
      context: `${stem}FormContext`,
    };
  }

  /**
   * The members of an entity's create or update type (#347): the columns valid for it
   * (`IsValidForCreate` / `IsValidForUpdate`), and the lookups valid for it, keyed by the
   * navigation property they are bound through and typed `EntityReference`.
   */
  private writeColumns(
    entity: EntityType,
    mode: "create" | "update",
    imports: ImportCollector,
    selfName: string
  ): Array<{ key: string; type: string; doc: string }> {
    const valid = (item: { IsValidForCreate?: boolean; IsValidForUpdate?: boolean }) =>
      mode === "create" ? item.IsValidForCreate === true : item.IsValidForUpdate === true;
    const columns: Array<{ key: string; type: string; doc: string }> = [];
    const keys = new Set<string>();
    for (const prop of entity.Properties) {
      if (!valid(prop) || keys.has(prop.Name)) continue;
      keys.add(prop.Name);
      const type = this.formatType(prop.TypeScriptType, "entities", imports, selfName);
      columns.push({
        key: prop.Name,
        type: prop.Nullable ? `${type} | null` : type,
        // The template's fallback for the interface: the description, display name or logical name
        doc: [prop.Description, prop.DisplayName, prop.LogicalName].find((t) => t) ?? "",
      });
    }
    for (const nav of entity.NavigationProperties) {
      if (nav.LookupAttribute === undefined || !valid(nav) || keys.has(nav.Name)) continue;
      keys.add(nav.Name);
      imports.type("EntityReference", RUNTIME_PACKAGE);
      const targets = nav.LookupTargets?.length ? nav.LookupTargets : [nav.TargetType];
      columns.push({
        key: nav.Name,
        type: "EntityReference | null",
        doc: `Lookup ${nav.LookupAttribute} (${targets.join(", ")}): a reference, sent as ${nav.Name}@odata.bind`,
      });
    }
    return columns;
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
      await this.emit(
        path.join(internal, `${ACTION_BODY_MODULE}${this.fileSuffix}.ts`),
        actionBodySource(tables, RUNTIME_PACKAGE, `../metadata${this.fileSuffix}.js`)
      );
    }
  }

  /** What the actions' request bodies can hold that has to be converted (#361). */
  private get actionBodyTables(): ActionBodyTables {
    this.actionBodyTablesCache ??= actionBodyTables(this.model);
    return this.actionBodyTablesCache;
  }

  /** The enums the functions' complex and collection parameters can hold (#358). */
  private get functionParameterTables(): ActionBodyTables {
    this.functionParameterTablesCache ??= actionBodyTables(this.model, "functions");
    return this.functionParameterTablesCache;
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

    // The parameterValue() helper the functions use, when one does (#358)
    const tables = this.functionParameterTables;
    const used = this.model.Functions.some((f) =>
      f.Parameters.some((p) => {
        const kind = this.model.getStructuralType(p.Type);
        return (
          (kind === "ComplexType" || kind === "Collection") &&
          bodyValueType(tables, p.Type) !== undefined
        );
      })
    );
    if (used) {
      const internal = path.join(this.outputRoot, "internal");
      await fs.mkdir(internal, { recursive: true });
      await this.emit(
        path.join(internal, `${FUNCTION_PARAMETERS_MODULE}${this.fileSuffix}.ts`),
        functionParametersSource(tables)
      );
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
${this.formContext ? "export * from './forms/index.js';\n" : ""}${
      this.config.typedClient === true ? `export * from './client${suffix}.js';\n` : ""
    }`;
    await this.emit(rootIndexPath, rootIndexContent);
    if (this.formContext) {
      await this.outputFolderIndex(
        "forms",
        this.model.EntityTypes.flatMap((e) => {
          const typeName = this.entityTypeName(e);
          return this.formLayouts ? [`${typeName}Form`, `${typeName}Forms`] : [`${typeName}Form`];
        })
      );
    }

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

    await this.emit(indexPath, exports + "\n");
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
   *   that wasn't set: Dataverse answers 204 although the CSDL says `Nullable="false"`);
   * - an operation in `NO_CONTENT_OPERATIONS` (`UpsertMultiple`), which Dataverse answers 204
   *   although the CSDL declares a primitive or complex return: `<Type> | null`, `null` for the
   *   204 (a body, if one ever comes, is read as above).
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
    label: string,
    operation: string
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
    const enumType = this.model.EnumTypes.find((e) => e.Name === ref);
    if (ref !== undefined) {
      if (enumType) element = "enum";
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
    // An enum value is read as its member name: the enum's type, whose values are the names
    // (#479), or a string for a flags enum (`"ReadAccess, WriteAccess"`)
    const enumValue = (): string =>
      enumType?.IsCsdlEnum === true && enumType.IsFlags !== true ? resolved() : "string";
    // strictNulls: the CSDL leaves the value (or a collection's items) nullable
    const orNull = this.strictNulls && nullable === true && element !== "entity";
    // Dataverse answers 204 although the CSDL declares the return (a primitive or complex value)
    const noContent =
      !returnType.isArray && element !== "entity" && isNoContentOperation(operation);
    const NULLABLE_DOC =
      ' * `null` for a null value or a 204 No Content: the CSDL doesn\'t declare the return `Nullable="false"`.\n';

    let doc = `/**\n * Response from the ${toDocText(label)}.\n *\n`;
    let declaration: string;
    let kind: "primitive" | "collection" | "complex" | "entity";
    if (returnType.isArray) {
      kind = "collection";
      let item: string;
      if (element === "enum") item = enumValue();
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
      if (noContent) doc += noContentDoc(operation);
      else if (orNull) doc += NULLABLE_DOC;
      if (orNull || noContent) {
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
      if (noContent) doc += noContentDoc(operation);
      else if (orNull) doc += NULLABLE_DOC;
      const value = element === "enum" ? enumValue() : resolved();
      declaration = `export type ${name} = ${orNull || noContent ? `${value} | null` : value};\n`;
    }

    const wrapped = `((await response.json()) as { value: ${name} }).value`;
    const body = `(await response.json()) as ${name}`;
    let parse = `  async parseResponse(response: Response): Promise<${name}> {\n`;
    if (noContent) {
      parse +=
        "    // Dataverse answers 204 No Content although the CSDL declares a return type\n" +
        "    if (response.status === 204) return null;\n";
    }
    switch (kind) {
      case "primitive":
        if (orNull && !noContent) parse += "    if (response.status === 204) return null;\n";
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
        if (orNull && !noContent) parse += "    if (response.status === 204) return null;\n";
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
    // An action parameter that can hold an enum or an entity goes through bodyValue() (#361); a
    // function's complex or collection parameter that can hold an enum goes through
    // parameterValue() before it's written as JSON (#358).
    const bodyValueTypeOf = (param: ParameterType): string | undefined => {
      if (!isFunction) return bodyValueType(this.actionBodyTables, param.Type);
      const kind = kindOf(param);
      return kind === "ComplexType" || kind === "Collection"
        ? bodyValueType(this.functionParameterTables, param.Type)
        : undefined;
    };
    const helperName = isFunction ? "parameterValue" : "bodyValue";
    if (params.some((p) => bodyValueTypeOf(p) !== undefined)) {
      const module = isFunction ? FUNCTION_PARAMETERS_MODULE : ACTION_BODY_MODULE;
      imports.value(helperName, `../internal/${module}${this.fileSuffix}.js`);
    }
    /** The value sent for a parameter: `this.parameters.X`, through the helper when needed. */
    const bodyExpression = (param: ParameterType): string => {
      const value = `this.parameters${access(param.Name)}`;
      const type = bodyValueTypeOf(param);
      return type === undefined ? value : `${helperName}(${value}, ${JSON.stringify(type)})`;
    };

    // The record or collection a bound operation is called on: the first constructor argument.
    let binding: ConstructorParameter | undefined;
    let bindingDoc = "";
    let target = "";
    if (op.IsBound && op.BindingEntity) {
      const set = op.BindingEntitySetName;
      if (op.IsCollectionBound) {
        if (set) {
          target = `/${set}`;
        } else {
          binding = { name: "entitySetName", type: "string" };
          bindingDoc =
            'The first argument is the entity set to call it on, for example "accounts".';
          target = "/${this.entitySetName}";
        }
      } else if (set) {
        imports.value("formatParameterAlias", RUNTIME_PACKAGE);
        const idName = `${toSafeIdentifier(op.BindingEntity)}Id`;
        binding = { name: idName, type: "string" };
        bindingDoc = `The first argument is the id of the ${toDocText(op.BindingEntity)} record to call it on.`;
        target = `/${set}(\${formatParameterAlias(this.${idName}, "Edm.Guid")})`;
      } else {
        imports.value("formatRecordPath", RUNTIME_PACKAGE);
        imports.type("EntityReference", RUNTIME_PACKAGE);
        binding = { name: "target", type: "EntityReference" };
        bindingDoc = "The first argument is the record to call it on, with its entitySetName.";
        target = "/${formatRecordPath(this.target)}";
      }
    }
    const operationPath = op.IsBound
      ? `${target}/Microsoft.Dynamics.CRM.${op.Name}`
      : `/${op.Name}`;
    if (isFunction && params.length > 0) imports.value("formatParameterAlias", RUNTIME_PACKAGE);

    const parametersName = `${className}Parameters`;
    const optional = params.every((p) => p.Nullable === true);
    const constructorParameters: ConstructorParameter[] = [
      ...(binding ? [binding] : []),
      ...(params.length > 0
        ? [
            {
              name: "parameters",
              type: parametersName,
              ...(optional ? { defaultValue: "{}" } : {}),
            },
          ]
        : []),
    ];
    // As parameter properties, for custom templates written before constructorParameters
    const constructorArguments = constructorParameters.map(
      (p) =>
        `public readonly ${p.name}: ${p.type}${p.defaultValue !== undefined ? ` = ${p.defaultValue}` : ""}`
    );

    return {
      ...this.operationReturn(
        op.ReturnType,
        op.ReturnTypeNullable,
        folder,
        imports,
        className,
        `${op.Name} ${isFunction ? "function" : "action"}`,
        op.Name
      ),
      bindingDoc,
      constructorArguments,
      constructorParameters,
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
      ...[...this.writeTypeNames.values()].flatMap((n) => [n.create, n.update]),
      ...[...this.formNames.values()].flatMap((n) => [n.attributes, n.controls, n.context]),
      ...this.columnTypeNames.values(),
      ...(this.config.typedClient === true ? [TYPED_CLIENT, TYPED_CLIENT_FACTORY] : []),
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
    body: string,
    header = ""
  ): Promise<void> {
    const importBlock = imports.render();
    const content =
      header + (importBlock ? `${importBlock}\n\n${body.trimStart()}` : body.trimStart());
    await this.emit(path.join(dir, `${name}${this.fileSuffix}.ts`), content);
  }

  /** Write a generated file and record it (for incremental generation's stamp). */
  private async emit(file: string, content: string): Promise<void> {
    await fs.writeFile(file, content, "utf-8");
    this.written.add(path.relative(this.outputRoot, file).split(path.sep).join("/"));
  }

  /** A template: the configuration's `templates` directory's, else the built-in one (#347). */
  private async loadTemplate(name: TemplateName): Promise<string> {
    return await loadTemplate(name, this.config.templates);
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
