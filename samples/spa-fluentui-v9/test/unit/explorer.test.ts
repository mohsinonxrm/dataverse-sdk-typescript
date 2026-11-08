/**
 * The explorer's logic: the operation catalog read from the package sources, the values typed
 * for parameters, the raw request parser, the generated SDK code, the request preview, and that
 * running a request does what its code says.
 */
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import * as actions from "@mohsinonxrm/dataverse-sdk-actions";
import { DataverseError } from "@mohsinonxrm/dataverse-sdk-core";
import * as functions from "@mohsinonxrm/dataverse-sdk-functions";
import * as messages from "@mohsinonxrm/dataverse-sdk-messages";
import { jsonResponse } from "@mohsinonxrm/dataverse-sdk-testing";
import { operationStems, parseOperation, SUFFIX } from "../../src/explorer/catalog/parse";
import { constructorCall, operationCode, rawCode, tsLiteral } from "../../src/explorer/codegen";
import {
  fluentPlan,
  instantiate,
  runOperation,
  type OperationPackage,
} from "../../src/explorer/operations";
import { httpText, previewRequests } from "../../src/explorer/preview";
import {
  parseRawRequest,
  rawInputFromRequestInformation,
  RequestInputError,
  runRawPlan,
} from "../../src/explorer/rawRequest";
import { SAMPLES } from "../../src/explorer/samples";
import {
  OPERATION_KINDS,
  type CatalogOperation,
  type OperationKind,
  type RawRequestInput,
} from "../../src/explorer/types";
import {
  draftValues,
  operationValues,
  parseValue,
  ReferenceValue,
  ValueError,
} from "../../src/explorer/values";
import { withDemo, withFakeFetch } from "./helpers";

const repo = resolve(dirname(fileURLToPath(import.meta.url)), "../../../..");
const PACKAGES: Record<OperationKind, OperationPackage> = { actions, functions, messages };
const ORG = "https://contoso.crm.dynamics.com";
const API = `${ORG}/api/data/v9.2`;

function catalog(kind: OperationKind): CatalogOperation[] {
  const src = join(repo, "packages", `dataverse-sdk-${kind}`, "src");
  return operationStems(kind, readFileSync(join(src, "index.ts"), "utf8")).flatMap((stem) => {
    const op = parseOperation(
      kind,
      stem,
      readFileSync(join(src, `${stem}${SUFFIX[kind].file}.ts`), "utf8")
    );
    return op ? [op] : [];
  });
}

const catalogs = Object.fromEntries(OPERATION_KINDS.map((k) => [k, catalog(k)])) as Record<
  OperationKind,
  CatalogOperation[]
>;

function find(kind: OperationKind, name: string): CatalogOperation {
  const op = catalogs[kind].find((o) => o.name === name);
  if (!op) throw new Error(`no ${kind} ${name}`);
  return op;
}

const raw = (url: string, extra: Partial<RawRequestInput> = {}): RawRequestInput => ({
  method: "GET",
  url,
  headers: "",
  body: "",
  ...extra,
});

describe("operation catalog", () => {
  it.each(OPERATION_KINDS)("has every operation the %s docs count", (kind) => {
    const doc = readFileSync(join(repo, "docs/mapping/supported-operations.md"), "utf8");
    const counted = new RegExp(`<!-- count:${kind} -->([\\d,]+)<!-- /count -->`).exec(doc)?.[1];
    expect(catalogs[kind].length).toBe(Number(counted?.replace(/,/g, "")));
  });

  it.each(OPERATION_KINDS)("names %s classes the package exports", (kind) => {
    const missing = catalogs[kind].filter(
      (op) => typeof PACKAGES[kind][op.className] !== "function"
    );
    expect(missing.map((op) => op.className)).toEqual([]);
  });

  it("reads a function's parameters", () => {
    expect(find("functions", "RetrieveTotalRecordCount")).toEqual({
      kind: "functions",
      name: "RetrieveTotalRecordCount",
      className: "RetrieveTotalRecordCountFunction",
      method: "GET",
      route: "/RetrieveTotalRecordCount",
      args: [],
      parameters: [{ name: "EntityNames", type: "string[]", optional: false }],
    });
    expect(find("functions", "WhoAmI").parameters).toBeUndefined();
  });

  it("reads a bound action's record argument and route", () => {
    const op = find("actions", "AddMembersTeam");
    expect(op).toMatchObject({
      className: "AddMembersTeamAction",
      method: "POST",
      route: "/teams({teamId})/Microsoft.Dynamics.CRM.AddMembersTeam",
      args: [{ name: "teamId", type: "string" }],
    });
    expect(op.parameters?.[0]).toMatchObject({ name: "Members", optional: false });
    expect(find("messages", "AddMembersTeam")).toMatchObject({
      className: "AddMembersTeamRequest",
      args: [{ name: "teamId", type: "string" }],
    });
  });
});

