/**
 * #230: the metadata generator must emit what #209 changed by hand in
 * packages/dataverse-sdk-metadata, or the next regeneration reverts it:
 * - string-valued enum const objects with a union type (the Web API rejects numeric members);
 * - `RelationshipType`, `SecurityTypes` and `OptionSetType` typed with their enums;
 * - the `*AttributeMetadataCreate` types and the `AttributeMetadataCreateTypes` union;
 * - `@odata.type` on `MetadataBase`, `Label` and `LocalizedLabel`.
 *
 * The drift guards at the end compare the generator with the committed package, so a hand edit
 * there that isn't made here (or the other way round) fails CI.
 */
import { mkdtemp, readFile, readdir, rm } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { parseEdmx } from "../src/parsers/edmx-parser.js";
import { canonicalizeCsdl } from "../src/parsers/canonical.js";
import {
  generateEnumTypeDeclaration,
  METADATA_OPERATIONS,
  metadataTypeNames,
  generateMetadataTypes,
} from "../src/generators/metadata-generator.js";
import { METADATA_HELPER_FILES } from "../src/generators/metadata-helpers.js";
import { typecheck } from "./typecheck.js";

const OUT_ROOT = fileURLToPath(new URL(".", import.meta.url));
const COMMITTED = fileURLToPath(
  new URL("../../../packages/dataverse-sdk-metadata/src/types", import.meta.url)
);

// The real definitions from a live $metadata, trimmed to what these tests need.
const EDMX = `<?xml version="1.0" encoding="utf-8"?>
<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx">
  <edmx:DataServices>
    <Schema Namespace="Microsoft.Dynamics.CRM" Alias="mscrm" xmlns="http://docs.oasis-open.org/odata/ns/edm">
      <EntityType Name="crmmodelbaseentity" Abstract="true" />
      <EntityType Name="MetadataBase" BaseType="mscrm.crmmodelbaseentity" Abstract="true">
        <Key><PropertyRef Name="MetadataId" /></Key>
        <Property Name="MetadataId" Type="Edm.Guid" />
        <Property Name="HasChanged" Type="Edm.Boolean" />
      </EntityType>
      <EntityType Name="EntityMetadata" BaseType="mscrm.MetadataBase">
        <Property Name="OwnershipType" Type="mscrm.OwnershipTypes" />
        <Property Name="DisplayName" Type="mscrm.Label" />
      </EntityType>
      <ComplexType Name="Label">
        <Property Name="LocalizedLabels" Type="Collection(mscrm.LocalizedLabel)" />
        <Property Name="UserLocalizedLabel" Type="mscrm.LocalizedLabel" />
      </ComplexType>
      <ComplexType Name="LocalizedLabel">
        <Property Name="Label" Type="Edm.String" Unicode="false" />
        <Property Name="LanguageCode" Type="Edm.Int32" />
        <Property Name="IsManaged" Type="Edm.Boolean" />
        <Property Name="MetadataId" Type="Edm.Guid" />
        <Property Name="HasChanged" Type="Edm.Boolean" />
      </ComplexType>
      <EnumType Name="OwnershipTypes" IsFlags="true">
        <Member Name="None" Value="0" />
        <Member Name="UserOwned" Value="1" />
        <Member Name="TeamOwned" Value="2" />
        <Member Name="BusinessOwned" Value="4" />
        <Member Name="OrganizationOwned" Value="8" />
        <Member Name="BusinessParented" Value="16" />
        <Member Name="Filtered" Value="32" />
      </EnumType>
    </Schema>
  </edmx:DataServices>
</edmx:Edmx>`;

let dir: string;
const read = (name: string): Promise<string> => readFile(join(dir, `${name}.ts`), "utf8");
/**
 * Prettier only re-wraps lines and quotes import paths in these files, so comparing with those
 * normalised is exact enough. (The byte-for-byte check is CI's: `regen` rewrites the package from
 * the committed `$metadata` snapshot and fails on any diff, #295.)
 */
const squash = (code: string): string =>
  code
    .replace(/from '([^']+)'/g, 'from "$1"')
    .replace(/\s+/g, " ")
    .trim();

beforeAll(async () => {
  vi.spyOn(console, "log").mockImplementation(() => undefined);
  dir = await mkdtemp(join(OUT_ROOT, ".gen-metadata-test-"));
  // Canonical order, as `regen` generates the committed package from the snapshot (#295)
  await generateMetadataTypes(canonicalizeCsdl(parseEdmx(EDMX)), dir, false);
});

afterAll(async () => {
  vi.restoreAllMocks();
  await rm(dir, { recursive: true, force: true });
});

