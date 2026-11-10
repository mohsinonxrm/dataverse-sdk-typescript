---
"@mohsinonxrm/dataverse-sdk-core": patch
---

`CircuitBreakerMiddleware` treats a 429 and other 4xx responses (400, 401, 403, 404, 409, 412...) as neutral: they no longer reset the count of failures in a row. Before, a 429 counted as a success, so a run of 503s interleaved with 429s never opened the circuit while the service was struggling. Now only a 2xx or 3xx resets the count, and a probe answered with a 429 or another 4xx leaves the circuit half-open so the next request probes. A custom `isFailure` still decides what is a failure; a response it doesn't count is a success below 400 and neutral from 400 up (#470).
