---
"@mohsinonxrm/dataverse-sdk-files": patch
---

An empty (0-byte) file is uploaded as one `PATCH` on every route (#383). The `actions` route (also used by the default `auto`) used to start a block upload and commit an empty block list. A stream of unknown size that turns out to be empty is stored the same way.
