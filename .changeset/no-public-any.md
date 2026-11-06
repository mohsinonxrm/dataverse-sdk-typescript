---
"@mohsinonxrm/dataverse-sdk-batch": minor
"@mohsinonxrm/dataverse-sdk-core": minor
"@mohsinonxrm/dataverse-sdk-entities-runtime": minor
"@mohsinonxrm/dataverse-sdk-auth-msal-node": patch
"@mohsinonxrm/dataverse-sdk-generator": patch
---

No `any` in the public API. **Breaking for TypeScript callers.**

- **batch:** `BatchResponseStep.body` and `BatchResponsePart.body` are `unknown`. Both types take a generic for the body, `BatchResponseStep<TBody = unknown>`, so name the type of a response you know (`result.responses.get("who") as BatchResponseStep<WhoAmIResponse> | undefined`) or check the value. The request body of `addRequest()` and `BatchRequestStep` is `unknown`; every value is still accepted.
- **entities-runtime:** `IEntity`'s index signature is `[key: string]: unknown`. Declared columns keep their types; any other property must be checked before use.
- **core:** `DataverseServiceError.fromResponse(response, body?)` takes `body` as `unknown` and reads `code` and `message` only when they are strings. A response body that isn't JSON is kept as the text instead of making `fromResponse()` throw. `DataverseBatchError<TResult, TStep>` defaults its type parameters to `unknown` instead of `any` (the batch package still narrows them).
- **auth-msal-node, generator:** internal `as any` casts replaced with narrowing; no behaviour change.
