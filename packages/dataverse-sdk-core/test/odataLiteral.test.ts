/**
 * #53: OData literals. `odataLiteral` formats values for keys, function parameters and filters,
 * `odataKey` formats record keys, and core's own key formatting (bind, associate, disassociate)
 * uses them, so an embedded `'` can never end a literal early.
 */
import { describe, expect, it } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";
import { odataKey, odataLiteral } from "../src/odata/literal.js";
import { odata } from "../src/odata/filter.js";

const ORG = "https://contoso.crm.dynamics.com";
const API = `${ORG}/api/data/v9.2`;
const ID = "00000000-0000-0000-0000-000000000001";

function fakeClient() {
  const sent: Array<{ method: string; url: string; body?: string }> = [];
  const client = new DataverseClient({
    baseUrl: ORG,
    retry: { maxRetries: 0 },
    fetchProvider: {
      fetch: (input, init) => {
        sent.push({
          method: init?.method ?? "GET",
          url: input instanceof Request ? input.url : input.toString(),
          body: typeof init?.body === "string" ? init.body : undefined,
        });
        return Promise.resolve(new Response(null, { status: 204 }));
      },
    },
  });
  return { client, sent };
}

const invalidParameter = { name: "InvalidParameter" };

describe("odataLiteral", () => {
  it("string() doubles every single quote", () => {
    expect(odataLiteral.string("O'Brien")).toBe("'O''Brien'");
    expect(odataLiteral.string("'")).toBe("''''");
    expect(odataLiteral.string("x') or (1 eq 1")).toBe("'x'') or (1 eq 1'");
    expect(odataLiteral.string("")).toBe("''");
    expect(() => odataLiteral.string(5 as unknown as string)).toThrow(
      expect.objectContaining(invalidParameter)
    );
  });

  it("guid() accepts a GUID with or without braces and rejects anything else", () => {
    expect(odataLiteral.guid(ID)).toBe(ID);
    expect(odataLiteral.guid(`{${ID.toUpperCase()}}`)).toBe(ID.toUpperCase());
    for (const bad of ["", "not-a-guid", `${ID})/contacts(`, `${ID} or 1 eq 1`, `{${ID}`]) {
      expect(() => odataLiteral.guid(bad)).toThrow(expect.objectContaining(invalidParameter));
    }
    expect(() => odataLiteral.guid(undefined as unknown as string)).toThrow(/expected a GUID/);
  });

  it("int() and number() write finite numbers and reject the rest", () => {
    expect(odataLiteral.int(42)).toBe("42");
    expect(odataLiteral.int(-7)).toBe("-7");
    expect(odataLiteral.int(12345678901234567890n)).toBe("12345678901234567890");
    expect(() => odataLiteral.int(1.5)).toThrow(/safe integer/);
    expect(() => odataLiteral.int(2 ** 60)).toThrow(/safe integer/);
    expect(odataLiteral.number(1000.5)).toBe("1000.5");
    expect(odataLiteral.number(1e21)).toBe("1e+21");
    expect(() => odataLiteral.number(Number.NaN)).toThrow(/finite/);
    expect(() => odataLiteral.number(Infinity)).toThrow(/finite/);
    expect(() => odataLiteral.number("1" as unknown as number)).toThrow(/finite/);
  });

  it("bool() writes true or false", () => {
    expect(odataLiteral.bool(true)).toBe("true");
    expect(odataLiteral.bool(false)).toBe("false");
    expect(() => odataLiteral.bool("true" as unknown as boolean)).toThrow(/boolean/);
  });

  it("datetime() and date() write ISO 8601 and reject other text", () => {
    const d = new Date(Date.UTC(2024, 4, 1, 8, 30));
    expect(odataLiteral.datetime(d)).toBe("2024-05-01T08:30:00.000Z");
    expect(odataLiteral.datetime("2024-05-01T08:30:00+02:00")).toBe("2024-05-01T08:30:00+02:00");
    expect(odataLiteral.datetime("2024-05-01T08:30Z")).toBe("2024-05-01T08:30Z");
    expect(() => odataLiteral.datetime("2024-05-01")).toThrow(/ISO 8601/);
    expect(() => odataLiteral.datetime("2024-05-01T08:30:00Z' or '1")).toThrow(/ISO 8601/);
    expect(() => odataLiteral.datetime(new Date("nope"))).toThrow(/invalid Date/);
    expect(odataLiteral.date(d)).toBe("2024-05-01");
    expect(odataLiteral.date("2024-05-01")).toBe("2024-05-01");
    expect(() => odataLiteral.date("01/05/2024")).toThrow(/YYYY-MM-DD/);
    expect(() => odataLiteral.date(new Date(Number.NaN))).toThrow(/invalid Date/);
  });

  it("enum() writes Namespace.Type'Member' and flags", () => {
    expect(odataLiteral.enum("Microsoft.Dynamics.CRM.AccessRights", "ReadAccess")).toBe(
      "Microsoft.Dynamics.CRM.AccessRights'ReadAccess'"
    );
    expect(
      odataLiteral.enum("Microsoft.Dynamics.CRM.EntityFilters", ["Entity", "Attributes"])
    ).toBe("Microsoft.Dynamics.CRM.EntityFilters'Entity,Attributes'");
    expect(odataLiteral.enum("NS.Flags", ["1", "-2"])).toBe("NS.Flags'1,-2'");
    expect(() => odataLiteral.enum("NoNamespace", "A")).toThrow(/qualified/);
    expect(() => odataLiteral.enum("NS.T", "A'B")).toThrow(/member/);
    expect(() => odataLiteral.enum("NS.T", [])).toThrow(/member/);
  });

  it("value() picks the literal from the JavaScript type", () => {
    expect(odataLiteral.value("O'Brien")).toBe("'O''Brien'");
    expect(odataLiteral.value(3)).toBe("3");
    expect(odataLiteral.value(3.25)).toBe("3.25");
    expect(odataLiteral.value(2 ** 60)).toBe(String(2 ** 60));
    expect(odataLiteral.value(5n)).toBe("5");
    expect(odataLiteral.value(false)).toBe("false");
    expect(odataLiteral.value(null)).toBe("null");
    expect(odataLiteral.value(new Date(Date.UTC(2024, 0, 2)))).toBe("2024-01-02T00:00:00.000Z");
    expect(() => odataLiteral.value({} as unknown as string)).toThrow(/expected a string/);
  });
});

