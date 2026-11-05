---
"@mohsinonxrm/dataverse-sdk-core": patch
---

Fix `validateUrl` rejecting valid queries (#10). The 260-character segment limit now applies to URL **path** segments only, and percent-encoded segments are measured by their decoded length. Before, everything after the last `/` counted as one segment, including the whole query string, so a long `$filter`, `$select`, FetchXML or nextLink threw `DataverseUrlError` unless the caller used `.skipUrlValidation()`. The 32,768-character limit on the whole URL still applies.
