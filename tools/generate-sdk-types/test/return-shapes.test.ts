/**
 * #300: one return contract for every generated operation. `client.execute()` resolves the value
 * the operation returns, not the OData envelope: a primitive or a collection is the `value` of
 * the body, a complex type or an entity is the body itself (with its annotations), and an
 * operation without a return type resolves `undefined`. A message's `result` is the same value as
 * the action's, with the same type.
 *
 * The same EDMX and expectations are in
 * packages/dataverse-sdk-generator/test/return-shapes.test.ts, for dataverse-gen.
 */
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { DataverseClient, type Executable } from "@mohsinonxrm/dataverse-sdk-core";
import { parseEdmx } from "../src/parsers/edmx-parser.js";
import { generateActions } from "../src/generators/actions-generator.js";
import { generateFunctions } from "../src/generators/functions-generator.js";
import { generateMessages } from "../src/generators/messages-generator.js";
import { generateComplexTypes } from "../src/generators/complex-types-generator.js";
import { typecheck } from "./typecheck.js";

const OUT_ROOT = fileURLToPath(new URL(".", import.meta.url));
const CONTEXT = "https://contoso.crm.dynamics.com/api/data/v9.2/$metadata";
const ACCOUNT_ID = "6f6a7d4e-1b2c-4d5e-8f90-0123456789ab";

/** One return type: the response the Web API sends, and the value execute() resolves. */
interface ReturnCase {
  name: string;
  returnType: string;
  body: Record<string, unknown>;
  value: unknown;
  /** The value for a 204 No Content, for the kinds Dataverse answers 204 for. */
  noContent?: unknown;
}

const account = {
  "@odata.etag": 'W/"1"',
  accountid: ACCOUNT_ID,
  name: "Contoso",
};

const CASES: ReturnCase[] = [
  { name: "String", returnType: "Edm.String", body: { value: "hello" }, value: "hello" },
  { name: "Int32", returnType: "Edm.Int32", body: { value: 42 }, value: 42 },
  { name: "Boolean", returnType: "Edm.Boolean", body: { value: false }, value: false },
  { name: "Guid", returnType: "Edm.Guid", body: { value: ACCOUNT_ID }, value: ACCOUNT_ID },
  { name: "Enum", returnType: "mscrm.Mode", body: { value: "Second" }, value: "Second" },
  {
    name: "Strings",
    returnType: "Collection(Edm.String)",
    body: { value: ["a", "b"] },
    value: ["a", "b"],
  },
  {
    name: "Items",
    returnType: "Collection(mscrm.Item)",
    body: { value: [{ Label: "x" }] },
    value: [{ Label: "x" }],
  },
  {
    name: "Info",
    returnType: "mscrm.InfoResponse",
    body: { Label: "n", Count: 1 },
    value: {
      "@odata.context": `${CONTEXT}#Microsoft.Dynamics.CRM.InfoResponse`,
      Label: "n",
      Count: 1,
    },
  },
  {
    name: "Account",
    returnType: "mscrm.account",
    body: account,
    value: { "@odata.context": `${CONTEXT}#accounts/$entity`, ...account },
    noContent: null,
  },
  {
    name: "Record",
    returnType: "mscrm.crmbaseentity",
    body: { "@odata.type": "#Microsoft.Dynamics.CRM.account", ...account },
    value: {
      "@odata.context": `${CONTEXT}#accounts/$entity`,
      "@odata.type": "#Microsoft.Dynamics.CRM.account",
      ...account,
    },
    noContent: null,
  },
  {
    name: "Accounts",
    returnType: "Collection(mscrm.account)",
    body: { value: [account] },
    value: [account],
    noContent: [],
  },
  {
    name: "Records",
    returnType: "Collection(mscrm.crmbaseentity)",
    body: { value: [{ "@odata.type": "#Microsoft.Dynamics.CRM.account", ...account }] },
    value: [{ "@odata.type": "#Microsoft.Dynamics.CRM.account", ...account }],
    noContent: [],
  },
];

/** The body the Web API sends: a wrapped value, or the value itself, with @odata.context. */
function responseBody(c: ReturnCase): Record<string, unknown> {
  if ("value" in c.body) return { "@odata.context": `${CONTEXT}#x`, ...c.body };
  return c.value as Record<string, unknown>;
}

