---
"@mohsinonxrm/dataverse-sdk-messages": patch
---

Export the `OrganizationRequestOptions` type (the `boundTo` option of `OrganizationRequest`) from the package root (#234), so `import type { OrganizationRequestOptions } from "@mohsinonxrm/dataverse-sdk-messages"` compiles. The generator's index template now emits it too, so a regeneration keeps it.
