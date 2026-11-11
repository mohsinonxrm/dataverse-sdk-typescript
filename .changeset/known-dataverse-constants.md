---
"@mohsinonxrm/dataverse-sdk-core": minor
"@mohsinonxrm/dataverse-sdk-auth-msal-browser": minor
---

Known Dataverse constants for headers, Prefer annotations, error codes and error names (#481). All are `as const` objects with a union type of the same name (no TypeScript `enum`), and the widened parameters still take any string, so existing code keeps compiling.

- **core:** `DataverseHeaders` names Dataverse's optional-parameter headers (`BypassBusinessLogicExecution`, `BypassCustomPluginExecution`, `SuppressCallbackRegistrationExpanderJob`, `SuppressDuplicateDetection`, `SolutionUniqueName`, `MergeLabels`, `SessionToken`, `Consistency`, …). `header(name, value)` suggests the documented values for them (`"CustomSync"`, `"Strong"`, `"true"`; `DataverseHeaderValues`, `DataverseHeaderValue<TName>`), and takes any other name or value as before.
- **core:** `Annotations` names the `odata.include-annotations` terms (`All`, `FormattedValue`, `LookupLogicalName`, `AssociatedNavigationProperty`, `ErrorDetails`, …); `Prefer.includeAnnotations()` and `PreferBuilder.formattedValues()` take `AnnotationTerm | (string & {})`.
- **core:** `DataverseErrorCode` names the error codes the SDK checks (`ObjectDoesNotExist`, `DuplicateRecordsFound`, `ExpiredVersionStamp`, `ConcurrencyVersionMismatch`, `ServiceProtectionRequests`, `ServiceProtectionExecutionTime`, `ServiceProtectionConcurrentRequests`, `UploadingAndDownloadingInMultipleChunksNotSupported`). `DataverseError.code` is typed `DataverseErrorCode | (string & {})`. New `hasErrorCode(error, code)` compares a code ignoring case, and matches the signed decimal form (`"-2147220969"`) too; the SDK's duplicate detection and `isDeltaLinkExpired()` use it.
- **core:** the named error classes type `name` with the names the SDK gives them (`DataverseAuthenticationErrorName`, `DataverseInvalidRequestErrorName`, `DataverseServiceErrorName`, `DataverseNetworkErrorName`; `"AbortError"`), plus any other string, so subclasses keep setting their own.
- **auth-msal-browser:** `MsalBrowserAuthenticationError.name` is typed `MsalBrowserAuthenticationErrorName` (`"TokenAcquisitionFailed" | "PopupBlocked"`) plus any other string.
