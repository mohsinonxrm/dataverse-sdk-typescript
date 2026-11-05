---
"@mohsinonxrm/dataverse-sdk-actions": patch
"@mohsinonxrm/dataverse-sdk-messages": patch
---

Generated actions and messages now declare their JSON body with a lower-case `content-type: application/json` header, the casing the core uses. Before, they set `Content-Type`. With an older core this was sent next to the core's own `content-type`, and `fetch` combined the two into one invalid value on every action call (#23).
