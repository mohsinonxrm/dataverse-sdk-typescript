/**
 * #344: messages backed by Web API functions. Each function (but the `$filter` query functions)
 * gets a `<Name>Request` / `<Name>Response` pair in the messages package: the same `GET` with
 * parameter aliases as the functions package's class, the message contract of the action-backed
 * messages (one parameters object kept in `Parameters`, `response.result`), and the hand-written
 * CRUD and ExecuteMultiple / ExecuteTransaction messages re-exported from the index.
 */
import { existsSync } from "node:fs";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { parseEdmx } from "../src/parsers/edmx-parser.js";
import { generateFunctions } from "../src/generators/functions-generator.js";
import {
  generateMessages,
  HAND_WRITTEN_MESSAGES,
  messageStems,
} from "../src/generators/messages-generator.js";
import { generateComplexTypes } from "../src/generators/complex-types-generator.js";
import { readOperation } from "../src/docs/operation-docs.js";
import { copyMessagesHandWritten, typecheck } from "./typecheck.js";

const OUT_ROOT = fileURLToPath(new URL(".", import.meta.url));
const GUID = "00000000-0000-0000-0000-000000000001";
const BASE = "https://org.crm.dynamics.com/api/data/v9.2";

const EDMX = `<?xml version="1.0" encoding="utf-8"?>
<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx">
  <edmx:DataServices>
    <Schema Namespace="Microsoft.Dynamics.CRM" Alias="mscrm" xmlns="http://docs.oasis-open.org/odata/ns/edm">
      <EntityType Name="crmbaseentity" Abstract="true" />
      <EntityType Name="principal" BaseType="mscrm.crmbaseentity" Abstract="true" />
      <EntityType Name="systemuser" BaseType="mscrm.principal">
        <Key><PropertyRef Name="systemuserid" /></Key>
        <Property Name="systemuserid" Type="Edm.Guid" />
      </EntityType>
      <EntityType Name="team" BaseType="mscrm.principal">
        <Key><PropertyRef Name="teamid" /></Key>
        <Property Name="teamid" Type="Edm.Guid" />
      </EntityType>
      <EnumType Name="EntityFilters" IsFlags="true">
        <Member Name="Entity" Value="1" />
        <Member Name="Attributes" Value="2" />
      </EnumType>
      <EnumType Name="LogicalOperator">
        <Member Name="And" Value="0" />
        <Member Name="Or" Value="1" />
      </EnumType>
      <EnumType Name="AccessRights" IsFlags="true">
        <Member Name="None" Value="0" />
        <Member Name="ReadAccess" Value="1" />
      </EnumType>
      <ComplexType Name="WhoAmIResponse">
        <Property Name="UserId" Type="Edm.Guid" Nullable="false" />
      </ComplexType>
      <ComplexType Name="FilterExpression">
        <Property Name="FilterOperator" Type="mscrm.LogicalOperator" />
      </ComplexType>
      <ComplexType Name="ValidateFetchXmlExpressionResult">
        <Property Name="IsValid" Type="Edm.Boolean" Nullable="false" />
      </ComplexType>
      <ComplexType Name="RetrievePrincipalAccessResponse">
        <Property Name="AccessRights" Type="mscrm.AccessRights" Nullable="false" />
      </ComplexType>
      <Function Name="WhoAmI">
        <ReturnType Type="mscrm.WhoAmIResponse" Nullable="false" />
      </Function>
      <Function Name="RetrieveTable">
        <Parameter Name="EntityFilters" Type="mscrm.EntityFilters" Nullable="false" />
        <Parameter Name="LogicalName" Type="Edm.String" Unicode="false" />
        <Parameter Name="MetadataId" Type="Edm.Guid" Nullable="false" />
        <Parameter Name="RetrieveAsIfPublished" Type="Edm.Boolean" Nullable="false" />
        <ReturnType Type="Edm.String" Nullable="false" />
      </Function>
      <Function Name="CountMatches">
        <Parameter Name="Filter" Type="mscrm.FilterExpression" Nullable="false" />
        <ReturnType Type="Edm.Int32" Nullable="false" />
      </Function>
      <Function Name="ValidateFetchXmlExpression">
        <Parameter Name="FetchXml" Type="Edm.String" Nullable="false" />
        <ReturnType Type="mscrm.ValidateFetchXmlExpressionResult" Nullable="false" />
      </Function>
      <Function Name="RetrievePrincipalAccess" IsBound="true">
        <Parameter Name="systemuser" Type="mscrm.systemuser" Nullable="false" />
        <Parameter Name="Target" Type="mscrm.crmbaseentity" Nullable="false" />
        <ReturnType Type="mscrm.RetrievePrincipalAccessResponse" Nullable="false" />
      </Function>
      <Function Name="RetrievePrincipalAccess" IsBound="true">
        <Parameter Name="team" Type="mscrm.team" Nullable="false" />
        <Parameter Name="Target" Type="mscrm.crmbaseentity" Nullable="false" />
        <ReturnType Type="mscrm.RetrievePrincipalAccessResponse" Nullable="false" />
      </Function>
      <Function Name="LastXDays">
        <Parameter Name="PropertyName" Type="Edm.String" Nullable="false" />
        <Parameter Name="PropertyValue" Type="Edm.Int32" Nullable="false" />
        <ReturnType Type="Edm.Boolean" Nullable="false" />
      </Function>
      <Action Name="SendGreeting">
        <Parameter Name="Message" Type="Edm.String" Nullable="false" />
      </Action>
      <EntityContainer Name="System">
        <EntitySet Name="systemusers" EntityType="Microsoft.Dynamics.CRM.systemuser" />
        <EntitySet Name="teams" EntityType="Microsoft.Dynamics.CRM.team" />
      </EntityContainer>
    </Schema>
  </edmx:DataServices>
</edmx:Edmx>`;

