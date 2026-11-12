/**
 * #432: the typed client's record navigation (`byId(id).nav(…)`), associate/disassociate,
 * `upsert()`, bound operations and paging (`iterate()`, `listPage()`). Each sends what core's
 * builder sends for the same request.
 */
import { describe, expect, it } from "vitest";
import {
  createdResponse,
  createTestClient,
  jsonResponse,
  noContent,
  TEST_API_URL,
} from "@mohsinonxrm/dataverse-sdk-testing";
import type { RequestInformation, RequestOptions } from "@mohsinonxrm/dataverse-sdk-core";
import {
  ActionBase,
  createEntityReference,
  type EntityMetadata,
  EntitySetClient,
  FunctionBase,
  type IEntity,
  RelatedCollectionClient,
  RelatedRecordClient,
} from "../src/index.js";

const id = "11111111-2222-3333-4444-555555555555";
const contactId = "6f6a7d4e-1b2c-4d5e-8f90-0123456789ab";
const otherId = "7f6a7d4e-1b2c-4d5e-8f90-0123456789ab";

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
    contact_customer_accounts: {
      name: "contact_customer_accounts",
      targetType: "contact",
      isCollection: true,
      relationshipName: "contact_customer_accounts",
    },
    contoso_widgets: {
      name: "contoso_widgets",
      targetType: "contoso_widget",
      isCollection: true,
      relationshipName: "contoso_account_widgets",
    },
    customerid: {
      name: "customerid",
      fullName: "customerid",
      targetType: "account",
      isPolymorphic: true,
      targets: ["account", "contact"],
      isCollection: false,
      relationshipName: "account_customer",
    },
  },
};

interface Account extends IEntity {
  accountid?: string;
  name?: string | null;
}

/** A record-bound action, as dataverse-gen generates one. */
class RecalculateAction extends ActionBase<{ Total: number }> {
  static parameterTypes = {
    Mode: { type: "Edm.String", structuralProperty: "PrimitiveType", nullable: true },
  };
  readonly accountId: string;
  readonly parameters: { Mode?: string | null };
  constructor(accountId: string, parameters: { Mode?: string | null } = {}) {
    super();
    this.accountId = accountId;
    this.parameters = parameters;
  }
  toRequestInformation(baseUrl: string): RequestInformation {
    return {
      method: "POST",
      url: `${baseUrl}/accounts(${this.accountId})/Microsoft.Dynamics.CRM.contoso_Recalculate`,
      headers: { "content-type": "application/json" },
      body: this.parameters,
    };
  }
  async parseResponse(response: Response): Promise<{ Total: number }> {
    return (await response.json()) as { Total: number };
  }
}

/** A collection-bound function without parameters. */
class CountFunction extends FunctionBase<number> {
  static parameterTypes = {};
  toRequestInformation(baseUrl: string): RequestInformation {
    return {
      method: "GET",
      url: `${baseUrl}/accounts/Microsoft.Dynamics.CRM.contoso_Count()`,
      headers: {},
    };
  }
  async parseResponse(response: Response): Promise<number> {
    return ((await response.json()) as { value: number }).value;
  }
}

const operations = {
  record: { actions: { contoso_Recalculate: RecalculateAction }, functions: {} },
  collection: { actions: {}, functions: { contoso_Count: CountFunction } },
};

function accounts() {
  const test = createTestClient();
  return {
    ...test,
    set: new EntitySetClient<
      Account,
      Partial<Account>,
      Partial<Account>,
      string,
      Record<string, never>,
      typeof operations
    >(test.client, accountMetadata, { operations }),
    untyped: new EntitySetClient<Account>(test.client, accountMetadata),
  };
}

