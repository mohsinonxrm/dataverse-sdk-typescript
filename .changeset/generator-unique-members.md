---
"@mohsinonxrm/dataverse-sdk-generator": patch
---

Generated entities have unique member names (#244). A table whose lookup also has `<lookup>_<table>` collection navigation properties (`systemuser`: `createdby` and `createdby_sdkmessage`) no longer gets a second, collection-typed `createdby` merged in, which made `SystemUser.ts` fail strict `tsc` with duplicate members. Only single-valued `<lookup>_<target>` properties are merged into a polymorphic lookup, and a lookup that already has a navigation property of its own name is left alone. Any remaining duplicate navigation name is suffixed with its relationship name.
