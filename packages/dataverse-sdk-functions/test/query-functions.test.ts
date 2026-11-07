/**
 * #342: the query functions (`LastXDays`, `In`, `Under`, …) are `$filter` expressions, not
 * `Executable` classes: Dataverse answers 404 when one is called on its own. `queryFunctions`
 * writes them with core's `odataLiteral`.
 *
 * Requests go through a real DataverseClient and the recording fake fetch, so the assertions are on
 * the URL that actually reaches `fetch`.
 */
import { describe, expect, it } from "vitest";
import { odata, odataLiteral, type DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { createTestClient, jsonResponse, type FakeFetch } from "@mohsinonxrm/dataverse-sdk-testing";
import * as functions from "../src/index.js";
import { queryFunctions } from "../src/index.js";

const ID = "00000000-0000-0000-0000-000000000001";

/** `client` with a fake fetch that answers `GET /accounts` with no rows. */
function accountsClient(): { client: DataverseClient; fake: FakeFetch } {
  const { client, fake } = createTestClient();
  fake.on("GET", "/accounts", () => jsonResponse({ value: [] }));
  return { client, fake };
}

/** The `$filter` of the last request, as the server decodes it, and as it was encoded. */
function sentFilter(fake: FakeFetch): { decoded: string | null; raw: string } {
  const { url } = fake.last();
  const raw = /[?&]\$filter=([^&]*)/.exec(url)?.[1] ?? "";
  return { decoded: new URL(url).searchParams.get("$filter"), raw };
}

describe("queryFunctions (#342)", () => {
  it("has no Executable class or Response type for a query function", () => {
    const exported = Object.keys(functions);
    for (const name of ["Above", "Between", "In", "LastXDays", "InFiscalYear", "EqualUserId"]) {
      expect(exported).not.toContain(`${name}Function`);
    }
    // A real function keeps its class
    expect(exported).toContain("WhoAmIFunction");
    expect(Object.keys(queryFunctions)).toHaveLength(71);
  });

  it("every helper returns Microsoft.Dynamics.CRM.<Name>(PropertyName=…)", () => {
    for (const [key, helper] of Object.entries(queryFunctions)) {
      const call = helper as (parameters: Record<string, unknown>) => string;
      const name = key.charAt(0).toUpperCase() + key.slice(1);
      // Every parameter given a value of its type, so each helper is called once
      const expression = call({
        PropertyName: "createdon",
        PropertyValue:
          /^(?:Above|AboveOrEqual|Under|UnderOrEqual|NotUnder|On|OnOrAfter|OnOrBefore|Contains)$/.test(
            name
          )
            ? "x"
            : 1,
        PropertyValues: ["a", "b"],
        PropertyValue1: 1,
        PropertyValue2: 2024,
      });
      expect(expression).toMatch(
        new RegExp(`^Microsoft\\.Dynamics\\.CRM\\.${name}\\(PropertyName='createdon'(,|\\)$)`)
      );
    }
  });

  it("the filter reaches fetch URL-encoded, and decodes to the exact expression", async () => {
    const { client, fake } = accountsClient();
    const filter = queryFunctions.lastXDays({ PropertyName: "createdon", PropertyValue: 7 });
    expect(filter).toBe(
      "Microsoft.Dynamics.CRM.LastXDays(PropertyName='createdon',PropertyValue=7)"
    );

    await client.api("accounts").select("name").filter(filter).get();

    const sent = sentFilter(fake);
    expect(sent.decoded).toBe(filter);
    // Encoded like encodeURIComponent, which keeps ' ( ) and the characters OData writes
    // literally (= ,), so it reads as Microsoft's examples do
    expect(sent.raw).toBe(filter);
    expect(fake.last().path.split("?")[0]).toBe("/accounts");
  });

  it("a collection, quotes and non-ASCII survive the URL: In with tricky values", async () => {
    const { client, fake } = accountsClient();
    const values = [`O'Brien`, `say "hi"`, "a&b+c#d%e", "back\\slash", "Ünï ✓"];
    const filter = queryFunctions.in({ PropertyName: "name", PropertyValues: values });
    expect(filter).toBe(
      `Microsoft.Dynamics.CRM.In(PropertyName='name',PropertyValues=${JSON.stringify(values)})`
    );

    await client.api("accounts").filter(filter).get();

    const sent = sentFilter(fake);
    expect(sent.decoded).toBe(filter);
    // Nothing in a value leaks into the URL structure
    const url = new URL(fake.last().url);
    expect([...url.searchParams.keys()]).toEqual(["$filter"]);
    expect(url.hash).toBe("");
    expect(sent.raw).not.toMatch(/[ "#&+[\]\\]/);
    expect(sent.raw).toContain(
      "PropertyValues=%5B%22O'Brien%22,%22say%20%5C%22hi%5C%22%22,%22a%26b%2Bc%23d%25e%22,"
    );
  });

  it("a quote can't end a string literal early and change the filter", async () => {
    const { client, fake } = accountsClient();
    const filter = queryFunctions.under({
      PropertyName: "accountid",
      PropertyValue: "x') or (name ne null",
    });
    expect(filter).toBe(
      "Microsoft.Dynamics.CRM.Under(PropertyName='accountid',PropertyValue='x'') or (name ne null')"
    );
    await client.api("accounts").filter(filter).get();
    expect(sentFilter(fake).decoded).toBe(filter);
  });

  it("combines with odata.and and odata.or and the other filter helpers", async () => {
    const { client, fake } = accountsClient();
    const filter = odata.and(
      queryFunctions.thisFiscalYear({ PropertyName: "createdon" }),
      odata.or(
        queryFunctions.equalUserId({ PropertyName: "ownerid" }),
        queryFunctions.underOrEqual({ PropertyName: "parentaccountid", PropertyValue: ID })
      ),
      odata.eq("name", "O'Brien"),
      `_primarycontactid_value eq ${odataLiteral.guid(ID)}`
    );
    expect(filter).toBe(
      "(Microsoft.Dynamics.CRM.ThisFiscalYear(PropertyName='createdon') and " +
        "(Microsoft.Dynamics.CRM.EqualUserId(PropertyName='ownerid') or " +
        `Microsoft.Dynamics.CRM.UnderOrEqual(PropertyName='parentaccountid',PropertyValue='${ID}')) and ` +
        `name eq 'O''Brien' and _primarycontactid_value eq ${ID})`
    );
    await client.api("accounts").filter(filter).top(5).get();
    expect(sentFilter(fake).decoded).toBe(filter);
  });

  it("numbers are written as integers; a bad value throws before any request", async () => {
    const { client, fake } = accountsClient();
    expect(
      queryFunctions.inFiscalPeriodAndYear({
        PropertyName: "createdon",
        PropertyValue1: 4,
        PropertyValue2: 2025,
      })
    ).toBe(
      "Microsoft.Dynamics.CRM.InFiscalPeriodAndYear(PropertyName='createdon',PropertyValue1=4,PropertyValue2=2025)"
    );
    expect(() =>
      client
        .api("accounts")
        .filter(queryFunctions.lastXDays({ PropertyName: "createdon", PropertyValue: 0.5 }))
    ).toThrow(expect.objectContaining({ name: "InvalidParameter" }));
    expect(() =>
      queryFunctions.lastXDays({ PropertyName: "createdon" } as unknown as {
        PropertyName: string;
        PropertyValue: number;
      })
    ).toThrow("Missing required parameter: PropertyValue (LastXDays)");
    expect(fake.requests).toHaveLength(0);
  });
});
