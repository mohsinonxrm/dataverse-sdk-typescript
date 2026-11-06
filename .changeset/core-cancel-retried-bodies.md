---
"@mohsinonxrm/dataverse-sdk-core": patch
---

The retry middleware now cancels the body of every response it retries (#45). Before, a 429 or 5xx response that was retried was dropped unread, and in Node.js (undici) an unread body keeps its connection busy until garbage collection, which can exhaust the connection pool under sustained throttling. The response handed back to the caller is left unread, as before.
