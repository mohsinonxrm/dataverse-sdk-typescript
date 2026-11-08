---
"@mohsinonxrm/dataverse-sdk-generator": minor
---

Incremental generation and custom templates (#347).

- `"output": { "incremental": true }` regenerates only the tables whose schema model changed: a stamp file in the output folder (`.dataverse-gen-stamp.json`) records a hash of each table and of the settings, and a table whose hash is unchanged keeps its files untouched. A change of options, templates, generator version or of the set of generated types regenerates every table; files the previous run wrote that this one doesn't are removed. `generateCode()` resolves `unchangedTables`, `TypescriptGenerator` has `unchangedTables`, and the CLI prints them.
- `"templates": "<dir>"` uses the EJS templates in that directory instead of the built-in ones of the same name. `dataverse-gen eject [dir] [--force]` and `ejectTemplates()` copy the built-in templates there; `TEMPLATE_NAMES` lists them.
- `dataverse-gen validate` checks `output.incremental` and `templates`.
