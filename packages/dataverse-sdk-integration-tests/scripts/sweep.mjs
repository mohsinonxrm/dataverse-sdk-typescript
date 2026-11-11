#!/usr/bin/env node
/**
 * Deletes the records earlier live runs left behind (a cancelled run, a timed-out hook, a sample
 * that failed part-way). The nightly Integration Tests workflow runs it with `--delete` as its
 * last step; run it by hand the same way. Uses the built SDK (`pnpm build`) and the same four
 * variables as the live tests (never logged):
 *   DATAVERSE_URL, DATAVERSE_TENANT_ID, DATAVERSE_CLIENT_ID, DATAVERSE_CLIENT_SECRET
 *
 *   node packages/dataverse-sdk-integration-tests/scripts/sweep.mjs [--dry-run]  # list only (default)
 *   node packages/dataverse-sdk-integration-tests/scripts/sweep.mjs --delete     # delete them
 *
 * A record is swept only when BOTH hold:
 *   - its name column starts with a prefix the live tests or the samples use: `sdk-it-` (a test
 *     run's id), `sdk-int ` (test records named by area, then the run's id) or `sdk-sample-`
 *     (scripts/samples-live.mjs);
 *   - it was created more than 2 hours ago (`createdon lt <now - 2 h>`), so a run in progress
 *     is never touched (a whole live run takes 15 to 30 minutes).
 *
 * Test schema (tables `new_sdkit…`, global choices `new_sdkitgc…`, and the samples' metadata
 * whose display name starts with `sdk-sample-`) is listed, never deleted: a global choice has no
 * creation date, so a run in progress can't be told apart, and deleting a table deletes its data
 * and relationships with it. Delete those by hand.
 *
 * Exits non-zero when the variables are missing, a query fails, or a record can't be deleted
 * (one that's already gone counts as deleted).
 */

const PREFIXES = ["sdk-it-", "sdk-int ", "sdk-sample-"];
const MIN_AGE_HOURS = 2;

/**
 * The tables the live tests and the samples create records in, in delete order (contacts before
 * accounts, which can cascade to them), with the column that holds the name.
 */
const TABLES = [
  { set: "opportunities", nameColumn: "name" },
  { set: "leads", nameColumn: "subject" },
  { set: "contacts", nameColumn: "lastname" },
  { set: "accounts", nameColumn: "name" },
  // Never a business unit's default team
  { set: "teams", nameColumn: "name", extra: "isdefault eq false" },
  // The file tests' table; not every org has it
  { set: "msdyn_richtextfiles", nameColumn: "msdyn_name" },
  // messages-sales-cs exports an empty unmanaged solution; deleting it deletes only the solution
  { set: "solutions", nameColumn: "friendlyname", extra: "ismanaged eq false" },
];

/** Test schema: listed only. */
const SCHEMA_PREFIX = "new_sdkit";
const SAMPLE_LABEL_PREFIX = "sdk-sample-";

const REQUIRED = [
  "DATAVERSE_URL",
  "DATAVERSE_TENANT_ID",
  "DATAVERSE_CLIENT_ID",
  "DATAVERSE_CLIENT_SECRET",
];

const USAGE = "Usage: node scripts/sweep.mjs [--dry-run | --delete]";

const args = process.argv.slice(2);
if (args.includes("--help") || args.includes("-h")) {
  console.log(USAGE);
  process.exit(0);
}
const unknown = args.filter((a) => a !== "--dry-run" && a !== "--delete");
if (unknown.length > 0 || (args.includes("--dry-run") && args.includes("--delete"))) {
  console.error(
    unknown.length > 0
      ? `Unknown argument(s): ${unknown.join(" ")}`
      : "--dry-run and --delete can't be used together"
  );
  console.error(USAGE);
  process.exit(2);
}
const remove = args.includes("--delete");

const missing = REQUIRED.filter((name) => !process.env[name]);
if (missing.length > 0) {
  console.error(`sweep: needs a Dataverse org. Missing: ${missing.join(", ")}`);
  console.error("Set DATAVERSE_URL, DATAVERSE_TENANT_ID, DATAVERSE_CLIENT_ID and");
  console.error("DATAVERSE_CLIENT_SECRET (an app registration that is an application user in the");
  console.error("org), as for `pnpm test:integration`. Nothing was queried or deleted.");
  process.exit(1);
}

