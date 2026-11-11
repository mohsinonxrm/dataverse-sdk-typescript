/**
 * #434: upsertMultiple() and deleteMultiple() split records into chunks, send them with
 * UpsertMultiple / DeleteMultiple or `$batch`, and report every record's outcome.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  batchResponse,
  createTestClient,
  jsonResponse,
  noContent,
  odataError,
  throttled,
  type RecordedRequest,
} from "@mohsinonxrm/dataverse-sdk-testing";
import {
  DataverseAbortError,
  DataverseInvalidRequestError,
  DataverseNetworkError,
  DataverseODataError,
  DataverseThrottleError,
  type FetchProvider,
} from "@mohsinonxrm/dataverse-sdk-core";
import {
  deleteMultiple,
  upsertMultiple,
  DataverseBulkOperationError,
  type BulkTable,
} from "../src/index.js";

const ACCOUNT: BulkTable = { logicalName: "account", entitySetName: "accounts" };
const SENSOR: BulkTable = {
  logicalName: "contoso_sensordata",
  entitySetName: "contoso_sensordatas",
};
const UPSERT = "/accounts/Microsoft.Dynamics.CRM.UpsertMultiple";
const DELETE_SENSORS = "/contoso_sensordatas/Microsoft.Dynamics.CRM.DeleteMultiple";
const API = "https://contoso.crm.dynamics.com/api/data/v9.2";

/** A GUID whose last digits are `n`. */
const guid = (n: number): string => `00000000-0000-0000-0000-${String(n).padStart(12, "0")}`;

const targetsOf = (r: RecordedRequest): Array<Record<string, unknown>> =>
  (JSON.parse(r.bodyText ?? "{}") as { Targets: Array<Record<string, unknown>> }).Targets;

/** The request lines of a `$batch` body, e.g. `DELETE https://…/accounts(…)`. */
const requestLines = (r: RecordedRequest): string[] =>
  (r.bodyText ?? "").match(/^(?:GET|POST|PATCH|DELETE) \S+/gm) ?? [];

/** Answers the support lookup: `TableType` and the bulk messages with an sdkmessagefilter. */
function support(
  fake: ReturnType<typeof createTestClient>["fake"],
  tableType: "Standard" | "Elastic",
  messages: string[]
): void {
  fake.on("GET", /^\/EntityDefinitions/, () => jsonResponse({ TableType: tableType }));
  fake.on("GET", /^\/sdkmessagefilters/, () =>
    jsonResponse({ value: messages.map((name) => ({ sdkmessageid: { name } })) })
  );
}

/** Answers every `$batch` with one 204 per request in it. */
function batchOk(fake: ReturnType<typeof createTestClient>["fake"]): void {
  fake.on("POST", "/$batch", (req) =>
    batchResponse(requestLines(req).map(() => ({ status: 204 })))
  );
}

async function rejection(promise: Promise<unknown>): Promise<unknown> {
  try {
    await promise;
  } catch (err) {
    return err;
  }
  throw new Error("expected a rejection");
}

