/**
 * #310: createMultiple() and updateMultiple() split records into chunks, send them with
 * CreateMultiple / UpdateMultiple or `$batch`, and report every record's outcome.
 */
import { describe, it, expect } from "vitest";
import {
  batchResponse,
  createTestClient,
  jsonResponse,
  noContent,
  odataError,
  type RecordedRequest,
} from "@mohsinonxrm/dataverse-sdk-testing";
import {
  DataverseAbortError,
  DataverseInvalidRequestError,
  DataverseNetworkError,
  DataverseODataError,
  type FetchProvider,
} from "@mohsinonxrm/dataverse-sdk-core";
import {
  createMultiple,
  updateMultiple,
  DataverseBulkOperationError,
  type BulkTable,
} from "../src/index.js";

const ACCOUNT: BulkTable = { logicalName: "account", entitySetName: "accounts" };
const CREATE = "/accounts/Microsoft.Dynamics.CRM.CreateMultiple";
const UPDATE = "/accounts/Microsoft.Dynamics.CRM.UpdateMultiple";

/** A GUID whose last digits are `n`. */
const guid = (n: number): string => `00000000-0000-0000-0000-${String(n).padStart(12, "0")}`;

interface Targets {
  Targets: Array<Record<string, unknown>>;
}
const targetsOf = (r: RecordedRequest): Array<Record<string, unknown>> =>
  (JSON.parse(r.bodyText ?? "{}") as Targets).Targets;

/** Answers CreateMultiple with an id per target, numbered across calls from 1. */
function createIds(fake: ReturnType<typeof createTestClient>["fake"]): void {
  let n = 0;
  fake.on("POST", CREATE, (req) => jsonResponse({ Ids: targetsOf(req).map(() => guid(++n)) }));
}

async function rejection(promise: Promise<unknown>): Promise<unknown> {
  try {
    await promise;
  } catch (err) {
    return err;
  }
  throw new Error("expected a rejection");
}

