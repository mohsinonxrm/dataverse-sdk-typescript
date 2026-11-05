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

Declare `engines: { "node": ">=22" }`. Node 18 and Node 20 are end of life (April 2025 and April 2026). CI now tests on Node 22, 24 and 26. Installing on an older Node shows an engine warning, or fails with `engine-strict`.
