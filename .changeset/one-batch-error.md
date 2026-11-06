---
"@mohsinonxrm/dataverse-sdk-core": minor
"@mohsinonxrm/dataverse-sdk-batch": patch
---

One `DataverseBatchError`. Core now holds the class (with `partErrors`, `requestErrors`, `result` and the request helpers) and the batch package re-exports it, so `err instanceof DataverseBatchError` is true whichever package it is imported from. `execute()` still throws it with `result`, and now also fills `partErrors`. Core's constructor accepts both its old short form and the batch form.
