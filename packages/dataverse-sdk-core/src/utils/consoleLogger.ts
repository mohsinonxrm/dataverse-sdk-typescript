import type { Logger } from "../abstractions/http.js";

/** Log levels, lowest first. */
export type LogLevel = "debug" | "info" | "warn" | "error";

const ORDER: Record<LogLevel, number> = { debug: 0, info: 1, warn: 2, error: 3 };

/**
 * A `Logger` that writes to `console`. The SDK logs nothing unless you pass a logger, so use this
 * to see its diagnostics:
 *
 * @example
 * ```typescript
 * const client = new DataverseClient({ baseUrl, tokenProvider, logger: new ConsoleLogger() });
 * // Only warnings and errors:
 * new ConsoleLogger({ level: "warn" });
 * ```
 */
export class ConsoleLogger implements Logger {
  private readonly min: number;

  constructor(options: { level?: LogLevel } = {}) {
    this.min = ORDER[options.level ?? "debug"];
  }

  debug(message: string, meta?: unknown): void {
    if (this.min <= ORDER.debug) write(console.debug, message, meta);
  }

  info(message: string, meta?: unknown): void {
    if (this.min <= ORDER.info) write(console.info, message, meta);
  }

  warn(message: string, meta?: unknown): void {
    if (this.min <= ORDER.warn) write(console.warn, message, meta);
  }

  error(message: string, meta?: unknown): void {
    write(console.error, message, meta);
  }
}

function write(fn: (...args: unknown[]) => void, message: string, meta: unknown): void {
  // Pass meta as its own argument so the console shows the object, not "[object Object]".
  if (meta === undefined) fn(message);
  else fn(message, meta);
}
