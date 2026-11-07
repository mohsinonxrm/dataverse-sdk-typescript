/**
 * #386:
 *
 * - The generators sort by UTF-16 code unit, not `localeCompare`, so a regeneration doesn't depend
 *   on the machine's locale (`Zed` before `beta`, as `canonicalizeCsdl` already sorts).
 * - Operations bound to one record put the id in the URL through `odataLiteral.guid()`, as
 *   dataverse-gen does: a `{GUID}` from Xrm loses its braces, and anything that isn't a GUID throws.
 */
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { DataverseInvalidRequestError } from "@mohsinonxrm/dataverse-sdk-core";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { parseEdmx } from "../src/parsers/edmx-parser.js";
import { generateActions } from "../src/generators/actions-generator.js";
import { generateComplexTypes } from "../src/generators/complex-types-generator.js";
import { generateFunctions } from "../src/generators/functions-generator.js";
import { generateMessages } from "../src/generators/messages-generator.js";

/** Inside this package, so the generated code's runtime import of core resolves. */
const OUT_ROOT = fileURLToPath(new URL(".", import.meta.url));

const EDMX = `<?xml version="1.0" encoding="utf-8"?>
<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx">
  <edmx:DataServices>
    <Schema Namespace="Microsoft.Dynamics.CRM" Alias="mscrm" xmlns="http://docs.oasis-open.org/odata/ns/edm">
      <EntityType Name="queue" />
      <ComplexType Name="beta">
        <Property Name="Value" Type="Edm.String" />
      </ComplexType>
      <ComplexType Name="Zed">
        <Property Name="Value" Type="Edm.String" />
      </ComplexType>
      <EnumType Name="gamma">
        <Member Name="One" Value="1" />
      </EnumType>
      <EnumType Name="Delta">
        <Member Name="One" Value="1" />
      </EnumType>
      <Action Name="beta">
        <Parameter Name="Input" Type="mscrm.beta" />
      </Action>
      <Action Name="Zed">
        <Parameter Name="Input" Type="mscrm.Zed" />
      </Action>
      <Action Name="AddToQueue" IsBound="true">
        <Parameter Name="entity" Type="mscrm.queue" Nullable="false" />
        <Parameter Name="Note" Type="Edm.String" />
      </Action>
      <Function Name="CountQueueItems" IsBound="true">
        <Parameter Name="entity" Type="mscrm.queue" Nullable="false" />
        <Parameter Name="State" Type="Edm.Int32" Nullable="false" />
        <ReturnType Type="Edm.Int32" Nullable="false" />
      </Function>
      <EntityContainer Name="System">
        <EntitySet Name="queues" EntityType="Microsoft.Dynamics.CRM.queue" />
      </EntityContainer>
    </Schema>
  </edmx:DataServices>
</edmx:Edmx>`;

const BASE = "https://contoso.crm.dynamics.com/api/data/v9.2";
const ID = "00000000-0000-0000-0000-000000000001";

interface RequestInfo {
  url: string;
}
type Op = new (...args: unknown[]) => { toRequestInformation(baseUrl: string): RequestInfo };

let out: string;
const read = (path: string) => readFile(join(out, path), "utf8");
const load = async (path: string, name: string): Promise<Op> => {
  const mod = (await import(join(out, path))) as Record<string, Op | undefined>;
  const value = mod[name];
  if (value === undefined) throw new Error(`${path} doesn't export ${name}`);
  return value;
};

beforeAll(async () => {
  vi.spyOn(console, "log").mockImplementation(() => undefined);
  out = await mkdtemp(join(OUT_ROOT, ".gen-386-"));
  const csdl = parseEdmx(EDMX);
  await generateActions(csdl, join(out, "actions"), false);
  await generateComplexTypes(csdl, join(out, "actions", "types"));
  await generateFunctions(csdl, join(out, "functions"), false);
  await generateMessages(csdl, join(out, "messages"), false);
});

afterAll(async () => {
  vi.restoreAllMocks();
  await rm(out, { recursive: true, force: true });
});

