---
"@mohsinonxrm/dataverse-sdk-core": minor
---

`ChaosMiddleware`: fault injection for testing how an app copes with throttling and outages, modelled on the Microsoft Graph SDK's `ChaosHandler` (#308). It is opt-in and never part of the default pipeline: add it with `middleware: { append: [new ChaosMiddleware(options)] }`.

- **Faults.** It answers a share of requests itself (`percentage`, default 10) with a fault picked from `faults` (default 429 with `Retry-After: 1`, 502, 503, 504), without sending them. A fault is `{ status, retryAfterSeconds?, headers?, body? }`; `status: "network"` throws a `DataverseNetworkError` named `ConnectionFailed`, as a dropped connection does. The default body is a Dataverse error body (for a 429, the service-protection error `0x80072322`).
- **Choosing requests.** `match` (a `RegExp` tested against the full URL, or a function) limits it to some requests; `script(request, { requestIndex, attempt })` decides per request instead of the percentage; `random` takes a seeded generator; `onFault` is told about each fault.
- **Per request.** `new MiddlewareRequestOptions([{ type: "chaos", disable: true }])` or `{ type: "chaos", fault }` (`ChaosRequestOptions`).