describe("record navigation (#432)", () => {
  it("nav() to a collection lists, iterates and pages the related records", async () => {
    const { untyped, fake, client } = accounts();
    const related = untyped.byId(id).nav("contact_customer_accounts");
    expect(related).toBeInstanceOf(RelatedCollectionClient);
    expect(related.path).toBe(`accounts(${id})/contact_customer_accounts`);

    fake.on("GET", `/accounts(${id})/contact_customer_accounts`, () =>
      jsonResponse({ value: [{ fullname: "A" }] })
    );
    const options = {
      select: ["fullname"],
      filter: "statecode eq 0",
      orderBy: ["fullname asc"],
      top: 5,
      expand: { parentcustomerid_account: { select: ["name"] } },
    } as const;
    await (related as RelatedCollectionClient<IEntity>).list(options);
    const typed = fake.last().url;
    await client
      .api(`accounts(${id})/contact_customer_accounts`)
      .select("fullname")
      .expand("parentcustomerid_account", { select: ["name"] })
      .filter("statecode eq 0")
      .orderBy("fullname asc")
      .top(5)
      .get();
    expect(typed).toBe(fake.last().url);
  });

  it("nav() to a lookup gets the related record, or null for 204", async () => {
    const { untyped, fake } = accounts();
    const related = untyped.byId(id).nav("primarycontactid") as RelatedRecordClient<IEntity>;
    expect(related).toBeInstanceOf(RelatedRecordClient);
    fake.on("GET", `/accounts(${id})/primarycontactid`, () =>
      jsonResponse({ contactid: contactId, fullname: "Doe" })
    );
    expect(await related.get({ select: ["fullname"] })).toEqual({
      contactid: contactId,
      fullname: "Doe",
    });
    expect(new URL(fake.last().url).searchParams.get("$select")).toBe("fullname");

    fake.on("GET", `/accounts(${id})/primarycontactid`, () => noContent());
    expect(await related.get()).toBeNull();
  });

  it("an activity's regarding lookup: the Web API names from the metadata's members", async () => {
    const test = createTestClient();
    const taskMetadata: EntityMetadata = {
      typeName: "Microsoft.Dynamics.CRM.task",
      logicalName: "task",
      collectionName: "tasks",
      primaryIdAttribute: "activityid",
      attributeTypes: { subject: "Edm.String" },
      navigation: {
        regardingobjectid: {
          name: "regardingobjectid",
          fullName: "regardingobjectid",
          targetType: "account",
          isPolymorphic: true,
          targets: ["account", "contact"],
          members: {
            regardingobjectid_account_task: "account",
            regardingobjectid_contact_task: "contact",
          },
          isCollection: false,
          relationshipName: "Account_Tasks",
          lookupAttribute: "regardingobjectid",
        },
      },
    };
    const tasks = new EntitySetClient<IEntity>(test.client, taskMetadata);
    const task = tasks.byId(id);
    const regarding = task.nav("regardingobjectid_contact_task") as RelatedRecordClient<IEntity>;
    expect(regarding).toBeInstanceOf(RelatedRecordClient);
    expect(regarding.path).toBe(`tasks(${id})/regardingobjectid_contact_task`);

    test.fake.on("PATCH", `/tasks(${id})`, () => noContent());
    await task.associate("regardingobjectid_contact_task", contactId);
    expect(JSON.parse(test.fake.last().bodyText ?? "")).toEqual({
      "regardingobjectid_contact_task@odata.bind": `/contacts(${contactId})`,
    });
    test.fake.on("DELETE", `/tasks(${id})/regardingobjectid_contact_task/$ref`, () => noContent());
    await task.disassociate("regardingobjectid_contact_task");
    expect(test.fake.last().method).toBe("DELETE");

    // A write through the consolidated lookup binds the member for the reference's table
    await task.update({ regardingobjectid: createEntityReference("account", otherId) });
    expect(JSON.parse(test.fake.last().bodyText ?? "")).toEqual({
      "@odata.type": "Microsoft.Dynamics.CRM.task",
      "regardingobjectid_account_task@odata.bind": `/accounts(${otherId})`,
    });
    await task.update({ regardingobjectid: null });
    expect(JSON.parse(test.fake.last().bodyText ?? "")).toEqual({
      "@odata.type": "Microsoft.Dynamics.CRM.task",
      "regardingobjectid_account_task@odata.bind": null,
      "regardingobjectid_contact_task@odata.bind": null,
    });
  });

  it("nav() finds a polymorphic lookup's Web API properties, and refuses an unknown name", () => {
    const { untyped } = accounts();
    expect(untyped.byId(id).nav("customerid_contact")).toBeInstanceOf(RelatedRecordClient);
    expect(() => untyped.byId(id).nav("nope")).toThrow(/not a navigation property of account/);
  });
});

