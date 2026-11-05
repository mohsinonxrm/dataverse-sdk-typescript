import { describe, expect, it } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";
import {
  AuthMiddleware,
  ConcurrencyMiddleware,
  FetchRequestAdapter,
  LoggingMiddleware,
  ODataHeadersMiddleware,
  Pipeline,
  Prefer,
  RetryMiddleware,
  TelemetryMiddleware,
  buildDefaultMiddleware,
} from "../src/index.js";
import type { Middleware } from "../src/abstractions/middleware.js";
import type { DataverseClientOptions, PreferOption } from "../src/abstractions/options.js";
import type { FetchProvider, Logger } from "../src/abstractions/http.js";

const BASE_URL = "https://contoso.crm.dynamics.com";

function setup(options: Partial<DataverseClientOptions> = {}) {
  const sent: Array<Record<string, string>> = [];
  const fetchProvider: FetchProvider = {
    fetch: (_input, init) => {
      const h: Record<string, string> = {};
      new Headers(init?.headers).forEach((v, k) => (h[k] = v));
      sent.push(h);
      return Promise.resolve(
        new Response("{}", { status: 200, headers: { "content-type": "application/json" } })
      );
    },
  };
  const client = new DataverseClient({
    baseUrl: BASE_URL,
    fetchProvider,
    tokenProvider: { getToken: () => Promise.resolve("secret") },
    ...options,
  });
  return { client, sent };
}

/** A middleware that records the headers it sees and the order it ran in. */
function spy(name: string, order: string[], seen?: Array<Record<string, string>>): Middleware {
  return {
    name,
    execute: (request, ctx, next) => {
      order.push(name);
      seen?.push({ ...request.headers });
      return next(request, ctx);
    },
  };
}

describe("#18: middleware can be added, removed and reordered", () => {
  it("append runs last and sees the final headers, including authorization", async () => {
    const order: string[] = [];
    const seen: Array<Record<string, string>> = [];
    const { client, sent } = setup({
      middleware: { append: [spy("last", order, seen)], prepend: [spy("first", order)] },
    });
    await client.api("accounts").prefer(Prefer.returnRepresentation()).post({ name: "x" });
    expect(order).toEqual(["first", "last"]);
    expect(seen[0]?.authorization).toBe("Bearer secret");
    expect(seen[0]?.["content-type"]).toBe("application/json; charset=utf-8");
    expect(seen[0]?.["x-ms-correlation-id"]).toBeDefined();
    // What the appended middleware saw is what fetch received.
    expect(seen[0]).toEqual(sent[0]);
  });

  it("prepend runs before Auth, so it never sees the token", async () => {
    const seen: Array<Record<string, string>> = [];
    const { client } = setup({ middleware: { prepend: [spy("first", [], seen)] } });
    await client.api("WhoAmI").get();
    expect(seen[0]?.authorization).toBeUndefined();
  });

  it("replace can drop Logging", async () => {
    const lines: string[] = [];
    const logger: Logger = {
      debug: (m) => lines.push(m),
      info: () => undefined,
      warn: () => undefined,
      error: () => undefined,
    };
    const withLogging = setup({ logger });
    await withLogging.client.api("WhoAmI").get();
    expect(lines.length).toBeGreaterThan(0);

    lines.length = 0;
    const names: string[] = [];
    const without = setup({
      logger,
      middleware: {
        replace: (defaults) => {
          names.push(...defaults.map((m) => m.name));
          return defaults.filter((m) => !(m instanceof LoggingMiddleware));
        },
      },
    });
    await without.client.api("WhoAmI").get();
    expect(lines).toEqual([]);
    expect(names).toEqual([
      "ODataHeadersMiddleware",
      "ConcurrencyMiddleware",
      "RetryMiddleware",
      "AuthMiddleware",
      "TelemetryMiddleware",
      "LoggingMiddleware",
    ]);
  });

  it("the building blocks are exported", () => {
    for (const ctor of [
      Pipeline,
      FetchRequestAdapter,
      AuthMiddleware,
      ODataHeadersMiddleware,
      ConcurrencyMiddleware,
      RetryMiddleware,
      TelemetryMiddleware,
      LoggingMiddleware,
    ]) {
      expect(typeof ctor).toBe("function");
    }
    expect(buildDefaultMiddleware({ baseUrl: BASE_URL }).map((m) => m.name)).toEqual([
      "ODataHeadersMiddleware",
      "ConcurrencyMiddleware",
      "RetryMiddleware",
      "TelemetryMiddleware",
      "LoggingMiddleware",
    ]);
  });
});

describe("#18: defaultPrefer is applied", () => {
  const raw = (v: string) => v as PreferOption;

  it("alone", async () => {
    const { client, sent } = setup({ defaultPrefer: [Prefer.includeAnnotations("*")] });
    await client.api("accounts").post({ name: "x" });
    expect(sent[0]?.prefer).toBe('odata.include-annotations="*"');
  });

  it("with the request's own preferences, de-duplicated by name; the request wins", async () => {
    const { client, sent } = setup({
      defaultPrefer: [
        raw("odata.maxpagesize=500"),
        Prefer.includeAnnotations("*"),
        Prefer.returnRepresentation(),
      ],
    });
    await client
      .api("accounts")
      .preferRaw('odata.maxpagesize=10, odata.include-annotations="Microsoft.*,OData.*"')
      .get();
    expect(sent[0]?.prefer).toBe(
      'odata.maxpagesize=10, odata.include-annotations="Microsoft.*,OData.*", return=representation'
    );
  });
});
