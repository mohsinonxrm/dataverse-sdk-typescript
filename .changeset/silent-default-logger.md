---
"@mohsinonxrm/dataverse-sdk-core": minor
---

The SDK no longer writes to the console by default (#33). Without a `logger` option, nothing is logged. Before, every request wrote two `console.debug` lines with its full URL, including filters and record ids.

- `ConsoleLogger` is now an exported class: `new ConsoleLogger()` (or `new ConsoleLogger({ level: "warn" })`) opts in to console output. It passes the meta object as its own argument, so the console shows the object instead of `[object Object]`.
- Request logs show URLs as origin and path, with key values in parentheses as `(…)` and the query as `?…`. Set the new `logging: { fullUrls: true }` client option to log full URLs.
- The request log meta is now structured: `{ attempt, status, durationMs }`, with `attempt` as a number.
