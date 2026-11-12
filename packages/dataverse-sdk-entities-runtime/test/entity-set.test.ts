/**
 * #312: typed request builders per entity set. `EntitySetClient` / `EntityRecordClient` send the
 * requests core's builder would for `list`, `create`, `get`, `update` and `delete`, with writes
 * formatted by `formatEntityForWrite()`.
 */
import { describe, expect, it } from "vitest";
import {
  createdResponse,
  createTestClient,
  jsonResponse,
  noContent,
} from "@mohsinonxrm/dataverse-sdk-testing";
import {
  createEntityReference,
  type EntityMetadata,
  EntitySetClient,
  type IEntity,
} from "../src/index.js";

const id = "11111111-2222-3333-4444-555555555555";
const contactId = "6f6a7d4e-1b2c-4d5e-8f90-0123456789ab";

const accountMetadata: EntityMetadata = {
  typeName: "Microsoft.Dynamics.CRM.account",
  logicalName: "account",
  collectionName: "accounts",
  primaryIdAttribute: "accountid",
  attributeTypes: { name: "Edm.String" },
  navigation: {
    primarycontactid: {
      name: "primarycontactid",
      targetType: "contact",
      isCollection: false,
      relationshipName: "account_primary_contact",
    },
  },
};

interface Account extends IEntity {
  accountid?: string;
  name?: string | null;
}
interface AccountCreate {
  name?: string | null;
  primarycontactid?: ReturnType<typeof createEntityReference> | null;
}
type AccountColumn = "accountid" | "name";

function accounts() {
  const test = createTestClient();
  return {
    ...test,
    set: new EntitySetClient<Account, AccountCreate, AccountCreate, AccountColumn>(
      test.client,
      accountMetadata
    ),
  };
}

