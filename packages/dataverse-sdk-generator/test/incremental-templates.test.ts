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
  metadata: Record<string, RetrieveMetadataChangesResponse> = WRITE_ENTITY_METADATA
): Promise<TypescriptGenerator> {
  const full: DataverseGenConfig = {
    environmentUrl: "https://contoso.crm.dynamics.com",
    entities: ["account", "contact", "systemuser"],
    ...config,
    output: { outputRoot, incremental: true, ...config.output },
  };
  const model = new SchemaModel(fixtureMetadataService(WRITE_EDMX, metadata), full);
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