describe("upsertMultiple() with UpsertMultiple (#434)", () => {
  it("sends chunks of batchSize with @odata.type, by primary key or alternate key", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", UPSERT, () => noContent());
    const records = [
      { accountid: guid(1), name: "A" },
      { "@odata.id": "accounts(accountnumber='A-2')", name: "B" },
      { "@odata.id": `accounts(${guid(3)})`, name: "C" },
    ];

    const result = await upsertMultiple(client, ACCOUNT, records, { batchSize: 2 });

    expect(fake.requests.map((r) => [r.method, r.path])).toEqual([
      ["POST", UPSERT],
      ["POST", UPSERT],
    ]);
    expect(targetsOf(fake.requests[0])).toEqual([
      { "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: guid(1), name: "A" },
      {
        "@odata.type": "Microsoft.Dynamics.CRM.account",
        "@odata.id": "accounts(accountnumber='A-2')",
        name: "B",
      },
    ]);
    expect(fake.requests[0].headers.prefer).toContain("Microsoft.PowerApps.CDS.ErrorDetails.*");
    expect(result).toMatchObject({ strategy: "bulk", success: true, succeeded: 3, requests: 2 });
    // The id is known by primary key, or from an @odata.id by GUID; not by alternate key.
    expect(result.results).toEqual([
      { index: 0, status: "succeeded", id: guid(1) },
      { index: 1, status: "succeeded" },
      { index: 2, status: "succeeded", id: guid(3) },
    ]);
  });

  it("a failed chunk on a standard table fails all its records; later chunks are skipped", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", UPSERT, () => noContent());
    fake.on("POST", UPSERT, () => odataError(400, "0x80040237", "Duplicate"), 1);

    const result = await upsertMultiple(
      client,
      ACCOUNT,
      [1, 2, 3].map((n) => ({ accountid: guid(n) })),
      { batchSize: 2 }
    );
    expect(fake.requests).toHaveLength(1);
    expect(result.results.map((r) => r.status)).toEqual(["failed", "failed", "skipped"]);
    expect(result.results[0].error).toBeInstanceOf(DataverseODataError);
    expect(result.results[1].error).toBe(result.results[0].error);
    expect(result).toMatchObject({ success: false, stoppedEarly: true });
  });

  it("continueOnError sends every chunk", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", UPSERT, () => noContent());
    fake.on("POST", UPSERT, () => odataError(400, "0x80040237", "Duplicate"), 1);
    const result = await upsertMultiple(
      client,
      ACCOUNT,
      [1, 2].map((n) => ({ accountid: guid(n) })),
      { batchSize: 1, continueOnError: true }
    );
    expect(result.results.map((r) => r.status)).toEqual(["failed", "succeeded"]);
    expect(result.stoppedEarly).toBe(false);
  });

  it("an elastic table's error details fail only the records they name", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/contoso_sensordatas/Microsoft.Dynamics.CRM.UpsertMultiple", () =>
      jsonResponse(
        {
          error: {
            code: "0x80040265",
            message: "One or more records failed.",
            "@Microsoft.PowerApps.CDS.ErrorDetails.BulkApiErrorDetails": JSON.stringify([
              { RequestIndex: 0, Id: guid(1), StatusCode: 400 },
            ]),
          },
        },
        { status: 400 }
      )
    );
    const result = await upsertMultiple(
      client,
      SENSOR,
      [1, 2].map((n) => ({ contoso_sensordataid: guid(n), partitionid: "p1" }))
    );
    expect(result.results.map((r) => [r.status, r.id])).toEqual([
      ["failed", guid(1)],
      ["succeeded", guid(2)],
    ]);
    expect(result.results[0].error).toMatchObject({ status: 400, code: "0x80040265" });
  });
});

