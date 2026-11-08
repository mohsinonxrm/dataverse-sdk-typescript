---
"@mohsinonxrm/dataverse-sdk-actions": patch
"@mohsinonxrm/dataverse-sdk-functions": patch
"@mohsinonxrm/dataverse-sdk-messages": patch
"@mohsinonxrm/dataverse-sdk-generator": patch
---

Operations bound to one record put its id in the URL as a GUID literal (#386), as dataverse-gen's classes already did: `new QualifyLeadAction("{…}", …)` with a braced id from Xrm calls `/leads(…)` without the braces instead of getting a 400, and an id that isn't a GUID throws `DataverseInvalidRequestError` before the request is sent. The generators also sort by UTF-16 code unit instead of the machine's locale, so the package indexes list their exports in that order (`Zed` before `beta`), and dataverse-gen writes its imports the same way on every machine.
