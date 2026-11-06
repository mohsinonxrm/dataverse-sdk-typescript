/**
 * #76 (xrm): entity set names come from metadata (once per logical name, cached) or an explicit
 * override, never from guessing a plural.
 */
import { describe, it, expect } from "vitest";
import { DataverseError } from "@mohsinonxrm/dataverse-sdk-core";
import {
  TEST_API_URL,
  createTestClient,
  jsonResponse,
  noContent,
  odataError,
} from "@mohsinonxrm/dataverse-sdk-testing";
import type { FakeFetch } from "@mohsinonxrm/dataverse-sdk-testing";
import { OrganizationService, createEntityReference } from "../src/index.js";

const ID = "12345678-1234-1234-1234-123456789012";
const ID2 = "22222222-2222-2222-2222-222222222222";

/** Answers EntityDefinitions lookups from `sets`; unknown names get Dataverse's 404. */
function metadata(fake: FakeFetch, sets: Record<string, string>): void {
  fake.on("GET", /^\/EntityDefinitions\(LogicalName='.*'\)$/, (req) => {
    const name = /LogicalName='(.*)'\)/.exec(decodeURIComponent(req.path))?.[1] ?? "";
    const set = sets[name.replace(/''/g, "'")];
    return set
      ? jsonResponse({ EntitySetName: set, MetadataId: ID })
      : odataError(404, "0x80060888", "Could not find an entity with the specified name.");
  });
}

function lookups(fake: FakeFetch): string[] {
  return fake.requests
    .filter((r) => r.path.startsWith("/EntityDefinitions"))
    .map((r) => decodeURIComponent(r.path.split("?")[0] ?? ""));
}

