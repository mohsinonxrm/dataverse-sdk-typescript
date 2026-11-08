---
"@mohsinonxrm/dataverse-sdk-appinsights": patch
"@mohsinonxrm/dataverse-sdk-auth-azure-identity": patch
"@mohsinonxrm/dataverse-sdk-auth-msal-browser": patch
"@mohsinonxrm/dataverse-sdk-auth-msal-node": patch
"@mohsinonxrm/dataverse-sdk-discovery": patch
"@mohsinonxrm/dataverse-sdk-files": patch
---

README: every TypeScript example type-checks against the 2.0 packages (#311); signature listings are marked as such. The msal-browser README drops MSAL's `storeAuthStateInCookie` (for Internet Explorer 11, deprecated in MSAL 4 and removed in MSAL 5) and describes Dataverse's CORS behaviour as the browser guide does; the appinsights `/browser` example passes a connection string it defines.
