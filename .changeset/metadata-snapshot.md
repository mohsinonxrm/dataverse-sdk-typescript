---
"@mohsinonxrm/dataverse-sdk-actions": minor
"@mohsinonxrm/dataverse-sdk-functions": minor
"@mohsinonxrm/dataverse-sdk-messages": minor
---

The actions, functions and messages packages are generated from a committed `$metadata` snapshot, so they can be reproduced (#293).

The 1.0 packages came from a `$metadata` that was never committed, and Dataverse returns `$metadata` in a different order on each fetch, so regenerating them gave different files. Now `tools/generate-sdk-types/metadata/dataverse-metadata.xml` (a dev org with Sales, Customer Service, Contact Center, Customer Insights - Journeys, Universal Resource Scheduling and Power Pages, taken 2026-11-06) is committed, the generator sorts the schema before generating, and CI checks that `pnpm --filter generate-sdk-types regen` reproduces the packages exactly.

- **Operation set.** Actions and messages: 1,360 → 1,556 (271 added, 75 removed). Functions: 281 → 300 (22 added, 3 removed).
- **Removed:** the snapshot org has no Field Service, so its operations are gone (`msdyn_CreateWorkOrder`, `msdyn_FieldService…`, agreement and IoT checks, `msdyn_SelectNotToExceed`, `msdyn_TradeCoverageNotification`), with `pbi_*` Power BI operations, `QuerySalesforceUnstructuredData`, `QueryZendeskUnstructuredArticles`, `SearchWeb` and `querystructureddatastream`. `docs/migration-2.0.md` lists all of them.
- Some operations gained or lost parameters with the org, for example `BulkDeleteAction` (optional `Options`) and `McpCreateTableAction` (required `usage`).
- Interfaces in `types/` and the response types list their members in name order, and the dev org's own test table is no longer in `types/` or the `EntityReference` tables.
- The operation counts in the READMEs and `docs/mapping` are generated, so they match the packages.
