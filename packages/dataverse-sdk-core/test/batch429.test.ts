/**
 * #211: a 429 with a `multipart/mixed` body means Dataverse processed the `$batch` (the body holds
 * per-request results), so a non-idempotent batch is not replayed: that would re-run the parts that
 * already ran. A 429 with the usual JSON error body is still retried.
 */
import { describe, expect, it } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";

const ORG = "https://contoso.crm.dynamics.com";
const BOUNDARY = "batchresponse_00000000-0000-0000-0000-000000000001";

/** A 429 `$batch` response: one create that ran, then one throttled request. */
const multipart429 = () =>
  new Response(
    [
      `--${BOUNDARY}`,
      "Content-Type: application/http",
      "",
      "HTTP/1.1 204 No Content",
      "OData-EntityId: https://contoso.crm.dynamics.com/api/data/v9.2/accounts(00000000-0000-0000-0000-000000000001)",
      "",
      "",
      `--${BOUNDARY}`,
      "Content-Type: application/http",
      "",
      "HTTP/1.1 429 Too Many Requests",
      "Retry-After: 0",
      "",
      "",
      `--${BOUNDARY}--`,
      "",
    ].join("\r\n"),
    {
      status: 429,
      headers: { "content-type": `multipart/mixed; boundary=${BOUNDARY}`, "retry-after": "0" },
    }
  );

const json429 = () =>
  new Response(JSON.stringify({ error: { code: "0x80072322", message: "Throttled" } }), {
    status: 429,
    headers: { "content-type": "application/json", "retry-after": "0" },
  });

const batchOk = () =>
  new Response(`--${BOUNDARY}--\r\n`, {
    headers: { "content-type": `multipart/mixed; boundary=${BOUNDARY}` },
  });

function setup(first: () => Response, retry = {}) {
  let calls = 0;
  const client = new DataverseClient({
    baseUrl: ORG,
    retry: { maxRetries: 2, baseDelayMs: 1, jitter: false, ...retry },
    fetchProvider: {
      fetch: () => {
        calls++;
        return Promise.resolve(calls === 1 ? first() : batchOk());
      },
    },
  });
  const sendBatch = (method: "POST" | "GET" = "POST") =>
    client.send({
      method,
      url: "$batch",
      headers: { "content-type": "multipart/mixed; boundary=batch_1" },
      body: "--batch_1--",
    });
  return { sendBatch, calls: () => calls };
}

describe("#211: a multipart 429 is not replayed", () => {
  it("a POST $batch answered with a multipart 429 is sent once and handed back", async () => {
    const { sendBatch, calls } = setup(multipart429);
    const res = await sendBatch();
    expect(calls()).toBe(1);
    expect(res.status).toBe(429);
    expect(await res.text()).toContain("HTTP/1.1 204 No Content"); // the caller sees what ran
  });

  it("a JSON 429 (rejected before any work) is still retried", async () => {
    const { sendBatch, calls } = setup(json429);
    const res = await sendBatch();
    expect(calls()).toBe(2);
    expect(res.status).toBe(200);
  });

  it("retryNonIdempotent and idempotent methods still retry a multipart 429", async () => {
    const opted = setup(multipart429, { retryNonIdempotent: true });
    expect((await opted.sendBatch()).status).toBe(200);
    expect(opted.calls()).toBe(2);

    const get = setup(multipart429);
    expect((await get.sendBatch("GET")).status).toBe(200);
    expect(get.calls()).toBe(2);
  });
});
