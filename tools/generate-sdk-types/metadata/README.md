# `$metadata` snapshot

`dataverse-metadata.xml` is the Dataverse Web API `$metadata` (CSDL) that
`@mohsinonxrm/dataverse-sdk-actions`, `-functions` and `-messages` are generated from (#293).
Regenerating from it needs no org and no credentials:

```bash
pnpm --filter generate-sdk-types regen
```

That rewrites the three packages' `src/` (a purge first, so removed operations disappear),
formats them with the repository's prettier config, and updates the operation lists and
`<!-- count:… -->` blocks in the READMEs and `docs/mapping/`. CI runs it and fails on any diff,
so the committed packages are always what the generator makes from this file. A generator change
therefore comes with the regenerated packages in the same PR.

## Where it comes from

- **Taken:** 2026-11-06.
- **Dataverse:** 9.2.26094.166 (online, Web API v9.2).
- **Dynamics 365 apps:** Sales (with Sales Insights and the sales agents), Customer Service (with
  Omnichannel / Contact Center, unified routing, SLAs and knowledge management), Customer
  Insights - Journeys (marketing), Universal Resource Scheduling, Power Pages and Process Mining.
- **Not installed:** Field Service, Project Operations.

The 1.0 packages came from an org that also had Field Service; its operations
(`msdyn_CreateWorkOrder`, `msdyn_FieldService…`, …) are not in this snapshot. See
`docs/migration-2.0.md`.

## How it differs from the raw `$metadata`

Dataverse returns `$metadata` on one line, in an order that changes between fetches. The
generator saves it rewritten (`src/snapshot.ts`), so a refresh shows only real changes:

- one element per line, indented;
- the children of `Schema`, `EntityContainer`, entity types, complex types and entity sets sorted
  by element and `Name`, and enum members by value. Operation parameters, entity keys and
  annotations keep their order;
- elements that mention a table made in the dev org itself (the publisher prefixes in
  `ORG_SPECIFIC_PREFIXES`) left out: such a table isn't part of a product.

Attribute values and text are unchanged. The file holds no hostname, tenant, org or user ids.
`test/snapshot.test.ts` checks that it's in this form and names no org.

## Refreshing it

Only a maintainer does this, by hand. CI never calls an org.

1. Use an org with the apps above (or say in the PR which apps changed). The generator signs in
   with client credentials: set `DATAVERSE_URL` and `AZURE_TENANT_ID`, `AZURE_CLIENT_ID`,
   `AZURE_CLIENT_SECRET` (or `DATAVERSE_TENANT_ID`, `DATAVERSE_CLIENT_ID`,
   `DATAVERSE_CLIENT_SECRET`), in the environment or in `tools/generate-sdk-types/.env`.
2. Fetch and save the snapshot, then regenerate:

   ```bash
   pnpm --filter generate-sdk-types snapshot
   pnpm --filter generate-sdk-types regen
   ```

3. Check the new file for anything that names the org: a new table with the org's own
   publisher prefix belongs in `ORG_SPECIFIC_PREFIXES` (then run both commands again).
4. Update the table above, add a changeset, and list the operations added and removed in the PR.
   A removed operation is a breaking change for anyone who uses it.
