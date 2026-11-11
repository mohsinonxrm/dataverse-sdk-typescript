/**
 * #347: incremental generation and custom templates.
 *
 * - `output.incremental` keeps the files of a table whose schema model and settings didn't change
 *   (a stamp file records their hashes), regenerates the others, and removes files the previous
 *   run wrote that this one doesn't.
 * - `templates` points at a directory whose templates replace the built-in ones of the same name;
 *   `ejectTemplates()` (`dataverse-gen eject`) copies the built-in ones there.
 */
import { afterAll, describe, expect, it } from "vitest";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import type { RetrieveMetadataChangesResponse } from "../src/metadata-service.js";
import { ejectTemplates, TEMPLATE_NAMES } from "../src/templates.js";
import { SchemaModel } from "../src/schema-model.js";
import { TypescriptGenerator } from "../src/typescript-generator.js";
import type { DataverseGenConfig } from "../src/types.js";
import { fixtureMetadataService, scratchFolders, typecheck } from "./fixtures/compile.js";
import { WRITE_EDMX, WRITE_ENTITY_METADATA } from "./fixtures/write-metadata.js";

const scratch = scratchFolders("incremental-templates");
afterAll(scratch.cleanup);

const MARKER = "// kept from the previous run\n";
const STAMP = ".dataverse-gen-stamp.json";

/** Generate into `outputRoot` and return the generator (for `unchangedTables`). */
async function run(
  outputRoot: string,
  config: Partial<DataverseGenConfig>,
  metadata: Record<string, RetrieveMetadataChangesResponse> = WRITE_ENTITY_METADATA,
  edmx = WRITE_EDMX
): Promise<TypescriptGenerator> {
  const full: DataverseGenConfig = {
    environmentUrl: "https://contoso.crm.dynamics.com",
    entities: ["account", "contact", "systemuser"],
    ...config,
    output: { outputRoot, incremental: true, ...config.output },
  };
  const model = new SchemaModel(fixtureMetadataService(edmx, metadata), full);
  await model.generate();
  const generator = new TypescriptGenerator(model, full);
  await generator.generate();
  return generator;
}

/** Mark generated files, to tell a kept file from a rewritten one. */
async function mark(dir: string, ...files: string[]): Promise<void> {
  for (const file of files) {
    const full = path.join(dir, file);
    await fs.writeFile(full, MARKER + (await fs.readFile(full, "utf-8")), "utf-8");
  }
}

async function isKept(dir: string, file: string): Promise<boolean> {
  return (await fs.readFile(path.join(dir, file), "utf-8")).startsWith(MARKER);
}

async function exists(file: string): Promise<boolean> {
  return fs.access(file).then(
    () => true,
    () => false
  );
}

/** The fixture with one more column on contact. */
function withContactChange(): Record<string, RetrieveMetadataChangesResponse> {
  const contact = structuredClone(WRITE_ENTITY_METADATA.contact);
  contact.EntityMetadata?.[0].Attributes?.push({
    LogicalName: "fullname",
    SchemaName: "FullName",
    AttributeType: "String",
    MaxLength: 999,
  });
  return { ...WRITE_ENTITY_METADATA, contact };
}

