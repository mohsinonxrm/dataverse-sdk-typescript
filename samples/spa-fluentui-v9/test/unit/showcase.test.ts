/**
 * The Metadata, Files, Environments, Actions and Telemetry pages' scenarios, against the SDK's
 * recording fake fetch (what they send) and demo mode's environment (that they work).
 */
import { describe, expect, it } from "vitest";
import { jsonResponse } from "@mohsinonxrm/dataverse-sdk-testing";
import { activity } from "../../src/sdk/activity";
import * as discovery from "../../src/scenarios/discovery";
import * as files from "../../src/scenarios/files";
import * as metadata from "../../src/scenarios/metadata";
import * as operations from "../../src/scenarios/operations";
import * as queries from "../../src/scenarios/queries";
import { generateActivity } from "../../src/scenarios/telemetry";
import { signal, withDemo, withFakeFetch } from "./helpers";

describe("metadata browser", () => {
  it("reads choice columns through the Picklist cast with their option set", async () => {
    const { sdk, fake } = withFakeFetch();
    fake.on("GET", /Attributes/, () => jsonResponse({ value: [] }));
    await metadata.choiceColumns(sdk, { table: "account" });
    const url = decodeURIComponent(fake.last().url);
    expect(url).toContain(
      "EntityDefinitions(LogicalName='account')/Attributes/Microsoft.Dynamics.CRM.PicklistAttributeMetadata"
    );
    expect(url).toContain("$expand=OptionSet($select=Options)");
  });

  it("lists tables, columns and typed casts (demo)", async () => {
    const { sdk } = withDemo();
    const tables = await metadata.listTables(sdk);
    expect(tables.find((t) => t.logicalName === "account")).toMatchObject({
      entitySetName: "accounts",
      ownership: "UserOwned",
    });
    const columns = await metadata.listColumns(sdk, { table: "account" });
    expect(columns.find((c) => c.logicalName === "name")).toMatchObject({
      type: "String",
      required: "ApplicationRequired",
    });
    const choices = await metadata.choiceColumns(sdk, { table: "account" });
    expect(choices.find((c) => c.logicalName === "industrycode")?.options).toContain(
      "4 Consulting"
    );
    expect(
      (await metadata.textColumns(sdk, { table: "account" })).find((c) => c.logicalName === "name")
        ?.maxLength
    ).toBe(160);
    expect(
      (await metadata.lookupColumns(sdk, { table: "account" })).find(
        (c) => c.logicalName === "primarycontactid"
      )?.targets
    ).toEqual(["contact"]);
  });
});

describe("files and images (demo)", () => {
  // Every byte goes through the demo backend's base64 handling, which is pure JS. Under CI's
  // parallel turbo run this test was hitting vitest's 5 s default with 200 KB, so it uses 50 KB in
  // 16 KB blocks (the same four blocks and progress steps) and an explicit 30 s timeout.
  it(
    "uploads in blocks with progress, downloads the same bytes, and deletes",
    { timeout: 30_000 },
    async () => {
      const h = withDemo();
      const { id } = await files.firstAccount(h.sdk, signal());
      const target = { entitySetName: "accounts", recordId: id, column: "entityimage" };
      const bytes = new Uint8Array(50_000).map((_, i) => i % 251);
      const progress: number[] = [];
      await files.uploadFile(
        h.sdk,
        {
          ...target,
          file: new Blob([bytes], { type: "image/png" }),
          fileName: "a.png",
          chunkSize: 16 * 1024,
        },
        (p) => progress.push(p.percentage),
        signal()
      );
      expect(progress).toEqual([33, 66, 98, 100]);
      expect(h.exchanges.filter((e) => e.url.endsWith("/UploadBlock"))).toHaveLength(4);

      const blob = await files.downloadFile(h.sdk, target);
      expect(blob.type).toBe("image/png");
      expect(new Uint8Array(await blob.arrayBuffer())).toEqual(bytes);

      await files.deleteFile(h.sdk, target);
      await expect(files.downloadFile(h.sdk, target)).rejects.toMatchObject({ status: 404 });
    }
  );
});

describe("environments", () => {
  it("filters discovery by region with an escaped literal", async () => {
    const { sdk, exchanges } = withDemo();
    const eur = await discovery.listEnvironments(sdk, { region: "EUR" }, signal());
    expect(eur.map((e) => e.name)).toEqual(["Fabrikam Test"]);
    expect(decodeURIComponent(exchanges[0]?.url ?? "")).toContain("$filter=Region eq 'EUR'");
    expect(exchanges[0]?.via).toBe("DiscoveryClient");
  });

  it("lists every environment and tests a connection to one (demo)", async () => {
    const { sdk } = withDemo();
    const all = await discovery.listEnvironments(sdk, { region: "" }, signal());
    expect(all).toHaveLength(3);
    const dev = all.find((e) => e.name === "Contoso Dev");
    const r = await discovery.testConnection(sdk, { url: dev?.url ?? "" }, signal());
    expect(r).toMatchObject({
      url: "https://contoso-dev.crm.dynamics.com",
      version: "9.2.26101.161",
    });
  });
});

describe("actions, functions and messages", () => {
  it("sends function parameters as aliases", async () => {
    const { sdk, fake } = withFakeFetch();
    fake.on("GET", "/RetrieveVersion", () => jsonResponse({ Version: "9.2" }));
    fake.on("GET", /RetrieveTotalRecordCount/, () =>
      jsonResponse({ EntityRecordCountCollection: { Keys: ["account"], Values: [3] } })
    );
    const r = await operations.counts(sdk, { tables: ["account"] }, signal());
    expect(r).toEqual({ version: "9.2", counts: [{ table: "account", records: 3 }] });
    expect(decodeURIComponent(fake.last().url)).toContain(
      'RetrieveTotalRecordCount(EntityNames=@p1)?@p1=["account"]'
    );
  });

  it("InitializeFrom gives a contact template that creates (demo)", async () => {
    const r = await operations.newContactFromAccount(withDemo().sdk, signal());
    expect(r.template["parentcustomerid_account@odata.bind"]).toMatch(/^accounts\(/);
    expect(r.createdAndDeleted).toMatch(/^[0-9a-f-]{36}$/);
  });

  it("an action, a message and a generic OrganizationRequest (demo)", async () => {
    await expect(
      operations.relationshipChecks(withDemo().sdk, { table: "account" })
    ).resolves.toEqual({
      canManyToMany: true,
      canBeReferenced: true,
      canBeReferencing: true,
    });
  });
});

describe("telemetry and $apply (demo)", () => {
  it("the hooks report the retry, the dependencies and the failure", async () => {
    activity.clear();
    const r = await generateActivity(withDemo().sdk, signal());
    expect(r.failedAsExpected).toMatch(/comparison operator|Syntax/);
    const entries = activity.snapshot();
    expect(entries.some((e) => e.source === "retry")).toBe(true);
    expect(
      entries.some((e) => e.source === "telemetry" && e.message.startsWith("dependency"))
    ).toBe(true);
    expect(entries.some((e) => e.source === "logger")).toBe(true);
  }, 10_000);

  it("groups and counts with $apply", async () => {
    const h = withDemo();
    const rows = await queries.accountsPerCity(h.sdk, signal());
    const active = await h.sdk.client
      .api("accounts")
      .filter("statecode eq 0")
      .count()
      .top(1)
      .get<{ "@odata.count": number }>();
    expect(rows.reduce((n, r) => n + r.count, 0)).toBe(active["@odata.count"]);
  });
});