describe("EntitySetClient (#312)", () => {
  it("byId().get() selects and expands, and resolves the record", async () => {
    const { set, fake } = accounts();
    fake.on("GET", `/accounts(${id})`, () => jsonResponse({ accountid: id, name: "Contoso" }));
    const account = await set
      .byId(id)
      .get({ select: ["name", "accountid"], expand: ["primarycontactid($select=fullname)"] });
    expect(account).toEqual({ accountid: id, name: "Contoso" });
    const url = new URL(fake.last().url);
    expect(url.searchParams.get("$select")).toBe("name,accountid");
    expect(url.searchParams.get("$expand")).toBe("primarycontactid($select=fullname)");
  });

  it("expand as an object sends what core's expand(name, options) sends (#431)", async () => {
    const { set, fake, client } = accounts();
    fake.on("GET", `/accounts(${id})`, () => jsonResponse({ accountid: id }));
    fake.on("GET", "/accounts", () => jsonResponse({ value: [] }));
    const expand = {
      primarycontactid: { select: ["fullname"] },
      contact_customer_accounts: {
        select: ["fullname", "emailaddress1"],
        filter: "statecode eq 0",
        orderBy: ["fullname asc", "createdon desc"],
        top: 5,
        expand: {
          parentcustomerid_account: true,
          owninguser: { select: ["fullname"], expand: ["businessunitid($select=name)"] },
        },
      },
      createdby: true,
    } as const;

    await set.byId(id).get({ select: ["name"], expand });
    const typed = fake.last().url;
    await client
      .api(`accounts(${id})`)
      .select("name")
      .expand(
        "primarycontactid",
        { select: ["fullname"] },
        "contact_customer_accounts",
        {
          select: ["fullname", "emailaddress1"],
          filter: "statecode eq 0",
          orderBy: ["fullname asc", "createdon desc"],
          top: 5,
          expand: {
            parentcustomerid_account: true,
            owninguser: { select: ["fullname"], expand: "businessunitid($select=name)" },
          },
        },
        "createdby"
      )
      .get();
    expect(typed).toBe(fake.last().url);
    expect(new URL(typed).searchParams.get("$expand")).toBe(
      "primarycontactid($select=fullname)," +
        "contact_customer_accounts($select=fullname,emailaddress1;$filter=statecode eq 0;" +
        "$orderby=fullname asc,createdon desc;$top=5;" +
        "$expand=parentcustomerid_account,owninguser($select=fullname;$expand=businessunitid($select=name)))," +
        "createdby"
    );

    // list() too; an empty object or array expands nothing
    await set.list({ expand: { primarycontactid: { select: ["fullname"] } } });
    expect(new URL(fake.last().url).searchParams.get("$expand")).toBe(
      "primarycontactid($select=fullname)"
    );
    await set.list({ expand: {} });
    expect(new URL(fake.last().url).searchParams.has("$expand")).toBe(false);
    await set.byId(id).get({ expand: [] });
    expect(new URL(fake.last().url).searchParams.has("$expand")).toBe(false);
  });

  it("byId() takes an alternate key and a braced id", () => {
    const { set } = accounts();
    expect(set.byId({ accountnumber: "A'1" }).path).toBe("accounts(accountnumber='A''1')");
    expect(set.byId(`{${id.toUpperCase()}}`).path).toBe(`accounts(${id})`);
  });

  it("list() filters, orders and follows the next link up to maxItems", async () => {
    const { set, fake } = accounts();
    const next = "https://contoso.crm.dynamics.com/api/data/v9.2/accounts?$skiptoken=2";
    fake.on("GET", "/accounts", (request) =>
      request.url.includes("skiptoken")
        ? jsonResponse({ value: [{ name: "C" }, { name: "D" }] })
        : jsonResponse({ value: [{ name: "A" }, { name: "B" }], "@odata.nextLink": next })
    );
    const all = await set.list({ select: ["name"], filter: "statecode eq 0", orderBy: ["name"] });
    expect(all.map((a) => a.name)).toEqual(["A", "B", "C", "D"]);
    const first = new URL(fake.requests[0].url);
    expect(first.searchParams.get("$filter")).toBe("statecode eq 0");
    expect(first.searchParams.get("$orderby")).toBe("name");

    fake.reset();
    expect(await set.list({ top: 1, maxItems: 1 })).toHaveLength(1);
    expect(new URL(fake.requests[0].url).searchParams.get("$top")).toBe("1");
    expect(fake.requests).toHaveLength(1);
  });

  it("create() formats the body and returns the new id", async () => {
    const { set, fake } = accounts();
    fake.on("POST", "/accounts", () => createdResponse("accounts", id));
    const created = await set.create({
      name: "Contoso",
      primarycontactid: createEntityReference("contact", contactId),
    });
    expect(created).toBe(id);
    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({
      "@odata.type": "Microsoft.Dynamics.CRM.account",
      name: "Contoso",
      "primarycontactid@odata.bind": `/contacts(${contactId})`,
    });
  });

  it("update() patches with If-Match: * (or the etag), so it never creates", async () => {
    const { set, fake } = accounts();
    fake.on("PATCH", `/accounts(${id})`, () => noContent());
    await set.byId(id).update({ name: null, primarycontactid: null });
    expect(fake.last().headers["if-match"]).toBe("*");
    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({
      "@odata.type": "Microsoft.Dynamics.CRM.account",
      name: null,
      "primarycontactid@odata.bind": null,
    });
    await set.byId(id).update({ name: "x" }, { etag: 'W/"42"' });
    expect(fake.last().headers["if-match"]).toBe('W/"42"');
  });

  it("delete() deletes, with If-Match only for an etag", async () => {
    const { set, fake } = accounts();
    fake.on("DELETE", `/accounts(${id})`, () => noContent());
    await set.byId(id).delete();
    expect(fake.last().method).toBe("DELETE");
    expect(fake.last().headers["if-match"]).toBeUndefined();
    await set.byId(id).delete({ etag: 'W/"7"' });
    expect(fake.last().headers["if-match"]).toBe('W/"7"');
  });

  it("query() and request() hand out core's builder", async () => {
    const { set, fake } = accounts();
    fake.on("GET", "/accounts", () => jsonResponse({ "@odata.count": 3, value: [] }));
    expect(await set.query().count().top(0).get()).toEqual({ "@odata.count": 3, value: [] });
    expect(new URL(fake.last().url).searchParams.get("$count")).toBe("true");
    fake.on("GET", `/accounts(${id})`, () => new Response("Contoso"));
    expect(await set.byId(id).request().text()).toBe("Contoso");
    expect(fake.last().path).toBe(`/accounts(${id})`);
    expect(set.entitySetName).toBe("accounts");
  });
});
