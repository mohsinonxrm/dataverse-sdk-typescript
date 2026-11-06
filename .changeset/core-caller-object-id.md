---
"@mohsinonxrm/dataverse-sdk-core": minor
---

Impersonation by Microsoft Entra object id (#48). `impersonate(id, { by: "aadObjectId" })` and `impersonateByObjectId(objectId)` send `CallerObjectId`, which Microsoft recommends because the object id is the same in every environment. `impersonate(id)` still sends `MSCRMCallerID` with a `systemuserid`. Exactly one of the two headers is sent: a later call replaces an earlier one, and a request that would carry both, for example one added with `.header()`, is refused with `DataverseInvalidRequestError` before it is sent.