describe("parameter values", () => {
  it("reads each type", () => {
    expect(parseValue({ name: "A", type: "string" }, " text ")).toBe(" text ");
    expect(parseValue({ name: "A", type: "number" }, "42")).toBe(42);
    expect(parseValue({ name: "A", type: "boolean" }, "false")).toBe(false);
    expect(parseValue({ name: "A", type: "string[]" }, '["a", "b"]')).toEqual(["a", "b"]);
    expect(parseValue({ name: "A", type: "string[]" }, "a, b")).toEqual(["a", "b"]);
    expect(parseValue({ name: "A", type: "X | keyof typeof X" }, "ValidForCreate")).toBe(
      "ValidForCreate"
    );
    expect(parseValue({ name: "A", type: "string" }, "  ")).toBeUndefined();
  });

  it("refuses values of the wrong type", () => {
    expect(() => parseValue({ name: "Top", type: "number" }, "ten")).toThrow(ValueError);
    expect(() => parseValue({ name: "B", type: "boolean" }, "yes")).toThrow(/true or false/);
    expect(() => parseValue({ name: "J", type: "ColumnSet" }, "{ nope")).toThrow(/JSON/);
    expect(() => parseValue({ name: "L", type: "number[]" }, "{}")).toThrow(/array/);
  });

  it("turns { logicalName, id } into a record reference where the type takes one", () => {
    const ref = parseValue(
      { name: "Target", type: "EntityReference" },
      '{ "logicalName": "account", "id": "a1" }'
    );
    expect(ref).toEqual(new ReferenceValue("account", "a1"));
    // Not where the type doesn't take a reference.
    expect(
      parseValue(
        { name: "X", type: "Record<string, unknown>" },
        '{ "logicalName": "a", "id": "b" }'
      )
    ).toEqual({ logicalName: "a", id: "b" });
  });

  it("lists what is missing, and refuses to run until it is filled in", () => {
    const op = find("actions", "AddMembersTeam");
    const draft = draftValues(op, { args: {}, parameters: {} });
    expect(draft.problems.map((p) => p.field)).toEqual(["teamId", "Members"]);
    expect(draft.args).toEqual(["{teamId}"]);
    expect(() => operationValues(op, { args: {}, parameters: {} })).toThrow(/teamId: is required/);
  });
});

describe("raw requests", () => {
  it("turns system query options and headers into the SDK's methods", () => {
    const plan = parseRawRequest(
      raw(
        "accounts?$select=name,accountid&$filter=statecode eq 0&$expand=primarycontactid($select=fullname,jobtitle)&$orderby=name asc,revenue desc&$top=3&$count=true&savedQuery=abc",
        {
          headers:
            "Prefer: return=representation\nIf-Match: *\nCallerObjectId: u1\nMSCRMCallerID: u2\nX-Custom: yes",
        }
      )
    );
    expect(plan.path).toBe("accounts?savedQuery=abc");
    expect(plan.terminal).toBe("get");
    expect(plan.calls).toEqual([
      { name: "select", args: ["name", "accountid"] },
      { name: "filter", args: ["statecode eq 0"] },
      { name: "expand", args: ["primarycontactid($select=fullname,jobtitle)"] },
      { name: "orderBy", args: ["name asc", "revenue desc"] },
      { name: "top", args: [3] },
      { name: "count", args: [] },
      { name: "preferRaw", args: ["return=representation"] },
      { name: "ifMatch", args: ["*"] },
      { name: "impersonateByObjectId", args: ["u1"] },
      { name: "impersonate", args: ["u2"] },
      { name: "header", args: ["X-Custom", "yes"] },
    ]);
  });

  it("accepts a full URL of the environment, and reads $metadata as text", () => {
    const plan = parseRawRequest(raw(`${API}/$metadata`), ORG);
    expect(plan.path).toBe("$metadata");
    expect(plan.terminal).toBe("text");
  });

  it("refuses a body that isn't JSON, a header without a colon, and an empty URL", () => {
    expect(() => parseRawRequest(raw("accounts", { method: "POST", body: "{ name" }))).toThrow(
      RequestInputError
    );
    expect(() => parseRawRequest(raw("accounts", { headers: "Prefer" }))).toThrow(/Name: value/);
    expect(() => parseRawRequest(raw("  "))).toThrow(/Enter a URL/);
  });
});

