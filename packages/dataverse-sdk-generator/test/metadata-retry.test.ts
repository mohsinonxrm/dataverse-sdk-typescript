/**
 * dataverse-gen's metadata requests retry what an org answers while it is busy: a live run got a
 * 400 for $metadata while other work changed the schema. A query Dataverse refuses (400 from
 * RetrieveMetadataChanges) is not retried, and the final error carries the response body.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { MetadataService } from "../src/metadata-service.js";

const config = { environmentUrl: "https://contoso.crm.dynamics.com" };

function service(responses: Array<() => Response | Promise<never>>) {
  const fetchMock = vi.fn(() => {
    const next = responses.shift();
    if (!next) throw new Error("no more responses");
    return Promise.resolve(next());
  });
  vi.stubGlobal("fetch", fetchMock);
  const svc = new MetadataService(config, "token");
  const waits: number[] = [];
  svc.sleep = (ms) => {
    waits.push(ms);
    return Promise.resolve();
  };
  return { svc, fetchMock, waits };
}

const xml = () => new Response("<edmx:Edmx/>", { status: 200 });
const status =
  (code: number, body = "", headers: Record<string, string> = {}) =>
  () =>
    new Response(body, { status: code, headers });

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("MetadataService retries", () => {
  it("retries $metadata after a 400, a 503 and a 429 (honouring Retry-After)", async () => {
    const { svc, fetchMock, waits } = service([
      status(400),
      status(503),
      status(429, "", { "retry-after": "1" }),
      xml,
    ]);
    await expect(svc.getEdmxMetadata()).resolves.toBe("<edmx:Edmx/>");
    expect(fetchMock).toHaveBeenCalledTimes(4);
    expect(waits).toEqual([2_000, 4_000, 1_000]);
  });

  it("retries $metadata after a dropped connection", async () => {
    const { svc, fetchMock } = service([() => Promise.reject(new TypeError("fetch failed")), xml]);
    await expect(svc.getEdmxMetadata()).resolves.toBe("<edmx:Edmx/>");
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("gives up after five tries with the status and the body", async () => {
    const { svc, fetchMock } = service(
      Array.from({ length: 5 }, () => status(400, '{"error":{"message":"busy"}}'))
    );
    await expect(svc.getEdmxMetadata()).rejects.toThrow(/400[\s\S]*busy/);
    expect(fetchMock).toHaveBeenCalledTimes(5);
  });

  it("doesn't retry a RetrieveMetadataChanges query Dataverse refuses (400)", async () => {
    const { svc, fetchMock } = service([status(400, "bad query")]);
    await expect(svc.getEntityMetadata("account")).rejects.toThrow(/400[\s\S]*bad query/);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("retries RetrieveMetadataChanges after a 503", async () => {
    const { svc, fetchMock } = service([
      status(503),
      () => new Response(JSON.stringify({ EntityMetadata: [] }), { status: 200 }),
    ]);
    await expect(svc.getEntityMetadata("account")).resolves.toEqual({ EntityMetadata: [] });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
