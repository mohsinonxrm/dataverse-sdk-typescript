import type {
  DependencyHandle,
  DependencyTelemetry,
  Logger,
  MiddlewareContext,
  TelemetryClient,
} from "../abstractions/http.js";
import type { DataverseClientOptions } from "../abstractions/options.js";

/** A dependency in flight, as the SDK uses it: every member is safe to call. */
export interface SafeDependency {
  /** Valid W3C trace context headers only (`traceparent`, and `tracestate` with it). */
  readonly headers: Readonly<Record<string, string>>;
  run<T>(fn: () => Promise<T>): Promise<T>;
  end(data: DependencyTelemetry): void;
}

/** `TelemetryClient` calls that never throw into the request: a failure is logged and dropped. */
export interface SafeTelemetry {
  trackEvent(
    name: string,
    props?: Record<string, string>,
    measurements?: Record<string, number>
  ): void;
  startDependency(name: string, data: DependencyTelemetry): SafeDependency;
  trackException(error: unknown, props?: Record<string, string>): void;
}

const NO_HEADERS: Readonly<Record<string, string>> = Object.freeze({});

// version "00", 32 hex trace id, 16 hex parent id, 2 hex flags (W3C Trace Context, level 1).
const TRACEPARENT = /^[0-9a-f]{2}-[0-9a-f]{32}-[0-9a-f]{16}-[0-9a-f]{2}$/;
// Printable ASCII without CR/LF, at most 512 characters (the spec's limit for the whole header).
const TRACESTATE = /^[\x20-\x7e]{1,512}$/;

/**
 * The telemetry client for this request: the client's `telemetry`, guarded, or `undefined` when
 * there is none or the request turned telemetry off (`{ type: "telemetry", disable: true }`).
 */
export function requestTelemetry(
  options: Pick<DataverseClientOptions, "telemetry">,
  ctx: MiddlewareContext
): SafeTelemetry | undefined {
  if (ctx.middlewareOptions?.get("telemetry")?.disable) return undefined;
  const telemetry = options.telemetry ?? ctx.telemetry;
  return telemetry ? guardTelemetry(telemetry, ctx.logger) : undefined;
}

/** Wrap `telemetry` so no call can throw: a failure is logged with `logger.warn` and dropped. */
export function guardTelemetry(telemetry: TelemetryClient, logger?: Logger): SafeTelemetry {
  const safely = <T>(what: string, fn: () => T, fallback: T): T => {
    try {
      return fn();
    } catch (e) {
      warn(logger, what, e);
      return fallback;
    }
  };
  return {
    trackEvent: (name, props, measurements) => {
      safely(
        "trackEvent",
        () => {
          telemetry.trackEvent(name, props, measurements);
        },
        undefined
      );
    },
    trackException: (error, props) => {
      safely(
        "trackException",
        () => {
          telemetry.trackException(error, props);
        },
        undefined
      );
    },
    startDependency: (name, data) => {
      const handle = safely<DependencyHandle | undefined>(
        "startDependency",
        () => telemetry.startDependency(name, data),
        undefined
      );
      return guardDependency(handle, logger);
    },
  };
}

function guardDependency(
  handle: DependencyHandle | undefined,
  logger: Logger | undefined
): SafeDependency {
  let ended = false;
  return {
    headers: traceContextHeaders(handle, logger),
    run: (fn) => runIn(handle, fn, logger),
    end: (data) => {
      if (ended || !handle) return;
      ended = true;
      try {
        handle.end(data);
      } catch (e) {
        warn(logger, "dependency end", e);
      }
    },
  };
}

/**
 * Run `fn` through `handle.run`. The attempt's own outcome always wins: if `run` throws, never
 * calls `fn`, or returns something else, `fn` still runs exactly once and its result is returned.
 */
async function runIn<T>(
  handle: DependencyHandle | undefined,
  fn: () => Promise<T>,
  logger: Logger | undefined
): Promise<T> {
  if (typeof handle?.run !== "function") return fn();
  let inner: Promise<T> | undefined;
  const once = (): Promise<T> => {
    if (!inner) {
      inner = fn();
      // Handled below; this only stops an early rejection from being reported as unhandled.
      inner.catch(() => undefined);
    }
    return inner;
  };
  try {
    await handle.run(once);
  } catch (e) {
    // The attempt's own error comes back through `inner` below; anything else is run's failure.
    if (!inner) warn(logger, "dependency run", e);
  }
  return inner ?? fn();
}

function traceContextHeaders(
  handle: DependencyHandle | undefined,
  logger: Logger | undefined
): Readonly<Record<string, string>> {
  try {
    const raw = handle?.headers;
    if (!raw || typeof raw !== "object") return NO_HEADERS;
    let traceparent: unknown;
    let tracestate: unknown;
    for (const [name, value] of Object.entries(raw as Record<string, unknown>)) {
      const key = name.toLowerCase();
      if (key === "traceparent") traceparent = value;
      else if (key === "tracestate") tracestate = value;
    }
    if (typeof traceparent !== "string" || !TRACEPARENT.test(traceparent)) return NO_HEADERS;
    // Version ff is invalid, and so are an all-zero trace id or parent id.
    if (/^ff-|^..-0{32}-|-0{16}-..$/.test(traceparent)) return NO_HEADERS;
    return typeof tracestate === "string" && TRACESTATE.test(tracestate)
      ? { traceparent, tracestate }
      : { traceparent };
  } catch (e) {
    warn(logger, "dependency headers", e);
    return NO_HEADERS;
  }
}

function warn(logger: Logger | undefined, what: string, e: unknown): void {
  try {
    logger?.warn(`Telemetry ${what} threw; ignoring`, {
      error: e instanceof Error ? e.name : typeof e,
    });
  } catch {
    // Nothing else to do: telemetry must not break the request.
  }
}
