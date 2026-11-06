import { describe, expect, it } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";
import {
  DataverseAbortError,
  DataverseAuthenticationError,
  DataverseError,
  DataverseInvalidRequestError,
  DataverseNetworkError,
  DataverseODataError,
  DataverseServiceError,
  DataverseThrottleError,
} from "../src/index.js";
import type { DataverseClientOptions } from "../src/abstractions/options.js";
import type { FetchProvider } from "../src/abstractions/http.js";

const BASE_URL = "https://contoso.crm.dynamics.com";

type Step = Response | Error | "hang";

function setup(steps: Step[], options: Partial<DataverseClientOptions> = {}) {
  const sent: Array<Record<string, string>> = [];
  const fetchProvider: FetchProvider = {
    fetch: (_input, init) => {
      const h: Record<string, string> = {};
      new Headers(init?.headers).forEach((v, k) => (h[k] = v));
      sent.push(h);
      const step = steps[Math.min(sent.length - 1, steps.length - 1)];
      if (init?.signal?.aborted) return Promise.reject(new DOMException("Aborted", "AbortError"));
      if (step === "hang") {
        return new Promise((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () => {
            reject(new DOMException("The operation was aborted.", "AbortError"));
          });
        });
      }
      if (step instanceof Error) return Promise.reject(step);
      return Promise.resolve(step.clone());
    },
  };
  const client = new DataverseClient({
    baseUrl: BASE_URL,
    fetchProvider,
    tokenProvider: { getToken: () => Promise.resolve("t") },
    retry: { maxRetries: 0 },
    ...options,
  });
  return { client, sent };
}

const odata = (status: number, body: unknown, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...headers },
  });

const caught = (p: Promise<unknown>) =>
  p.then(
    () => undefined,
    (e: unknown) => e
  );

describe("#19: every SDK error is a DataverseError", () => {
  it("HTTP, throttle, auth, invalid-request, network and abort errors", async () => {
    const notFound = await caught(
      setup([odata(404, { error: { code: "0x80040217", message: "Not found" } })])
        .client.api("accounts(00000000-0000-0000-0000-000000000001)")
        .get()
    );
    const throttled = await caught(
      setup([
        odata(
          429,
          { error: { code: "0x80072322", message: "Slow down" } },
          { "retry-after": "600" }
        ),
      ])
        .client.api("accounts")
        .get()
    );
    const refused = await caught(setup([]).client.api("https://evil.example.com/x").get());
    const network = await caught(
      setup([new TypeError("Failed to fetch")])
        .client.api("WhoAmI")
        .get()
    );
    const controller = new AbortController();
    const pending = caught(setup(["hang"]).client.api("WhoAmI").get({ signal: controller.signal }));
    controller.abort();
    const aborted = await pending;

    expect(notFound).toBeInstanceOf(DataverseODataError);
    expect(throttled).toBeInstanceOf(DataverseThrottleError);
    expect(refused).toBeInstanceOf(DataverseInvalidRequestError);
    expect(network).toBeInstanceOf(DataverseNetworkError);
    expect(aborted).toBeInstanceOf(DataverseAbortError);
    for (const e of [notFound, throttled, refused, network, aborted]) {
      expect(e).toBeInstanceOf(DataverseError);
    }
    expect(DataverseAuthenticationError.unauthorized()).toBeInstanceOf(DataverseError);
    expect(DataverseServiceError.notFound()).toBeInstanceOf(DataverseError);
  });
});

describe("#19: HTTP errors keep the response details", () => {
  it("status, code, headers, body, innerError, requestId and correlationId", async () => {
    const { client, sent } = setup([
      odata(
        400,
        {
          error: {
            code: "0x80041103",
            message: "Bad property",
            innererror: { message: "inner", type: "System.Exception", stacktrace: "at X" },
          },
        },
        { "x-ms-service-request-id": "svc-1", REQ_ID: "req-2", "x-ms-request-id": "old-3" }
      ),
    ]);
    const err = (await caught(client.api("accounts").select("nope").get())) as DataverseODataError;
    expect(err).toMatchObject({
      status: 400,
      code: "0x80041103",
      message: "Bad property",
      requestId: "svc-1",
      innerError: { message: "inner", type: "System.Exception", stacktrace: "at X" },
    });
    expect(err.headers?.["x-ms-service-request-id"]).toBe("svc-1");
    expect(err.headers?.["content-type"]).toBe("application/json");
    expect(err.body).toMatchObject({ error: { code: "0x80041103" } });
    expect(err.correlationId).toBe(sent[0]?.["x-ms-correlation-id"]);
    expect(err.correlationId).toMatch(/^[0-9a-f-]{36}$/);
  });

  it("falls back to REQ_ID, and keeps a non-JSON body as text", async () => {
    const err = (await caught(
      setup([
        new Response("<html>Bad gateway</html>", { status: 502, headers: { REQ_ID: "req-9" } }),
      ])
        .client.api("WhoAmI")
        .get()
    )) as DataverseODataError;
    expect(err.requestId).toBe("req-9");
    expect(err.body).toBe("<html>Bad gateway</html>");
    expect(err.message).toBe("HTTP 502");
  });
});

describe("#19: network failures and aborts are typed", () => {
  it("a CORS / network failure is a DataverseNetworkError with cause and correlationId", async () => {
    const { client, sent } = setup([new TypeError("Failed to fetch")]);
    const err = (await caught(client.api("WhoAmI").get())) as DataverseNetworkError;
    expect(err.name).toBe("ConnectionFailed");
    expect(err.cause).toBeInstanceOf(TypeError);
    expect(err.correlationId).toBe(sent[0]?.["x-ms-correlation-id"]);
  });

  it("an abort is a DataverseAbortError named AbortError, with the DOMException as cause", async () => {
    const controller = new AbortController();
    const { client } = setup(["hang"]);
    const pending = caught(client.api("WhoAmI").get({ signal: controller.signal }));
    controller.abort();
    const err = (await pending) as DataverseAbortError;
    expect(err).toBeInstanceOf(DataverseAbortError);
    expect(err.name).toBe("AbortError");
    expect(err.cause).toBeInstanceOf(DOMException);
    expect(err.correlationId).toBeDefined();
  });

  it("an abort during a retry wait is a DataverseAbortError too", async () => {
    const controller = new AbortController();
    const { client } = setup([odata(503, {}), odata(200, {})], {
      retry: { maxRetries: 3, baseDelayMs: 10_000, maxDelayMs: 10_000, jitter: false },
    });
    const pending = caught(client.api("WhoAmI").get({ signal: controller.signal }));
    await new Promise((r) => setTimeout(r, 20));
    controller.abort();
    expect(await pending).toBeInstanceOf(DataverseAbortError);
  });

  it("a timeout stays a DataverseNetworkError named RequestTimeout", async () => {
    const err = await caught(setup(["hang"]).client.api("WhoAmI").get({ timeoutMs: 5 }));
    expect(err).toBeInstanceOf(DataverseNetworkError);
    expect((err as Error).name).toBe("RequestTimeout");
  });
});
