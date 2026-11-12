---
"@mohsinonxrm/dataverse-sdk-generator": minor
---

Incremental generation: a table read again right after a change can come from a Dataverse server whose metadata cache is behind (#429). The run now checks each table it read again against what RetrieveMetadataChanges listed (the columns and options it listed, deleted columns, global choice values); when one is behind, it keeps the previous version stamp so the next run reads it again, instead of losing the change, and warns. `generateCode()` also returns `fetchReasons` (why each table was read again), and the CLI prints them.
