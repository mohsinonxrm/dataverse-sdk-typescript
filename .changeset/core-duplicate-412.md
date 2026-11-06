---
"@mohsinonxrm/dataverse-sdk-core": patch
---

With `.detectDuplicates()`, only a duplicate-detection 412 is a `DataverseDuplicateError` (#50). Before, every 412 was, so an optimistic-concurrency failure (`.ifMatch()` with a stale etag, code `0x80060882`) was reported as a duplicate. A duplicate is now recognised by Dataverse's code `0x80040333` (checked live), or by `innererror.duplicaterecords` when present; any other 412 is the usual `DataverseODataError` with its code. A 412 body that isn't JSON no longer makes the error handling itself throw.
