/**
 * #436, #480: type tests (tsd) for per-request middleware options. Every built-in middleware's
 * entry is checked against its options; custom middleware types take any fields; `get` returns
 * the typed options for a built-in key.
 */
import { expectAssignable, expectError, expectNotAssignable, expectType } from "tsd";
import {
  MiddlewareRequestOptions,
  type AdaptiveThrottlingRequestOptions,
  type BulkheadRequestOptions,
  type ChaosRequestOptions,
  type CircuitBreakerRequestOptions,
  type LoggingOptions,
  type MiddlewareConcurrencyOptions,
  type MiddlewareOptionEntry,
  type MiddlewareOptionKey,
  type MiddlewareOptions,
  type RetryOptions,
  type TelemetryOptions,
} from "../src/index.js";

// Each built-in entry, with its options
new MiddlewareRequestOptions([
  { type: "retry", maxRetries: 0, baseDelayMs: 100, retryableStatusCodes: [429] },
  { type: "concurrency", bypass: true },
  { type: "telemetry", disable: false, customProperties: { tenant: "a", n: 1 } },
  { type: "logging", disable: true, logLevel: "debug" },
  { type: "chaos", disable: true },
  { type: "bulkhead", category: "import", bypass: false },
  { type: "circuitBreaker", bypass: true },
  { type: "adaptiveThrottling", bypass: true },
]);
new MiddlewareRequestOptions([{ type: "chaos", fault: { status: 503, delayMs: 10 } }]);
new MiddlewareRequestOptions([{ type: "chaos", fault: { status: "hang" } }]);
new MiddlewareRequestOptions();
new MiddlewareRequestOptions([]);

// Callbacks in an entry are typed from its type
new MiddlewareRequestOptions([
  {
    type: "retry",
    onRetry: (info) => {
      expectType<number>(info.attempt);
    },
    shouldRetry: (status) => status === 503,
  },
]);

// Custom middleware types take any fields
new MiddlewareRequestOptions([{ type: "myMiddleware", anything: 1, nested: { a: true } }]);
new MiddlewareRequestOptions([
  { type: "retry", maxRetries: 1 },
  { type: "audit", tag: "x" },
]);
expectAssignable<MiddlewareOptionEntry>({ type: "custom", disable: "yes" });

// A list built beforehand still works
declare const entries: MiddlewareOptionEntry[];
new MiddlewareRequestOptions(entries);
declare const readonlyEntries: readonly MiddlewareOptionEntry[];
new MiddlewareRequestOptions(readonlyEntries);

// Misspelt or mistyped fields of a built-in entry are rejected
expectError(new MiddlewareRequestOptions([{ type: "retry", maxRetriez: 5 }]));
expectError(new MiddlewareRequestOptions([{ type: "retry", maxRetries: "5" }]));
expectError(new MiddlewareRequestOptions([{ type: "concurrency", bypass: "yes" }]));
expectError(new MiddlewareRequestOptions([{ type: "concurrency", priority: 1 }]));
expectError(new MiddlewareRequestOptions([{ type: "telemetry", disabled: true }]));
expectError(new MiddlewareRequestOptions([{ type: "logging", logLevel: "verbose" }]));
expectError(new MiddlewareRequestOptions([{ type: "chaos", disable: "yes" }]));
expectError(new MiddlewareRequestOptions([{ type: "chaos", fault: { status: "slow" } }]));
expectError(new MiddlewareRequestOptions([{ type: "chaos", percentage: 50 }]));
expectError(new MiddlewareRequestOptions([{ type: "bulkhead", category: 1 }]));
expectError(new MiddlewareRequestOptions([{ type: "bulkhead", limit: 2 }]));
expectError(new MiddlewareRequestOptions([{ type: "circuitBreaker", bypass: 1 }]));
expectError(new MiddlewareRequestOptions([{ type: "circuitBreaker", failureThreshold: 2 }]));
expectError(new MiddlewareRequestOptions([{ type: "adaptiveThrottling", bypass: "true" }]));
expectError(new MiddlewareRequestOptions([{ type: "adaptiveThrottling", priority: 1 }]));
// ...also next to a valid entry or a custom one
expectError(
  new MiddlewareRequestOptions([
    { type: "audit", tag: "x" },
    { type: "chaos", disabled: true },
  ])
);

// get: typed for a built-in key
const options = new MiddlewareRequestOptions([{ type: "chaos", disable: true }]);
expectType<RetryOptions | undefined>(options.get("retry"));
expectType<MiddlewareConcurrencyOptions | undefined>(options.get("concurrency"));
expectType<TelemetryOptions | undefined>(options.get("telemetry"));
expectType<LoggingOptions | undefined>(options.get("logging"));
expectType<ChaosRequestOptions | undefined>(options.get("chaos"));
expectType<BulkheadRequestOptions | undefined>(options.get("bulkhead"));
expectType<CircuitBreakerRequestOptions | undefined>(options.get("circuitBreaker"));
expectType<AdaptiveThrottlingRequestOptions | undefined>(options.get("adaptiveThrottling"));
expectType<boolean | undefined>(options.get("chaos")?.disable);
// ...and the marker type for a custom key, or any string
expectType<MiddlewareOptions | undefined>(options.get("myMiddleware"));
declare const someKey: string;
expectType<MiddlewareOptions | undefined>(options.get(someKey));

// set: a built-in key takes its options; a custom key takes any options
options.set("chaos", { fault: { status: 429, retryAfterSeconds: 1 } });
options.set("circuitBreaker", { bypass: true });
options.set("myMiddleware", { anything: 1 });
options.set(someKey, { anything: 1 });
expectError(() => {
  options.set("chaos", { disable: "yes" });
});
expectError(() => {
  options.set("retry", { maxRetriez: 1 });
});
expectError(() => {
  options.set("adaptiveThrottling", { bypass: 1 });
});

// has / delete: built-in or custom keys
expectType<boolean>(options.has("bulkhead"));
expectType<boolean>(options.has("myMiddleware"));
expectType<boolean>(options.delete("adaptiveThrottling"));
expectType<boolean>(options.delete(someKey));
expectError(options.has(1));

// Keys: the built-in ones, or any string
expectAssignable<MiddlewareOptionKey>("circuitBreaker");
expectAssignable<MiddlewareOptionKey>("myMiddleware");
expectNotAssignable<MiddlewareOptionKey>(1);

// The class's type parameter doesn't leak into where it is used
const typed: MiddlewareRequestOptions = new MiddlewareRequestOptions([
  { type: "retry", maxRetries: 0 },
]);
expectAssignable<MiddlewareRequestOptions>(typed);