describe("incremental generation (#347)", () => {
  it("keeps the tables that didn't change and regenerates the one that did", async () => {
    const dir = await scratch.create();
    const first = await run(dir, {});
    expect(first.unchangedTables).toEqual([]);
    const stamp = JSON.parse(await fs.readFile(path.join(dir, STAMP), "utf-8")) as {
      tables: Record<string, { files: string[] }>;
      files: string[];
    };
    expect(stamp.tables.account.files).toEqual(["entities/Account.ts"]);
    expect(stamp.files).toContain("enums/account_industrycode.ts");

    await mark(dir, "entities/Account.ts", "entities/Contact.ts", "entities/SystemUser.ts");
    const second = await run(dir, {}, withContactChange());
    expect(second.unchangedTables).toEqual(["account", "systemuser"]);
    expect(await isKept(dir, "entities/Account.ts")).toBe(true);
    expect(await isKept(dir, "entities/SystemUser.ts")).toBe(true);
    expect(await isKept(dir, "entities/Contact.ts")).toBe(false);
    expect(await fs.readFile(path.join(dir, "entities/Contact.ts"), "utf-8")).toContain(
      "maxLength: 999"
    );
    // What isn't per table is always written; the output still compiles
    expect(await typecheck(dir)).toEqual([]);
  });

  it("regenerates every table when a setting or a template changes", async () => {
    const dir = await scratch.create();
    await run(dir, {});
    await mark(dir, "entities/Account.ts");
    const changed = await run(dir, { strictNulls: true });
    expect(changed.unchangedTables).toEqual([]);
    expect(await isKept(dir, "entities/Account.ts")).toBe(false);

    const templates = await scratch.create();
    await fs.writeFile(path.join(templates, "enum.ejs"), "export const x = 1;\n", "utf-8");
    await mark(dir, "entities/Account.ts");
    const custom = await run(dir, { strictNulls: true, templates });
    expect(custom.unchangedTables).toEqual([]);
    expect(await isKept(dir, "entities/Account.ts")).toBe(false);
  });

  it("regenerates a table whose file is gone, and removes the files of a table no longer generated", async () => {
    const dir = await scratch.create();
    await run(dir, { formContext: true });
    await fs.rm(path.join(dir, "entities/Account.ts"));
    const again = await run(dir, { formContext: true });
    expect(again.unchangedTables).toEqual(["contact", "systemuser"]);
    expect(await exists(path.join(dir, "entities/Account.ts"))).toBe(true);

    const fewer = await run(dir, { formContext: true, entities: ["account", "systemuser"] });
    expect(await exists(path.join(dir, "entities/Contact.ts"))).toBe(false);
    expect(await exists(path.join(dir, "forms/ContactForm.ts"))).toBe(false);
    expect(await exists(path.join(dir, "entities/Account.ts"))).toBe(true);
    // The set of generated types changed, so every table was regenerated
    expect(fewer.unchangedTables).toEqual([]);
  });

  it("is off by default: no stamp, every file rewritten", async () => {
    const dir = await scratch.create();
    await run(dir, { output: { outputRoot: dir, incremental: false } });
    expect(await exists(path.join(dir, STAMP))).toBe(false);
    await mark(dir, "entities/Account.ts");
    const again = await run(dir, { output: { outputRoot: dir } });
    // `incremental` left out: off
    expect(again.unchangedTables).toEqual([]);
    expect(await isKept(dir, "entities/Account.ts")).toBe(false);
  });
});

/** The settings hash of the stamp in `dir`. */
async function settingsOf(dir: string): Promise<string> {
  return (JSON.parse(await fs.readFile(path.join(dir, STAMP), "utf-8")) as { settings: string })
    .settings;
}

/** `$metadata` with more types declared before the entity container. */
function edmxWith(types: string, edmx = WRITE_EDMX): string {
  return edmx.replace("<EntityContainer", `${types}\n      <EntityContainer`);
}

/** A global enum and a complex type that no table (and no operation) uses. */
const UNRELATED = `<EnumType Name="contoso_unrelatedchoice">
        <Member Name="One" Value="1" />
      </EnumType>
      <ComplexType Name="contoso_UnrelatedShape">
        <Property Name="Label" Type="Edm.String" />
      </ComplexType>`;

/** A `$metadata` enum, and a contact column whose (global) option set is that enum. */
function methodEnum(...members: string[]): string {
  return `<EnumType Name="contoso_method">
        ${members.map((m, i) => `<Member Name="${m}" Value="${String(i + 1)}" />`).join("\n        ")}
      </EnumType>`;
}
const METHOD_EDMX = WRITE_EDMX.replace(
  '<Property Name="fullname" Type="Edm.String" Unicode="false" />',
  '<Property Name="fullname" Type="Edm.String" Unicode="false" />\n        <Property Name="contoso_method" Type="Edm.Int32" />'
);
function withMethodColumn(): Record<string, RetrieveMetadataChangesResponse> {
  const contact = structuredClone(WRITE_ENTITY_METADATA.contact);
  contact.EntityMetadata?.[0].Attributes?.push({
    LogicalName: "contoso_method",
    SchemaName: "contoso_Method",
    AttributeType: "Picklist",
    IsValidForCreate: true,
    IsValidForUpdate: true,
    OptionSet: { Name: "contoso_method", IsGlobal: true },
  });
  return { ...WRITE_ENTITY_METADATA, contact };
}

