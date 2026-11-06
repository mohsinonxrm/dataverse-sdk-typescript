---
"@mohsinonxrm/dataverse-sdk-metadata": patch
---

A metadata create no longer waits on cancelling the response body after it has read the new id from `OData-EntityId`. That wait could hang when the response carried a body and the stream had been tee'd, for example by logging.