let dir: string;
const read = (path: string): Promise<string> => readFile(join(dir, path), "utf8");

/** Import a generated messages module (vitest compiles the TypeScript). */
async function load<T>(file: string): Promise<T> {
  return (await import(pathToFileURL(join(dir, "messages", file)).href)) as T;
}

interface Request {
  Parameters: Record<string, unknown>;
  messageName: string;
  toRequestInformation(baseUrl: string): { method: string; url: string };
  parseResponse(response: Response): Promise<{ messageName: string; result?: unknown }>;
}
type RequestClass = new (...args: never[]) => Request;

beforeAll(async () => {
  vi.spyOn(console, "log").mockImplementation(() => undefined);
  dir = await mkdtemp(join(OUT_ROOT, ".gen-function-messages-test-"));
  const csdl = parseEdmx(EDMX);
  for (const target of ["functions", "messages"] as const) {
    await generateComplexTypes(csdl, join(dir, target, "types"));
  }
  await generateFunctions(csdl, join(dir, "functions"), false);
  await generateMessages(csdl, join(dir, "messages"), false);
  await copyMessagesHandWritten(join(dir, "messages"));
});

afterAll(async () => {
  vi.restoreAllMocks();
  await rm(dir, { recursive: true, force: true });
});

describe("function-backed messages (#344)", () => {
  it("generates a request/response pair per function, but not for the query functions", () => {
    for (const stem of [
      "WhoAmI",
      "RetrieveTable",
      "CountMatches",
      "ValidateFetchXmlExpression",
      "RetrievePrincipalAccess_systemuser",
      "RetrievePrincipalAccess_team",
      "SendGreeting",
    ]) {
      expect(existsSync(join(dir, "messages", `${stem}Message.ts`)), stem).toBe(true);
    }
    // LastXDays runs only inside $filter (#342)
    expect(existsSync(join(dir, "messages", "LastXDaysMessage.ts"))).toBe(false);
    // A name with no unbound overload has no plain-name class (#286)
    expect(existsSync(join(dir, "messages", "RetrievePrincipalAccessMessage.ts"))).toBe(false);
  });

  it("sends a GET with the function's parameter aliases", async () => {
    const { RetrieveTableRequest } = await load<{ RetrieveTableRequest: RequestClass }>(
      "RetrieveTableMessage.ts"
    );
    const request = new (RetrieveTableRequest as new (p: object) => Request)({
      EntityFilters: 3,
      MetadataId: `{${GUID}}`,
      RetrieveAsIfPublished: false,
    });
    expect(request.messageName).toBe("RetrieveTable");
    expect(request.Parameters).toEqual({
      EntityFilters: 3,
      MetadataId: `{${GUID}}`,
      RetrieveAsIfPublished: false,
    });
    const info = request.toRequestInformation(BASE);
    expect(info.method).toBe("GET");
    // LogicalName was left out, so it has no alias
    expect(decodeURIComponent(info.url)).toBe(
      `${BASE}/RetrieveTable(EntityFilters=@p1,MetadataId=@p3,RetrieveAsIfPublished=@p4)` +
        `?@p1=Microsoft.Dynamics.CRM.EntityFilters'3'&@p3=${GUID}&@p4=false`
    );
  });

  it("builds the same URL as the functions package (one shared implementation)", async () => {
    const message = await read("messages/RetrieveTableMessage.ts");
    const func = await read("functions/RetrieveTableFunction.ts");
    const urlCode = (source: string): string =>
      source.slice(
        source.indexOf("let url ="),
        source.indexOf("return {", source.indexOf("let url ="))
      );
    expect(urlCode(message)).toBe(urlCode(func).replaceAll("this.parameters", "this.Parameters"));
  });

  it("binds an overload to its record, the record id first", async () => {
    const { RetrievePrincipalAccess_systemuserRequest: Request } = await load<{
      RetrievePrincipalAccess_systemuserRequest: new (id: string, p: object) => Request;
    }>("RetrievePrincipalAccess_systemuserMessage.ts");
    const target = { "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: GUID };
    Object.defineProperties(target, {
      logicalName: { value: "account" },
      id: { value: GUID },
      entitySetName: { value: "accounts" },
    });
    const info = new Request(GUID, { Target: target }).toRequestInformation(BASE);
    expect(decodeURIComponent(info.url)).toBe(
      `${BASE}/systemusers(${GUID})/Microsoft.Dynamics.CRM.RetrievePrincipalAccess(Target=@p1)` +
        `?@p1={"@odata.id":"accounts(${GUID})"}`
    );
  });

  it("writes enum members by name in a JSON parameter, from the messages' enumBody tables", async () => {
    expect(await read("messages/CountMatchesMessage.ts")).toContain(
      'enumBody(this.Parameters.Filter, "FilterExpression")'
    );
    expect(await read("messages/internal/enumBody.ts")).toContain("FilterExpression");
    const { CountMatchesRequest } = await load<{ CountMatchesRequest: RequestClass }>(
      "CountMatchesMessage.ts"
    );
    const info = new (CountMatchesRequest as new (p: object) => Request)({
      Filter: { FilterOperator: 1 },
    }).toRequestInformation(BASE);
    expect(decodeURIComponent(info.url)).toContain('@p1={"FilterOperator":"Or"}');
  });

  it("resolves the function's value in response.result (#300)", async () => {
    const { WhoAmIRequest } = await load<{ WhoAmIRequest: new () => Request }>("WhoAmIMessage.ts");
    const whoAmI = await new WhoAmIRequest().parseResponse(
      Response.json({ "@odata.context": "ctx", UserId: GUID })
    );
    expect(whoAmI.messageName).toBe("WhoAmI");
    expect(whoAmI.result).toEqual({ "@odata.context": "ctx", UserId: GUID });

    const { CountMatchesRequest } = await load<{ CountMatchesRequest: RequestClass }>(
      "CountMatchesMessage.ts"
    );
    const count = await new (CountMatchesRequest as new (p: object) => Request)({
      Filter: {},
    }).parseResponse(Response.json({ value: 7 }));
    expect(count.result).toBe(7);
  });

  it("types the messages: constructor parameters, result, and the index exports", async () => {
    const errors = await typecheck(
      join(dir, "messages"),
      "use-function-messages.ts",
      `import {
  CreateRequest,
  ExecuteMultipleRequest,
  RetrievePrincipalAccess_teamRequest,
  RetrieveTableRequest,
  ValidateFetchXmlExpressionRequest,
  WhoAmIRequest,
  type CountMatchesRequestParameters,
  type ValidateFetchXmlExpressionResult,
  type WhoAmIResponse,
} from "./index.js";
import { createEntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";

declare function run<T>(request: { parseResponse(response: Response): Promise<T> }): Promise<T>;

export async function use(): Promise<void> {
  const who: WhoAmIResponse = await run(new WhoAmIRequest());
  const userId: string = who.result.UserId;
  const table = await run(
    new RetrieveTableRequest({ EntityFilters: "Entity", MetadataId: userId, RetrieveAsIfPublished: true })
  );
  const text: string = table.result;
  const valid = await run(new ValidateFetchXmlExpressionRequest({ FetchXml: "<fetch />" }));
  const result: ValidateFetchXmlExpressionResult = valid.result;
  const isValid: boolean = result.IsValid;
  const parameters: CountMatchesRequestParameters = { Filter: { FilterOperator: 0 } };
  new RetrievePrincipalAccess_teamRequest(userId, { Target: createEntityReference("account", userId) });
  new ExecuteMultipleRequest({
    Requests: [new WhoAmIRequest(), new CreateRequest({ Target: { "@odata.type": "Microsoft.Dynamics.CRM.account" } })],
  });
  void [text, isValid, parameters];
  // @ts-expect-error MetadataId is required
  new RetrieveTableRequest({ EntityFilters: "Entity", RetrieveAsIfPublished: true });
}
`
    );
    expect(errors).toEqual([]);
  });

  it("lists a function message as a GET in the docs", () => {
    const op = readOperation(join(dir, "messages"), "messages", "RetrieveTable");
    expect(op?.method).toBe("GET");
    expect(op?.route).toBe("/RetrieveTable");
    expect(readOperation(join(dir, "messages"), "messages", "SendGreeting")?.method).toBe("POST");
  });
});

describe("message names (#344)", () => {
  const csdlWith = (operations: string) =>
    parseEdmx(EDMX.replace("<EntityContainer", `${operations}\n      <EntityContainer`));

  it("refuses a function named like a hand-written message", () => {
    const csdl = csdlWith(`<Function Name="Retrieve"><ReturnType Type="Edm.String" /></Function>`);
    expect(() => messageStems(csdl.actions, csdl.functions)).toThrow(
      /function Retrieve would be RetrieveRequest, which is already a hand-written message/
    );
  });

  it("refuses an action and a function with the same message name", () => {
    const csdl = csdlWith(`<Action Name="WhoAmI" />`);
    expect(() => messageStems(csdl.actions, csdl.functions)).toThrow(/WhoAmIRequest/);
  });

  it("re-exports every hand-written message from the generated index", async () => {
    const index = await read("messages/index.ts");
    for (const name of HAND_WRITTEN_MESSAGES.names) {
      expect(index).toMatch(new RegExp(`\\b${name}Request\\b`));
      expect(index).toMatch(new RegExp(`\\b${name}Response\\b`));
    }
    expect(index).toContain(`from './${HAND_WRITTEN_MESSAGES.folder}/index.js';`);
  });
});