describe("associate and disassociate (#432)", () => {
  it("a collection: POST $ref with the related record's absolute URL, DELETE <nav>(<id>)/$ref", async () => {
    const { untyped, fake } = accounts();
    fake.on("POST", `/accounts(${id})/contact_customer_accounts/$ref`, () => noContent());
    await untyped.byId(id).associate("contact_customer_accounts", contactId);
    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({
      "@odata.id": `${TEST_API_URL}/contacts(${contactId})`,
    });

    // An EntityReference, and an alternate key
    await untyped
      .byId(id)
      .associate("contact_customer_accounts", createEntityReference("contact", otherId));
    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({
      "@odata.id": `${TEST_API_URL}/contacts(${otherId})`,
    });
    await untyped.byId(id).associate("contact_customer_accounts", { emailaddress1: "a@b.c" });
    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({
      "@odata.id": `${TEST_API_URL}/contacts(emailaddress1='a@b.c')`,
    });

    fake.on("DELETE", `/accounts(${id})/contact_customer_accounts(${contactId})/$ref`, () =>
      noContent()
    );
    await untyped.byId(id).disassociate("contact_customer_accounts", contactId);
    expect(fake.last().method).toBe("DELETE");
  });

  it("several records go through core's bindMany(), with an executor when given", async () => {
    const { untyped, fake } = accounts();
    fake.on("POST", `/accounts(${id})/contact_customer_accounts/$ref`, () => noContent());
    await untyped.byId(id).associate("contact_customer_accounts", [contactId, otherId]);
    expect(fake.requests.map((r) => JSON.parse(r.bodyText ?? "") as unknown)).toEqual([
      { "@odata.id": `${TEST_API_URL}/contacts(${contactId})` },
      { "@odata.id": `${TEST_API_URL}/contacts(${otherId})` },
    ]);

    const calls: unknown[][] = [];
    await untyped.byId(id).associate("contact_customer_accounts", [contactId], {
      executor: (_client, path, nav, set, ids) => {
        calls.push([path, nav, set, ids]);
        return Promise.resolve();
      },
    });
    expect(calls).toEqual([
      [`accounts(${id})`, "contact_customer_accounts", "contacts", [contactId]],
    ]);
  });

  it("a lookup: PATCH with @odata.bind and If-Match: *, DELETE <nav>/$ref", async () => {
    const { untyped, fake } = accounts();
    fake.on("PATCH", `/accounts(${id})`, () => noContent());
    await untyped.byId(id).associate("primarycontactid", contactId);
    expect(fake.last().headers["if-match"]).toBe("*");
    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({
      "primarycontactid@odata.bind": `/contacts(${contactId})`,
    });
    // A polymorphic lookup's property for one target
    await untyped.byId(id).associate("customerid_contact", contactId);
    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({
      "customerid_contact@odata.bind": `/contacts(${contactId})`,
    });

    fake.on("DELETE", `/accounts(${id})/primarycontactid/$ref`, () => noContent());
    await untyped.byId(id).disassociate("primarycontactid");
    expect(fake.last().path).toBe(`/accounts(${id})/primarycontactid/$ref`);
  });

  it("a related table whose entity set isn't known takes an EntityReference with it", async () => {
    const { untyped, fake } = accounts();
    await expect(untyped.byId(id).associate("contoso_widgets", contactId)).rejects.toThrow(
      /contoso_widget.*EntityReference/
    );
    fake.on("POST", `/accounts(${id})/contoso_widgets/$ref`, () => noContent());
    await untyped
      .byId(id)
      .associate(
        "contoso_widgets",
        createEntityReference("contoso_widget", contactId, { entitySetName: "contoso_widgets" })
      );
    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({
      "@odata.id": `${TEST_API_URL}/contoso_widgets(${contactId})`,
    });
  });
});

describe("upsert (#432)", () => {
  it("by id: PATCHes without If-Match and resolves the id", async () => {
    const { set, fake } = accounts();
    fake.on("PATCH", `/accounts(${id})`, () => createdResponse("accounts", id));
    expect(await set.upsert(`{${id.toUpperCase()}}`, { name: "Contoso" })).toBe(id);
    expect(fake.last().headers["if-match"]).toBeUndefined();
    expect(fake.last().headers["if-none-match"]).toBeUndefined();
    expect(fake.last().headers.prefer).toBeUndefined();
    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({
      "@odata.type": "Microsoft.Dynamics.CRM.account",
      name: "Contoso",
    });
  });

  it("by alternate key: asks for the primary key, since OData-EntityId names the key", async () => {
    const { set, fake } = accounts();
    // What Dataverse answers: the record (201 created, 200 updated), the header in key form
    const keyForm = {
      "odata-entityid": `${TEST_API_URL}/accounts(accountnumber='A-1')`,
    };
    fake.on("PATCH", "/accounts(accountnumber='A-1')", () =>
      jsonResponse({ accountid: id }, { status: 201, headers: keyForm })
    );
    expect(await set.upsert({ accountnumber: "A-1" }, { name: "Contoso" })).toBe(id);
    expect(fake.last().headers.prefer).toContain("return=representation");
    expect(new URL(fake.last().url).searchParams.get("$select")).toBe("accountid");

    fake.on("PATCH", "/accounts(accountnumber='A-1')", () =>
      jsonResponse({ accountid: otherId }, { status: 200, headers: keyForm })
    );
    expect(await set.upsert({ accountnumber: "A-1" }, { name: "Contoso" })).toBe(otherId);
  });

  it("createOnly sends If-None-Match: *, updateOnly If-Match: *; a failure rejects", async () => {
    const { set, fake } = accounts();
    fake.on("PATCH", `/accounts(${id})`, () => noContent());
    expect(await set.upsert(id, { name: "x" }, { mode: "createOnly" })).toBe(id);
    expect(fake.last().headers["if-none-match"]).toBe("*");
    await set.upsert(id, { name: "x" }, { mode: "updateOnly" });
    expect(fake.last().headers["if-match"]).toBe("*");

    fake.on("PATCH", `/accounts(${otherId})`, () =>
      jsonResponse(
        {
          error: {
            code: "0x80060882",
            message: "A record with matching key values already exists.",
          },
        },
        { status: 412 }
      )
    );
    await expect(set.upsert(otherId, { name: "x" }, { mode: "createOnly" })).rejects.toMatchObject({
      status: 412,
    });
  });
});

