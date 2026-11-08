---
"@mohsinonxrm/dataverse-sdk-actions": patch
"@mohsinonxrm/dataverse-sdk-core": patch
"@mohsinonxrm/dataverse-sdk-entities-runtime": patch
"@mohsinonxrm/dataverse-sdk-functions": patch
"@mohsinonxrm/dataverse-sdk-generator": patch
"@mohsinonxrm/dataverse-sdk-messages": patch
"@mohsinonxrm/dataverse-sdk-xrm": patch
---

README: `client.api()` and the typed operations (the actions and functions packages, and what `dataverse-gen` writes) are the documented main path, and `OrganizationService` with the messages is the compatibility layer for code ported from the .NET SDK (#311). The core README lists change tracking, `waitForAsyncOperation()`, the opt-in resilience middleware and telemetry among its features; README examples import what they use.
