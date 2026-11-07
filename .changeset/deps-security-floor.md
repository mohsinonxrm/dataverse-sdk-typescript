---
"@mohsinonxrm/dataverse-sdk-appinsights": patch
"@mohsinonxrm/dataverse-sdk-auth-msal-browser": patch
"@mohsinonxrm/dataverse-sdk-auth-msal-node": patch
"@mohsinonxrm/dataverse-sdk-generator": patch
---

Raise the minimum versions of runtime dependencies to current releases within the same major version: `@azure/monitor-opentelemetry` ^1.20.1, `@azure/msal-browser` ^3.30.0, `@azure/msal-node` ^2.16.3, and `chalk`/`commander`/`ora` for the generator CLI. Installs then resolve to releases without known high or critical advisories. The MSAL and Azure Monitor packages later became peer dependencies (#24, #85, #159), and these versions are the lowest their peer ranges accept.
