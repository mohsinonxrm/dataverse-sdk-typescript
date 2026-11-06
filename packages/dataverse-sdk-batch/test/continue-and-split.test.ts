/**
 * #57: continueOnError returns instead of throwing, errors carry the whole result, and batches
 * over `batchSize` are split. A real DataverseClient and a fake fetch that answers `$batch` the
 * way Dataverse does (in order; stops after the first failure unless continue-on-error is set;
 * a failed changeset answers only with the failing request).
 */
import { describe, it, expect } from "vitest";
import {
  batchResponse,
  createTestClient,
  odataError,
  type BatchResponseChangeset,
  type BatchResponsePart as FakePart,
  type RecordedRequest,
} from "@mohsinonxrm/dataverse-sdk-testing";
import { DataverseODataError, DataverseThrottleError } from "@mohsinonxrm/dataverse-sdk-core";
import { BatchRequestBuilder, DataverseBatchError } from "../src/index.js";
import { extractBoundary, splitMultipart } from "../src/decoding.js";
import * as recorded from "./fixtures/recorded.js";

const MISSING = "00000000-0000-0000-0000-000000000001";

/** Answers a request part: 404 for URLs containing "missing", 429 for "throttle", else 200/204. */
function answer(requestLine: string, contentId?: string): FakePart {
  const [method = "", url = ""] = requestLine.split(" ");
  const base = contentId ? { contentId } : {};
  if (url.includes("missing")) {
    return {
      ...base,
      status: 404,
      body: { error: { code: "0x80040217", message: "Does Not Exist" } },
    };
  }
  if (url.includes("throttle")) {
    return {
      ...base,
      status: 429,
      headers: { "Retry-After": "3" },
      body: { error: { code: "0x80072322", message: "Number of requests exceeded the limit" } },
    };
  }
  return method === "GET" ? { ...base, status: 200, body: { url } } : { ...base, status: 204 };
}

/** A small Dataverse `$batch` simulator. */
function simulate(req: RecordedRequest): Response {
  const boundary = extractBoundary(req.headers["content-type"] ?? "") ?? "";
  const continueOnError = (req.headers.prefer ?? "").includes("odata.continue-on-error");
  const items: Array<FakePart | BatchResponseChangeset> = [];
  let failedStatus = 0;
  for (const part of splitMultipart(req.bodyText ?? "", boundary)) {
    const cs = /^Content-Type: multipart\/mixed; boundary=(\S+)/.exec(part)?.[1];
    if (cs) {
      const answers = splitMultipart(part, cs).map((p) =>
        answer(
          /^(?:GET|POST|PATCH|DELETE) \S+/m.exec(p)?.[0] ?? "",
          /^Content-ID: (\S+)/m.exec(p)?.[1]
        )
      );
      const failed = answers.find((a) => a.status >= 400);
      items.push({ changeset: failed ? [failed] : answers });
      if (failed) failedStatus ||= failed.status;
      if (failed && !continueOnError) break;
    } else {
      const a = answer(/^(?:GET|POST|PATCH|DELETE) \S+/m.exec(part)?.[0] ?? "");
      items.push(a);
      if (a.status >= 400) failedStatus ||= a.status;
      if (a.status >= 400 && !continueOnError) break;
    }
  }
  const res = batchResponse(items);
  // Dataverse answers with the first failure's status unless continue-on-error is set.
  return failedStatus && !continueOnError
    ? new Response(res.body, { status: failedStatus, headers: res.headers })
    : res;
}

function setup() {
  const { client, fake } = createTestClient();
  fake.on("POST", "/$batch", simulate);
  return { client, fake, builder: new BatchRequestBuilder(client) };
}

const partsSent = (req: RecordedRequest) =>
  (req.bodyText ?? "").split("\r\n").filter((l) => l.endsWith(" HTTP/1.1")).length;

