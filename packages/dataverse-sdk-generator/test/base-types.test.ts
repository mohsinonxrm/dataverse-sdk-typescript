/**
 * #360: an entity type's base type. In `$metadata` the activity tables (`email`, `task`, …) have
 * `BaseType="mscrm.activitypointer"` and leave out the columns they inherit, so they are merged in
 * (stopping at `crmbaseentity`). With no `entities` list, only types that derive from
 * `crmbaseentity` are tables (`EntityDefinitions` and the other metadata sets are not), and a table
 * RetrieveMetadataChanges doesn't know is skipped with a warning instead of failing the run.
 */
import { afterAll, describe, expect, it } from "vitest";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { SchemaModel } from "../src/schema-model.js";
import { TypescriptGenerator } from "../src/typescript-generator.js";
import type { DataverseGenConfig } from "../src/types.js";
import { createFixtureMetadataService } from "./fixtures/typecheck-metadata.js";

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// Generated code imports the runtime packages, so it is written below this package's node_modules.
const scratchRoot = path.join(packageRoot, "node_modules", ".cache", "base-types");
const outputDirs: string[] = [];

afterAll(async () => {
  for (const dir of outputDirs) await fs.rm(dir, { recursive: true, force: true });
});

const baseConfig: DataverseGenConfig = { environmentUrl: "https://contoso.crm.dynamics.com" };

async function modelFor(config: Partial<DataverseGenConfig>): Promise<SchemaModel> {
  const model = new SchemaModel(createFixtureMetadataService(), { ...baseConfig, ...config });
  await model.generate();
  return model;
}

/** Generate `config` and type-check the output under strict settings. */
async function generateAndTypecheck(
  config: Partial<DataverseGenConfig>
): Promise<{ dir: string; diagnostics: string[] }> {
  await fs.mkdir(scratchRoot, { recursive: true });
  const dir = await fs.mkdtemp(path.join(scratchRoot, "out-"));
  outputDirs.push(dir);
  const fullConfig: DataverseGenConfig = { ...baseConfig, ...config, output: { outputRoot: dir } };
  const model = new SchemaModel(createFixtureMetadataService(), fullConfig);
  await model.generate();
  await new TypescriptGenerator(model, fullConfig).generate();

  const entries = await fs.readdir(dir, { withFileTypes: true, recursive: true });
  const files = entries
    .filter((e) => e.isFile() && e.name.endsWith(".ts"))
    .map((e) => path.join(e.parentPath, e.name));
  const program = ts.createProgram(files, {
    strict: true,
    noEmit: true,
    target: ts.ScriptTarget.ES2022,
    lib: ["lib.es2022.d.ts", "lib.dom.d.ts"],
    module: ts.ModuleKind.NodeNext,
    moduleResolution: ts.ModuleResolutionKind.NodeNext,
    verbatimModuleSyntax: true,
    isolatedModules: true,
    noUnusedLocals: true,
    noUnusedParameters: true,
    skipLibCheck: true,
    types: [],
  });
  const diagnostics = ts.getPreEmitDiagnostics(program).map((d) => {
    const message = ts.flattenDiagnosticMessageText(d.messageText, "\n");
    if (!d.file || d.start === undefined) return message;
    const { line } = d.file.getLineAndCharacterOfPosition(d.start);
    return `${path.relative(dir, d.file.fileName)}:${String(line + 1)} ${message}`;
  });
  return { dir, diagnostics };
}

