import type { Middleware } from "../abstractions/middleware.js";
import type { DataverseClientOptions } from "../abstractions/options.js";
import { AuthMiddleware } from "../middleware/AuthMiddleware.js";
import { ODataHeadersMiddleware } from "../middleware/ODataHeadersMiddleware.js";
import { RetryMiddleware } from "../middleware/RetryMiddleware.js";
import { ConcurrencyMiddleware } from "../middleware/ConcurrencyMiddleware.js";
import { LoggingMiddleware } from "../middleware/LoggingMiddleware.js";
import { TelemetryMiddleware } from "../middleware/TelemetryMiddleware.js";

export function buildDefaultMiddleware(options: DataverseClientOptions): Middleware[] {
  const list: Middleware[] = [];
  list.push(new ODataHeadersMiddleware(options));
  // Retry wraps Concurrency, so each attempt takes a slot and gives it back before the retry
  // wait: a request sleeping on Retry-After doesn't hold a slot other requests could use (#44).
  list.push(new RetryMiddleware(options));
  // Inside Retry, so it sees every attempt's response (429s included); outside Concurrency, so a
  // request it holds back holds no slot and no token, and the wait isn't in the dependency (#477).
  if (options.adaptiveThrottling) list.push(options.adaptiveThrottling);
  list.push(new ConcurrencyMiddleware(options));
  // Inside Retry, so every attempt gets a current token (#21); providers cache, so it's cheap.
  // Inside Concurrency too, so a request waiting for a slot doesn't hold a token that ages.
  if (options.tokenProvider) list.push(new AuthMiddleware(options));
  list.push(new TelemetryMiddleware(options));
  list.push(new LoggingMiddleware(options));
  return list;
}

/** The pipeline a client uses: the defaults, then `options.middleware` applied (see its docs). */
export function buildMiddleware(options: DataverseClientOptions): Middleware[] {
  const custom = options.middleware;
  const defaults = buildDefaultMiddleware(options);
  const core = custom?.replace ? custom.replace(defaults) : defaults;
  const added = [...(custom?.prepend ?? []), ...(custom?.append ?? [])];
  // Adaptive throttling added here still works (the way before the `adaptiveThrottling` option),
  // but not where it belongs: appended, its waits hold a concurrency slot and a token; prepended,
  // it sees only a request's last response. Say so once, when the client is built. Matched by
  // name, so the class stays out of bundles that don't use it.
  if (added.some((m) => m.name === "AdaptiveThrottlingMiddleware")) {
    try {
      options.logger?.warn(
        "AdaptiveThrottlingMiddleware belongs in the `adaptiveThrottling` option, outside the concurrency slot"
      );
    } catch {
      // A logger that throws must not stop the client from being built.
    }
  }
  return [...(custom?.prepend ?? []), ...core, ...(custom?.append ?? [])];
}