describe("SDK code", () => {
  it("writes a raw request as a client.api() chain", () => {
    expect(rawCode(parseRawRequest(raw("WhoAmI")))).toBe(
      [
        "// `client` is a DataverseClient for your environment (see Getting started).",
        'const result = await client.api("WhoAmI").get();',
      ].join("\n")
    );
    expect(
      rawCode(
        parseRawRequest(
          raw("accounts?$select=name&$top=3", {
            method: "POST",
            headers: "Prefer: return=representation",
            body: '{ "name": "Contoso", "revenue": 5 }',
          })
        )
      )
    ).toBe(
      [
        "// `client` is a DataverseClient for your environment (see Getting started).",
        "const result = await client",
        '  .api("accounts")',
        '  .select("name")',
        "  .top(3)",
        '  .preferRaw("return=representation")',
        '  .post({ name: "Contoso", revenue: 5 });',
      ].join("\n")
    );
    expect(rawCode(parseRawRequest(raw("accounts(1)", { method: "DELETE" })))).toMatch(
      /\nawait client\.api\("accounts\(1\)"\)\.delete\(\);$/
    );
  });

  it("writes literals TypeScript-style", () => {
    expect(tsLiteral({ a: 1, "b-c": [true, null], ref: new ReferenceValue("account", "x") })).toBe(
      '{ a: 1, "b-c": [true, null], ref: createEntityReference("account", "x") }'
    );
  });

  it("writes a typed operation in each flavour", () => {
    const op = find("functions", "RetrieveTotalRecordCount");
    const values = operationValues(op, {
      args: {},
      parameters: { EntityNames: "account, contact" },
    });
    expect(operationCode(op, values, "typed")).toBe(
      [
        'import { RetrieveTotalRecordCountFunction } from "@mohsinonxrm/dataverse-sdk-functions";',
        "",
        "// `client` is a DataverseClient for your environment (see Getting started).",
        "const result = await client.execute(",
        '  new RetrieveTotalRecordCountFunction({ EntityNames: ["account", "contact"] })',
        ");",
      ].join("\n")
    );
    expect(operationCode(op, values, "service")).toBe(
      [
        'import { OrganizationService } from "@mohsinonxrm/dataverse-sdk-xrm";',
        'import { RetrieveTotalRecordCountFunction } from "@mohsinonxrm/dataverse-sdk-functions";',
        "",
        "// `client` is a DataverseClient for your environment (see Getting started).",
        "const service = new OrganizationService(client);",
        "const result = await service.execute(",
        '  new RetrieveTotalRecordCountFunction({ EntityNames: ["account", "contact"] })',
        ");",
      ].join("\n")
    );
    const operation = instantiate(functions, op, values);
    expect(operationCode(op, values, "fluent", fluentPlan(operation, API))).toBe(
      [
        "// `client` is a DataverseClient for your environment (see Getting started).",
        // The alias is encoded as the function's toRequestInformation() encodes it.
        "const result = await client",
        '  .api("RetrieveTotalRecordCount(EntityNames=@p1)?%40p1=%5B%22account%22%2C%22contact%22%5D")',
        "  .get();",
      ].join("\n")
    );
  });

  it("imports createEntityReference for a record reference, and passes a bound record first", () => {
    const op = find("actions", "AddMembersTeam");
    const values = operationValues(op, {
      args: { teamId: "11111111-1111-1111-1111-111111111111" },
      parameters: {
        Members: '[{ "logicalName": "systemuser", "id": "22222222-2222-2222-2222-222222222222" }]',
      },
    });
    const code = operationCode(op, values, "typed");
    expect(code).toContain(
      'import { AddMembersTeamAction, createEntityReference } from "@mohsinonxrm/dataverse-sdk-actions";'
    );
    expect(constructorCall(op, values)).toBe(
      [
        "new AddMembersTeamAction(",
        '  "11111111-1111-1111-1111-111111111111",',
        "  {",
        "    Members: [",
        '      createEntityReference("systemuser", "22222222-2222-2222-2222-222222222222"),',
        "    ],",
        "  }",
        ")",
      ].join("\n")
    );
  });

  it("leaves out the parameters object when nothing in it is set and nothing is required", () => {
    const op = find("actions", "AddMembersBatchList");
    expect(op.parameters?.every((p) => p.optional)).toBe(true);
    expect(constructorCall(op, operationValues(op, { args: {}, parameters: {} }))).toBe(
      "new AddMembersBatchListAction()"
    );
    expect(constructorCall(find("functions", "WhoAmI"), { args: [] })).toBe("new WhoAmIFunction()");
  });
});