describe("createMultiple() with CreateMultiple (#310)", () => {
  it("splits the records into chunks of batchSize and returns each record's id in input order", async () => {
    const { client, fake } = createTestClient();
    createIds(fake);
    const records = [1, 2, 3, 4, 5].map((n) => ({ name: `Account ${String(n)}` }));

    const result = await createMultiple(client, ACCOUNT, records, { batchSize: 2 });

    expect(fake.requests.map((r) => [r.method, r.path])).toEqual([
      ["POST", CREATE],
      ["POST", CREATE],
      ["POST", CREATE],
    ]);
    expect(fake.requests.map((r) => targetsOf(r).length)).toEqual([2, 2, 1]);
    expect(targetsOf(fake.requests[0])[0]).toEqual({
      "@odata.type": "Microsoft.Dynamics.CRM.account",
      name: "Account 1",
    });
    expect(fake.requests[0].headers.prefer).toContain(
      'odata.include-annotations="Microsoft.PowerApps.CDS.ErrorDetails.*"'
    );
    expect(result).toMatchObject({
      strategy: "bulk",
      success: true,
      succeeded: 5,
      failed: 0,
      skipped: 0,
      requests: 3,
      stoppedEarly: false,
    });
    expect(result.results.map((r) => [r.index, r.status, r.id])).toEqual(
      [1, 2, 3, 4, 5].map((n) => [n - 1, "succeeded", guid(n)])
    );
  });

  it("keeps a record's own @odata.type, the caller's headers, Prefer and correlation id", async () => {
    const { client, fake } = createTestClient();
    createIds(fake);
    await createMultiple(
      client,
      ACCOUNT,
      [{ "@odata.type": "Microsoft.Dynamics.CRM.account", name: "A" }],
      {
        headers: {
          "MSCRM.BypassCustomPluginExecution": "true",
          Prefer: 'odata.include-annotations="*"',
        },
        correlationId: "corr-1",
      }
    );
    const req = fake.last();
    expect(targetsOf(req)).toEqual([
      { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "A" },
    ]);
    expect(req.headers["mscrm.bypasscustompluginexecution"]).toBe("true");
    expect(req.headers.prefer).toBe('odata.include-annotations="*"');
    expect(req.headers["x-ms-correlation-id"]).toBe("corr-1");
  });

  it("sends nothing for an empty list", async () => {
    const { client, fake } = createTestClient();
    const result = await createMultiple(client, ACCOUNT, []);
    expect(fake.requests).toHaveLength(0);
    expect(result).toMatchObject({ success: true, results: [], requests: 0 });
  });

  it("a failed chunk on a standard table fails every record of it; later chunks are skipped", async () => {
    const { client, fake } = createTestClient();
    // 1st call: ids; 2nd call: 400; 3rd: never sent.
    let call = 0;
    fake.on("POST", CREATE, (req) => {
      call++;
      if (call === 2) return odataError(400, "0x80040237", "Duplicate record");
      return jsonResponse({ Ids: targetsOf(req).map((_, i) => guid(call * 10 + i)) });
    });

    const result = await createMultiple(
      client,
      ACCOUNT,
      [1, 2, 3, 4, 5].map((n) => ({ name: String(n) })),
      { batchSize: 2 }
    );

    expect(fake.requests).toHaveLength(2);
    expect(result.results.map((r) => r.status)).toEqual([
      "succeeded",
      "succeeded",
      "failed",
      "failed",
      "skipped",
    ]);
    expect(result).toMatchObject({ success: false, succeeded: 2, failed: 2, skipped: 1 });
    expect(result.stoppedEarly).toBe(true);
    const err = result.results[2].error;
    expect(err).toBeInstanceOf(DataverseODataError);
    expect(err).toMatchObject({ status: 400, code: "0x80040237" });
    expect(result.results[3].error).toBe(err);
  });

  it("continueOnError sends every chunk", async () => {
    const { client, fake } = createTestClient();
    let call = 0;
    fake.on("POST", CREATE, (req) => {
      call++;
      if (call === 1) return odataError(400, "0x80040237", "Duplicate record");
      return jsonResponse({ Ids: targetsOf(req).map((_, i) => guid(call * 10 + i)) });
    });
    const result = await createMultiple(
      client,
      ACCOUNT,
      [1, 2, 3].map((n) => ({ name: String(n) })),
      { batchSize: 1, continueOnError: true }
    );
    expect(fake.requests).toHaveLength(3);
    expect(result.results.map((r) => r.status)).toEqual(["failed", "succeeded", "succeeded"]);
    expect(result.stoppedEarly).toBe(false);
  });

  it("an elastic table's error details fail only the records they name", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/contoso_sensordatas/Microsoft.Dynamics.CRM.CreateMultiple", () =>
      jsonResponse(
        {
          error: {
            code: "0x80040265",
            message: "One or more records failed.",
            "@Microsoft.PowerApps.CDS.ErrorDetails.BulkApiErrorDetails": JSON.stringify([
              { RequestIndex: 1, Id: guid(2), StatusCode: 409 },
            ]),
          },
        },
        { status: 400 }
      )
    );
    const table: BulkTable = {
      logicalName: "contoso_sensordata",
      entitySetName: "contoso_sensordatas",
    };
    const records = [1, 2, 3].map((n) => ({ contoso_sensordataid: guid(n), partitionid: "p1" }));

    const result = await createMultiple(client, table, records);

    expect(result.results.map((r) => [r.status, r.id])).toEqual([
      ["succeeded", guid(1)],
      ["failed", guid(2)],
      ["succeeded", guid(3)],
    ]);
    const err = result.results[1].error;
    expect(err).toBeInstanceOf(DataverseODataError);
    expect(err).toMatchObject({ status: 409, code: "0x80040265" });
    expect(err?.cause).toBeInstanceOf(DataverseODataError);
    expect(err?.message).toContain("One or more records failed.");
  });
});

describe("updateMultiple() with UpdateMultiple (#310)", () => {
  it("sends the records with @odata.type and reports each record's primary key as its id", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", UPDATE, () => noContent());
    const records = [1, 2, 3].map((n) => ({ accountid: guid(n), creditlimit: 100 }));

    const result = await updateMultiple(client, ACCOUNT, records, { batchSize: 2 });

    expect(fake.requests).toHaveLength(2);
    expect(targetsOf(fake.requests[0])).toEqual([
      { "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: guid(1), creditlimit: 100 },
      { "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: guid(2), creditlimit: 100 },
    ]);
    expect(result.results.map((r) => [r.status, r.id])).toEqual(
      [1, 2, 3].map((n) => ["succeeded", guid(n)])
    );
  });

  it("uses table.primaryIdAttribute for the id", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/emails/Microsoft.Dynamics.CRM.UpdateMultiple", () => noContent());
    const result = await updateMultiple(
      client,
      { logicalName: "email", entitySetName: "emails", primaryIdAttribute: "activityid" },
      [{ activityid: guid(7), subject: "x" }]
    );
    expect(result.results[0]).toEqual({ index: 0, status: "succeeded", id: guid(7) });
  });
});