describe("metadata generator (#230)", () => {
  it("emits enums as const objects whose values are the member names", async () => {
    const code = await read("OwnershipTypes");
    expect(code).not.toContain("export enum");
    expect(code).toContain('  /** 1 */\n  UserOwned: "UserOwned",\n');
    expect(code).toContain("} as const;");
    expect(code).toContain(
      "export type OwnershipTypes = (typeof OwnershipTypes)[keyof typeof OwnershipTypes];"
    );

    const mod = (await import(pathToFileURL(join(dir, "OwnershipTypes.ts")).href)) as {
      OwnershipTypes: Record<string, unknown>;
    };
    expect(mod.OwnershipTypes.UserOwned).toBe("UserOwned");
    expect(Object.entries(mod.OwnershipTypes).every(([k, v]) => k === v)).toBe(true);
  });

  it("types enum-valued properties as the member-name union, so numbers don't compile", async () => {
    const errors = await typecheck(
      dir,
      "use-enum.ts",
      `import { OwnershipTypes } from "./OwnershipTypes.js";
import type { EntityMetadata } from "./EntityMetadata.js";
const byName: EntityMetadata = { OwnershipType: "UserOwned" };
const byMember: EntityMetadata = { OwnershipType: OwnershipTypes.TeamOwned };
// @ts-expect-error the Web API rejects numeric enum values
const byNumber: EntityMetadata = { OwnershipType: 1 };
export { byName, byMember, byNumber };
`
    );
    expect(errors).toEqual([]);
  });

  it("adds @odata.type to MetadataBase, Label and LocalizedLabel, and requires label text", async () => {
    expect(await read("MetadataBase")).toContain('  "@odata.type"?: string;\n');
    expect(await read("Label")).toContain('"@odata.type"?: "Microsoft.Dynamics.CRM.Label";');
    expect(await read("LocalizedLabel")).toContain(
      '"@odata.type"?: "Microsoft.Dynamics.CRM.LocalizedLabel";'
    );

    const errors = await typecheck(
      dir,
      "use-label.ts",
      `import type { Label } from "./Label.js";
import type { LocalizedLabel } from "./LocalizedLabel.js";
const label: Label = {
  "@odata.type": "Microsoft.Dynamics.CRM.Label",
  LocalizedLabels: [
    { "@odata.type": "Microsoft.Dynamics.CRM.LocalizedLabel", Label: "Name", LanguageCode: 1033 },
  ],
  UserLocalizedLabel: null,
};
// @ts-expect-error a localized label needs its text
const noText: LocalizedLabel = { LanguageCode: 1033 };
export { label, noText };
`
    );
    expect(errors).toEqual([]);
  });

  it("types the relationship and option set bases' enum properties with their enums", async () => {
    const relationship = await read("RelationshipMetadataBase");
    expect(relationship).toContain("RelationshipType?: RelationshipType;");
    expect(relationship).toContain("SecurityTypes?: SecurityTypes;");
    expect(await read("OptionSetMetadataBase")).toContain("OptionSetType?: OptionSetType;");
  });

  it("emits the column create types and their union discriminated on @odata.type", async () => {
    const code = await read("AttributeMetadataCreateTypes");
    expect(code).toContain("export type StringAttributeMetadataCreate = AttributeMetadataCreate<");
    expect(code).toContain("export type AttributeMetadataCreateTypes =");
    expect(code).toContain('"@odata.type": MetadataODataType<Name>;');
    const index = await read("index");
    expect(index).toContain("export * from './AttributeMetadataCreateTypes.js';");
  });
});

describe("metadata generator matches the committed package (#230 drift guard)", () => {
  it("emits every hand-written helper exactly as committed", async () => {
    for (const helper of METADATA_HELPER_FILES) {
      const committed = await readFile(join(COMMITTED, `${helper.name}.ts`), "utf8");
      expect(helper.content, helper.name).toBe(committed);
    }
  });

  it("emits MetadataBase, Label and LocalizedLabel as committed", async () => {
    for (const name of ["MetadataBase", "Label", "LocalizedLabel"]) {
      const committed = await readFile(join(COMMITTED, `${name}.ts`), "utf8");
      expect(squash(await read(name)), name).toBe(squash(committed));
    }
  });

  it("emits every committed enum as committed", async () => {
    const files = (await readdir(COMMITTED)).filter((f) => f.endsWith(".ts"));
    let enums = 0;
    for (const file of files) {
      const committed = await readFile(join(COMMITTED, file), "utf8");
      if (!committed.includes("} as const;")) continue;
      const name = file.slice(0, -3);
      const members = [...committed.matchAll(/\/\*\* (-?\d+) \*\/\s+(\w+): "\w+",/g)].map(
        ([, value, member]) => ({ name: member, value: Number(value) })
      );
      expect(squash(generateEnumTypeDeclaration({ name, members })), name).toBe(squash(committed));
      enums++;
    }
    // Only the enums the metadata types use (#385)
    expect(enums).toBe(23);
  });
});

/**
 * #385: the package exported every Microsoft.Dynamics.CRM complex type and enum (about 1,500
 * unrelated message responses: AI*, Mcp*, ...). It now generates the metadata types: the metadata
 * entity types, the types the helpers import and the parameter and return types of the metadata
 * operations MetadataClient calls, with what they reference and what derives from them.
 */