let sdk;
try {
  const [msal, auth, core] = await Promise.all([
    import("@azure/msal-node"),
    import("@mohsinonxrm/dataverse-sdk-auth-msal-node"),
    import("@mohsinonxrm/dataverse-sdk-core"),
  ]);
  sdk = { ...msal, ...auth, ...core };
} catch (error) {
  console.error("sweep: can't load the SDK. Run `pnpm install` and `pnpm build` first.");
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
const { ConfidentialClientApplication, MsalNodeTokenProvider, DataverseClient, odata } = sdk;

const orgUrl = new URL(process.env.DATAVERSE_URL ?? "").origin;
const noop = () => undefined;
const client = new DataverseClient({
  baseUrl: orgUrl,
  tokenProvider: new MsalNodeTokenProvider(
    new ConfidentialClientApplication({
      auth: {
        clientId: process.env.DATAVERSE_CLIENT_ID ?? "",
        clientSecret: process.env.DATAVERSE_CLIENT_SECRET ?? "",
        authority: `https://login.microsoftonline.com/${process.env.DATAVERSE_TENANT_ID ?? ""}`,
      },
    }),
    { flow: "clientCredentials", scopes: [`${orgUrl}/.default`] }
  ),
  logger: { debug: noop, info: noop, warn: noop, error: noop },
});

const cutoff = new Date(Date.now() - MIN_AGE_HOURS * 60 * 60 * 1000);
const message = (error) => (error instanceof Error ? error.message : String(error));
const hasPrefix = (value) => typeof value === "string" && PREFIXES.some((p) => value.startsWith(p));

console.log(
  `${remove ? "Deleting" : "Dry run: listing"} test records named ${PREFIXES.map((p) => `"${p}…"`).join(", ")} ` +
    `created before ${cutoff.toISOString()} (${String(MIN_AGE_HOURS)} h ago).`
);

let failures = 0;
let found = 0;
let deleted = 0;

for (const { set, nameColumn, extra } of TABLES) {
  // The primary key from metadata; no row means the org doesn't have the table.
  let key;
  try {
    const defs = await client
      .api("EntityDefinitions")
      .select("PrimaryIdAttribute")
      .filter(odata.eq("EntitySetName", set))
      .get();
    key = defs.value[0]?.PrimaryIdAttribute;
  } catch (error) {
    failures++;
    console.error(`  ${set}: can't read its definition: ${message(error)}`);
    continue;
  }
  if (!key) {
    console.log(`  ${set}: not in this org, skipped`);
    continue;
  }

  let rows;
  try {
    const clauses = [
      odata.or(...PREFIXES.map((p) => odata.startsWith(nameColumn, p))),
      odata.lt("createdon", cutoff),
    ];
    if (extra) clauses.push(extra);
    rows = await client
      .api(set)
      .select(key, nameColumn, "createdon")
      .filter(odata.and(...clauses))
      .orderBy("createdon")
      .getAll();
  } catch (error) {
    failures++;
    console.error(`  ${set}: query failed: ${message(error)}`);
    continue;
  }
  // The same rules again on what came back, so a filter Dataverse read differently can't widen it
  rows = rows.filter(
    (row) => hasPrefix(row[nameColumn]) && Date.parse(String(row.createdon)) < cutoff.getTime()
  );
  console.log(`  ${set}: ${String(rows.length)} left behind`);
  found += rows.length;

  for (const row of rows) {
    const label = `${String(row.createdon)}  ${String(row[nameColumn])}`;
    if (!remove) {
      console.log(`    would delete  ${label}`);
      continue;
    }
    try {
      await client.api(`${set}(${String(row[key])})`).delete();
      deleted++;
      console.log(`    deleted       ${label}`);
    } catch (error) {
      // Already gone (deleting an account can delete its contacts) counts as deleted
      if (error?.status === 404) {
        deleted++;
        console.log(`    already gone  ${label}`);
        continue;
      }
      failures++;
      console.error(`    FAILED        ${label}: ${message(error)}`);
    }
  }
}

// Schema: listed, never deleted (see the header).
const labelOf = (def) => def?.DisplayName?.UserLocalizedLabel?.Label ?? "";
const isTestSchema = (name, def) =>
  String(name).startsWith(SCHEMA_PREFIX) || labelOf(def).startsWith(SAMPLE_LABEL_PREFIX);
try {
  const tables = await client
    .api("EntityDefinitions")
    .select("LogicalName", "DisplayName", "CreatedOn")
    .filter("IsCustomEntity eq true")
    .get();
  const left = tables.value.filter((t) => isTestSchema(t.LogicalName, t));
  console.log(`  test tables (listed, not deleted): ${String(left.length)}`);
  for (const t of left) {
    console.log(`    ${String(t.CreatedOn ?? "?")}  ${String(t.LogicalName)}  ${labelOf(t)}`);
  }
} catch (error) {
  console.warn(`  test tables: couldn't list them: ${message(error)}`);
}
try {
  const choices = await client
    .api("GlobalOptionSetDefinitions")
    .select("Name", "DisplayName")
    .get();
  const left = choices.value.filter((c) => isTestSchema(c.Name, c));
  console.log(`  test global choices (listed, not deleted): ${String(left.length)}`);
  for (const c of left) console.log(`    ${String(c.Name)}  ${labelOf(c)}`);
} catch (error) {
  console.warn(`  test global choices: couldn't list them: ${message(error)}`);
}

console.log(
  remove
    ? `Deleted ${String(deleted)} of ${String(found)} record(s); ${String(failures)} failure(s).`
    : `Would delete ${String(found)} record(s); ${String(failures)} failure(s). Run with --delete to delete them.`
);
process.exit(failures > 0 ? 1 : 0);