describe("request preview", () => {
  it("shows a raw request as the SDK builds it, without sending it", async () => {
    const plan = parseRawRequest(
      raw("accounts?$select=name&$filter=name eq 'A&B'&$top=3", {
        headers: "Prefer: odata.include-annotations=*\nCallerObjectId: u1",
      })
    );
    const { requests, error } = await previewRequests(ORG, (client) => runRawPlan(client, plan));
    expect(error).toBeUndefined();
    expect(requests).toHaveLength(1);
    const [request] = requests;
    expect(request?.method).toBe("GET");
    expect(decodeURIComponent(request?.url ?? "")).toBe(
      `${API}/accounts?$select=name&$filter=name eq 'A&B'&$top=3`
    );
    expect(request?.headers).toMatchObject({
      authorization: "Bearer (your access token)",
      prefer: "odata.include-annotations=*",
      callerobjectid: "u1",
      "odata-version": "4.0",
    });
    expect(httpText(request)).toMatch(
      /^GET https:\/\/contoso\.crm\.dynamics\.com\/api\/data\/v9\.2\/accounts\?/
    );
  });

  it("shows a typed operation's request, body included", async () => {
    const op = find("actions", "CanManyToMany");
    const operation = instantiate(
      actions,
      op,
      operationValues(op, { args: {}, parameters: { EntityName: "account" } })
    );
    const { requests } = await previewRequests(ORG, (client) =>
      runOperation(client, operation, "typed")
    );
    expect(requests.map((r) => [r.method, r.url, r.body])).toEqual([
      ["POST", `${API}/CanManyToMany`, '{"EntityName":"account"}'],
    ]);
  });

  it("says why the SDK would send nothing", async () => {
    const plan = parseRawRequest(raw("https://evil.example.com/steal"));
    const { requests, error } = await previewRequests(ORG, (client) => runRawPlan(client, plan));
    expect(requests).toEqual([]);
    expect(error).toBeInstanceOf(DataverseError);
  });
});

describe("running", () => {
  it("sends the same request in every flavour of a typed operation", async () => {
    const op = find("functions", "RetrieveTotalRecordCount");
    const values = operationValues(op, { args: {}, parameters: { EntityNames: '["account"]' } });
    const urls: string[] = [];
    for (const flavour of ["typed", "service", "fluent"] as const) {
      const { sdk, fake } = withFakeFetch();
      fake.on("GET", /^\/RetrieveTotalRecordCount\(/, () =>
        jsonResponse({ EntityRecordCountCollection: { Count: 1, Keys: ["account"], Values: [3] } })
      );
      await runOperation(sdk.client, instantiate(functions, op, values), flavour);
      urls.push(fake.last().url);
    }
    expect(new Set(urls).size).toBe(1);
  });

  it("round-trips an operation's request through the request bar", () => {
    const op = find("actions", "CanManyToMany");
    const operation = instantiate(
      actions,
      op,
      operationValues(op, { args: {}, parameters: { EntityName: "account" } })
    );
    expect(rawInputFromRequestInformation(operation.toRequestInformation(API), API)).toEqual({
      method: "POST",
      url: "CanManyToMany",
      headers: "",
      body: '{"EntityName":"account"}',
    });
  });

  it.each(SAMPLES.map((s) => [s.id, s] as const))(
    "runs sample %s against the demo environment",
    async (_, sample) => {
      const { sdk } = withDemo();
      const send = () => {
        if (sample.type === "raw") return runRawPlan(sdk.client, parseRawRequest(sample.request));
        const op = find(sample.operation.kind, sample.operation.name);
        const operation = instantiate(
          PACKAGES[sample.operation.kind],
          op,
          operationValues(op, sample.input)
        );
        return runOperation(sdk.client, operation, sample.flavour ?? "typed");
      };
      if (sample.failsOnPurpose) await expect(send()).rejects.toBeInstanceOf(DataverseError);
      else await expect(send()).resolves.not.toBeInstanceOf(Error);
    }
  );
});
