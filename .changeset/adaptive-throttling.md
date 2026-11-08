---
"@mohsinonxrm/dataverse-sdk-core": minor
---

`AdaptiveThrottlingMiddleware`: slow down before Dataverse throttles, from its service-protection headers (#309). It is opt-in: add it with `middleware: { append: [new AdaptiveThrottlingMiddleware()] }`.

- **Spacing.** It reads `x-ms-ratelimit-burst-remaining-xrm-requests` (requests left in the 5-minute window, e.g. `7999`) and `x-ms-ratelimit-time-remaining-xrm-requests` (execution time left, e.g. `1,200.00`) from every response. When either falls below `threshold` (0.2) of its full value (the highest seen, or `requestBudget` / `timeBudget`), request starts are spaced out by up to `maxSpacingMs` (2 s) as the budget nears empty.
- **Pause after a 429.** A 429 with `Retry-After` holds every new request until the wait has passed (`pauseOnRetryAfter`, default on, capped by `maxPauseMs`, 30 s).
- `status` reports the budgets, the pressure and the current spacing; `onDelay` is told about each request held back.
- Microsoft documents the headers as being for debugging and each web server counts on its own, so this is a soft brake: the retry middleware still handles 429s. In browsers the headers aren't readable, so only the pause after a 429 applies.