describe("continueOnError (#57)", () => {
  it("returns the result instead of throwing when a request fails", async () => {
    const { client, fake } = createTestClient();
    fake.on(
      "POST",
      "/$batch",
      () =>
        new Response(recorded.continueOnError.body, {
          status: recorded.continueOnError.status,
          headers: { "content-type": recorded.continueOnError.contentType },
        })
    );
    const b = new BatchRequestBuilder(client);
    b.addRequest("del", "DELETE", `accounts(${MISSING})`);
    b.addRequest("who", "GET", "WhoAmI");
    const result = await b.execute({ continueOnError: true });
    expect(result.success).toBe(false);
    expect(result.results.map((r) => [r.id, r.status])).toEqual([
      ["del", 404],
      ["who", 200],
    ]);
    expect(result.successfulRequests).toBe(1);
    expect(result.failedRequests).toBe(1);
    expect(result.stoppedEarly).toBe(false);
    const err = result.errors.get("del");
    expect(err).toBeInstanceOf(DataverseODataError);
    expect(err).toMatchObject({ status: 404, code: "0x80040217" });
    expect(err?.message).toBe(
      "Entity 'Account' With Id = 00000000-0000-0000-0000-000000000001 Does Not Exist"
    );
  });

  it("returns a failed changeset's result, with its other requests skipped", async () => {
    const { builder } = setup();
    builder.beginChangeset();
    builder.addRequest("a", "POST", "accounts", undefined, { name: "A" });
    builder.addRequest("b", "PATCH", "accounts(missing)", undefined, { name: "B" });
    builder.endChangeset();
    builder.addRequest("who", "GET", "WhoAmI");
    const result = await builder.execute({ continueOnError: true });
    expect(result.results.map((r) => [r.id, r.status])).toEqual([
      ["b", 404],
      ["who", 200],
    ]);
    expect(result.skippedRequestIds).toEqual(["a"]);
    expect(result.success).toBe(false);
  });

  it("types a throttled part as DataverseThrottleError", async () => {
    const { builder } = setup();
    builder.addRequest("t", "GET", "throttle");
    const result = await builder.execute({ continueOnError: true });
    const err = result.errors.get("t");
    expect(err).toBeInstanceOf(DataverseThrottleError);
    expect((err as DataverseThrottleError).retryAfterMs).toBe(3000);
  });
});

describe("without continueOnError (#57)", () => {
  it("throws DataverseBatchError carrying the whole result, and reports the early stop", async () => {
    const { client, fake } = createTestClient();
    fake.on(
      "POST",
      "/$batch",
      () =>
        new Response(recorded.stoppedEarly.body, {
          status: recorded.stoppedEarly.status,
          headers: { "content-type": recorded.stoppedEarly.contentType },
        })
    );
    const b = new BatchRequestBuilder(client);
    b.addRequest("who", "GET", "WhoAmI");
    b.addRequest("del", "DELETE", `accounts(${MISSING})`);
    b.addRequest("never", "GET", "WhoAmI");
    const err = (await b.execute().catch((e: unknown) => e)) as DataverseBatchError;
    expect(err).toBeInstanceOf(DataverseBatchError);
    expect(err.result?.results.map((r) => [r.id, r.status])).toEqual([
      ["who", 200],
      ["del", 404],
    ]);
    expect(err.result?.responses.get("who")?.body.UserId).toBeDefined();
    expect(err.result?.skippedRequestIds).toEqual(["never"]);
    expect(err.result?.stoppedEarly).toBe(true);
    expect(err.result?.errors.get("del")).toBeInstanceOf(DataverseODataError);
    // requestErrors still holds only the failures.
    expect(err.getFailedRequestIds()).toEqual(["del"]);
  });

  it("returns normally when every request succeeds", async () => {
    const { builder } = setup();
    builder.addRequest("a", "GET", "accounts");
    const result = await builder.execute();
    expect(result.success).toBe(true);
  });
});

