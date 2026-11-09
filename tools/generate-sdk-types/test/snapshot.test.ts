/**
 * #293: the actions, functions and messages packages couldn't be reproduced. They came from a
 * `$metadata` that wasn't committed, and Dataverse returns `$metadata` in a different order on each
 * fetch (an entity type's properties come back shuffled), so the same schema generated different
 * files. Now the snapshot is committed in a canonical form (`snapshotCsdl`), the generator puts the
 * parsed schema in a canonical order (`canonicalizeCsdl`), and CI regenerates the packages from the
 * snapshot and fails on any diff.
 */
import { mkdtemp, readFile, readdir, rm } from "node:fs/promises";
import { readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { generateFromCsdl } from "../src/index.js";
import { parseEdmx } from "../src/parsers/edmx-parser.js";
import { canonicalizeCsdl } from "../src/parsers/canonical.js";
import { ORG_SPECIFIC_PREFIXES, snapshotCsdl } from "../src/snapshot.js";

const OUT_ROOT = fileURLToPath(new URL(".", import.meta.url));
const SNAPSHOT = fileURLToPath(new URL("../metadata/dataverse-metadata.xml", import.meta.url));

const ACCOUNT_PROPERTIES = [
  `<Property Name="accountid" Type="Edm.Guid" />`,
  `<Property Name="name" Type="Edm.String" />`,
  `<Property Name="revenue" Type="Edm.Decimal" />`,
  `<Property Name="address1_city" Type="Edm.String" />`,
];
const RESPONSE_PROPERTIES = [
  `<Property Name="UserId" Type="Edm.Guid" Nullable="false" />`,
  `<Property Name="BusinessUnitId" Type="Edm.Guid" Nullable="false" />`,
  `<Property Name="OrganizationId" Type="Edm.Guid" Nullable="false" />`,
];
const MEMBERS = [`<Member Name="None" Value="0" />`, `<Member Name="ReadAccess" Value="1" />`];
const OPERATIONS = [
  `<Function Name="WhoAmI"><ReturnType Type="mscrm.WhoAmIResponse" Nullable="false" /></Function>`,
  `<Function Name="RetrieveTotal" IsBound="true"><Parameter Name="entity" Type="mscrm.account" Nullable="false" /><Parameter Name="Field" Type="Edm.String" Nullable="false" /><Parameter Name="Access" Type="mscrm.AccessRights" /><ReturnType Type="Edm.Int32" /></Function>`,
  `<Function Name="RetrieveTotal" IsBound="true"><Parameter Name="entity" Type="mscrm.contact" Nullable="false" /><Parameter Name="Field" Type="Edm.String" Nullable="false" /><ReturnType Type="Edm.Int32" /></Function>`,
  `<Action Name="Ping"><Parameter Name="Zeta" Type="Edm.String" /><Parameter Name="Alpha" Type="Edm.Int32" /><ReturnType Type="mscrm.WhoAmIResponse" /></Action>`,
];

/** An EDMX document with everything in the given order (`reverse`: the other way round). */
function edmx(reverse: boolean): string {
  const order = <T>(list: readonly T[]): T[] => (reverse ? [...list].reverse() : [...list]);
  const types = [
    `<EntityType Name="crmbaseentity" Abstract="true" />`,
    `<EntityType Name="account" BaseType="mscrm.crmbaseentity"><Key><PropertyRef Name="accountid" /></Key>${order(ACCOUNT_PROPERTIES).join("")}</EntityType>`,
    `<EntityType Name="contact" BaseType="mscrm.crmbaseentity"><Key><PropertyRef Name="contactid" /></Key><Property Name="contactid" Type="Edm.Guid" /></EntityType>`,
    `<ComplexType Name="WhoAmIResponse">${order(RESPONSE_PROPERTIES).join("")}</ComplexType>`,
    `<EnumType Name="AccessRights">${order(MEMBERS).join("")}</EnumType>`,
    ...OPERATIONS,
    `<EntityContainer Name="System">${order([
      `<EntitySet Name="accounts" EntityType="Microsoft.Dynamics.CRM.account" />`,
      `<EntitySet Name="contacts" EntityType="Microsoft.Dynamics.CRM.contact" />`,
    ]).join("")}</EntityContainer>`,
  ];
  return `<?xml version="1.0" encoding="utf-8"?><edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx"><edmx:DataServices><Schema Namespace="Microsoft.Dynamics.CRM" Alias="mscrm" xmlns="http://docs.oasis-open.org/odata/ns/edm">${order(types).join("")}</Schema></edmx:DataServices></edmx:Edmx>`;
}

/** Every file under `dir` with its content, by path relative to `dir`. */
async function tree(dir: string): Promise<Record<string, string>> {
  const out: Record<string, string> = {};
  for (const entry of await readdir(dir, { recursive: true, withFileTypes: true })) {
    if (!entry.isFile()) continue;
    const path = join(entry.parentPath, entry.name);
    out[relative(dir, path)] = await readFile(path, "utf8");
  }
  return out;
}

const dirs: string[] = [];
async function generate(xml: string): Promise<Record<string, string>> {
  const dir = await mkdtemp(join(OUT_ROOT, ".gen-snapshot-"));
  dirs.push(dir);
  const out = (kind: string) => ({ enabled: true, outputPath: join(dir, kind) });
  await generateFromCsdl(
    xml,
    { actions: out("actions"), functions: out("functions"), messages: out("messages") },
    ["actions", "functions", "messages"],
    { purge: true }
  );
  return tree(dir);
}

beforeAll(() => {
  vi.spyOn(console, "log").mockImplementation(() => undefined);
});

afterAll(async () => {
  vi.restoreAllMocks();
  for (const dir of dirs) await rm(dir, { recursive: true, force: true });
});

describe("reproducible generation (#293)", () => {
  it("generates the same files from a schema listed in a different order", async () => {
    const forward = await generate(edmx(false));
    const reversed = await generate(edmx(true));
    expect(Object.keys(forward).length).toBeGreaterThan(10);
    expect(reversed).toEqual(forward);
  });

  it("sorts types, properties, enum members and overloads; keeps parameter order", () => {
    const csdl = canonicalizeCsdl(parseEdmx(edmx(true)));
    expect(csdl.entityTypes.map((t) => t.name)).toEqual(["account", "contact", "crmbaseentity"]);
    expect(csdl.entityTypes[0]?.properties.map((p) => p.name)).toEqual([
      "accountid",
      "address1_city",
      "name",
      "revenue",
    ]);
    expect(csdl.complexTypes[0]?.properties.map((p) => p.name)).toEqual([
      "BusinessUnitId",
      "OrganizationId",
      "UserId",
    ]);
    expect(csdl.enumTypes[0]?.members.map((m) => m.value)).toEqual([0, 1]);
    // Overloads by binding, whatever order the CSDL lists them in
    expect(csdl.functions.map((f) => `${f.name}:${f.bindingParameter?.type ?? ""}`)).toEqual([
      "RetrieveTotal:mscrm.account",
      "RetrieveTotal:mscrm.contact",
      "WhoAmI:",
    ]);
    // Parameters stay in CSDL order
    expect(csdl.actions[0]?.parameters.map((p) => p.name)).toEqual(["Zeta", "Alpha"]);
    expect(csdl.entityContainer?.entitySets.map((s) => s.name)).toEqual(["accounts", "contacts"]);
    expect(csdl.entitySetMap.get("account")).toBe("accounts");
  });
});

describe("snapshotCsdl (#293)", () => {
  it("writes two orderings of one schema as the same text, one element per line", () => {
    const a = snapshotCsdl(edmx(false), []);
    expect(snapshotCsdl(edmx(true), [])).toBe(a);
    expect(a.split("\n")).toContain(`        <Property Name="address1_city" Type="Edm.String" />`);
    // Idempotent
    expect(snapshotCsdl(a, [])).toBe(a);
  });

  it("keeps operation parameters and text in their order; sorts enum members by value", () => {
    const xml = snapshotCsdl(edmx(true), []);
    expect(xml.indexOf(`Name="Zeta"`)).toBeLessThan(xml.indexOf(`Name="Alpha"`));
    expect(xml.indexOf(`Name="None"`)).toBeLessThan(xml.indexOf(`Name="ReadAccess"`));
    const text = `<Collection><String>contains</String><String>endswith</String></Collection>`;
    expect(snapshotCsdl(`<Annotation Term="X">${text}</Annotation>`, [])).toBe(
      [
        `<Annotation Term="X">`,
        `  <Collection>`,
        `    <String>contains</String>`,
        `    <String>endswith</String>`,
        `  </Collection>`,
        `</Annotation>`,
        ``,
      ].join("\n")
    );
  });

  it("leaves out elements that mention an org-specific publisher prefix", () => {
    const xml = edmx(false).replace(
      `<EntityType Name="contact"`,
      `<EntityType Name="cbstest_thing"><Property Name="cbstest_thingid" Type="Edm.Guid" /></EntityType><EntityType Name="contact"`
    );
    const out = snapshotCsdl(xml, ["cbstest"]);
    expect(out).not.toContain("cbstest");
    expect(out).toContain(`<EntityType Name="contact"`);
    expect(snapshotCsdl(xml, [])).toContain("cbstest_thing");
  });

  it("rejects XML it can't split into elements", () => {
    expect(() => snapshotCsdl("<a><b></a>", [])).toThrow(/unclosed|unbalanced/);
  });
});

describe("the committed snapshot (#293)", () => {
  const xml = readFileSync(SNAPSHOT, "utf8");

  it("is in canonical form", () => {
    expect(snapshotCsdl(xml)).toBe(xml);
  });

  it("names no org: no hostnames, ids or org-specific tables", () => {
    const urls = new Set(xml.match(/https?:\/\/[^"\s<]+/g));
    expect([...urls].sort()).toEqual([
      "http://docs.oasis-open.org/odata/ns/edm",
      "http://docs.oasis-open.org/odata/ns/edmx",
      "https://vocabularies.odata.org/OData.Community.Display.V1.xml",
      "https://vocabularies.odata.org/OData.Community.Keys.V1.xml",
    ]);
    expect(xml).not.toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
    expect(xml).not.toMatch(/dynamics\.com|\.crm\d*\.dynamics/i);
    for (const prefix of ORG_SPECIFIC_PREFIXES) expect(xml).not.toContain(`${prefix}_`);
  });
});
