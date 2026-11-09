/**
 * #244: an entity's generated members must have unique names. `systemuser` has a single-valued
 * `createdby` and collection navigation properties named `createdby_<table>` (the other side of
 * other tables' `createdby` lookups); these were merged into a second `createdby`, so the output
 * failed strict `tsc`.
 */
import { afterAll, describe, expect, it } from "vitest";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { SchemaModel } from "../src/schema-model.js";
import { TypescriptGenerator } from "../src/typescript-generator.js";
import type { MetadataService } from "../src/metadata-service.js";
import type { DataverseGenConfig } from "../src/types.js";

const EDMX = `<?xml version="1.0" encoding="utf-8"?>
<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx">
  <edmx:DataServices>
    <Schema Namespace="Microsoft.Dynamics.CRM" Alias="mscrm" xmlns="http://docs.oasis-open.org/odata/ns/edm">
      <EntityType Name="crmbaseentity" Abstract="true" />
      <EntityType Name="systemuser" BaseType="mscrm.crmbaseentity">
        <Key><PropertyRef Name="systemuserid" /></Key>
        <Property Name="systemuserid" Type="Edm.Guid" />
        <Property Name="fullname" Type="Edm.String" Unicode="false" />
        <Property Name="_createdby_value" Type="Edm.Guid" />
        <Property Name="_modifiedby_value" Type="Edm.Guid" />
        <NavigationProperty Name="createdby" Type="mscrm.systemuser" Nullable="false" Partner="lk_systemuserbase_createdby" />
        <NavigationProperty Name="modifiedby" Type="mscrm.systemuser" Nullable="false" Partner="lk_systemuserbase_modifiedby" />
        <NavigationProperty Name="lk_systemuserbase_createdby" Type="Collection(mscrm.systemuser)" Partner="createdby" />
        <NavigationProperty Name="createdby_sdkmessage" Type="Collection(mscrm.sdkmessage)" Partner="createdby" />
        <NavigationProperty Name="createdby_connection" Type="Collection(mscrm.sdkmessage)" Partner="createdby" />
        <NavigationProperty Name="modifiedby_sdkmessage" Type="Collection(mscrm.sdkmessage)" Partner="modifiedby" />
      </EntityType>
      <EntityType Name="sdkmessage" BaseType="mscrm.crmbaseentity">
        <Key><PropertyRef Name="sdkmessageid" /></Key>
        <Property Name="sdkmessageid" Type="Edm.Guid" />
        <Property Name="_createdby_value" Type="Edm.Guid" />
        <NavigationProperty Name="createdby" Type="mscrm.systemuser" Nullable="false" Partner="createdby_sdkmessage" />
      </EntityType>
      <EntityContainer Name="System">
        <EntitySet Name="systemusers" EntityType="mscrm.systemuser" />
        <EntitySet Name="sdkmessages" EntityType="mscrm.sdkmessage" />
      </EntityContainer>
    </Schema>
  </edmx:DataServices>
</edmx:Edmx>`;

const METADATA: Record<string, unknown> = {
  systemuser: {
    EntityMetadata: [
      {
        LogicalName: "systemuser",
        SchemaName: "SystemUser",
        EntitySetName: "systemusers",
        Keys: [],
        Attributes: [
          { LogicalName: "fullname", SchemaName: "FullName", AttributeType: "String" },
          {
            LogicalName: "createdby",
            SchemaName: "CreatedBy",
            AttributeType: "Lookup",
            Targets: ["systemuser"],
          },
          {
            LogicalName: "modifiedby",
            SchemaName: "ModifiedBy",
            AttributeType: "Lookup",
            Targets: ["systemuser"],
          },
        ],
      },
    ],
  },
  sdkmessage: {
    EntityMetadata: [
      {
        LogicalName: "sdkmessage",
        SchemaName: "SdkMessage",
        EntitySetName: "sdkmessages",
        Keys: [],
        Attributes: [
          {
            LogicalName: "createdby",
            SchemaName: "CreatedBy",
            AttributeType: "Lookup",
            Targets: ["systemuser"],
          },
        ],
      },
    ],
  },
};

const service = {
  getEdmxMetadata: () => Promise.resolve(EDMX),
  getEntityMetadata: (name: string) => Promise.resolve(METADATA[name] ?? { EntityMetadata: [] }),
} as unknown as MetadataService;

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const scratchRoot = path.join(packageRoot, "node_modules", ".cache", "unique-members");
const outputDirs: string[] = [];

afterAll(async () => {
  for (const dir of outputDirs) await fs.rm(dir, { recursive: true, force: true });
});

async function generate(): Promise<{ dir: string; model: SchemaModel }> {
  await fs.mkdir(scratchRoot, { recursive: true });
  const outputRoot = await fs.mkdtemp(path.join(scratchRoot, "out-"));
  outputDirs.push(outputRoot);
  const config: DataverseGenConfig = {
    environmentUrl: "https://contoso.crm.dynamics.com",
    entities: ["systemuser", "sdkmessage"],
    output: { outputRoot },
  };
  const model = new SchemaModel(service, config);
  await model.generate();
  await new TypescriptGenerator(model, config).generate();
  return { dir: outputRoot, model };
}

describe("unique member names (#244)", () => {
  it("keeps the single-valued lookup and the collections apart", async () => {
    const { model } = await generate();
    const user = model.EntityTypes.find((e) => e.LogicalName === "systemuser");
    const names = [
      ...(user?.Properties.map((p) => p.Name) ?? []),
      ...(user?.NavigationProperties.map((n) => n.Name) ?? []),
    ];
    expect(names.filter((n, i) => names.indexOf(n) !== i)).toEqual([]);

    const createdby = user?.NavigationProperties.find((n) => n.Name === "createdby");
    expect(createdby?.IsCollection).toBe(false);
    expect(createdby?.TargetType).toBe("systemuser");
    expect(user?.NavigationProperties.map((n) => n.Name)).toEqual(
      expect.arrayContaining(["createdby_sdkmessage", "createdby_connection", "modifiedby"])
    );
  });

  it("generated SystemUser.ts type-checks under strict settings", async () => {
    const { dir } = await generate();
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
      noImplicitOverride: true,
      skipLibCheck: true,
      types: [],
    });
    const problems = ts.getPreEmitDiagnostics(program).map((d) => {
      const message = ts.flattenDiagnosticMessageText(d.messageText, "\n");
      const line =
        d.file && d.start !== undefined
          ? d.file.getLineAndCharacterOfPosition(d.start).line + 1
          : 0;
      return `${d.file ? path.basename(d.file.fileName) : ""}:${String(line)} ${message}`;
    });
    expect(problems).toEqual([]);
  }, 60_000);
});