describe('strategy: "batch" (#310)', () => {
  it("creates one POST per record in a $batch with continue-on-error, ids from OData-EntityId", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/$batch", () =>
      batchResponse([
        {
          status: 204,
          headers: { "OData-EntityId": `${client.getBaseUrl()}/accounts(${guid(1)})` },
        },
        { status: 400, body: { error: { code: "0x80044331", message: "Bad value" } } },
        {
          status: 204,
          headers: { "OData-EntityId": `${client.getBaseUrl()}/accounts(${guid(3)})` },
        },
      ])
    );

    const result = await createMultiple(
      client,
      ACCOUNT,
      [{ name: "a" }, { name: "b" }, { name: "c" }],
      { strategy: "batch" }
    );

    const req = fake.last();
    expect(req.path).toBe("/$batch");
    expect(req.headers.prefer).toContain("odata.continue-on-error");
    const body = req.bodyText ?? "";
    expect(
      body.match(
        /POST https:\/\/contoso\.crm\.dynamics\.com\/api\/data\/v9\.2\/accounts HTTP\/1\.1/g
      )
    ).toHaveLength(3);
    expect(result).toMatchObject({ strategy: "batch", requests: 1, succeeded: 2, failed: 1 });
    expect(result.results.map((r) => [r.status, r.id])).toEqual([
      ["succeeded", guid(1)],
      ["failed", undefined],
      ["succeeded", guid(3)],
    ]);
    expect(result.results[1].error).toMatchObject({ status: 400, code: "0x80044331" });
  });

  it("updates with PATCH <set>(<id>) and If-Match: *, the primary key left out of the body", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/$batch", () => batchResponse([{ status: 204 }, { status: 204 }]));

    const result = await updateMultiple(
      client,
      ACCOUNT,
      [
        { accountid: guid(1), name: "x" },
        { accountid: guid(2), name: "y" },
      ],
      { strategy: "batch" }
    );

    const body = fake.last().bodyText ?? "";
    expect(body).toContain(
      `PATCH https://contoso.crm.dynamics.com/api/data/v9.2/accounts(${guid(1)}) HTTP/1.1`
    );
    expect(body).toContain(`accounts(${guid(2)})`);
    expect(body.match(/if-match: \*/gi)).toHaveLength(2);
    expect(body).not.toContain('"accountid"');
    expect(body).toContain('{"name":"x"}');
    expect(result.results.map((r) => [r.status, r.id])).toEqual([
      ["succeeded", guid(1)],
      ["succeeded", guid(2)],
    ]);
  });

  it("splits into one $batch per chunk", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/$batch", (req) => {
      const count = (req.bodyText ?? "").match(/^POST /gm)?.length ?? 0;
      return batchResponse(Array.from({ length: count }, () => ({ status: 204 })));
    });
    const result = await createMultiple(
      client,
      ACCOUNT,
      [1, 2, 3].map((n) => ({ name: String(n) })),
      { strategy: "batch", batchSize: 2 }
    );
    expect(fake.requests).toHaveLength(2);
    expect(result).toMatchObject({ requests: 2, succeeded: 3 });
  });

  it("an update without a GUID primary key is rejected before anything is sent", async () => {
    const { client, fake } = createTestClient();
    const err = await rejection(
      updateMultiple(client, ACCOUNT, [{ accountid: guid(1) }, { name: "no id" }], {
        strategy: "batch",
      })
    );
    expect(err).toBeInstanceOf(DataverseInvalidRequestError);
    expect((err as Error).message).toContain("record 1");
    expect(fake.requests).toHaveLength(0);
  });
});