describe("metadata generator writes only the metadata types (#385)", () => {
  const CLOSURE_EDMX = `<?xml version="1.0" encoding="utf-8"?>
<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx">
  <edmx:DataServices>
    <Schema Namespace="Microsoft.Dynamics.CRM" Alias="mscrm" xmlns="http://docs.oasis-open.org/odata/ns/edm">
      <EntityType Name="crmbaseentity" Abstract="true" />
      <EntityType Name="account" BaseType="mscrm.crmbaseentity" />
      <EntityType Name="crmmodelbaseentity" Abstract="true" />
      <EntityType Name="MetadataBase" BaseType="mscrm.crmmodelbaseentity" Abstract="true">
        <Property Name="MetadataId" Type="Edm.Guid" />
      </EntityType>
      <EntityType Name="EntityMetadata" BaseType="mscrm.MetadataBase">
        <Property Name="OwnershipType" Type="mscrm.OwnershipTypes" />
      </EntityType>
      <ComplexType Name="EntityQueryExpression">
        <Property Name="Criteria" Type="mscrm.MetadataFilterExpression" />
      </ComplexType>
      <ComplexType Name="MetadataFilterExpression">
        <Property Name="FilterOperator" Type="mscrm.LogicalOperator" />
      </ComplexType>
      <ComplexType Name="RetrieveMetadataChangesResponse">
        <Property Name="EntityMetadata" Type="Collection(mscrm.ComplexEntityMetadata)" />
      </ComplexType>
      <ComplexType Name="ComplexEntityMetadata">
        <Property Name="Attributes" Type="Collection(mscrm.ComplexAttributeMetadata)" />
      </ComplexType>
      <ComplexType Name="ComplexAttributeMetadata" />
      <ComplexType Name="ComplexStringAttributeMetadata" BaseType="mscrm.ComplexAttributeMetadata" />
      <ComplexType Name="WhoAmIResponse">
        <Property Name="UserId" Type="Edm.Guid" />
      </ComplexType>
      <ComplexType Name="AIClassifyResponse">
        <Property Name="Rights" Type="mscrm.AccessRights" />
      </ComplexType>
      <EnumType Name="OwnershipTypes"><Member Name="UserOwned" Value="1" /></EnumType>
      <EnumType Name="LogicalOperator"><Member Name="And" Value="0" /></EnumType>
      <EnumType Name="DeletedMetadataFilters"><Member Name="Entity" Value="1" /></EnumType>
      <EnumType Name="AccessRights"><Member Name="ReadAccess" Value="1" /></EnumType>
      <Function Name="RetrieveMetadataChanges">
        <Parameter Name="Query" Type="mscrm.EntityQueryExpression" />
        <Parameter Name="DeletedMetadataFilters" Type="mscrm.DeletedMetadataFilters" />
        <ReturnType Type="mscrm.RetrieveMetadataChangesResponse" Nullable="false" />
      </Function>
      <Function Name="WhoAmI">
        <ReturnType Type="mscrm.WhoAmIResponse" Nullable="false" />
      </Function>
    </Schema>
  </edmx:DataServices>
</edmx:Edmx>`;

  it("starts from the metadata types and operations and follows references and derived types", () => {
    expect([...metadataTypeNames(parseEdmx(CLOSURE_EDMX))].sort()).toEqual([
      "ComplexAttributeMetadata",
      "ComplexEntityMetadata",
      "ComplexStringAttributeMetadata",
      "DeletedMetadataFilters",
      "EntityMetadata",
      "EntityQueryExpression",
      "LogicalOperator",
      "MetadataBase",
      "MetadataFilterExpression",
      "OwnershipTypes",
      "RetrieveMetadataChangesResponse",
      "crmmodelbaseentity",
    ]);
  });

  it("writes and exports no other operation's types, enums or tables", async () => {
    const out = await mkdtemp(join(OUT_ROOT, ".gen-metadata-385-"));
    try {
      await generateMetadataTypes(canonicalizeCsdl(parseEdmx(CLOSURE_EDMX)), out, false);
      const files = await readdir(out);
      expect(files).toContain("RetrieveMetadataChangesResponse.ts");
      for (const name of ["WhoAmIResponse", "AIClassifyResponse", "AccessRights", "account"]) {
        expect(files, name).not.toContain(`${name}.ts`);
      }
      const index = await readFile(join(out, "index.ts"), "utf8");
      expect(index).not.toMatch(/WhoAmIResponse|AIClassifyResponse|AccessRights/);
    } finally {
      await rm(out, { recursive: true, force: true });
    }
  });

  it("names only operations MetadataClient calls", () => {
    expect(METADATA_OPERATIONS).toContain("RetrieveMetadataChanges");
    expect(METADATA_OPERATIONS).not.toContain("WhoAmI");
  });
});
