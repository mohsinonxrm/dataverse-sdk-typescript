/**
 * #346: getBulkOperationSupport() reads which bulk messages a table supports from its TableType
 * and its sdkmessagefilters, caches the answer per client and table, and createMultiple() /
 * updateMultiple() use it with strategy "auto".
 */
import { describe, it, expect } from "vitest";
import {
  batchResponse,
  createTestClient,
  jsonResponse,
  noContent,
  odataError,
  type FakeFetch,
} from "@mohsinonxrm/dataverse-sdk-testing";
import { DataverseAbortError, DataverseInvalidRequestError } from "@mohsinonxrm/dataverse-sdk-core";
import { createMultiple, getBulkOperationSupport, updateMultiple } from "../src/index.js";

const ENTITY_DEFINITION = /^\/EntityDefinitions\(/;
const FILTERS = "/sdkmessagefilters";

/** Answers the two lookups: the table's TableType, and filter rows for `messages`. */
function table(fake: FakeFetch, tableType: string, messages: string[]): void {
  fake.on("GET", ENTITY_DEFINITION, () =>
    jsonResponse({ TableType: tableType, MetadataId: "70816501-edb9-4740-a16c-6a5efbc05d84" })
  );
  fake.on("GET", FILTERS, () =>
    jsonResponse({
      value: messages.map((name, i) => ({
        sdkmessagefilterid: `00000000-0000-0000-0000-00000000000${String(i)}`,
        sdkmessageid: { name, sdkmessageid: `10000000-0000-0000-0000-00000000000${String(i)}` },
      })),
    })
  );
}

const lookups = (fake: FakeFetch): number =>
  fake.requests.filter(
    (r) => r.path.startsWith("/EntityDefinitions(") || r.path.startsWith(FILTERS)
  ).length;

describe("getBulkOperationSupport() (#346)", () => {
  it("reads TableType and the sdkmessagefilters of the four bulk messages", async () => {
    const { client, fake } = createTestClient();
    table(fake, "Standard", ["CreateMultiple", "UpdateMultiple"]);

    const support = await getBulkOperationSupport(client, "account");

    expect(support).toEqual({
      logicalName: "account",
      elastic: false,
      createMultiple: true,
      updateMultiple: true,
      upsertMultiple: true,
      deleteMultiple: false,
    });
    const [definition, filters] = [
      fake.requests.find((r) => r.path.startsWith("/EntityDefinitions(")),
      fake.requests.find((r) => r.path.startsWith(FILTERS)),
    ];
    expect(definition?.method).toBe("GET");
    expect(decodeURIComponent(definition?.url ?? "")).toContain(
      "EntityDefinitions(LogicalName='account')?$select=TableType"
    );
    const query = decodeURIComponent(filters?.url ?? "");
    expect(query).toContain("$select=sdkmessagefilterid");
    expect(query).toContain("$expand=sdkmessageid($select=name)");
    expect(query).toContain(
      "$filter=primaryobjecttypecode eq 'account' and (sdkmessageid/name eq 'CreateMultiple' or sdkmessageid/name eq 'UpdateMultiple' or sdkmessageid/name eq 'UpsertMultiple' or sdkmessageid/name eq 'DeleteMultiple')"
    );
  });

  it("a standard table without filter rows supports none of them", async () => {
    const { client, fake } = createTestClient();
    table(fake, "Standard", []);
    expect(await getBulkOperationSupport(client, "activitymimeattachment")).toMatchObject({
      createMultiple: false,
      updateMultiple: false,
      upsertMultiple: false,
      deleteMultiple: false,
    });
  });

  it("UpsertMultiple needs both CreateMultiple and UpdateMultiple", async () => {
    const { client, fake } = createTestClient();
    table(fake, "Standard", ["CreateMultiple"]);
    expect(await getBulkOperationSupport(client, "x_only_create")).toMatchObject({
      createMultiple: true,
      updateMultiple: false,
      upsertMultiple: false,
    });
  });

  it("an elastic table supports all four, DeleteMultiple included", async () => {
    const { client, fake } = createTestClient();
    table(fake, "Elastic", []);
    expect(await getBulkOperationSupport(client, "contoso_sensordata")).toEqual({
      logicalName: "contoso_sensordata",
      elastic: true,
      createMultiple: true,
      updateMultiple: true,
      upsertMultiple: true,
      deleteMultiple: true,
    });
  });

  it("caches the answer per client and table (case-insensitively); refresh reads it again", async () => {
    const { client, fake } = createTestClient();
    table(fake, "Standard", ["CreateMultiple", "UpdateMultiple"]);

    const first = await getBulkOperationSupport(client, "account");
    await getBulkOperationSupport(client, "Account");
    expect(lookups(fake)).toBe(2);

    // The caller's copy can't change the cached answer.
    first.createMultiple = false;
    expect((await getBulkOperationSupport(client, "account")).createMultiple).toBe(true);
    expect(lookups(fake)).toBe(2);

    await getBulkOperationSupport(client, "contact");
    expect(lookups(fake)).toBe(4);

    await getBulkOperationSupport(client, "account", { refresh: true });
    expect(lookups(fake)).toBe(6);

    // Another client has its own cache.
    const other = createTestClient();
    table(other.fake, "Standard", []);
    expect((await getBulkOperationSupport(other.client, "account")).createMultiple).toBe(false);
    expect(lookups(other.fake)).toBe(2);
  });

  it("a failed lookup rejects with the typed error and isn't cached", async () => {
    const { client, fake } = createTestClient();
    table(fake, "Standard", ["CreateMultiple"]);
    fake.on(
      "GET",
      ENTITY_DEFINITION,
      () => odataError(404, "0x80040217", "Could not find an entity with name nosuchtable"),
      1
    );

    await expect(getBulkOperationSupport(client, "nosuchtable")).rejects.toMatchObject({
      status: 404,
      code: "0x80040217",
    });
    expect((await getBulkOperationSupport(client, "nosuchtable")).createMultiple).toBe(true);
  });

  it("rejects a logical name that isn't one, without a request", async () => {
    const { client, fake } = createTestClient();
    await expect(getBulkOperationSupport(client, "account' or 1 eq 1")).rejects.toBeInstanceOf(
      DataverseInvalidRequestError
    );
    expect(fake.requests).toHaveLength(0);
  });

  it("an aborted signal rejects with DataverseAbortError", async () => {
    const { client, fake } = createTestClient();
    table(fake, "Standard", []);
    const controller = new AbortController();
    controller.abort();
    await expect(
      getBulkOperationSupport(client, "account", { signal: controller.signal })
    ).rejects.toBeInstanceOf(DataverseAbortError);
  });
});

describe('strategy: "auto" (#346)', () => {
  it("uses CreateMultiple when the table supports it, looking the table up once", async () => {
    const { client, fake } = createTestClient();
    table(fake, "Standard", ["CreateMultiple", "UpdateMultiple"]);
    fake.on("POST", "/accounts/Microsoft.Dynamics.CRM.CreateMultiple", () =>
      jsonResponse({ Ids: ["00000000-0000-0000-0000-000000000001"] })
    );
    const account = { logicalName: "account", entitySetName: "accounts" };

    const first = await createMultiple(client, account, [{ name: "a" }], { strategy: "auto" });
    const second = await createMultiple(client, account, [{ name: "b" }], { strategy: "auto" });

    expect(first.strategy).toBe("bulk");
    expect(second.strategy).toBe("bulk");
    expect(lookups(fake)).toBe(2); // one lookup (two GETs) for both calls
  });

  it("falls back to $batch when the table doesn't support the message", async () => {
    const { client, fake } = createTestClient();
    table(fake, "Standard", ["CreateMultiple"]); // no UpdateMultiple
    fake.on("POST", "/$batch", () => batchResponse([{ status: 204 }]));

    const result = await updateMultiple(
      client,
      { logicalName: "x_widget", entitySetName: "x_widgets" },
      [{ x_widgetid: "00000000-0000-0000-0000-000000000001", x_name: "w" }],
      { strategy: "auto" }
    );

    expect(result).toMatchObject({ strategy: "batch", success: true });
    expect(fake.last().path).toBe("/$batch");
  });

  it("an update with auto needs the primary key up front, as $batch may be picked", async () => {
    const { client, fake } = createTestClient();
    await expect(
      updateMultiple(
        client,
        { logicalName: "account", entitySetName: "accounts" },
        [{ name: "x" }],
        {
          strategy: "auto",
        }
      )
    ).rejects.toBeInstanceOf(DataverseInvalidRequestError);
    expect(fake.requests).toHaveLength(0);
  });

  it("looks nothing up for an empty list", async () => {
    const { client, fake } = createTestClient();
    const result = await createMultiple(
      client,
      { logicalName: "account", entitySetName: "accounts" },
      [],
      { strategy: "auto" }
    );
    expect(result.results).toEqual([]);
    expect(fake.requests).toHaveLength(0);
  });

  it("an elastic table uses the bulk message", async () => {
    const { client, fake } = createTestClient();
    table(fake, "Elastic", []);
    fake.on("POST", "/contoso_sensordatas/Microsoft.Dynamics.CRM.UpdateMultiple", () =>
      noContent()
    );
    const result = await updateMultiple(
      client,
      { logicalName: "contoso_sensordata", entitySetName: "contoso_sensordatas" },
      [{ contoso_sensordataid: "00000000-0000-0000-0000-000000000001", partitionid: "p" }],
      { strategy: "auto" }
    );
    expect(result.strategy).toBe("bulk");
  });
});