describe('upsertMultiple() with strategy "batch" (#434)', () => {
  it("sends PATCH <set>(<key>) without If-Match, the key left out of the body", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/$batch", () =>
      batchResponse([
        { status: 204, headers: { "OData-EntityId": `${API}/accounts(${guid(1)})` } },
        { status: 204, headers: { "OData-EntityId": `${API}/accounts(accountnumber='A 2')` } },
        { status: 400, body: { error: { code: "0x80044331", message: "Bad value" } } },
      ])
    );

    const result = await upsertMultiple(
      client,
      ACCOUNT,
      [
        { accountid: guid(1), name: "A" },
        { "@odata.id": "accounts(accountnumber='A 2')", name: "B" },
        { "@odata.id": `${API}/accounts(${guid(3)})`, name: "C" },
      ],
      { strategy: "batch" }
    );

    const req = fake.last();
    expect(req.headers.prefer).toContain("odata.continue-on-error");
    expect(requestLines(req)).toEqual([
      `PATCH ${API}/accounts(${guid(1)})`,
      `PATCH ${API}/accounts(accountnumber='A%202')`,
      `PATCH ${API}/accounts(${guid(3)})`,
    ]);
    const body = req.bodyText ?? "";
    expect(body).not.toMatch(/if-match/i);
    expect(body).not.toContain("@odata.id");
    expect(body).not.toContain('"accountid"');
    expect(body).toContain('{"name":"A"}');
    expect(result).toMatchObject({ strategy: "batch", requests: 1, succeeded: 2, failed: 1 });
    expect(result.results.map((r) => [r.status, r.id])).toEqual([
      ["succeeded", guid(1)],
      ["succeeded", undefined],
      ["failed", guid(3)],
    ]);
    expect(result.results[2].error).toMatchObject({ status: 400, code: "0x80044331" });
  });

  it("takes the id of a row upserted by alternate key from OData-EntityId when it is a GUID", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/$batch", () =>
      batchResponse([{ status: 204, headers: { "OData-EntityId": `${API}/accounts(${guid(9)})` } }])
    );
    const result = await upsertMultiple(
      client,
      ACCOUNT,
      [{ "@odata.id": "accounts(accountnumber='A-1')", name: "A" }],
      { strategy: "batch" }
    );
    expect(result.results[0]).toEqual({ index: 0, status: "succeeded", id: guid(9) });
  });
});

describe('upsertMultiple() with strategy "auto" (#434)', () => {
  it("sends UpsertMultiple when the table supports CreateMultiple and UpdateMultiple", async () => {
    const { client, fake } = createTestClient();
    support(fake, "Standard", ["CreateMultiple", "UpdateMultiple"]);
    fake.on("POST", UPSERT, () => noContent());
    const result = await upsertMultiple(client, ACCOUNT, [{ accountid: guid(1) }], {
      strategy: "auto",
    });
    expect(result.strategy).toBe("bulk");
    expect(fake.last().path).toBe(UPSERT);
  });

  it("falls back to $batch when the table lacks one of them", async () => {
    const { client, fake } = createTestClient();
    support(fake, "Standard", ["CreateMultiple"]);
    batchOk(fake);
    const result = await upsertMultiple(client, ACCOUNT, [{ accountid: guid(1) }], {
      strategy: "auto",
    });
    expect(result).toMatchObject({ strategy: "batch", succeeded: 1 });
    expect(requestLines(fake.last())).toEqual([`PATCH ${API}/accounts(${guid(1)})`]);
  });
});

describe("upsertMultiple() validation (#434)", () => {
  it("rejects a record that names no row, before anything is sent", async () => {
    const { client, fake } = createTestClient();
    const err = await rejection(
      upsertMultiple(client, ACCOUNT, [{ accountid: guid(1) }, { name: "no key" }])
    );
    expect(err).toBeInstanceOf(DataverseInvalidRequestError);
    expect((err as Error).message).toMatch(/record 1 names no row/);
    expect(fake.requests).toHaveLength(0);
  });

  it.each([["contacts(" + guid(1) + ")"], ["accounts"], [42]])(
    "rejects an @odata.id that isn't a row of the table: %s",
    async (odataId) => {
      const { client, fake } = createTestClient();
      const err = await rejection(upsertMultiple(client, ACCOUNT, [{ "@odata.id": odataId }]));
      expect(err).toBeInstanceOf(DataverseInvalidRequestError);
      expect((err as Error).message).toContain("@odata.id");
      expect(fake.requests).toHaveLength(0);
    }
  );

  it("rejects two records naming the same row, by primary key or alternate key", async () => {
    const { client, fake } = createTestClient();
    await expect(
      upsertMultiple(client, ACCOUNT, [
        { accountid: guid(1) },
        { "@odata.id": `accounts(${guid(1).toUpperCase()})` },
      ])
    ).rejects.toThrow(/records 0 and 1 name the same row/);
    await expect(
      upsertMultiple(client, ACCOUNT, [
        { "@odata.id": "accounts(accountnumber='A-1')" },
        { accountid: guid(2) },
        { "@odata.id": "accounts(accountnumber='A-1')" },
      ])
    ).rejects.toThrow(/records 0 and 2 name the same row/);
    expect(fake.requests).toHaveLength(0);
  });
});

