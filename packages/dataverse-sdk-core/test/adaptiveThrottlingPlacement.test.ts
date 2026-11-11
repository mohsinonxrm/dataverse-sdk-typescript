/**
 * #477: the `adaptiveThrottling` option runs AdaptiveThrottlingMiddleware inside Retry and outside
 * Concurrency, so a request it holds back holds no concurrency slot and no access token, and the
 * wait isn't part of the attempt's dependency. Added with `middleware.append` (the way before the
 * option) it still works, inside the slot, and the client warns once.
 */
import { describe, expect, it } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";
import {
  AdaptiveThrottlingMiddleware,
  buildDefaultMiddleware,
  TelemetryEvents,
} from "../src/index.js";
import type { Logger, TelemetryClient } from "../src/abstractions/http.js";
import type { DataverseClientOptions } from "../src/abstractions/options.js";

const BASE_URL = "https://contoso.crm.dynamics.com";
/** How long the 429 below holds new requests (its Retry-After of 1 s, cut to this). */
const PAUSE_MS = 150;

type Placement = "option" | "append";

/**
 * A client with one concurrency slot. The first request gets a 429 with Retry-After, so adaptive
 * throttling holds the next ones for PAUSE_MS. Records, per request after it: how long it waited
 * for the concurrency slot, how long its dependency took, and how old its token was when sent.
 */
function setup(placement: Placement, logger?: Logger) {
  const throttle = new AdaptiveThrottlingMiddleware({ maxPauseMs: PAUSE_MS });
  const slotWaits: number[] = [];
  const dependencies: number[] = [];
  const tokenAges: number[] = [];
  const delayEvents: Array<Record<string, string> | undefined> = [];
  let tokenAt = 0;
  let calls = 0;
  const telemetry: TelemetryClient = {
    trackEvent: (name, props, measurements) => {
      if (name === TelemetryEvents.concurrencyWait) slotWaits.push(measurements?.wait_ms ?? 0);
      if (name === TelemetryEvents.throttleDelay) delayEvents.push(props);
    },
    trackException: () => undefined,
    startDependency: () => ({
      end: (d) => {
        if (d.resultCode !== "429") dependencies.push(d.durationMs ?? 0);
      },
    }),
  };
  const options: DataverseClientOptions = {
    baseUrl: BASE_URL,
    retry: { maxRetries: 0 },
    concurrency: { maxConcurrentRequests: 1, min: 1, adaptiveFromDopHint: false },
    tokenProvider: {
      getToken: () => {
        tokenAt = Date.now();
        return Promise.resolve("token");
      },
    },
    telemetry,
    logger,
    fetchProvider: {
      fetch: () => {
        if (calls++ === 0) {
          return Promise.resolve(
            new Response(null, { status: 429, headers: { "retry-after": "1" } })
          );
        }
        tokenAges.push(Date.now() - tokenAt);
        return Promise.resolve(new Response(null, { status: 204 }));
      },
    },
    ...(placement === "option"
      ? { adaptiveThrottling: throttle }
      : { middleware: { append: [throttle] } }),
  };
  const client = new DataverseClient(options);
  const send = (url: string) => client.send({ method: "GET", url, headers: {} });
  /** The 429, then two requests at once; both are held by the pause. */
  const run = async () => {
    expect((await send("WhoAmI")).status).toBe(429);
    expect(throttle.status.pausedUntil).toBeGreaterThan(Date.now());
    await Promise.all([send("accounts"), send("contacts")]);
    return {
      slotWait: Math.max(0, ...slotWaits),
      dependency: Math.max(...dependencies),
      tokenAge: Math.max(...tokenAges),
      delayEvents,
    };
  };
  return { client, throttle, run };
}

describe("#477: adaptive throttling outside the concurrency slot", () => {
  it("the option places it inside Retry and outside Concurrency", () => {
    const names = (options: Partial<DataverseClientOptions>) =>
      buildDefaultMiddleware({
        baseUrl: BASE_URL,
        tokenProvider: { getToken: () => Promise.resolve("t") },
        ...options,
      }).map((m) => m.name);
    expect(names({ adaptiveThrottling: new AdaptiveThrottlingMiddleware() })).toEqual([
      "ODataHeadersMiddleware",
      "RetryMiddleware",
      "AdaptiveThrottlingMiddleware",
      "ConcurrencyMiddleware",
      "AuthMiddleware",
      "TelemetryMiddleware",
      "LoggingMiddleware",
    ]);
    expect(names({})).not.toContain("AdaptiveThrottlingMiddleware");
  });

  it("uses the instance passed to the option as it is", () => {
    const throttle = new AdaptiveThrottlingMiddleware();
    const list = buildDefaultMiddleware({ baseUrl: BASE_URL, adaptiveThrottling: throttle });
    expect(list[2]).toBe(throttle);
  });

  it("a held request holds no slot, no token, and isn't in the dependency's duration", async () => {
    const { run } = setup("option");
    const { slotWait, dependency, tokenAge, delayEvents } = await run();
    // Both requests waited out the pause before taking the slot, so neither waited on the other.
    expect(slotWait).toBeLessThan(PAUSE_MS / 2);
    expect(dependency).toBeLessThan(PAUSE_MS / 2);
    expect(tokenAge).toBeLessThan(PAUSE_MS / 2);
    expect(delayEvents.map((p) => p?.["throttle.reason"])).toEqual(["retry-after", "retry-after"]);
  });

  it("appended (the old placement), it still works, inside the slot", async () => {
    const { run } = setup("append");
    const { slotWait, dependency, tokenAge, delayEvents } = await run();
    // The first request held the slot, and its token, through the pause: what the option fixes.
    expect(slotWait).toBeGreaterThanOrEqual(PAUSE_MS - 50);
    expect(dependency).toBeGreaterThanOrEqual(PAUSE_MS - 50);
    expect(tokenAge).toBeGreaterThanOrEqual(PAUSE_MS - 50);
    expect(delayEvents.map((p) => p?.["throttle.reason"])).toEqual(["retry-after"]);
  });

  it("appended or prepended, the client warns once; the option doesn't", () => {
    const warnings: string[] = [];
    const logger: Logger = {
      debug: () => undefined,
      info: () => undefined,
      warn: (message) => warnings.push(message),
      error: () => undefined,
    };
    setup("append", logger);
    expect(warnings).toHaveLength(1);
    expect(warnings[0]).toMatch(/adaptiveThrottling/);
    new DataverseClient({
      baseUrl: BASE_URL,
      logger,
      middleware: { prepend: [new AdaptiveThrottlingMiddleware()] },
    });
    expect(warnings).toHaveLength(2);
    setup("option", logger);
    expect(warnings).toHaveLength(2);
  });
});