describe("odataKey", () => {
  it("passes a GUID through, without braces", () => {
    expect(odataKey(ID)).toBe(ID);
    expect(odataKey(`{${ID}}`)).toBe(ID);
  });

  it("formats an alternate key with escaped and URL-safe values", () => {
    expect(odataKey({ accountnumber: "O'Brien" })).toBe("accountnumber='O''Brien'");
    expect(odataKey({ firstname: "Jo", lastname: "O'Brien", age: 30, vip: true, x: null })).toBe(
      "firstname='Jo',lastname='O''Brien',age=30,vip=true,x=null"
    );
    // Characters that would end or change a URL path are percent-encoded.
    expect(odataKey({ accountnumber: "A#1?b/c%d&e f" })).toBe(
      "accountnumber='A%231%3Fb%2Fc%25d%26e%20f'"
    );
    expect(odataKey({ when: new Date(Date.UTC(2024, 0, 2, 3, 4, 5)) })).toBe(
      "when=2024-01-02T03:04:05.000Z"
    );
  });

  it("keeps a key the caller built, and rejects empty keys and bad column names", () => {
    expect(odataKey("accountnumber='A1'")).toBe("accountnumber='A1'");
    expect(() => odataKey("")).toThrow(expect.objectContaining({ name: "MissingParameter" }));
    expect(() => odataKey({})).toThrow(expect.objectContaining({ name: "MissingParameter" }));
    expect(() => odataKey({ "name') or (x": "a" })).toThrow(
      expect.objectContaining(invalidParameter)
    );
  });
});

describe("odata filter helpers use the literals", () => {
  it("escape strings and write dates and numbers", () => {
    expect(odata.eq("lastname", "O'Brien")).toBe("lastname eq 'O''Brien'");
    expect(odata.ne("name", null)).toBe("name ne null");
    expect(odata.ge("createdon", new Date(Date.UTC(2024, 0, 1)))).toBe(
      "createdon ge 2024-01-01T00:00:00.000Z"
    );
    expect(odata.lt("revenue", 10.5)).toBe("revenue lt 10.5");
    expect(odata.endsWith("emailaddress1", "'@x")).toBe("endswith(emailaddress1,'''@x')");
    expect(() => odata.gt("revenue", Number.NaN)).toThrow(/finite/);
  });
});

describe("requests carry valid literals (#53 acceptance)", () => {
  it("O'Brien in a filter reaches fetch as a valid literal", async () => {
    const { client, sent } = fakeClient();
    await client.api("contacts").filter(odata.eq("lastname", "O'Brien")).response();
    expect(new URL(sent[0]?.url ?? "").searchParams.get("$filter")).toBe("lastname eq 'O''Brien'");
  });

  it("O'Brien as a function parameter, inline and as an alias, reaches fetch as a valid literal", async () => {
    const { client, sent } = fakeClient();
    await client.api(`MyFunction(Name=${odataLiteral.string("O'Brien")})`).response();
    await client
      .api(`MyFunction(Name=@p1)?@p1=${encodeURIComponent(odataLiteral.string("O'Brien"))}`)
      .response();
    expect(decodeURIComponent(new URL(sent[0]?.url ?? "").pathname)).toBe(
      "/api/data/v9.2/MyFunction(Name='O''Brien')"
    );
    expect(new URL(sent[1]?.url ?? "").searchParams.get("@p1")).toBe("'O''Brien'");
  });

  it("bind(), client.bind(), associate() and disassociate() format keys with odataKey", async () => {
    const { client, sent } = fakeClient();
    await client
      .api("contacts")
      .bind("parentcustomerid_account", "accounts", { accountnumber: "O'Brien #1" })
      .post({ lastname: "x" });
    expect(JSON.parse(sent[0]?.body ?? "{}")).toEqual({
      lastname: "x",
      "parentcustomerid_account@odata.bind": "/accounts(accountnumber='O''Brien%20%231')",
    });

    expect(client.bind("ownerid", "systemusers", `{${ID}}`)).toEqual({
      "ownerid@odata.bind": `/systemusers(${ID})`,
    });

    await client.api(`accounts(${ID})`).associate("contact_customer_accounts", "contacts", {
      emailaddress1: "o'brien@contoso.com",
    });
    expect(JSON.parse(sent[1]?.body ?? "{}")).toEqual({
      "@odata.id": `${API}/contacts(emailaddress1='o''brien@contoso.com')`,
    });

    await client.api(`accounts(${ID})`).disassociate("contact_customer_accounts", `{${ID}}`);
    expect(sent[2]?.url).toBe(`${API}/accounts(${ID})/contact_customer_accounts(${ID})/$ref`);
  });
});