describe("deleteMultiple() (#434)", () => {
  it('defaults to "auto": a standard table is deleted with $batch DELETEs', async () => {
    const { client, fake } = createTestClient();
    support(fake, "Standard", ["CreateMultiple", "UpdateMultiple"]);
    batchOk(fake);

    const result = await deleteMultiple(
      client,
      ACCOUNT,
      [guid(1), { accountid: guid(2) }, guid(3)],
      {
        batchSize: 2,
      }
    );

    const batches = fake.requests.filter((r) => r.path === "/$batch");
    expect(batches.map(requestLines)).toEqual([
      [`DELETE ${API}/accounts(${guid(1)})`, `DELETE ${API}/accounts(${guid(2)})`],
      [`DELETE ${API}/accounts(${guid(3)})`],
    ]);
    expect(batches[0].headers.prefer).toContain("odata.continue-on-error");
    expect(result).toMatchObject({ strategy: "batch", success: true, succeeded: 3, requests: 2 });
    expect(result.results.map((r) => r.id)).toEqual([guid(1), guid(2), guid(3)]);
  });

  it("a row that doesn't exist fails on its own (404); the others are deleted", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/$batch", () =>
      batchResponse([
        { status: 204 },
        { status: 404, body: { error: { code: "0x80040217", message: "Not found" } } },
        { status: 204 },
      ])
    );
    const result = await deleteMultiple(client, ACCOUNT, [guid(1), guid(2), guid(3)], {
      strategy: "batch",
    });
    expect(result.results.map((r) => [r.status, r.id])).toEqual([
      ["succeeded", guid(1)],
      ["failed", guid(2)],
      ["succeeded", guid(3)],
    ]);
    expect(result.results[1].error).toBeInstanceOf(DataverseODataError);
    expect(result.results[1].error).toMatchObject({ status: 404 });
    expect(result).toMatchObject({ success: false, failed: 1, stoppedEarly: false });
  });

  it("an elastic table is deleted with DeleteMultiple, partitionid kept in the targets", async () => {
    const { client, fake } = createTestClient();
    support(fake, "Elastic", []);
    fake.on("POST", DELETE_SENSORS, () => noContent());

    const result = await deleteMultiple(client, SENSOR, [
      { contoso_sensordataid: guid(1), partitionid: "p1" },
      guid(2),
    ]);

    expect(result).toMatchObject({ strategy: "bulk", success: true, succeeded: 2, requests: 1 });
    expect(targetsOf(fake.last())).toEqual([
      {
        "@odata.type": "Microsoft.Dynamics.CRM.contoso_sensordata",
        contoso_sensordataid: guid(1),
        partitionid: "p1",
      },
      { "@odata.type": "Microsoft.Dynamics.CRM.contoso_sensordata", contoso_sensordataid: guid(2) },
    ]);
    expect(result.results.map((r) => r.id)).toEqual([guid(1), guid(2)]);
  });

  it("an elastic table's error details fail only the records they name", async () => {
    const { client, fake } = createTestClient();
    support(fake, "Elastic", []);
    fake.on("POST", DELETE_SENSORS, () =>
      jsonResponse(
        {
          error: {
            code: "0x80040217",
            message: "One or more records failed.",
            "@Microsoft.PowerApps.CDS.ErrorDetails.BulkApiErrorDetails": [
              { RequestIndex: 1, Id: guid(2), StatusCode: 404 },
            ],
          },
        },
        { status: 400 }
      )
    );
    const result = await deleteMultiple(client, SENSOR, [guid(1), guid(2)], { strategy: "bulk" });
    expect(result.results.map((r) => r.status)).toEqual(["succeeded", "failed"]);
    expect(result.results[1].error).toMatchObject({ status: 404 });
  });

  it('with "batch", partitionid goes into the row\'s key', async () => {
    const { client, fake } = createTestClient();
    batchOk(fake);
    await deleteMultiple(
      client,
      SENSOR,
      [{ contoso_sensordataid: guid(1), partitionid: "device 'A'" }],
      { strategy: "batch" }
    );
    expect(requestLines(fake.last())).toEqual([
      `DELETE ${API}/contoso_sensordatas(contoso_sensordataid=${guid(1)},partitionid='device%20''A''')`,
    ]);
  });

  it('"bulk" on a standard table is rejected before anything is deleted', async () => {
    const { client, fake } = createTestClient();
    support(fake, "Standard", ["CreateMultiple", "UpdateMultiple"]);
    const err = await rejection(deleteMultiple(client, ACCOUNT, [guid(1)], { strategy: "bulk" }));
    expect(err).toBeInstanceOf(DataverseInvalidRequestError);
    expect((err as Error).message).toMatch(/not an elastic table/);
    expect(fake.requests.every((r) => r.method === "GET")).toBe(true);
  });

  it("an empty list sends nothing, not even the support lookup", async () => {
    const { client, fake } = createTestClient();
    const result = await deleteMultiple(client, ACCOUNT, []);
    expect(fake.requests).toHaveLength(0);
    expect(result).toMatchObject({ success: true, results: [], requests: 0 });
  });

  it("rejects a record without a GUID id, before anything is sent", async () => {
    const { client, fake } = createTestClient();
    await expect(deleteMultiple(client, ACCOUNT, [guid(1), "not-a-guid"])).rejects.toThrow(
      /record 1 is not a GUID/
    );
    await expect(deleteMultiple(client, ACCOUNT, [{ name: "x" }])).rejects.toThrow(
      /record 0 has no GUID in "accountid"/
    );
    await expect(
      deleteMultiple(client, SENSOR, [{ contoso_sensordataid: guid(1), partitionid: 7 }])
    ).rejects.toBeInstanceOf(DataverseInvalidRequestError);
    expect(fake.requests).toHaveLength(0);
  });

  it("uses table.primaryIdAttribute", async () => {
    const { client, fake } = createTestClient();
    batchOk(fake);
    const result = await deleteMultiple(
      client,
      { logicalName: "email", entitySetName: "emails", primaryIdAttribute: "activityid" },
      [{ activityid: guid(7) }],
      { strategy: "batch" }
    );
    expect(requestLines(fake.last())).toEqual([`DELETE ${API}/emails(${guid(7)})`]);
    expect(result.results[0]).toEqual({ index: 0, status: "succeeded", id: guid(7) });
  });
});

