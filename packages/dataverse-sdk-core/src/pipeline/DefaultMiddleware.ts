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
  list.push(new ConcurrencyMiddleware(options));
  list.push(new RetryMiddleware(options));
  // Inside Retry, so every attempt gets a current token (#21); providers cache, so it's cheap.
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
  return [...(custom?.prepend ?? []), ...core, ...(custom?.append ?? [])];
}
