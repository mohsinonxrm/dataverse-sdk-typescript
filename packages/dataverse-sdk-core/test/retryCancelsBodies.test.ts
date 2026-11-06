/**
 * #45: a response the retry middleware throws away has its body cancelled, so the connection is
 * released instead of waiting for garbage collection. The response handed back is left unread.
 */
import { describe, expect, it } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";

const ORG = "https://contoso.crm.dynamics.com";

/** A response whose body is a stream that records whether it was cancelled. */
function streamed(status: number, text: string, log: string[], label: string, headers = {}) {
  const body = new ReadableStream<Uint8Array>({
    pull(controller) {
      controller.enqueue(new TextEncoder().encode(text));
      controller.close();
    },
    cancel() {
      log.push(label);
    },
  });
  return new Response(body, {
    status,
    headers: { "content-type": "application/json", ...headers },
  });
}

function client(responses: Response[]) {
  let i = 0;
  return new DataverseClient({
    baseUrl: ORG,
    retry: { maxRetries: 3, baseDelayMs: 1, jitter: false },
    fetchProvider: {
      fetch: () => {
        const res = responses.at(i++);
        return res ? Promise.resolve(res) : Promise.reject(new Error("no more responses"));
      },
    },
  });
}

const tick = () => new Promise((r) => setTimeout(r, 5));

describe("#45: retried responses are cancelled", () => {
  it("cancels the body of every discarded attempt and leaves the returned one unread", async () => {
    const cancelled: string[] = [];
    const responses = [
      streamed(503, "{}", cancelled, "503#1"),
      streamed(429, "{}", cancelled, "429#2", { "retry-after": "0" }),
      streamed(502, "{}", cancelled, "502#3"),
      streamed(200, '{"ok":true}', cancelled, "200#4"),
    ];
    const res = await client(responses).api("WhoAmI").response();
    await tick();

    expect(cancelled).toEqual(["503#1", "429#2", "502#3"]);
    expect(res.status).toBe(200);
    expect(res.bodyUsed).toBe(false);
    expect(await res.json()).toEqual({ ok: true });
  });

  it("doesn't cancel the last response when retries run out", async () => {
    const cancelled: string[] = [];
    const responses = [0, 1, 2, 3].map((n) =>
      streamed(503, '{"error":{"message":"busy"}}', cancelled, `503#${String(n + 1)}`)
    );
    const err = await client(responses)
      .api("WhoAmI")
      .get()
      .catch((e: unknown) => e);
    await tick();

    expect(cancelled).toEqual(["503#1", "503#2", "503#3"]);
    expect(err).toMatchObject({ status: 503, message: "busy" }); // the last body was still readable
  });

  it("a body that can't be cancelled doesn't fail the retry", async () => {
    const locked = new Response("{}", { status: 503 });
    // A locked stream rejects cancel(); the retry must go on regardless.
    locked.body?.getReader();
    const ok = new Response("{}", { status: 200, headers: { "content-type": "application/json" } });
    const res = await client([locked, ok]).api("WhoAmI").response();
    expect(res.status).toBe(200);
  });
});