/** Every case as a function `F<name>` and an action `A<name>`, plus `APing` with no return. */
export const RETURNS_EDMX = `<?xml version="1.0" encoding="utf-8"?>
<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx">
  <edmx:DataServices>
    <Schema Namespace="Microsoft.Dynamics.CRM" Alias="mscrm" xmlns="http://docs.oasis-open.org/odata/ns/edm">
      <EntityType Name="crmbaseentity" Abstract="true" />
      <EntityType Name="account" BaseType="mscrm.crmbaseentity">
        <Key><PropertyRef Name="accountid" /></Key>
        <Property Name="accountid" Type="Edm.Guid" />
        <Property Name="name" Type="Edm.String" />
      </EntityType>
      <ComplexType Name="InfoResponse">
        <Property Name="Label" Type="Edm.String" />
        <Property Name="Count" Type="Edm.Int32" Nullable="false" />
      </ComplexType>
      <ComplexType Name="Item">
        <Property Name="Label" Type="Edm.String" />
      </ComplexType>
      <EnumType Name="Mode">
        <Member Name="First" Value="1" />
        <Member Name="Second" Value="2" />
      </EnumType>
${CASES.map(
  (c) => `      <Function Name="F${c.name}">
        <ReturnType Type="${c.returnType}" Nullable="false" />
      </Function>
      <Action Name="A${c.name}">
        <ReturnType Type="${c.returnType}" Nullable="false" />
      </Action>`
).join("\n")}
      <Action Name="APing" />
      <EntityContainer Name="System">
        <EntitySet Name="accounts" EntityType="Microsoft.Dynamics.CRM.account" />
      </EntityContainer>
    </Schema>
  </edmx:DataServices>
</edmx:Edmx>`;

const MESSAGES_SRC = new URL("../../../packages/dataverse-sdk-messages/src/", import.meta.url);

let out: string;
type Ctor = new () => Executable<unknown>;
const load = async (path: string, name: string): Promise<Ctor> => {
  const mod = (await import(join(out, path))) as Record<string, Ctor | undefined>;
  const value = mod[name];
  if (!value) throw new Error(`${path} doesn't export ${name}`);
  return value;
};

/** A real DataverseClient whose fetch answers every request with `respond()`. */
function client(respond: () => Response): DataverseClient {
  const noop = (): void => undefined;
  return new DataverseClient({
    baseUrl: "https://contoso.crm.dynamics.com",
    tokenProvider: { getToken: () => Promise.resolve("token") },
    fetchProvider: { fetch: () => Promise.resolve(respond()) },
    retry: { maxRetries: 0 },
    logger: { debug: noop, info: noop, warn: noop, error: noop },
  });
}
const json = (body: unknown) => () =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json; odata.metadata=minimal" },
  });
const noContent = () => new Response(null, { status: 204 });

beforeAll(async () => {
  vi.spyOn(console, "log").mockImplementation(() => undefined);
  out = await mkdtemp(join(OUT_ROOT, ".gen-300-"));
  const csdl = parseEdmx(RETURNS_EDMX);
  for (const target of ["actions", "functions", "messages"] as const) {
    await generateComplexTypes(csdl, join(out, target, "types"), false, target);
  }
  await generateActions(csdl, join(out, "actions"), false);
  await generateFunctions(csdl, join(out, "functions"), false);
  await generateMessages(csdl, join(out, "messages"), false);
  for (const file of ["OrganizationRequest.ts", "types.ts"]) {
    await writeFile(join(out, "messages", file), await readFile(new URL(file, MESSAGES_SRC)));
  }
});

afterAll(async () => {
  vi.restoreAllMocks();
  await rm(out, { recursive: true, force: true });
});

