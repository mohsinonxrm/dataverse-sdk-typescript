import { afterEach, describe, expect, it, vi } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";
import { ConsoleLogger } from "../src/index.js";
import type { DataverseClientOptions } from "../src/abstractions/options.js";
import type { FetchProvider, Logger } from "../src/abstractions/http.js";

const BASE_URL = "https://contoso.crm.dynamics.com";
const METHODS = ["debug", "info", "log", "warn", "error"] as const;

function spyConsole() {
  return METHODS.map((m) => vi.spyOn(console, m).mockImplementation(() => undefined));
}
const callCount = (spies: ReturnType<typeof spyConsole>) =>
  spies.reduce((n, s) => n + s.mock.calls.length, 0);

/** 503 once, then 200 (or 404 for a missing record). */
function client(options: Partial<DataverseClientOptions> = {}) {
  let calls = 0;
  const fetchProvider: FetchProvider = {
    fetch: (input) => {
      calls++;
      const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
      if (calls === 1) return Promise.resolve(new Response(null, { status: 503 }));
      return Promise.resolve(
        url.includes("missing")
          ? new Response(JSON.stringify({ error: { code: "0x80040217", message: "Not found" } }), {
              status: 404,
              headers: { "content-type": "application/json" },
            })
          : new Response(JSON.stringify({ value: [] }), {
              status: 200,
              headers: { "content-type": "application/json" },
            })
      );
    },
  };
  return new DataverseClient({
    baseUrl: BASE_URL,
    fetchProvider,
    tokenProvider: { getToken: () => Promise.resolve("t") },
    retry: { baseDelayMs: 1, maxDelayMs: 1 },
    ...options,
  });
}

function recorder(): Logger & { lines: Array<[string, unknown]> } {
  const lines: Array<[string, unknown]> = [];
  const log = (m: string, meta?: unknown) => {
    lines.push([m, meta]);
  };
  return { lines, debug: log, info: log, warn: log, error: log };
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("#33: the SDK logs nothing unless a logger is configured", () => {
  it("with the default config, requests (with a retry and an error) write nothing to the console", async () => {
    const spies = spyConsole();
    const c = client();
    await c.api("contacts").filter("emailaddress1 eq 'jane@contoso.com'").get();
    await c
      .api("accounts(00000000-0000-0000-0000-000000000001)/missing")
      .get()
      .catch(() => undefined);
    expect(callCount(spies)).toBe(0);
  });

  it("new ConsoleLogger() opts in to console output", async () => {
    const spies = spyConsole();
    await client({ logger: new ConsoleLogger() }).api("WhoAmI").get();
    expect(callCount(spies)).toBeGreaterThan(0);
  });

  it("ConsoleLogger passes meta as its own argument, not concatenated", () => {
    const debug = vi.spyOn(console, "debug").mockImplementation(() => undefined);
    new ConsoleLogger().debug("hello", { a: 1 });
    new ConsoleLogger().debug("bare");
    expect(debug.mock.calls).toEqual([["hello", { a: 1 }], ["bare"]]);
  });

  it("ConsoleLogger({ level }) drops lower levels", () => {
    const spies = spyConsole();
    const logger = new ConsoleLogger({ level: "warn" });
    logger.debug("d");
    logger.info("i");
    logger.warn("w");
    logger.error("e");
    expect(spies.map((s) => s.mock.calls.length)).toEqual([0, 0, 0, 1, 1]);
  });
});

describe("#33: logged URLs keep data out by default", () => {
  it("drops the query and key values", async () => {
    const logger = recorder();
    const c = client({ logger });
    await c.api("contacts").filter("emailaddress1 eq 'jane@contoso.com'").get();
    await c.api("accounts(name='O''Brien')").get();
    const text = logger.lines.map(([m]) => m).join("\n");
    expect(text).toContain(`GET ${BASE_URL}/api/data/v9.2/contacts?…`);
    expect(text).toContain(`GET ${BASE_URL}/api/data/v9.2/accounts(…)`);
    expect(text).not.toMatch(/jane|contoso\.com'|Brien|filter/);
  });

  it("logging.fullUrls: true logs the full URL", async () => {
    const logger = recorder();
    await client({ logger, logging: { fullUrls: true } })
      .api("contacts")
      .filter("emailaddress1 eq 'jane@contoso.com'")
      .get();
    expect(logger.lines.map(([m]) => m).join("\n")).toContain("jane%40contoso.com");
  });

  it("meta is a structured object", async () => {
    const logger = recorder();
    await client({ logger }).api("WhoAmI").get();
    const last = logger.lines.at(-1);
    expect(last?.[1]).toMatchObject({ status: 200, attempt: 1 });
  });
});