describe("cancellation (#434)", () => {
  it("an aborted signal rejects with DataverseAbortError and sends nothing", async () => {
    const { client, fake } = createTestClient();
    const controller = new AbortController();
    controller.abort();
    await expect(
      upsertMultiple(client, ACCOUNT, [{ accountid: guid(1) }], { signal: controller.signal })
    ).rejects.toBeInstanceOf(DataverseAbortError);
    await expect(
      deleteMultiple(client, ACCOUNT, [guid(1)], { strategy: "batch", signal: controller.signal })
    ).rejects.toBeInstanceOf(DataverseAbortError);
    expect(fake.requests).toHaveLength(0);
  });

  it("an abort after a chunk ran rejects with DataverseBulkOperationError holding the result", async () => {
    const controller = new AbortController();
    const { fake: inner } = createTestClient();
    batchOk(inner);
    const wrapped: FetchProvider = {
      async fetch(input, init) {
        const res = await inner.fetchProvider.fetch(input, init);
        controller.abort(); // after the first chunk is answered
        return res;
      },
    };
    const { client } = createTestClient({ fetchProvider: wrapped });

    const err = await rejection(
      deleteMultiple(client, ACCOUNT, [guid(1), guid(2)], {
        strategy: "batch",
        batchSize: 1,
        signal: controller.signal,
      })
    );
    expect(err).toBeInstanceOf(DataverseBulkOperationError);
    const bulkErr = err as DataverseBulkOperationError;
    expect(bulkErr.message).toMatch(/^DeleteMultiple stopped after 1 of 2/);
    expect(bulkErr.cause).toBeInstanceOf(DataverseAbortError);
    expect(bulkErr.result.results.map((r) => r.status)).toEqual(["succeeded", "skipped"]);
  });

  it("timeoutMs covers the whole operation", async () => {
    const hanging: FetchProvider = {
      fetch(_input, init) {
        return new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener(
            "abort",
            () => {
              reject(
                init.signal?.reason instanceof Error ? init.signal.reason : new Error("aborted")
              );
            },
            { once: true }
          );
        });
      },
    };
    const { client } = createTestClient({ fetchProvider: hanging });
    const err = await rejection(
      upsertMultiple(client, ACCOUNT, [{ accountid: guid(1) }], { timeoutMs: 20 })
    );
    expect(err).toBeInstanceOf(DataverseNetworkError);
    expect((err as DataverseNetworkError).name).toBe("RequestTimeout");
  });

  it("sends the caller's headers and correlation id", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", UPSERT, () => noContent());
    await upsertMultiple(client, ACCOUNT, [{ accountid: guid(1) }], {
      headers: { "MSCRM.BypassCustomPluginExecution": "true" },
      correlationId: "corr-1",
    });
    expect(fake.last().headers["mscrm.bypasscustompluginexecution"]).toBe("true");
    expect(fake.last().headers["x-ms-correlation-id"]).toBe("corr-1");
  });
});