describe("#76: OrganizationService resolves entity set names from metadata", () => {
  it("looks up EntityDefinitions with $select=EntitySetName", async () => {
    const { client, fake } = createTestClient();
    metadata(fake, { opportunity: "opportunities" });
    const service = new OrganizationService(client);

    await expect(service.getEntitySetName("opportunity")).resolves.toBe("opportunities");

    const req = fake.last();
    expect(req.method).toBe("GET");
    expect(decodeURIComponent(req.path.split("?")[0] ?? "")).toBe(
      "/EntityDefinitions(LogicalName='opportunity')"
    );
    expect(new URL(req.url).searchParams.get("$select")).toBe("EntitySetName");
  });

  it("uses irregular names as Dataverse reports them", async () => {
    const { client, fake } = createTestClient();
    // Names a plural rule gets wrong: opportunitys, businessprocesss, new_categorys.
    metadata(fake, {
      businessprocess: "businessprocesses",
      new_category: "new_categories",
      campaignactivity: "campaignactivities",
    });
    const service = new OrganizationService(client);
    await expect(service.getEntitySetName("businessprocess")).resolves.toBe("businessprocesses");
    await expect(service.getEntitySetName("new_category")).resolves.toBe("new_categories");
    await expect(service.getEntitySetName("CampaignActivity")).resolves.toBe("campaignactivities");
  });

  it("looks each logical name up once and caches it (case-insensitively)", async () => {
    const { client, fake } = createTestClient();
    metadata(fake, { account: "accounts" });
    const service = new OrganizationService(client);

    await service.getEntitySetName("account");
    await service.getEntitySetName("Account");
    await Promise.all([service.getEntitySetName("account"), service.getEntitySetName("account")]);

    expect(lookups(fake)).toEqual(["/EntityDefinitions(LogicalName='account')"]);
  });

  it("concurrent first calls share one lookup", async () => {
    const { client, fake } = createTestClient();
    metadata(fake, { contact: "contacts" });
    const service = new OrganizationService(client);
    const names = await Promise.all([
      service.getEntitySetName("contact"),
      service.getEntitySetName("contact"),
      service.getEntitySetName("contact"),
    ]);
    expect(names).toEqual(["contacts", "contacts", "contacts"]);
    expect(lookups(fake)).toHaveLength(1);
  });

  it("a failed lookup rejects and is not cached", async () => {
    const { client, fake } = createTestClient();
    metadata(fake, {});
    const service = new OrganizationService(client);

    await expect(service.getEntitySetName("new_missing")).rejects.toBeInstanceOf(DataverseError);

    metadata(fake, { new_missing: "new_missings" });
    await expect(service.getEntitySetName("new_missing")).resolves.toBe("new_missings");
    expect(lookups(fake)).toHaveLength(2);
  });

  it("rejects when the definition has no EntitySetName", async () => {
    const { client, fake } = createTestClient();
    fake.on("GET", "/EntityDefinitions(LogicalName='new_odd')", () => jsonResponse({}));
    const service = new OrganizationService(client);
    await expect(service.getEntitySetName("new_odd")).rejects.toThrow(/no EntitySetName/);
  });

  it("escapes quotes in the logical name", async () => {
    const { client, fake } = createTestClient();
    metadata(fake, { "a'b": "abs" });
    const service = new OrganizationService(client);
    await expect(service.getEntitySetName("a'b")).resolves.toBe("abs");
    expect(lookups(fake)).toEqual(["/EntityDefinitions(LogicalName='a''b')"]);
  });

  it("constructor overrides and setEntitySetName() skip the lookup", async () => {
    const { client, fake } = createTestClient();
    metadata(fake, {});
    const service = new OrganizationService(client, {
      entitySetNames: { New_Widget: "new_widgetset" },
    });
    service.setEntitySetName("new_gadget", "new_gadgetry");

    await expect(service.getEntitySetName("new_widget")).resolves.toBe("new_widgetset");
    await expect(service.getEntitySetName("new_gadget")).resolves.toBe("new_gadgetry");
    expect(lookups(fake)).toEqual([]);
  });

  it("associate() resolves a custom table's set once for several references", async () => {
    const { client, fake } = createTestClient();
    metadata(fake, { new_widget: "new_widgetset" });
    fake.on("POST", `/accounts(${ID})/new_account_widgets/$ref`, () => noContent());
    const service = new OrganizationService(client);

    await service.associate("accounts", ID, "new_account_widgets", [
      createEntityReference("new_widget", ID2),
      createEntityReference("new_widget", ID),
    ]);

    const refs = fake.requests.filter((r) => r.method === "POST");
    expect(refs.map((r) => JSON.parse(r.bodyText ?? "") as unknown)).toEqual([
      { "@odata.id": `${TEST_API_URL}/new_widgetset(${ID2})` },
      { "@odata.id": `${TEST_API_URL}/new_widgetset(${ID})` },
    ]);
    expect(lookups(fake)).toHaveLength(1);
  });

  it("associate() needs no lookup for a table in the SDK's $metadata snapshot (#295)", async () => {
    const { client, fake } = createTestClient();
    metadata(fake, {});
    fake.on("POST", `/accounts(${ID})/contact_customer_accounts/$ref`, () => noContent());
    const service = new OrganizationService(client);

    await service.associate("accounts", ID, "contact_customer_accounts", [
      createEntityReference("contact", ID2),
    ]);

    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({
      "@odata.id": `${TEST_API_URL}/contacts(${ID2})`,
    });
    expect(lookups(fake)).toEqual([]);
  });

  it("associate() uses EntityReference.entitySetName as is", async () => {
    const { client, fake } = createTestClient();
    metadata(fake, {});
    fake.on("POST", `/accounts(${ID})/new_account_widgets/$ref`, () => noContent());
    const service = new OrganizationService(client);

    await service.associate("accounts", ID, "new_account_widgets", [
      createEntityReference("new_widget", ID2, { entitySetName: "new_widgetset" }),
    ]);

    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({
      "@odata.id": `${TEST_API_URL}/new_widgetset(${ID2})`,
    });
    expect(lookups(fake)).toEqual([]);
  });

  it("assign() and setState() address the record by its real entity set", async () => {
    const { client, fake } = createTestClient();
    metadata(fake, { opportunity: "opportunities", team: "teams" });
    fake.on("PATCH", `/opportunities(${ID})`, () => noContent());
    const service = new OrganizationService(client);

    await service.assign("opportunity", ID, ID2, "team");
    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({
      "ownerid@odata.bind": `/teams(${ID2})`,
    });

    await service.setState("opportunity", ID, 1, 3);
    expect(fake.last().path).toBe(`/opportunities(${ID})`);
    expect(lookups(fake)).toHaveLength(2); // opportunity and team, each once
  });

  it("an unknown logical name rejects instead of guessing", async () => {
    const { client, fake } = createTestClient();
    metadata(fake, {});
    const service = new OrganizationService(client);
    await expect(service.setState("new_nothing", ID, 1, 2)).rejects.toMatchObject({
      status: 404,
    });
    expect(fake.requests.some((r) => r.method === "PATCH")).toBe(false);
  });
});