describe("#360: inherited columns", () => {
  it("an activity gets the columns and navigation properties of activitypointer", async () => {
    const model = await modelFor({ entities: ["email"] });
    const email = model.EntityTypes.find((e) => e.LogicalName === "email");
    const columns = email?.Properties.map((p) => p.Name) ?? [];
    for (const column of [
      "activityid",
      "subject",
      "description",
      "scheduledend",
      "_regardingobjectid_value",
      "_ownerid_value",
      "sender",
      "directioncode",
    ]) {
      expect(columns, column).toContain(column);
    }
    // Each column once, in name order (the org's $metadata doesn't fix the order)
    expect(new Set(columns).size).toBe(columns.length);
    expect(columns).toEqual([...columns].sort());
    // email has no Key of its own: activitypointer's
    expect(email?.KeyName).toBe("activityid");
    expect(email?.Properties.find((p) => p.Name === "subject")).toMatchObject({
      SchemaName: "Subject",
      AttributeType: "String",
    });

    const navigation = email?.NavigationProperties ?? [];
    expect(navigation.find((n) => n.Name === "ownerid")).toMatchObject({ TargetType: "principal" });
    // regardingobjectid_account (inherited), _contact (inherited) and _account_email (own) are
    // one polymorphic lookup
    expect(navigation.find((n) => n.Name === "regardingobjectid")).toMatchObject({
      IsPolymorphic: true,
      Targets: ["account", "contact"],
    });
    expect(navigation.some((n) => n.Name.startsWith("regardingobjectid_"))).toBe(false);
  });

  it("an activity that declares its own key and columns keeps them", async () => {
    const model = await modelFor({ entities: ["task"] });
    const columns = model.EntityTypes[0].Properties.map((p) => p.Name);
    // Its own percentcomplete and the inherited columns, each once, in name order
    expect(columns).toEqual([
      "_ownerid_value",
      "_regardingobjectid_value",
      "activityid",
      "description",
      "percentcomplete",
      "scheduledend",
      "subject",
    ]);
  });

  it("the generated interface and metadata have the inherited columns", async () => {
    const { dir, diagnostics } = await generateAndTypecheck({ entities: ["email", "account"] });
    expect(diagnostics).toEqual([]);
    const email = await fs.readFile(path.join(dir, "entities", "Email.ts"), "utf-8");
    expect(email).toContain("  subject?: string | null;");
    expect(email).toContain("  scheduledend?: string | null;");
    // contact isn't generated, so the lookup is IEntity
    expect(email).toContain("  regardingobjectid?: IEntity | EntityReference;");
    expect(email).toMatch(/attributeTypes: \{[^}]*\n {4}subject: "Edm\.String",/);
    expect(email).toContain('primaryIdAttribute: "activityid",');
  }, 60_000);

  it("listing a type that isn't a table still fails", async () => {
    const model = await modelFor({ entities: ["entitymetadata"] }).catch((e: unknown) => e);
    expect(model).toBeInstanceOf(Error);
    expect((model as Error).message).toContain("entitymetadata is not a Dataverse entity");
  });
});

describe("#360: all-tables mode", () => {
  it("generates the tables only: no metadata types, and a table RetrieveMetadataChanges doesn't know is skipped with a warning", async () => {
    const model = await modelFor({ entities: [] });
    expect(model.EntityTypes.map((e) => e.LogicalName).sort()).toEqual([
      "account",
      "contact",
      "email",
      "entity",
      "import",
      "opportunity",
      "opportunityclose",
      "task",
    ]);
    expect(model.Warnings).toEqual([
      "Not generated: contoso_retired. RetrieveMetadataChanges returns no table metadata for it.",
    ]);
    // References to them are still typed (as IEntity)
    for (const name of ["EntityMetadata", "contoso_retired", "activitypointer"]) {
      expect(model.AllEntityTypeNames.has(name), name).toBe(true);
    }
  });

  it("the output type-checks, the entity table included", async () => {
    const { dir, diagnostics } = await generateAndTypecheck({ entities: [] });
    expect(diagnostics).toEqual([]);
    // The entity table's metadata const is EntityMetadata, so the runtime type is aliased (L4)
    const entity = await fs.readFile(path.join(dir, "entities", "Entity.ts"), "utf-8");
    expect(entity).toContain(
      'import type { EntityMetadata as RuntimeEntityMetadata, IEntity } from "@mohsinonxrm/dataverse-sdk-entities-runtime";'
    );
    expect(entity).toContain("export const EntityMetadata: RuntimeEntityMetadata = {");
    const metadata = await fs.readFile(path.join(dir, "metadata.ts"), "utf-8");
    expect(metadata).toContain(
      "export const EntityMetadataCache: Record<string, RuntimeEntityMetadata> = {"
    );
    const account = await fs.readFile(path.join(dir, "entities", "Account.ts"), "utf-8");
    expect(account).toContain("export const AccountMetadata: EntityMetadata = {");
  }, 60_000);
});
