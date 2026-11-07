---
"@mohsinonxrm/dataverse-sdk-actions": minor
"@mohsinonxrm/dataverse-sdk-functions": minor
"@mohsinonxrm/dataverse-sdk-messages": minor
---

The actions, functions and messages packages hold only the operations of the platform, Sales and Customer Service (#304). **Breaking.**

The snapshot org also has Contact Center, Customer Insights - Journeys, Universal Resource Scheduling, Power Pages and Process Mining, and the packages used to hold every operation it had. Now each operation is kept or left out by the solution it comes from: `snapshot` records each operation's Microsoft-managed solutions in `tools/generate-sdk-types/metadata/operation-solutions.json`, and `prebuilt-solutions.json` says which solutions are prebuilt. The solution table in `tools/generate-sdk-types/metadata/README.md` lists all 213 solutions with their operation counts.

- **Classes exported:** actions 1,556 → 1,072, functions 300 → 280, messages 1,556 → 1,072 (1.0 had 1,356, 229 and 1,356).
- **Left out:** 504 of the snapshot's 1,798 operations, those of Contact Center (Omnichannel, unified routing, voice: `CCaaS_*`), Universal Resource Scheduling, Customer Insights - Journeys (`msdynmkt_*`), Customer Voice, Connected Customer Service (IoT), Power Pages and Process Mining. Field Service and Project Operations aren't in the snapshot org, and their solutions would be left out the same way. `docs/migration-2.0.md` lists the operations 1.0 had that 2.0 hasn't.
- **Kept:** the Web API's query functions (`LastXDays`, …), `ExportToExcel`, and every operation in a platform, Sales or Customer Service solution, Sales Insights, Copilot in Sales and Customer Service and the sales agents included.
- **Types:** each package's `types/` has only the complex, entity and enum types its operations use, so the package root exports fewer enums.
- **The rest:** generate typed classes for another app's operations, or your custom APIs, from your org with `dataverse-gen`: see "Generate the rest with dataverse-gen" in `docs/getting-started.md`.
