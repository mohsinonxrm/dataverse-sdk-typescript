/**
 * The Data and Operations pages' scenarios: what they send (against the SDK's recording fake
 * fetch) and that they work end to end (against demo mode's environment).
 */
import { describe, expect, it } from "vitest";
import { DataverseODataError } from "@mohsinonxrm/dataverse-sdk-core";
import { jsonResponse } from "@mohsinonxrm/dataverse-sdk-testing";
import * as batch from "../../src/scenarios/batch";
import * as crud from "../../src/scenarios/crud";
import * as queries from "../../src/scenarios/queries";
import * as writes from "../../src/scenarios/writes";
import * as xrm from "../../src/scenarios/xrm";
import { signal, withDemo, withFakeFetch } from "./helpers";

const count = async (h: ReturnType<typeof withDemo>) =>
  (
    await h.sdk.client
      .api("accounts")
      .select("name")
      .count()
      .top(1)
      .get<{ "@odata.count": number }>()
  )["@odata.count"];

describe("queries", () => {
  it("sends $select, an escaped $filter, $expand with options, $orderby, $top and $count", async () => {
    const { sdk, fake } = withFakeFetch();
    fake.on("GET", "/accounts", () => jsonResponse({ value: [], "@odata.count": 0 }));
    await queries.queryAccounts(
      sdk,
      { nameContains: "O'Brien", minRevenue: 5, orderBy: "name asc", top: 3 },
      signal()
    );
    const url = decodeURIComponent(fake.last().url);
    expect(url).toContain("$select=name,address1_city,revenue");
    expect(url).toContain(
      "$filter=(statecode eq 0 and contains(name,'O''Brien') and revenue ge 5)"
    );
    expect(url).toContain("$expand=primarycontactid($select=fullname,emailaddress1)");
    expect(url).toContain("$orderby=name asc");
    expect(url).toContain("$top=3");
    expect(url).toContain("$count=true");
  });

  it("returns matching accounts with their primary contact (demo)", async () => {
    const h = withDemo();
    const r = await queries.queryAccounts(
      h.sdk,
      { nameContains: "a", minRevenue: 0, orderBy: "revenue desc", top: 5 },
      signal()
    );
    expect(r.accounts).toHaveLength(5);
    expect(r.total).toBeGreaterThan(5);
    const revenues = r.accounts.map((a) => a.revenue ?? 0);
    expect([...revenues].sort((x, y) => y - x)).toEqual(revenues);
    expect(r.accounts.some((a) => a.primarycontactid?.fullname)).toBe(true);
  });

  it("expands a collection with its own options (demo)", async () => {
    const rows = await queries.accountsWithContacts(withDemo().sdk, signal());
    expect(rows.length).toBeGreaterThan(0);
    expect(rows.every((r) => r.contacts.length <= 3)).toBe(true);
  });

  it("iterate() stops asking for pages once it has enough; getAll() honours maxPages (demo)", async () => {
    const h = withDemo();
    const r = await queries.pageThroughAccounts(h.sdk, { pageSize: 5, maxItems: 12 }, signal());
    expect(r.iterated).toHaveLength(12);
    expect(r.firstTwoPagesCount).toBe(10);
    // 3 pages for iterate(), 2 for getAll(); every page asks for 5 records.
    expect(h.exchanges).toHaveLength(5);
    expect(h.exchanges.every((e) => e.requestHeaders.prefer?.includes("odata.maxpagesize=5"))).toBe(
      true
    );
  });

  it("FetchXML pages with the paging cookie (demo)", async () => {
    const xml =
      '<fetch count="4" returntotalrecordcount="true"><entity name="account"><attribute name="name"/><order attribute="name"/></entity></fetch>';
    const r = await queries.runFetchXml(withDemo().sdk, { fetchXml: xml }, signal());
    expect(r.page1).toHaveLength(4);
    expect(r.page2).toHaveLength(4);
    expect(r.moreRecords).toBe(true);
    expect(r.totalRecordCount).toBeGreaterThan(8);
    expect(r.page2[0]?.name).not.toBe(r.page1[0]?.name);
  });

  it("lists views and runs one (demo)", async () => {
    const { sdk } = withDemo();
    const views = await queries.listViews(sdk, signal());
    expect(views.map((v) => v.name)).toContain("Active Accounts");
    const rows = await queries.runView(sdk, { viewId: views[0]?.savedqueryid ?? "" }, signal());
    expect(rows.length).toBeGreaterThan(0);
  });
});

