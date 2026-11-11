import type { ChaosFault } from "./ChaosMiddleware.js";

/** Options of `ChaosPresets.serviceProtection`. */
export interface ServiceProtectionChaosOptions {
  /** `Retry-After` of each 429, in seconds. @default 1 */
  retryAfterSeconds?: number;
}

/** Options of `ChaosPresets.slowOrg`. */
export interface SlowOrgChaosOptions {
  /** How long each slow request waits before it is sent, in ms. @default 2000 */
  delayMs?: number;
}

/** The three service-protection limits: error code and message, as Dataverse sends them. */
const SERVICE_PROTECTION = [
  {
    code: "0x80072322",
    message: "Number of requests exceeded the limit of 6000 over time window of 300 seconds.",
  },
  {
    code: "0x80072321",
    message:
      "Combined execution time of incoming requests exceeded limit of 1,200,000 milliseconds over time window of 300 seconds. Decrease number of concurrent requests or reduce the duration of requests and try again later.",
  },
  {
    code: "0x80072326",
    message: "Number of concurrent requests exceeded the limit of 52.",
  },
] as const;

/**
 * Sets of `ChaosMiddleware` faults that look like Dataverse failures, for `ChaosOptions.faults`.
 * Combine them by spreading: `faults: [...ChaosPresets.serviceProtection(), ...ChaosPresets.gatewayOutage()]`.
 * Each call returns new objects, so a test can change them freely.
 *
 * Chaos is for dev and test environments only, never a live production environment: set
 * `enabled` on the middleware.
 *
 * @example
 * ```typescript
 * new ChaosMiddleware({
 *   enabled: process.env.DATAVERSE_SDK_CHAOS === "1",
 *   percentage: 5,
 *   faults: ChaosPresets.serviceProtection({ retryAfterSeconds: 2 }),
 * });
 * ```
 */
export const ChaosPresets = {
  /**
   * The three service-protection 429s: number of requests (`0x80072322`), combined execution time
   * (`0x80072321`) and concurrent requests (`0x80072326`), each with `Retry-After` and Dataverse's
   * JSON error body, `{ error: { code, message } }`.
   */
  serviceProtection(options: ServiceProtectionChaosOptions = {}): ChaosFault[] {
    const retryAfterSeconds = options.retryAfterSeconds ?? 1;
    return SERVICE_PROTECTION.map(({ code, message }) => ({
      status: 429,
      retryAfterSeconds,
      body: { error: { code, message } },
    }));
  },
  /** A gateway in trouble: 502 Bad Gateway, 503 Service Unavailable and 504 Gateway Timeout. */
  gatewayOutage(): ChaosFault[] {
    return [{ status: 502 }, { status: 503 }, { status: 504 }];
  },
  /**
   * A dropped connection: the attempt fails without a response, as when `fetch` rejects with
   * `TypeError: fetch failed` (a `DataverseNetworkError` named `ConnectionFailed`).
   */
  flakyNetwork(): ChaosFault[] {
    return [{ status: "network" }];
  },
  /** A slow org: requests are sent after a delay (`delayMs`, 2 s by default). */
  slowOrg(options: SlowOrgChaosOptions = {}): ChaosFault[] {
    return [{ status: "latency", delayMs: options.delayMs ?? 2000 }];
  },
};