describe("validation (#310)", () => {
  it.each([
    [{ batchSize: 0 }, "batchSize"],
    [{ batchSize: 1001 }, "batchSize"],
    [{ batchSize: 1.5 }, "batchSize"],
    [{ maxParallel: 0 }, "maxParallel"],
    [{ strategy: "fast" as "bulk" }, "strategy"],
  ])("rejects %o", async (options, what) => {
    const { client, fake } = createTestClient();
    const err = await rejection(createMultiple(client, ACCOUNT, [{ name: "a" }], options));
    expect(err).toBeInstanceOf(DataverseInvalidRequestError);
    expect((err as Error).message).toContain(what);
    expect(fake.requests).toHaveLength(0);
  });

  it("rejects a record that isn't an object, and table names that would change the URL", async () => {
    const { client } = createTestClient();
    await expect(createMultiple(client, ACCOUNT, [{}, null as unknown as object])).rejects.toThrow(
      /record 1 is not an object/
    );
    await expect(
      createMultiple(client, { logicalName: "account", entitySetName: "accounts?x=1" }, [{}])
    ).rejects.toBeInstanceOf(DataverseInvalidRequestError);
    await expect(
      createMultiple(client, { logicalName: "a b", entitySetName: "accounts" }, [{}])
    ).rejects.toBeInstanceOf(DataverseInvalidRequestError);
  });
});

describe("parallelism and cancellation (#310)", () => {
  it("maxParallel sends that many chunks at once", async () => {
    let inFlight = 0;
    let peak = 0;
    const { fake: inner } = createTestClient();
    createIds(inner);
    const { client } = createTestClient({
      fetchProvider: {
        async fetch(input, init) {
          inFlight++;
          peak = Math.max(peak, inFlight);
          await new Promise((r) => setTimeout(r, 5));
          inFlight--;
          return inner.fetchProvider.fetch(input, init);
        },
      },
    });

    const result = await createMultiple(
      client,
      ACCOUNT,
      [1, 2, 3, 4, 5, 6].map((n) => ({ name: String(n) })),
      { batchSize: 1, maxParallel: 3 }
    );
    expect(result.succeeded).toBe(6);
    expect(peak).toBe(3);
    // Ids still land at their records' positions.
    expect(new Set(result.results.map((r) => r.id)).size).toBe(6);
  });

  it("an aborted signal rejects with DataverseAbortError and sends nothing", async () => {
    const { client, fake } = createTestClient();
    const controller = new AbortController();
    controller.abort();
    const err = await rejection(
      createMultiple(client, ACCOUNT, [{ name: "a" }], { signal: controller.signal })
    );
    expect(err).toBeInstanceOf(DataverseAbortError);
    expect(fake.requests).toHaveLength(0);
  });

  it("an abort after a chunk ran rejects with DataverseBulkOperationError holding the result", async () => {
    const controller = new AbortController();
    const { fake: inner } = createTestClient();
    createIds(inner);
    const wrapped: FetchProvider = {
      async fetch(input, init) {
        const res = await inner.fetchProvider.fetch(input, init);
        controller.abort(); // after the first chunk is answered
        return res;
      },
    };
    const { client } = createTestClient({ fetchProvider: wrapped });

    const err = await rejection(
      createMultiple(client, ACCOUNT, [{ name: "a" }, { name: "b" }, { name: "c" }], {
        batchSize: 1,
        signal: controller.signal,
      })
    );
    expect(err).toBeInstanceOf(DataverseBulkOperationError);
    const bulkErr = err as DataverseBulkOperationError;
    expect(bulkErr.cause).toBeInstanceOf(DataverseAbortError);
    expect(bulkErr.result.results.map((r) => r.status)).toEqual([
      "succeeded",
      "skipped",
      "skipped",
    ]);
    expect(bulkErr.result.results[0].id).toBe(guid(1));
    expect(bulkErr.result).toMatchObject({ requests: 1, stoppedEarly: true });
    expect(inner.requests).toHaveLength(1);
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
      updateMultiple(client, ACCOUNT, [{ accountid: guid(1) }], { timeoutMs: 20 })
    );
    expect(err).toBeInstanceOf(DataverseNetworkError);
    expect((err as DataverseNetworkError).name).toBe("RequestTimeout");
  });

  it("a $batch create answered without an id leaves the record's id absent", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/$batch", () => batchResponse([{ status: 204 }]));
    const result = await createMultiple(client, ACCOUNT, [{ name: "a" }], { strategy: "batch" });
    expect(result.results[0]).toEqual({ index: 0, status: "succeeded" });
  });
});