describe("#300: execute() resolves the returned value", () => {
  it.each(CASES)("$returnType: functions and actions", async (c) => {
    const Fn = await load(`functions/F${c.name}Function.ts`, `F${c.name}Function`);
    const Act = await load(`actions/A${c.name}Action.ts`, `A${c.name}Action`);
    for (const op of [new Fn(), new Act()]) {
      expect(await client(json(responseBody(c))).execute(op)).toEqual(c.value);
      if ("noContent" in c) expect(await client(noContent).execute(op)).toEqual(c.noContent);
    }
  });

  it.each(CASES)("$returnType: a message's result is the action's value", async (c) => {
    const mod = (await import(join(out, "messages", `A${c.name}Message.ts`))) as Record<
      string,
      unknown
    >;
    const Request = mod[`A${c.name}Request`] as new () => Executable<{ result: unknown }>;
    const Response_ = mod[`A${c.name}Response`] as {
      fromResponse(data: unknown): { result: unknown };
    };
    expect((await client(json(responseBody(c))).execute(new Request())).result).toEqual(c.value);
    expect(Response_.fromResponse(responseBody(c)).result).toEqual(c.value);
    if ("noContent" in c) {
      expect((await client(noContent).execute(new Request())).result).toEqual(c.noContent);
      expect(Response_.fromResponse(undefined).result).toEqual(c.noContent);
    }
  });

  it("an operation without a return type resolves undefined", async () => {
    const Ping = await load("actions/APingAction.ts", "APingAction");
    expect(await client(noContent).execute(new Ping())).toBeUndefined();
    const mod = (await import(join(out, "messages", "APingMessage.ts"))) as Record<string, unknown>;
    const Request = mod.APingRequest as new () => Executable<object>;
    expect(await client(noContent).execute(new Request())).not.toHaveProperty("result");
  });
});

describe("#300: the response types say what is returned", () => {
  const EQUAL = `type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;
`;

  it("each kind has its exact type", async () => {
    const snippet = `${EQUAL}import type * as F from "./functions/index.js";
import type * as A from "./actions/index.js";
import type { account, Item } from "./functions/types/index.js";
export const checks: true[] = [
  {} as Equal<F.FStringResponse, string>,
  {} as Equal<F.FInt32Response, number>,
  {} as Equal<F.FBooleanResponse, boolean>,
  {} as Equal<F.FGuidResponse, string>,
  {} as Equal<F.FEnumResponse, string>,
  {} as Equal<F.FStringsResponse, string[]>,
  {} as Equal<F.FItemsResponse, Item[]>,
  {} as Equal<F.FInfoResponse["Count"], number>,
  {} as Equal<F.FInfoResponse["@odata.context"], string | undefined>,
  {} as Equal<Extract<F.FAccountResponse, null>, null>,
  {} as Equal<NonNullable<F.FAccountResponse>["accountid"], string | undefined>,
  {} as Equal<NonNullable<F.FAccountResponse>["@odata.etag"], string | undefined>,
  {} as Equal<NonNullable<F.FRecordResponse>["@odata.type"], string | undefined>,
  {} as Equal<NonNullable<F.FRecordResponse>["anycolumn"], unknown>,
  {} as Equal<F.FAccountsResponse[number]["@odata.etag"], string | undefined>,
  {} as Equal<F.FAccountsResponse[number]["name"], account["name"]>,
  {} as Equal<F.FRecordsResponse[number]["@odata.type"], string | undefined>,
  {} as Equal<A.APingResponse, void>,
];
`;
    expect(await typecheck(out, "usage-300-types.ts", snippet)).toEqual([]);
  });

  it("nothing is wrapped in value any more", async () => {
    const snippet = `import type * as F from "./functions/index.js";
declare const s: F.FStringResponse;
declare const many: F.FAccountsResponse;
declare const one: F.FAccountResponse;
export const a = s.value;
export const b = many.value;
export const c = one?.value.length;
`;
    const errors = await typecheck(out, "usage-300-bad.ts", snippet);
    for (const line of [5, 6]) {
      expect(errors.join("\n")).toMatch(new RegExp(`usage-300-bad\\.ts\\(${String(line)}\\)`));
    }
    // one.value is a column of the record (unknown), so .length doesn't compile either
    expect(errors.join("\n")).toMatch(/usage-300-bad\.ts\(7\)/);
  });

  it("a message's result has the type of the action's value", async () => {
    const snippet = `${EQUAL}import type * as A from "./actions/index.js";
import type * as M from "./messages/index.js";
export const checks: true[] = [
${CASES.map((c) => `  {} as Equal<M.A${c.name}Result, A.A${c.name}Response>,`).join("\n")}
${CASES.map((c) => `  {} as Equal<M.A${c.name}Response["result"], A.A${c.name}Response>,`).join("\n")}
];
`;
    expect(await typecheck(out, "usage-300-messages.ts", snippet)).toEqual([]);
  });
});
