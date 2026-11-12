/**
 * The explorer's tools: the access-token decoder and demo token, the Web API version kept per
 * environment, and the table browser's parsers and reads against demo mode's environment.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createDemoState, createFakeDataverse } from "../../src/demo/fakeDataverse";
import { demoAccessToken } from "../../src/demo/demoToken";
import { DEMO_USER } from "../../src/demo/store";
import {
  apiRootOf,
  DEFAULT_API_VERSION,
  readApiVersion,
  writeApiVersion,
} from "../../src/explorer/apiVersion";
import { clientNote, rawCode } from "../../src/explorer/codegen";
import { previewRequests } from "../../src/explorer/preview";
import { parseRawRequest, runRawPlan } from "../../src/explorer/rawRequest";
import {
  cached,
  fetchTableDetails,
  fetchTables,
  filterTables,
  parseColumns,
  parseRelationships,
  parseTables,
  tableQuery,
  type TableSummary,
} from "../../src/explorer/tables";
import {
  base64UrlDecode,
  base64UrlEncode,
  claimSummary,
  decodeJwt,
  relativeTime,
  TokenDecodeError,
} from "../../src/explorer/token";
import { createClient } from "../../src/sdk/createSdk";

const ORG = "https://contoso.crm.dynamics.com";

const jwt = (header: object, claims: object, signature = "c2lnbmF0dXJl") =>
  `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(JSON.stringify(claims))}.${signature}`;

describe("access token", () => {
  it("decodes base64url, UTF-8 included", () => {
    const text = 'Zoë "ünïcode" ✓ ~~~???';
    const encoded = base64UrlEncode(text);
    expect(encoded).toMatch(/^[\w-]+$/);
    expect(base64UrlDecode(encoded)).toBe(text);
    expect(() => base64UrlDecode("a+b/")).toThrow(TokenDecodeError);
    expect(() => base64UrlDecode("abcde")).toThrow(TokenDecodeError);
  });

  it("returns the header and claims, never the signature", () => {
    const token = jwt(
      { typ: "JWT", alg: "RS256", kid: "k1" },
      { aud: ORG, scp: "user_impersonation" }
    );
    const decoded = decodeJwt(token);
    expect(decoded).toEqual({
      header: { typ: "JWT", alg: "RS256", kid: "k1" },
      claims: { aud: ORG, scp: "user_impersonation" },
    });
    expect(JSON.stringify(decoded)).not.toContain("c2lnbmF0dXJl");
  });

  it("says why a token can't be decoded", () => {
    expect(() => decodeJwt("demo-token")).toThrow(/isn't a JWT/);
    expect(() => decodeJwt("a.b.c.d.e")).toThrow(/isn't a JWT/);
    expect(() => decodeJwt(`${base64UrlEncode("{}")}.${base64UrlEncode("not json")}.x`)).toThrow(
      "The token's claims isn't JSON."
    );
    expect(() => decodeJwt(`${base64UrlEncode("[1]")}.${base64UrlEncode("{}")}.x`)).toThrow(
      "The token's header isn't a JSON object."
    );
    expect(() => decodeJwt("!!.e30.x")).toThrow(/header isn't base64url/);
  });

  it("summarizes the claims worth reading, with relative times", () => {
    const now = Date.UTC(2026, 10, 11, 9, 0, 0);
    const iat = now / 1000 - 600;
    const rows = claimSummary(
      {
        aud: ORG,
        tid: "tenant",
        upn: "avery@contoso.com",
        preferred_username: "ignored@contoso.com",
        oid: "object",
        appid: "app",
        scp: "user_impersonation",
        roles: ["Reader", "Writer"],
        iat,
        exp: iat + 3600,
        unknown: "left out",
      },
      now
    );
    expect(rows.map((r) => [r.claim, r.value, r.relative ?? ""])).toEqual([
      ["aud", ORG, ""],
      ["tid", "tenant", ""],
      ["upn", "avery@contoso.com", ""],
      ["oid", "object", ""],
      ["appid", "app", ""],
      ["scp", "user_impersonation", ""],
      ["roles", "Reader, Writer", ""],
      ["iat", "2026-11-11 08:50:00 UTC", "10 minutes ago"],
      ["exp", "2026-11-11 09:50:00 UTC", "in 50 minutes"],
    ]);
    expect(rows.at(-1)?.expired).toBe(false);
    expect(claimSummary({ exp: iat }, now).at(-1)?.expired).toBe(true);
    expect(claimSummary({ preferred_username: "p@contoso.com" })[0]?.claim).toBe(
      "preferred_username"
    );
  });

  it("words relative times in the largest whole unit", () => {
    expect(relativeTime(0)).toBe("now");
    expect(relativeTime(45)).toBe("in 45 seconds");
    expect(relativeTime(-7200)).toBe("2 hours ago");
    expect(relativeTime(86_400 * 3)).toBe("in 3 days");
  });

  it("makes up an unsigned demo token for the demo user and the asked-for audience", () => {
    const now = Date.UTC(2026, 10, 11, 9, 0, 0);
    const token = demoAccessToken(["https://contoso-dev.crm.dynamics.com/.default"], now);
    expect(token.endsWith(".")).toBe(true);
    const { header, claims } = decodeJwt(token);
    expect(header).toEqual({ typ: "JWT", alg: "none" });
    expect(claims).toMatchObject({
      aud: "https://contoso-dev.crm.dynamics.com",
      upn: DEMO_USER.internalemailaddress,
      oid: DEMO_USER.azureactivedirectoryobjectid,
      scp: "user_impersonation",
      iat: now / 1000,
      exp: now / 1000 + 3600,
    });
  });
});

describe("Web API version", () => {
  let store: Map<string, string>;
  beforeEach(() => {
    store = new Map();
    vi.stubGlobal("window", {
      localStorage: {
        getItem: (k: string) => store.get(k) ?? null,
        setItem: (k: string, v: string) => store.set(k, v),
        removeItem: (k: string) => store.delete(k),
      },
    });
  });
  afterEach(() => vi.unstubAllGlobals());

  it("is kept per environment, the default not stored", () => {
    expect(readApiVersion(ORG)).toBe(DEFAULT_API_VERSION);
    writeApiVersion(`${ORG}/main.aspx`, "v9.1");
    writeApiVersion("https://fabrikam.crm4.dynamics.com", "v9.0");
    expect(readApiVersion("https://CONTOSO.crm.dynamics.com/")).toBe("v9.1");
    expect(readApiVersion("https://fabrikam.crm4.dynamics.com")).toBe("v9.0");
    writeApiVersion(ORG, "v9.2");
    expect(readApiVersion(ORG)).toBe("v9.2");
    expect(JSON.parse(store.get("explorer-api-version") ?? "{}")).toEqual({
      "https://fabrikam.crm4.dynamics.com": "v9.0",
    });
  });

  it("ignores what it didn't write", () => {
    store.set("explorer-api-version", JSON.stringify({ [ORG]: "v8.0" }));
    expect(readApiVersion(ORG)).toBe("v9.2");
    store.set("explorer-api-version", "not json");
    expect(readApiVersion(ORG)).toBe("v9.2");
  });

  it("shows in the request URL and in the SDK code when it isn't the default", async () => {
    expect(apiRootOf(`${ORG}/`, "v9.0")).toBe(`${ORG}/api/data/v9.0`);
    const plan = parseRawRequest({ method: "GET", url: "WhoAmI", headers: "", body: "" }, ORG);
    const { requests } = await previewRequests(ORG, (client) => runRawPlan(client, plan), "v9.1");
    expect(requests[0]?.url).toBe(`${ORG}/api/data/v9.1/WhoAmI`);
    expect(rawCode(plan)).not.toContain("apiVersion");
    expect(clientNote("v9.1")).toContain('apiVersion: "v9.1"');
    expect(rawCode(plan, "v9.1")).toBe(
      [
        "// `client` is a DataverseClient for your environment on Web API v9.1:",
        '// new DataverseClient({ baseUrl, tokenProvider, apiVersion: "v9.1" })',
        'const result = await client.api("WhoAmI").get();',
      ].join("\n")
    );
  });

  it("is served by demo mode's environment", async () => {
    const client = createClient(
      {
        environmentUrl: ORG,
        tokenProvider: { getToken: () => Promise.resolve("t") },
        fetchProvider: createFakeDataverse(createDemoState(), [0, 0]),
      },
      () => undefined,
      { apiVersion: "v9.0" }
    );
    await expect(client.api("WhoAmI").get()).resolves.toMatchObject({
      UserId: DEMO_USER.systemuserid,
    });
  });
});

describe("table browser", () => {
  const demoClient = () =>
    createClient(
      {
        environmentUrl: ORG,
        tokenProvider: { getToken: () => Promise.resolve("t") },
        fetchProvider: createFakeDataverse(createDemoState(), [0, 0]),
      },
      () => undefined
    );

  const account: TableSummary = {
    logicalName: "account",
    entitySetName: "accounts",
    displayName: "Account",
    primaryIdAttribute: "accountid",
    primaryNameAttribute: "name",
    custom: false,
  };

  it("parses the tables with an entity set, by logical name", () => {
    const label = (text: string) => ({ UserLocalizedLabel: { Label: text }, LocalizedLabels: [] });
    expect(
      parseTables({
        value: [
          { LogicalName: "contact", EntitySetName: "contacts", DisplayName: label("Contact") },
          { LogicalName: "intersect", EntitySetName: null },
          {
            LogicalName: "account",
            EntitySetName: "accounts",
            DisplayName: { UserLocalizedLabel: null, LocalizedLabels: [{ Label: "Account" }] },
            PrimaryIdAttribute: "accountid",
            PrimaryNameAttribute: "name",
            IsCustomEntity: false,
          },
        ],
      })
    ).toEqual([
      account,
      {
        logicalName: "contact",
        entitySetName: "contacts",
        displayName: "Contact",
        primaryIdAttribute: "",
        primaryNameAttribute: "",
        custom: false,
      },
    ]);
    expect(parseTables("nonsense")).toEqual([]);
  });

  it("filters by every word", () => {
    const tables = [
      account,
      { ...account, logicalName: "contact", entitySetName: "contacts", displayName: "Contact" },
    ];
    expect(filterTables(tables, "").length).toBe(2);
    expect(filterTables(tables, "CONT").map((t) => t.logicalName)).toEqual(["contact"]);
    expect(filterTables(tables, "account accounts").map((t) => t.logicalName)).toEqual(["account"]);
    expect(filterTables(tables, "account contact")).toEqual([]);
  });

  it("parses columns: primary first, lookups selected as _x_value, computed ones not selectable", () => {
    const columns = parseColumns(
      {
        value: [
          { LogicalName: "zeta", AttributeType: "String", RequiredLevel: { Value: "None" } },
          {
            LogicalName: "primarycontactid",
            AttributeType: "Lookup",
            RequiredLevel: { Value: "Recommended" },
          },
          { LogicalName: "name", AttributeType: "String", IsPrimaryName: true },
          { LogicalName: "accountid", AttributeType: "Uniqueidentifier", IsPrimaryId: true },
          { LogicalName: "createdbyname", AttributeType: "String", AttributeOf: "createdby" },
          { LogicalName: "calc", AttributeType: "Virtual" },
          { LogicalName: "hidden", AttributeType: "String", IsValidForRead: false },
          {
            LogicalName: "req",
            AttributeType: "Integer",
            RequiredLevel: { Value: "ApplicationRequired" },
          },
        ],
      },
      new Map([["name", 160]])
    );
    expect(
      columns.map((c) => [c.logicalName, c.selectName, c.selectable, c.required, c.maxLength])
    ).toEqual([
      ["accountid", "accountid", true, "", undefined],
      ["name", "name", true, "", 160],
      ["calc", "calc", false, "", undefined],
      ["createdbyname", "createdbyname", false, "", undefined],
      ["hidden", "hidden", false, "", undefined],
      ["primarycontactid", "_primarycontactid_value", true, "Recommended", undefined],
      ["req", "req", true, "Required", undefined],
      ["zeta", "zeta", true, "Optional", undefined],
    ]);
  });

  it("parses relationships from this table's side", () => {
    const relationships = parseRelationships("account", {
      manyToOne: {
        value: [
          {
            SchemaName: "account_primary_contact",
            ReferencedEntity: "contact",
            ReferencingAttribute: "primarycontactid",
            ReferencingEntityNavigationPropertyName: "primarycontactid",
          },
        ],
      },
      oneToMany: {
        value: [
          {
            SchemaName: "contact_customer_accounts",
            ReferencingEntity: "contact",
            ReferencingAttribute: "parentcustomerid",
            ReferencedEntityNavigationPropertyName: "contact_customer_accounts",
          },
        ],
      },
      manyToMany: {
        value: [
          {
            SchemaName: "accountleads_association",
            Entity1LogicalName: "lead",
            Entity2LogicalName: "account",
            Entity1NavigationPropertyName: "accountleads_association",
            Entity2NavigationPropertyName: "accountleads_association_account",
          },
        ],
      },
    });
    expect(
      relationships.map((r) => [r.kind, r.relatedTable, r.navigationProperty, r.lookup])
    ).toEqual([
      ["Many-to-one", "contact", "primarycontactid", "primarycontactid"],
      ["One-to-many", "contact", "contact_customer_accounts", "parentcustomerid"],
      ["Many-to-many", "lead", "accountleads_association_account", ""],
    ]);
  });

  it("writes the 'Query this table' request", () => {
    expect(tableQuery(account)).toEqual({
      method: "GET",
      url: "accounts?$select=accountid,name&$top=10",
      headers: "",
      body: "",
    });
    expect(tableQuery(account, ["name", "_primarycontactid_value"]).url).toBe(
      "accounts?$select=name,_primarycontactid_value&$top=10"
    );
    expect(tableQuery({ ...account, primaryIdAttribute: "", primaryNameAttribute: "" }).url).toBe(
      "accounts?$top=10"
    );
  });

  it("reads tables, columns, keys and relationships from demo mode's environment", async () => {
    const client = demoClient();
    const tables = await fetchTables(client);
    expect(tables.map((t) => t.entitySetName)).toEqual(
      expect.arrayContaining(["accounts", "contacts", "systemusers"])
    );
    expect(tables.find((t) => t.logicalName === "account")).toEqual(account);

    const details = await fetchTableDetails(client, "account");
    const name = details.columns.find((c) => c.logicalName === "name");
    expect(details.columns[0]?.logicalName).toBe("accountid");
    expect(name).toMatchObject({ primary: "name", type: "String", required: "Required" });
    expect(name?.maxLength).toBeGreaterThan(0);
    expect(details.columns.find((c) => c.logicalName === "new_description")?.maxLength).toBe(2000);
    expect(details.columns.find((c) => c.logicalName === "primarycontactid")?.selectName).toBe(
      "_primarycontactid_value"
    );
    expect(details.keys).toEqual([
      {
        logicalName: "new_accountnumberkey",
        displayName: "Account number",
        attributes: ["accountnumber"],
        status: "Active",
      },
    ]);
    expect(details.relationships).toContainEqual({
      kind: "Many-to-one",
      schemaName: expect.any(String) as string,
      relatedTable: "contact",
      navigationProperty: "primarycontactid",
      lookup: "primarycontactid",
    });
    expect(details.relationships).toContainEqual({
      kind: "One-to-many",
      schemaName: "contact_customer_accounts",
      relatedTable: "contact",
      navigationProperty: "contact_customer_accounts",
      lookup: "parentcustomerid",
    });

    // The query it writes runs.
    const request = tableQuery(
      account,
      details.columns.slice(0, 3).map((c) => c.selectName)
    );
    const result = await runRawPlan(client, parseRawRequest(request, ORG));
    expect((result as { value: unknown[] }).value.length).toBeGreaterThan(0);
    await expect(fetchTableDetails(client, "x') or 1 eq (1")).rejects.toThrow(/logical name/);
  });

  it("caches a read, but not a failure", async () => {
    let calls = 0;
    const load = () => Promise.resolve(++calls);
    await expect(cached("k1", load)).resolves.toBe(1);
    await expect(cached("k1", load)).resolves.toBe(1);
    const fail = () => Promise.reject(new Error(`failure ${++calls}`));
    await expect(cached("k2", fail)).rejects.toThrow("failure 2");
    await Promise.resolve();
    await expect(cached("k2", load)).resolves.toBe(3);
  });
});
