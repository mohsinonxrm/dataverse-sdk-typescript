/**
 * #22: string parameters are sent as OData string literals, with embedded `'` doubled.
 *
 * Requests go through a real DataverseClient and the recording fake fetch, so the assertions are on
 * the URL that actually reaches `fetch`.
 */
import { describe, expect, it } from "vitest";
import { TEST_API_URL, createTestClient, jsonResponse } from "@mohsinonxrm/dataverse-sdk-testing";
import { FetchXmlToQueryExpressionFunction } from "../src/FetchXmlToQueryExpressionFunction.js";
import { RetrieveUserPrivilegeByPrivilegeNameFunction } from "../src/RetrieveUserPrivilegeByPrivilegeNameFunction.js";
import { ValidateFetchXmlExpressionFunction } from "../src/ValidateFetchXmlExpressionFunction.js";
import { formatAliasValue } from "../src/internal/odataLiteral.js";

const FETCH_XML =
  "<fetch top='1'><entity name='account'><attribute name='name'/><filter>" +
  `<condition attribute='name' operator='eq' value="O'Brien &amp; Co+1 #50% é✓"/>` +
  "</filter></entity></fetch>";

/** What Dataverse must see after URL-decoding the alias: the value quoted, every `'` doubled. */
const literal = (value: string): string => `'${value.replace(/'/g, "''")}'`;

/** The decoded alias values of the request URL (as the server decodes them). */
function aliasValues(url: string): Record<string, string | null> {
  const params = new URL(url).searchParams;
  return Object.fromEntries([...params.keys()].map((k) => [k, params.get(k)]));
}

describe("#22: function string parameters are OData string literals", () => {
  it("FetchXmlToQueryExpression doubles every single quote in the FetchXml literal", async () => {
    const { client, fake } = createTestClient();
    fake.on("GET", /^\/FetchXmlToQueryExpression\(/, () => jsonResponse({ Query: {} }));

    await client.execute(new FetchXmlToQueryExpressionFunction(FETCH_XML));

    const r = fake.last();
    expect(r.path.split("?")[0]).toBe("/FetchXmlToQueryExpression(FetchXml=@p1)");
    expect(aliasValues(r.url)).toEqual({ "@p1": literal(FETCH_XML) });
    expect(aliasValues(r.url)["@p1"]).toContain("<entity name=''account''>");
    expect(aliasValues(r.url)["@p1"]).toContain(`value="O''Brien &amp; Co+1 #50% é✓"`);
  });

  it("the literal survives URL encoding: & + # % newline and non-ASCII round-trip", () => {
    const value = "a'b&c+d#e%f g\nh\r\ti é✓ 😀 ''";
    const info = new ValidateFetchXmlExpressionFunction(value).toRequestInformation(TEST_API_URL);
    const url = new URL(info.url);

    // Nothing in the value leaks into the URL structure: no fragment, no extra query parameters.
    expect(url.hash).toBe("");
    expect([...url.searchParams.keys()]).toEqual(["@p1"]);
    expect(url.searchParams.get("@p1")).toBe("'a''b&c+d#e%f g\nh\r\ti é✓ 😀 '''''");
  });

  it("a value that is only quotes becomes a literal of doubled quotes", () => {
    const info = new ValidateFetchXmlExpressionFunction("'").toRequestInformation(TEST_API_URL);
    expect(aliasValues(info.url)).toEqual({ "@p1": "''''" });
  });

  it("bound functions escape string parameters too, and leave booleans unquoted", async () => {
    const { client, fake } = createTestClient();
    const userId = "00000000-0000-0000-0000-000000000001";
    fake.on("GET", /^\/systemusers\(/, () => jsonResponse({ RolePrivileges: [] }));

    await client.execute(
      new RetrieveUserPrivilegeByPrivilegeNameFunction(userId, "prv'Read", false)
    );

    const r = fake.last();
    expect(r.path.split("?")[0]).toBe(
      `/systemusers(${userId})/Microsoft.Dynamics.CRM.RetrieveUserPrivilegeByPrivilegeName(PrivilegeName=@p1,ExcludeTeamBasic=@p2)`
    );
    expect(aliasValues(r.url)).toEqual({ "@p1": "'prv''Read'", "@p2": "false" });
  });

  it("a string without quotes is sent exactly as before", () => {
    const info = new ValidateFetchXmlExpressionFunction("<fetch/>").toRequestInformation(
      TEST_API_URL
    );
    expect(info.url).toBe(
      `${TEST_API_URL}/ValidateFetchXmlExpression(FetchXml=@p1)?%40p1=%27%3Cfetch%2F%3E%27`
    );
  });
});

describe("formatAliasValue", () => {
  it("quotes strings and doubles embedded quotes", () => {
    expect(formatAliasValue("")).toBe("''");
    expect(formatAliasValue("O'Brien")).toBe("'O''Brien'");
    expect(formatAliasValue("''")).toBe("''''''");
  });

  it("writes numbers, booleans and null unquoted", () => {
    expect(formatAliasValue(7)).toBe("7");
    expect(formatAliasValue(1.5)).toBe("1.5");
    expect(formatAliasValue(true)).toBe("true");
    expect(formatAliasValue(null)).toBe("null");
  });
});