describe("incremental generation: enums and complex types (#501)", () => {
  it("a global enum or complex type no table uses doesn't regenerate any table", async () => {
    const dir = await scratch.create();
    await run(dir, {});
    const settings = await settingsOf(dir);
    const tables = ["entities/Account.ts", "entities/Contact.ts", "entities/SystemUser.ts"];
    await mark(dir, ...tables);

    // Added: every table kept, the settings hash is the same; the new types are still generated
    const added = await run(dir, {}, WRITE_ENTITY_METADATA, edmxWith(UNRELATED));
    expect(added.unchangedTables).toEqual(["account", "contact", "systemuser"]);
    expect(await settingsOf(dir)).toBe(settings);
    for (const file of tables) expect(await isKept(dir, file)).toBe(true);
    expect(await exists(path.join(dir, "enums/contoso_unrelatedchoice.ts"))).toBe(true);
    expect(await fs.readFile(path.join(dir, "enums/index.ts"), "utf-8")).toContain(
      "contoso_unrelatedchoice"
    );
    expect(await exists(path.join(dir, "complextypes/contoso_UnrelatedShape.ts"))).toBe(true);

    // Changed, then removed: still every table kept; the removed types' files are deleted
    const changed = await run(
      dir,
      {},
      WRITE_ENTITY_METADATA,
      edmxWith(UNRELATED.replace('Value="1"', 'Value="2"'))
    );
    expect(changed.unchangedTables).toEqual(["account", "contact", "systemuser"]);
    const removed = await run(dir, {});
    expect(removed.unchangedTables).toEqual(["account", "contact", "systemuser"]);
    expect(await settingsOf(dir)).toBe(settings);
    for (const file of tables) expect(await isKept(dir, file)).toBe(true);
    expect(await exists(path.join(dir, "enums/contoso_unrelatedchoice.ts"))).toBe(false);
    expect(await exists(path.join(dir, "complextypes/contoso_UnrelatedShape.ts"))).toBe(false);
    expect(await typecheck(dir)).toEqual([]);
  });

  it("a change to an enum a table uses regenerates that table only", async () => {
    // A $metadata enum, used by a contact column
    const dir = await scratch.create();
    const metadata = withMethodColumn();
    await run(dir, {}, metadata, edmxWith(methodEnum("Email", "Phone"), METHOD_EDMX));
    expect(await fs.readFile(path.join(dir, "entities/Contact.ts"), "utf-8")).toContain(
      "contoso_method"
    );
    const settings = await settingsOf(dir);
    await mark(dir, "entities/Account.ts", "entities/Contact.ts", "entities/SystemUser.ts");
    const second = await run(
      dir,
      {},
      metadata,
      edmxWith(methodEnum("Email", "Phone", "Fax"), METHOD_EDMX)
    );
    expect(second.unchangedTables).toEqual(["account", "systemuser"]);
    expect(await settingsOf(dir)).toBe(settings);
    expect(await isKept(dir, "entities/Contact.ts")).toBe(false);
    expect(await isKept(dir, "entities/Account.ts")).toBe(true);
    expect(await fs.readFile(path.join(dir, "enums/contoso_method.ts"), "utf-8")).toContain("Fax");
    expect(await typecheck(dir)).toEqual([]);

    // A table's own choice (a local option set): a new label regenerates only that table
    const relabeled = structuredClone(WRITE_ENTITY_METADATA);
    const industry = relabeled.account.EntityMetadata?.[0].Attributes?.find(
      (a) => a.LogicalName === "industrycode"
    );
    const option = industry?.OptionSet?.Options?.[0];
    if (option) option.Label = { UserLocalizedLabel: { Label: "Bookkeeping", LanguageCode: 1033 } };
    const local = await scratch.create();
    await run(local, {});
    await mark(local, "entities/Account.ts", "entities/Contact.ts");
    const again = await run(local, {}, relabeled);
    expect(again.unchangedTables).toEqual(["contact", "systemuser"]);
    expect(await isKept(local, "entities/Account.ts")).toBe(false);
    expect(await isKept(local, "entities/Contact.ts")).toBe(true);
    expect(await fs.readFile(path.join(local, "enums/account_industrycode.ts"), "utf-8")).toContain(
      "Bookkeeping"
    );
  });

  it("an enum whose name collides with a table's create type regenerates that table", async () => {
    const dir = await scratch.create();
    await run(dir, {});
    await mark(dir, "entities/Account.ts", "entities/Contact.ts");
    const collision = `<EnumType Name="AccountCreate">
        <Member Name="One" Value="1" />
      </EnumType>`;
    const second = await run(dir, {}, WRITE_ENTITY_METADATA, edmxWith(collision));
    // Account's create type is renamed AccountCreate_2; contact and systemuser are kept
    expect(second.unchangedTables).toEqual(["contact", "systemuser"]);
    expect(await fs.readFile(path.join(dir, "entities/Account.ts"), "utf-8")).toContain(
      "AccountCreate_2"
    );
    expect(await isKept(dir, "entities/Contact.ts")).toBe(true);
  });
});