describe("the timeoutMs deadline goes with every request (#434, #487)", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  function setup() {
    return createTestClient({
      retry: { maxRetries: 3, maxRetryAfterMs: Number.POSITIVE_INFINITY, jitter: false },
      concurrency: { adaptiveFromDopHint: false },
    });
  }

  async function within(p: Promise<unknown>, ms: number) {
    let settled = false;
    let value: unknown;
    p.then(
      (v) => {
        settled = true;
        value = v;
      },
      (e: unknown) => {
        settled = true;
        value = e;
      }
    );
    await vi.advanceTimersByTimeAsync(ms);
    return { settled, value };
  }

  it("upsertMultiple, bulk: a 429 with Retry-After: 60 fails the chunk at once", async () => {
    const { client, fake } = setup();
    fake.on("POST", UPSERT, () => throttled(60));
    const op = upsertMultiple(client, ACCOUNT, [{ accountid: guid(1) }], { timeoutMs: 10_000 });
    const { settled, value } = await within(op, 50);
    expect(settled).toBe(true);
    const result = value as Awaited<typeof op>;
    expect(result.results[0].error).toBeInstanceOf(DataverseThrottleError);
    expect(fake.requests).toHaveLength(1);
  });

  it("deleteMultiple, auto: the support lookup gets the deadline too", async () => {
    const { client, fake } = setup();
    fake.on("GET", /^\/(EntityDefinitions|sdkmessagefilters)/, () => throttled(60));
    const op = deleteMultiple(client, ACCOUNT, [guid(1)], { timeoutMs: 10_000 });
    const { settled, value } = await within(op, 50);
    expect(settled).toBe(true);
    expect(value).toBeInstanceOf(DataverseThrottleError);
  });

  it("deleteMultiple, batch: the $batch gets the deadline", async () => {
    const { client, fake } = setup();
    fake.on("POST", "/$batch", () => throttled(60));
    const op = deleteMultiple(client, ACCOUNT, [guid(1)], {
      strategy: "batch",
      timeoutMs: 10_000,
    });
    const { settled, value } = await within(op, 50);
    expect(settled).toBe(true);
    const result = value as Awaited<typeof op>;
    expect(result.results[0].error).toBeInstanceOf(DataverseThrottleError);
    expect(fake.requests).toHaveLength(1);
  });
});
