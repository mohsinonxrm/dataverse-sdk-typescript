---
"@mohsinonxrm/dataverse-sdk-actions": minor
"@mohsinonxrm/dataverse-sdk-functions": minor
"@mohsinonxrm/dataverse-sdk-messages": minor
---

The package roots export the complex and entity types their operations use (#333), type-only, so
they add no runtime code:

```ts
import type {
  ComplexLookupAttributeMetadata,
  EntityPayload,
  opportunityclose,
} from "@mohsinonxrm/dataverse-sdk-actions";
```

Before, only the enums were exported, and a type such as `opportunityclose` could only be reached
through `<Class>Parameters["X"]`. The `Typed<Name>` unions (`TypedQueryBase`) are exported too.

Dataverse declares a complex type `<Operation>Response` for an operation with several output
parameters. Where the package has that operation, the root's `<Operation>Response` stays the
operation's response (what `execute()` resolves; in messages, the response class), and the complex
type of the same name isn't re-exported. The entity type `solution` (next to the complex type
`Solution`) is now in each package's `types/index.ts` as well.
