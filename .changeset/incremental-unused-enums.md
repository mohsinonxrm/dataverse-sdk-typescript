---
"@mohsinonxrm/dataverse-sdk-generator": patch
---

Incremental generation (`output.incremental`) no longer regenerates every table when a global choice or complex type that no generated table uses is added to, changed in or removed from the org's `$metadata` (#501). The settings hash now covers the options, the templates and the names of the generated tables; each table's hash also covers the enums and complex types it uses (directly or through a complex type) and the names of its create, update and form types. A change to an enum a table uses regenerates only that table. The enum, complex type, operation and index files are written on every run, as before, and still include every enum and complex type.
