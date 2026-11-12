---
"@mohsinonxrm/dataverse-sdk-generator": patch
---

The `dataverse-gen` CLI now depends on `@azure/msal-node` 7 (was 2) and `ora` 10 (was 8) (#486). An install of the generator no longer brings in `uuid` 8.3.2 through msal-node 2, which scanners flag. The CLI's device code and client credentials sign-in work as before; both packages support every Node version the generator does (Node 22+). `@mohsinonxrm/dataverse-sdk-auth-msal-node`'s peer range is unchanged: it still accepts `@azure/msal-node` 2.16.3 and later, through 7.
