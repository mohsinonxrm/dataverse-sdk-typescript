---
"@mohsinonxrm/dataverse-sdk-generator": minor
---

Typed `Xrm.FormContext` for model-driven form scripts, behind `"formContext": true` (#347). Each table gets `forms/<Entity>Form.ts` with `<Entity>Attributes` and `<Entity>Controls` (its columns by logical name, typed with their `@types/xrm` attribute and control types; choice columns with their enum) and `<Entity>FormContext`, whose `getAttribute()` and `getControl()` take those names (`header_<name>` and `header_process_<name>` for controls). `@types/xrm` is an optional peer dependency. `DataverseGenConfig` has `formContext`, and `dataverse-gen validate` checks it.
