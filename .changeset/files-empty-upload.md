---
"@mohsinonxrm/dataverse-sdk-files": patch
---

An empty (0-byte) file now uploads with every `method` (#383). Dataverse stores an empty file only as an empty block list committed through the actions route: a `PATCH` with no body is refused (400, `0x80060888`) and so is an empty chunk (416), as a live org confirmed. `"single"` and `"patch-chunked"` used to send a 0-byte file as an empty `PATCH`, which failed; every method now sends it through the actions route.