describe("create, read, update, delete (demo)", () => {
  it("round-trips one account", async () => {
    const h = withDemo();
    const id = await crud.createAccount(
      h.sdk,
      { name: "Test", city: "Oslo", revenue: 7 },
      signal()
    );
    expect((await crud.readAccount(h.sdk, { id }, signal())).address1_city).toBe("Oslo");
    const updated = await crud.updateAccount(
      h.sdk,
      { id, name: "Test 2", city: "Bergen", revenue: 8 },
      signal()
    );
    expect(updated.name).toBe("Test 2");
    expect(updated["revenue@OData.Community.Display.V1.FormattedValue"]).toBe("$8.00");
    await crud.deleteAccount(h.sdk, { id }, signal());
    await expect(crud.readAccount(h.sdk, { id }, signal())).rejects.toMatchObject({ status: 404 });
  });

  it("update sends If-Match: * so it never creates", async () => {
    const h = withDemo();
    await expect(
      crud.updateAccount(
        h.sdk,
        { id: crypto.randomUUID(), name: "x", city: "y", revenue: 1 },
        signal()
      )
    ).rejects.toMatchObject({ status: 404 });
    expect(h.exchanges[0]?.requestHeaders["if-match"]).toBe("*");
  });
});

describe("concurrency, impersonation and prefer (demo)", () => {
  it("a stale ETag gets 412, and the record is cleaned up", async () => {
    const h = withDemo();
    const before = await count(h);
    const error = await writes.staleUpdate(h.sdk, signal()).catch((e: unknown) => e);
    expect(error).toBeInstanceOf(DataverseODataError);
    expect((error as DataverseODataError).status).toBe(412);
    expect(await count(h)).toBe(before);
  });

  it("read-modify-write succeeds on the second attempt", async () => {
    await expect(writes.updateWithRetry(withDemo().sdk, signal())).resolves.toEqual({
      attempts: 2,
      revenue: 160,
    });
  });

  it("acts as another user with CallerObjectId", async () => {
    const h = withDemo();
    const users = await writes.listUsers(h.sdk, signal());
    const kai = users.find((u) => u.fullname === "Kai Carter");
    const r = await writes.actAs(
      h.sdk,
      { objectId: kai?.azureactivedirectoryobjectid ?? "" },
      signal()
    );
    expect(r).toEqual({
      whoAmI: kai?.systemuserid,
      createdBy: "Kai Carter",
      createdOnBehalfBy: "Avery Demo",
    });
    expect(h.exchanges.find((e) => e.url.endsWith("/WhoAmI"))?.requestHeaders.callerobjectid).toBe(
      kai?.azureactivedirectoryobjectid
    );
  });

  it("return=representation answers the create with the record", async () => {
    const h = withDemo();
    const created = await writes.createAndReturn(h.sdk, { name: "Rep" }, signal());
    expect(created.name).toBe("Rep");
    expect(h.exchanges[0]?.status).toBe(201);
    expect(h.exchanges[0]?.requestHeaders.prefer).toContain("return=representation");
  });

  it("maxpagesize and annotations", async () => {
    const h = withDemo();
    const page = await writes.firstPage(h.sdk, { pageSize: 4 }, signal());
    expect(page.count).toBe(4);
    expect(page.nextLink).toBeDefined();
    const rows = await writes.withAnnotations(h.sdk, signal());
    expect(rows[0]?.["statecode@OData.Community.Display.V1.FormattedValue"]).toBe("Active");
  });
});

describe("$batch (demo)", () => {
  it("creates in one change set with a Content-ID reference, then cleans up", async () => {
    const h = withDemo();
    const before = await count(h);
    const r = await batch.createInOneTransaction(h.sdk, { accountName: "Batch" });
    expect(r.success).toBe(true);
    expect(r.statuses).toEqual(["account: 204", "contact: 204", "count: 200"]);
    expect(r.accountId).toMatch(/^[0-9a-f-]{36}$/);
    const body = h.exchanges.find((e) => e.url.endsWith("$batch"))?.requestBody ?? "";
    expect(body).toContain("Content-ID: account");
    expect(body).toContain('"parentcustomerid_account@odata.bind":"$account"');
    expect(await count(h)).toBe(before);
  });

  it("continueOnError returns the failure instead of throwing", async () => {
    const r = await batch.continueOnError(withDemo().sdk);
    expect(r).toMatchObject({ success: false, successfulRequests: 2, failedRequests: 1 });
    expect(r.errors[0]).toMatch(/^missing: /);
  });

  it("splits a large batch into batchSize pieces", async () => {
    const h = withDemo();
    const r = await batch.autoSplit(h.sdk, { requests: 25, batchSize: 10 });
    expect(r).toEqual({ totalRequests: 25, successfulRequests: 25 });
    expect(h.exchanges.filter((e) => e.url.endsWith("$batch"))).toHaveLength(3);
  });
});

describe("OrganizationService (demo)", () => {
  it("creates, updates, associates, sets state and deletes", async () => {
    const h = withDemo();
    const before = await count(h);
    const r = await xrm.organizationServiceCrud(h.sdk);
    expect(r).toEqual({
      account: { name: "OrganizationService demo", telephone1: "+1 425 555 0100" },
      contactsOfAccount: ["Xrm Demo"],
      expandedContacts: ["Xrm Demo"],
      statecodeAfterSetState: 1,
    });
    expect(await count(h)).toBe(before);
  });

  it("whoAmI() and execute() agree", async () => {
    await expect(xrm.organizationServiceExecute(withDemo().sdk)).resolves.toMatchObject({
      sameUser: true,
    });
  });
});