describe("custom templates (#347)", () => {
  it("a template in the templates directory replaces the built-in one; the others stay", async () => {
    const templates = await scratch.create();
    await fs.writeFile(
      path.join(templates, "enum.ejs"),
      [
        "/** <%- doc(enumType.Name) %>, from a custom template */",
        "export enum <%- typeName %> {",
        "<%_ enumType.Members.forEach(function(member){ _%>",
        "  <%- propertyKey(member.Name) %> = <%- Number(member.Value) %>,",
        "<%_ }) _%>",
        "}",
        "",
      ].join("\n"),
      "utf-8"
    );
    const dir = await scratch.create();
    await run(dir, { templates, output: { outputRoot: dir, incremental: false } });

    const industry = await fs.readFile(path.join(dir, "enums", "account_industrycode.ts"), "utf-8");
    expect(industry).toContain("from a custom template");
    expect(industry).toContain("export enum account_industrycode {");
    expect(await fs.readFile(path.join(dir, "entities", "Account.ts"), "utf-8")).toContain(
      "export interface Account extends IEntity"
    );
    expect(await typecheck(dir)).toEqual([]);
  });

  it("ejectTemplates copies the built-in templates, and keeps edited ones unless forced", async () => {
    const dir = path.join(await scratch.create(), "templates");
    const first = await ejectTemplates(dir);
    expect(first.written.map((f) => path.basename(f)).sort()).toEqual([...TEMPLATE_NAMES].sort());
    expect(first.skipped).toEqual([]);
    const builtIn = path.join(import.meta.dirname, "..", "templates", "entity.ejs");
    expect(await fs.readFile(path.join(dir, "entity.ejs"), "utf-8")).toBe(
      await fs.readFile(builtIn, "utf-8")
    );

    await fs.writeFile(path.join(dir, "entity.ejs"), "edited", "utf-8");
    const again = await ejectTemplates(dir);
    expect(again.written).toEqual([]);
    expect(again.skipped).toHaveLength(TEMPLATE_NAMES.length);
    expect(await fs.readFile(path.join(dir, "entity.ejs"), "utf-8")).toBe("edited");

    await ejectTemplates(dir, { force: true });
    expect(await fs.readFile(path.join(dir, "entity.ejs"), "utf-8")).not.toBe("edited");
  });

  it("the ejected templates generate the same output as the built-in ones", async () => {
    const templates = await scratch.create();
    await ejectTemplates(templates);
    const builtIn = await scratch.create();
    const ejected = await scratch.create();
    await run(builtIn, { formContext: true, output: { outputRoot: builtIn, incremental: false } });
    await run(ejected, {
      formContext: true,
      templates,
      output: { outputRoot: ejected, incremental: false },
    });
    for (const file of ["entities/Account.ts", "forms/AccountForm.ts", "metadata.ts"]) {
      expect(await fs.readFile(path.join(ejected, file), "utf-8")).toBe(
        await fs.readFile(path.join(builtIn, file), "utf-8")
      );
    }
  });
});