describe("bound operations (#432)", () => {
  it("a record's actions construct the generated class with the record id and execute it", async () => {
    const { set, fake } = accounts();
    fake.on("POST", `/accounts(${id})/Microsoft.Dynamics.CRM.contoso_Recalculate`, () =>
      jsonResponse({ Total: 3 })
    );
    const options: RequestOptions = { headers: { "x-test": "1" } };
    expect(
      await set.byId(`{${id.toUpperCase()}}`).actions.contoso_Recalculate({ Mode: "full" }, options)
    ).toEqual({
      Total: 3,
    });
    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({ Mode: "full" });
    expect(fake.last().headers["x-test"]).toBe("1");
    // Optional parameters
    await set.byId(id).actions.contoso_Recalculate();
    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({});
  });

  it("an entity set's functions; an operation without parameters takes the options first", async () => {
    const { set, fake } = accounts();
    fake.on("GET", "/accounts/Microsoft.Dynamics.CRM.contoso_Count()", () =>
      jsonResponse({ value: 7 })
    );
    expect(await set.functions.contoso_Count({ headers: { "x-test": "2" } })).toBe(7);
    expect(fake.last().headers["x-test"]).toBe("2");
  });

  it("a record reached by alternate key can't call a bound operation", async () => {
    const { set } = accounts();
    await expect(set.byId({ accountnumber: "A-1" }).actions.contoso_Recalculate()).rejects.toThrow(
      /by its id/
    );
  });

  it("a table without operations has none", () => {
    const { untyped } = accounts();
    expect(Object.keys(untyped.byId(id).actions)).toEqual([]);
    expect(Object.keys(untyped.functions)).toEqual([]);
  });
});

describe("paging (#432)", () => {
  const next = `${TEST_API_URL}/accounts?$select=name&$skiptoken=2`;
  const pages = (request: { url: string }) =>
    request.url.includes("skiptoken")
      ? jsonResponse({ value: [{ name: "C" }] })
      : jsonResponse({ value: [{ name: "A" }, { name: "B" }], "@odata.nextLink": next });

  it("iterate() reads every page lazily, with the page size, and stops at maxItems", async () => {
    const { set, fake } = accounts();
    fake.on("GET", "/accounts", pages);
    const records = set.iterate({ select: ["name"], pageSize: 2 });
    expect(fake.requests).toHaveLength(0);
    const names: unknown[] = [];
    for await (const record of records) names.push(record.name);
    expect(names).toEqual(["A", "B", "C"]);
    expect(fake.requests[0].headers.prefer).toContain("odata.maxpagesize=2");
    // Later pages carry the first request's Prefer
    expect(fake.requests[1].headers.prefer).toContain("odata.maxpagesize=2");

    fake.reset();
    const two: unknown[] = [];
    for await (const record of set.iterate({ select: ["name"], maxItems: 2 }))
      two.push(record.name);
    expect(two).toEqual(["A", "B"]);
    expect(fake.requests).toHaveLength(1);
  });

  it("listPage() returns one page and its next link, which gets the next one", async () => {
    const { set, fake } = accounts();
    fake.on("GET", "/accounts", (request) =>
      request.url.includes("skiptoken")
        ? jsonResponse({ value: [{ name: "C" }] })
        : jsonResponse({
            value: [{ name: "A" }, { name: "B" }],
            "@odata.nextLink": next,
            "@odata.count": 3,
          })
    );
    const first = await set.listPage({ select: ["name"], pageSize: 2, count: true });
    expect(first).toEqual({ records: [{ name: "A" }, { name: "B" }], nextLink: next, count: 3 });
    const url = new URL(fake.last().url);
    expect(url.searchParams.get("$count")).toBe("true");
    expect(fake.last().headers.prefer).toContain("odata.maxpagesize=2");

    const second = await set.listPage({ select: ["name"], pageSize: 2, nextLink: first.nextLink });
    expect(second).toEqual({ records: [{ name: "C" }] });
    expect(fake.last().url).toBe(next);
    expect(fake.last().headers.prefer).toContain("odata.maxpagesize=2");
  });
});
