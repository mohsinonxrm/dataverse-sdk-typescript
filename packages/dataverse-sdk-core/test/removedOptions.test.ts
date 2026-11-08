/**
 * #285: the deprecated and no-op options are gone. `retry.delay`, `retry.useExponentialBackoff`,
 * `circuitBreaker`, `bulkhead` and `DataverseError.statusCode` are type errors, and nothing reads
 * them at run time any more.
 */
import { describe, expect, expectTypeOf, it, vi } from "vitest";

// Record every retry wait instead of sleeping.
const waits: number[] = [];
vi.mock("../src/utils/sleep.js", () => ({
  sleep: (ms: number) => {
    waits.push(ms);
    return Promise.resolve();
  },
}));

import { DataverseClient } from "../src/client/DataverseClient.js";
import { RequestOptions as MiddlewareRequestOptions } from "../src/middleware/RequestOptions.js";
import type { DataverseClientOptions, RetryOptions } from "../src/abstractions/options.js";
import type { Logger } from "../src/abstractions/http.js";
import type * as Core from "../src/index.js";
import { DataverseError } from "../src/errors/DataverseError.js";
import { DataverseAuthenticationError } from "../src/errors/NamedErrors.js";

const BASE_URL = "https://contoso.crm.dynamics.com";

function setup(statuses: number[], options: Partial<DataverseClientOptions> = {}) {
  let calls = 0;
  const client = new DataverseClient({
    baseUrl: BASE_URL,
    fetchProvider: {
      fetch: () => {
        const code = statuses[Math.min(calls, statuses.length - 1)] ?? 204;
        calls++;
        return Promise.resolve(new Response(null, { status: code }));
      },
    },
    ...options,
  });
  return { client, calls: () => calls };
}

describe("#285: removed retry options", () => {
  it("delay and useExponentialBackoff are not RetryOptions", () => {
    expectTypeOf<RetryOptions>().not.toHaveProperty("delay");
    expectTypeOf<RetryOptions>().not.toHaveProperty("useExponentialBackoff");
    // @ts-expect-error -- delay was removed: use baseDelayMs
    const a: RetryOptions = { delay: 7 };
    // @ts-expect-error -- useExponentialBackoff was removed
    const b: RetryOptions = { useExponentialBackoff: false };
    expect([a, b]).toHaveLength(2);
  });

  it("a per-request delay no longer sets the base delay", async () => {
    waits.length = 0;
    const { client, calls } = setup([503, 204], {
      retry: { baseDelayMs: 40, jitter: false },
    });
    const retry = { type: "retry", delay: 7 } as unknown as { type: "retry" } & RetryOptions;
    await client.send({
      method: "GET",
      url: "accounts",
      headers: {},
      middlewareOptions: new MiddlewareRequestOptions([retry]),
    });
    expect(calls()).toBe(2);
    expect(waits).toEqual([40]);
  });
});

describe("#285: removed circuitBreaker and bulkhead", () => {
  it("are not client options, and the old option shapes are gone", () => {
    expectTypeOf<DataverseClientOptions>().not.toHaveProperty("circuitBreaker");
    expectTypeOf<DataverseClientOptions>().not.toHaveProperty("bulkhead");
    // The names now belong to the opt-in middleware (#343), whose options have no `enabled` and
    // none of the old no-op fields.
    expectTypeOf<Core.CircuitBreakerOptions>().not.toHaveProperty("enabled");
    expectTypeOf<Core.CircuitBreakerOptions>().not.toHaveProperty("samplingWindowMs");
    expectTypeOf<Core.CircuitBreakerOptions>().not.toHaveProperty("openDurationMs");
    expectTypeOf<Core.BulkheadOptions>().not.toHaveProperty("enabled");
    expectTypeOf<Core.BulkheadOptions>().not.toHaveProperty("maxParallel");
    // @ts-expect-error -- circuitBreaker was removed
    const a: Partial<DataverseClientOptions> = { circuitBreaker: { enabled: true } };
    // @ts-expect-error -- bulkhead was removed
    const b: Partial<DataverseClientOptions> = { bulkhead: { enabled: true } };
    expect([a, b]).toHaveLength(2);
  });

  it("nothing reads them: passing them anyway logs no warning", () => {
    const logger: Logger = {
      debug: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };
    const removed = {
      circuitBreaker: { enabled: true },
      bulkhead: { enabled: true },
    } as Partial<DataverseClientOptions>;
    setup([204], { logger, ...removed });
    expect(logger.warn).not.toHaveBeenCalled();
  });
});

describe("#285: removed DataverseError.statusCode", () => {
  it("is gone: read status", () => {
    expectTypeOf<DataverseError>().not.toHaveProperty("statusCode");
    const err = DataverseAuthenticationError.forbidden();
    expect(err.status).toBe(403);
    expect("statusCode" in err).toBe(false);
  });
});