describe("auto-split (#57)", () => {
  it("sends 2,500 requests as 3 batches of 1000, 1000 and 500, and returns every result in order", async () => {
    const { builder, fake } = setup();
    for (let i = 0; i < 2500; i++)
      builder.addRequest(`r${String(i)}`, "GET", `accounts?n=${String(i)}`);
    const result = await builder.execute();
    expect(fake.requests.map(partsSent)).toEqual([1000, 1000, 500]);
    expect(result.totalRequests).toBe(2500);
    expect(result.results).toHaveLength(2500);
    expect(result.results.map((r) => r.id)).toEqual(
      Array.from({ length: 2500 }, (_, i) => `r${String(i)}`)
    );
    expect(result.responses.get("r2499")?.body.url).toMatch(/accounts\?n=2499$/);
    expect(result.success).toBe(true);
    // Each batch has its own boundary.
    const boundaries = fake.requests.map((r) => r.headers["content-type"]);
    expect(new Set(boundaries).size).toBe(3);
  });

  it("keeps a changeset whole", async () => {
    const { builder, fake } = setup();
    builder.addRequest("g1", "GET", "accounts");
    builder.beginChangeset();
    for (const id of ["c1", "c2", "c3"]) builder.addRequest(id, "POST", "accounts", undefined, {});
    builder.endChangeset();
    builder.addRequest("g2", "GET", "contacts");
    builder.addRequest("g3", "GET", "leads");
    const result = await builder.execute({ batchSize: 2 });
    expect(fake.requests.map(partsSent)).toEqual([1, 3, 2]);
    expect(result.results.map((r) => r.id)).toEqual(["g1", "c1", "c2", "c3", "g2", "g3"]);
  });

  it("without continueOnError, stops after the first batch with a failure", async () => {
    const { builder, fake } = setup();
    builder.addRequest("a", "GET", "accounts");
    builder.addRequest("b", "GET", "missing");
    builder.addRequest("c", "GET", "accounts");
    builder.addRequest("d", "GET", "accounts");
    const err = (await builder
      .execute({ batchSize: 2 })
      .catch((e: unknown) => e)) as DataverseBatchError;
    expect(err).toBeInstanceOf(DataverseBatchError);
    expect(fake.requests).toHaveLength(1);
    expect(err.result?.skippedRequestIds).toEqual(["c", "d"]);
    expect(err.result?.stoppedEarly).toBe(true);
    expect(err.result?.totalRequests).toBe(4);
  });

  it("with continueOnError, sends every batch", async () => {
    const { builder, fake } = setup();
    builder.addRequest("a", "GET", "missing");
    builder.addRequest("b", "GET", "accounts");
    builder.addRequest("c", "GET", "accounts");
    const result = await builder.execute({ batchSize: 1, continueOnError: true });
    expect(fake.requests).toHaveLength(3);
    expect(result.results.map((r) => [r.id, r.status])).toEqual([
      ["a", 404],
      ["b", 200],
      ["c", 200],
    ]);
    expect(result.stoppedEarly).toBe(false);
  });

  it("a later batch that fails as a whole throws DataverseBatchError with the earlier results", async () => {
    const { client, fake } = createTestClient();
    let calls = 0;
    fake.on("POST", "/$batch", (req) =>
      ++calls === 2 ? odataError(400, "0x80060888", "Malformed batch") : simulate(req)
    );
    const b = new BatchRequestBuilder(client);
    for (const id of ["a", "b", "c"]) b.addRequest(id, "GET", "accounts");
    const err = (await b.execute({ batchSize: 1 }).catch((e: unknown) => e)) as DataverseBatchError;
    expect(err).toBeInstanceOf(DataverseBatchError);
    expect(err.message).toContain("Batch 2 of 3 failed as a whole after 1 ran: Malformed batch");
    expect(err.cause).toBeInstanceOf(DataverseODataError);
    expect(err.result?.results.map((r) => r.id)).toEqual(["a"]);
    expect(err.result?.skippedRequestIds).toEqual(["b", "c"]);
    expect(fake.requests).toHaveLength(2);
  });

  it("the first batch failing as a whole throws its typed error", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/$batch", () => odataError(400, "0x80060888", "Malformed batch"));
    const b = new BatchRequestBuilder(client);
    b.addRequest("a", "GET", "accounts");
    b.addRequest("b", "GET", "accounts");
    await expect(b.execute({ batchSize: 1 })).rejects.toBeInstanceOf(DataverseODataError);
  });

  it("rejects a changeset over 1000 requests, and an invalid batchSize", async () => {
    const { builder } = setup();
    builder.beginChangeset();
    for (let i = 0; i < 1001; i++)
      builder.addRequest(`c${String(i)}`, "POST", "accounts", undefined, {});
    builder.endChangeset();
    await expect(builder.execute()).rejects.toThrow("a changeset can't be split");

    const small = setup().builder.addRequest("a", "GET", "accounts");
    for (const batchSize of [0, 1001, 1.5]) {
      await expect(small.execute({ batchSize })).rejects.toThrow(
        "batchSize must be an integer from 1 to 1000"
      );
    }
  });
});
