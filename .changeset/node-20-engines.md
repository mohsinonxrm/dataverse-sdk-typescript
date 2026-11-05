---
"@mohsinonxrm/dataverse-sdk-actions": patch
"@mohsinonxrm/dataverse-sdk-appinsights": patch
"@mohsinonxrm/dataverse-sdk-auth-azure-identity": patch
"@mohsinonxrm/dataverse-sdk-auth-msal-browser": patch
"@mohsinonxrm/dataverse-sdk-auth-msal-node": patch
"@mohsinonxrm/dataverse-sdk-batch": patch
"@mohsinonxrm/dataverse-sdk-core": patch
"@mohsinonxrm/dataverse-sdk-discovery": patch
"@mohsinonxrm/dataverse-sdk-entities-runtime": patch
"@mohsinonxrm/dataverse-sdk-files": patch
"@mohsinonxrm/dataverse-sdk-functions": patch
"@mohsinonxrm/dataverse-sdk-generator": patch
"@mohsinonxrm/dataverse-sdk-messages": patch
"@mohsinonxrm/dataverse-sdk-metadata": patch
"@mohsinonxrm/dataverse-sdk-otel": patch
"@mohsinonxrm/dataverse-sdk-xrm": patch
---

Declare `engines: { "node": ">=20" }`. Node 18 reached end of life in April 2025, and CI now tests on Node 20, 22 and 24. Installing on Node 18 shows an engine warning (or fails with `engine-strict`).
