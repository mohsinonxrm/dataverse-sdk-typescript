import { describe, it, expect } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";
import type { FetchProvider, RequestInformation } from "../src/abstractions/http.js";

const BASE_URL = "https://org.crm.dynamics.com";
const API_URL = `${BASE_URL}/api/data/v9.2`;

interface Sent {
  body: unknown;
  headers: Headers;
  duplex: unknown;
}

function recording(status = 204): { provider: FetchProvider; calls: Sent[] } {
  const calls: Sent[] = [];
  return {
    calls,
    provider: {
      fetch: (_input, init) => {
        calls.push({
          body: init?.body,
          headers: new Headers(init?.headers),
          duplex: (init as { duplex?: unknown } | undefined)?.duplex,
        });
        return Promise.resolve(new Response(null, { status }));
      },
    },
  };
}

async function send(
  body: unknown,
  headers: Record<string, string> = {},
  status = 204
): Promise<Sent[]> {
  const rec = recording(status);
  const client = new DataverseClient({
    baseUrl: BASE_URL,
    fetchProvider: rec.provider,
    retry: { maxRetries: 2, baseDelayMs: 1, maxDelayMs: 2 },
  });
  const req: RequestInformation = { method: "POST", url: `${API_URL}/x`, headers, body };
  await client.send(req);
  return rec.calls;
}

describe("#7: request bodies reach fetch unchanged unless they are plain objects", () => {
  it("serialises plain objects and arrays to JSON with a JSON content type", async () => {
    const [obj] = await send({ name: "Contoso" });
    expect(obj.body).toBe('{"name":"Contoso"}');
    expect(obj.headers.get("content-type")).toBe("application/json; charset=utf-8");
    const [arr] = await send([1, 2]);
    expect(arr.body).toBe("[1,2]");
  });

  it("sends a string byte for byte (no JSON quoting) with a JSON default content type", async () => {
    const raw = '{"b":2,"a":1}';
    const [s] = await send(raw);
    expect(s.body).toBe(raw);
    expect(s.headers.get("content-type")).toBe("application/json; charset=utf-8");
  });

  it("sends a multipart $batch string with the caller's content type", async () => {
    const batch =
      "--batch_x\r\nContent-Type: application/http\r\n\r\nGET WhoAmI HTTP/1.1\r\n\r\n--batch_x--\r\n";
    const [s] = await send(batch, { "Content-Type": "multipart/mixed; boundary=batch_x" });
    expect(s.body).toBe(batch);
    expect(s.headers.get("content-type")).toBe("multipart/mixed; boundary=batch_x");
  });

  it("passes Uint8Array, ArrayBuffer and Blob bodies through without a JSON content type", async () => {
    const bytes = new Uint8Array([0, 1, 2, 255]);
    const [u8] = await send(bytes, { "content-type": "application/octet-stream" });
    expect(u8.body).toBe(bytes);
    expect(u8.headers.get("content-type")).toBe("application/octet-stream");

    const buf = new ArrayBuffer(3);
    const [ab] = await send(buf);
    expect(ab.body).toBe(buf);
    expect(ab.headers.get("content-type")).toBeNull();

    const blob = new Blob(["abc"], { type: "text/plain" });
    const [b] = await send(blob);
    expect(b.body).toBe(blob);
    expect(b.headers.get("content-type")).toBeNull();
  });

  it("sends only the bytes of a typed-array view, not its whole buffer", async () => {
    const whole = new Uint16Array([1, 2, 3, 4]);
    const view = new DataView(whole.buffer, 2, 4);
    const [s] = await send(view);
    const sent = s.body as Uint8Array;
    expect(sent.byteLength).toBe(4);
    expect(Array.from(sent)).toEqual(Array.from(new Uint8Array(whole.buffer, 2, 4)));
  });

  it("passes FormData and URLSearchParams through so fetch sets their content type", async () => {
    const form = new FormData();
    form.set("a", "1");
    const [f] = await send(form);
    expect(f.body).toBe(form);
    expect(f.headers.get("content-type")).toBeNull();

    const params = new URLSearchParams({ a: "1" });
    const [p] = await send(params);
    expect(p.body).toBe(params);
  });

  it("sends stream bodies half-duplex and never retries them", async () => {
    const stream = new ReadableStream<Uint8Array>({
      start(c) {
        c.enqueue(new Uint8Array([1]));
        c.close();
      },
    });
    const calls = await send(stream, { "content-type": "application/octet-stream" }, 503);
    expect(calls).toHaveLength(1);
    expect(calls[0].body).toBe(stream);
    expect(calls[0].duplex).toBe("half");
  });

  it("still retries replayable bodies", async () => {
    const calls = await send("{}", {}, 503);
    expect(calls).toHaveLength(3);
  });

  it("sends no body and no content type when there is no body", async () => {
    const rec = recording();
    const client = new DataverseClient({ baseUrl: BASE_URL, fetchProvider: rec.provider });
    await client.send({ method: "DELETE", url: `${API_URL}/accounts(1)`, headers: {} });
    expect(rec.calls[0].body).toBeUndefined();
    expect(rec.calls[0].headers.get("content-type")).toBeNull();
  });
});