/** The names in the order `pattern` first matches them in `code`. */
function order(code: string, names: string[], pattern: (name: string) => RegExp): string[] {
  return names
    .map((name) => ({ name, at: code.search(pattern(name)) }))
    .filter(({ at }) => at >= 0)
    .sort((a, b) => a.at - b.at)
    .map(({ name }) => name);
}

describe("#386: sorting doesn't depend on the locale", () => {
  it("the operation indexes list the operations by code unit", async () => {
    const names = ["beta", "Zed"];
    const at = (n: string) => new RegExp(`export \\{ ${n}(Action|Request|Function)\\b`);
    expect(order(await read("actions/index.ts"), names, at)).toEqual(["Zed", "beta"]);
    expect(order(await read("messages/index.ts"), names, at)).toEqual(["Zed", "beta"]);
  });

  it("the type indexes and the enum re-exports sort by code unit", async () => {
    const types = await read("actions/types/index.ts");
    const at = (n: string) => new RegExp(`\\./${n}\\.js`);
    expect(order(types, ["beta", "Zed"], at)).toEqual(["Zed", "beta"]);
    expect(order(types, ["gamma", "Delta"], at)).toEqual(["Delta", "gamma"]);
    const index = await read("actions/index.ts");
    const name = (n: string) => new RegExp(`\\b${n}\\b`);
    expect(order(index, ["gamma", "Delta"], name)).toEqual(["Delta", "gamma"]);
  });

  it("the output is the same when localeCompare orders differently", async () => {
    const csdl = parseEdmx(EDMX);
    const reversed = vi.spyOn(String.prototype, "localeCompare").mockImplementation(function (
      this: string,
      that: string
    ) {
      return this < that ? 1 : this > that ? -1 : 0;
    });
    const other = await mkdtemp(join(OUT_ROOT, ".gen-386-locale-"));
    try {
      await generateActions(csdl, join(other, "actions"), false);
      await generateComplexTypes(csdl, join(other, "actions", "types"));
      await generateMessages(csdl, join(other, "messages"), false);
      for (const path of ["actions/index.ts", "actions/types/index.ts", "messages/index.ts"]) {
        expect(await readFile(join(other, path), "utf8")).toBe(await read(path));
      }
    } finally {
      reversed.mockRestore();
      await rm(other, { recursive: true, force: true });
    }
  });
});

describe("#386: operations bound to a record format the id as a GUID", () => {
  const cases = [
    {
      path: "actions/AddToQueueAction.ts",
      name: "AddToQueueAction",
      args: [{}],
      url: `${BASE}/queues(${ID})/Microsoft.Dynamics.CRM.AddToQueue`,
    },
    {
      path: "functions/CountQueueItemsFunction.ts",
      name: "CountQueueItemsFunction",
      args: [{ State: 1 }],
      url: `${BASE}/queues(${ID})/Microsoft.Dynamics.CRM.CountQueueItems(State=@p1)?%40p1=1`,
    },
  ];

  it.each(cases)("$name strips the braces of a {GUID}", async ({ path, name, args, url }) => {
    const Op = await load(path, name);
    expect(new Op(`{${ID}}`, ...args).toRequestInformation(BASE).url).toBe(url);
    expect(new Op(ID.toUpperCase(), ...args).toRequestInformation(BASE).url).toBe(
      url.replace(ID, ID.toUpperCase())
    );
  });

  it("messages build the URL the same way", async () => {
    expect(await read("messages/AddToQueueMessage.ts")).toContain(
      "const url = `${baseUrl}/queues(${odataLiteral.guid(this.queueId)})/Microsoft.Dynamics.CRM.AddToQueue`;"
    );
  });

  it.each(cases)("$name rejects an id that isn't a GUID", async ({ path, name, args }) => {
    const Op = await load(path, name);
    for (const id of ["", "not-a-guid", `${ID})/accounts(${ID}`, `'${ID}'`]) {
      expect(() => new Op(id, ...args).toRequestInformation(BASE)).toThrow(
        DataverseInvalidRequestError
      );
    }
  });
});
