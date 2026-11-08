/**
 * Comprehensive $batch operations sample demonstrating:
 * - Changesets (transactional groups)
 * - Content-ID references ($<id>: a change set request's id is its Content-ID)
 * - Prefer: odata.continue-on-error
 * - Partial success handling
 * - Mixed operations (create, update, delete, query)
 * - Performance comparison: batch vs individual vs bulk
 */

import * as fs from "node:fs";
import * as path from "node:path";
import chalk from "chalk";
import { DataverseClient, DataverseError, odata } from "@mohsinonxrm/dataverse-sdk-core";
import { MsalNodeTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-node";
import { BatchRequestBuilder } from "@mohsinonxrm/dataverse-sdk-batch";
import { ConfidentialClientApplication } from "@azure/msal-node";
import { CreateMultipleAction } from "@mohsinonxrm/dataverse-sdk-actions";

// Load environment variables
const env = loadEnv();

interface Config {
  clientId: string;
  tenantId: string;
  clientSecret: string;
  dataverseUrl: string;
}

/**
 * Simple .env file loader
 */
function loadEnv(): Config {
  const envPath = path.join(process.cwd(), ".env");
  const env: Record<string, string> = {};

  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const [key, ...valueParts] = trimmed.split("=");
      if (key && valueParts.length > 0) {
        env[key.trim()] = valueParts.join("=").trim();
      }
    }
  }

  // AZURE_* (this sample's names) or DATAVERSE_* (the names the repository's live CI uses)
  const setting = (...names: string[]): string | undefined =>
    names.map((name) => env[name] || process.env[name]).find(Boolean);
  const clientId = setting("AZURE_CLIENT_ID", "DATAVERSE_CLIENT_ID");
  const tenantId = setting("AZURE_TENANT_ID", "DATAVERSE_TENANT_ID");
  const clientSecret = setting("AZURE_CLIENT_SECRET", "DATAVERSE_CLIENT_SECRET");
  const dataverseUrl = setting("DATAVERSE_URL");

  if (!clientId || !tenantId || !clientSecret || !dataverseUrl) {
    console.error(chalk.red("❌ Missing required environment variables!"));
    console.error(chalk.yellow("Create a .env file (or set environment variables) with:"));
    console.error(chalk.yellow("  AZURE_CLIENT_ID=your-app-registration-id"));
    console.error(chalk.yellow("  AZURE_TENANT_ID=your-tenant-id"));
    console.error(chalk.yellow("  AZURE_CLIENT_SECRET=your-client-secret"));
    console.error(chalk.yellow("  DATAVERSE_URL=https://yourorg.crm.dynamics.com"));
    console.error(
      chalk.yellow(
        "DATAVERSE_CLIENT_ID, DATAVERSE_TENANT_ID and DATAVERSE_CLIENT_SECRET also work."
      )
    );
    process.exit(1);
  }

  return { clientId, tenantId, clientSecret, dataverseUrl };
}

/**
 * Every account and contact this run creates is named `sdk-sample-<tag> ...` (accounts by name,
 * contacts by last name), so cleanup can find them all. SAMPLE_RUN_TAG sets the tag (lowercase
 * letters and digits); otherwise it's random.
 */
const runTag = process.env.SAMPLE_RUN_TAG ?? Math.random().toString(36).slice(2, 8);
if (!/^[a-z0-9]{1,10}$/.test(runTag)) {
  console.error(chalk.red("❌ SAMPLE_RUN_TAG must be 1 to 10 lowercase letters or digits."));
  process.exit(1);
}
const runId = `sdk-sample-${runTag}`;
/** `name` prefixed with this run's id. */
const named = (name: string): string => `${runId} ${name}`;

/**
 * Demo 1: Simple batch without changeset
 * Shows parallel independent operations
 */
async function simpleBatchDemo(client: DataverseClient): Promise<void> {
  console.log(chalk.bold.blue("\n=== Demo 1: Simple Batch (No Changeset) ===\n"));
  console.log(chalk.gray("Creating 3 accounts in parallel (non-transactional)..."));

  const batch = new BatchRequestBuilder(client);

  // Add individual create operations (no changeset = no transaction)
  batch.addRequest(
    "req1",
    "POST",
    "/accounts",
    { "Content-Type": "application/json", Prefer: "return=representation" },
    {
      name: named("Simple Batch Account 1"),
      telephone1: "555-1001",
    }
  );

  batch.addRequest(
    "req2",
    "POST",
    "/accounts",
    { "Content-Type": "application/json", Prefer: "return=representation" },
    {
      name: named("Simple Batch Account 2"),
      telephone1: "555-1002",
    }
  );

  batch.addRequest(
    "req3",
    "POST",
    "/accounts",
    { "Content-Type": "application/json", Prefer: "return=representation" },
    {
      name: named("Simple Batch Account 3"),
      telephone1: "555-1003",
    }
  );

  const startTime = Date.now();
  const result = await batch.execute();
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log(chalk.green(`✓ Simple batch completed in ${duration}s`));
  console.log(chalk.gray(`  Created 3 accounts (non-transactional)`));
  console.log(
    chalk.gray(`  Success: ${String(result.success)}, Total: ${String(result.responses.size)}`)
  );
}

/**
 * Demo 2: Changeset (transactional batch)
 * All operations succeed or all fail
 */
async function changesetDemo(client: DataverseClient): Promise<void> {
  console.log(chalk.bold.blue("\n=== Demo 2: Changeset (Transactional Batch) ===\n"));
  console.log(chalk.gray("Creating account and 2 contacts in a transaction..."));

  const batch = new BatchRequestBuilder(client);

  batch.beginChangeset();

  // Create account
  batch.addRequest(
    "create-account",
    "POST",
    "/accounts",
    { "Content-Type": "application/json", Prefer: "return=representation" },
    {
      name: named("Transactional Account"),
      telephone1: "555-2001",
    }
  );

  // Create first contact
  batch.addRequest(
    "create-contact1",
    "POST",
    "/contacts",
    { "Content-Type": "application/json", Prefer: "return=representation" },
    {
      firstname: "John",
      lastname: named("Doe"),
      telephone1: "555-2002",
    }
  );

  // Create second contact
  batch.addRequest(
    "create-contact2",
    "POST",
    "/contacts",
    { "Content-Type": "application/json", Prefer: "return=representation" },
    {
      firstname: "Jane",
      lastname: named("Smith"),
      telephone1: "555-2003",
    }
  );

  batch.endChangeset();

  const startTime = Date.now();
  const result = await batch.execute();
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log(chalk.green(`✓ Changeset completed in ${duration}s`));
  console.log(chalk.gray(`  All operations committed as one transaction`));
  console.log(chalk.gray(`  Success: ${String(result.success)}`));
}

/**
 * Demo 3: Content-ID references
 * Inside a change set a request's id is its Content-ID, so a later request can refer to the
 * record an earlier one creates as $<id>
 */
async function contentIdReferenceDemo(client: DataverseClient): Promise<void> {
  console.log(chalk.bold.blue("\n=== Demo 3: Content-ID References ===\n"));
  console.log(chalk.gray("Creating account and linking 2 contacts using a $account reference..."));

  const batch = new BatchRequestBuilder(client);

  batch.beginChangeset();

  // Create parent account; its id, "account", is also its Content-ID
  batch.addRequest(
    "account",
    "POST",
    "/accounts",
    { "Content-Type": "application/json", Prefer: "return=representation" },
    {
      name: named("Parent Account with References"),
      telephone1: "555-3001",
    }
  );

  // Create first contact and link to the parent with $account
  batch.addRequest(
    "contact1",
    "POST",
    "/contacts",
    { "Content-Type": "application/json", Prefer: "return=representation" },
    {
      firstname: "Child",
      lastname: named("Contact 1"),
      telephone1: "555-3002",
      // Reference the account created by the request with id "account"
      "parentcustomerid_account@odata.bind": "$account",
    },
    ["account"]
  );

  // Create second contact and link to the parent with $account
  batch.addRequest(
    "contact2",
    "POST",
    "/contacts",
    { "Content-Type": "application/json", Prefer: "return=representation" },
    {
      firstname: "Child",
      lastname: named("Contact 2"),
      telephone1: "555-3003",
      // Reference the same account
      "parentcustomerid_account@odata.bind": "$account",
    },
    ["account"]
  );

  batch.endChangeset();

  const startTime = Date.now();
  await batch.execute();
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log(chalk.green(`✓ Batch with Content-ID references completed in ${duration}s`));
  console.log(chalk.gray(`  Parent account created and 2 contacts linked automatically`));
}

/**
 * Demo 4: Continue-on-error
 * Some operations fail, others succeed
 */
async function continueOnErrorDemo(client: DataverseClient): Promise<void> {
  console.log(chalk.bold.blue("\n=== Demo 4: Continue-on-Error (Partial Success) ===\n"));
  console.log(chalk.gray("Creating 5 accounts, 1 with invalid data..."));

  const batch = new BatchRequestBuilder(client);

  // Valid account 1
  batch.addRequest(
    "req1",
    "POST",
    "/accounts",
    { "Content-Type": "application/json", Prefer: "return=representation" },
    {
      name: named("Valid Account 1"),
      telephone1: "555-4001",
    }
  );

  // Valid account 2
  batch.addRequest(
    "req2",
    "POST",
    "/accounts",
    { "Content-Type": "application/json", Prefer: "return=representation" },
    {
      name: named("Valid Account 2"),
      telephone1: "555-4002",
    }
  );

  // Invalid account (reference non-existent contact)
  batch.addRequest(
    "req3",
    "POST",
    "/accounts",
    { "Content-Type": "application/json", Prefer: "return=representation" },
    {
      name: named("Invalid Account"),
      // Reference non-existent primary contact
      "primarycontactid@odata.bind": "/contacts(00000000-0000-0000-0000-000000000000)",
    }
  );

  // Valid account 3
  batch.addRequest(
    "req4",
    "POST",
    "/accounts",
    { "Content-Type": "application/json", Prefer: "return=representation" },
    {
      name: named("Valid Account 3"),
      telephone1: "555-4003",
    }
  );

  // Valid account 4
  batch.addRequest(
    "req5",
    "POST",
    "/accounts",
    { "Content-Type": "application/json", Prefer: "return=representation" },
    {
      name: named("Valid Account 4"),
      telephone1: "555-4004",
    }
  );

  const startTime = Date.now();
  const result = await batch.execute({ continueOnError: true });
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log(chalk.yellow(`⚠️  Batch completed with partial success in ${duration}s`));

  let successCount = 0;
  let failureCount = 0;

  for (const [id, resp] of result.responses) {
    if (resp.status >= 200 && resp.status < 300) {
      successCount++;
      console.log(chalk.green(`  ✓ Request ${id}: Success (${resp.status.toString()})`));
    } else {
      failureCount++;
      console.log(chalk.red(`  ✗ Request ${id}: Failed (${resp.status.toString()})`));
      if (resp.body && typeof resp.body === "object") {
        const errorBody = resp.body as { error?: { message?: string } };
        if (errorBody.error?.message) {
          console.log(chalk.gray(`    Error: ${errorBody.error.message}`));
        }
      }
    }
  }

  console.log(
    chalk.gray(`\n  Summary: ${String(successCount)} succeeded, ${String(failureCount)} failed`)
  );

  // Only the invalid request should have failed
  if (result.errors.size !== 1 || !result.errors.has("req3") || successCount !== 4) {
    throw new Error("Expected exactly one failed request, req3 (the invalid account)");
  }
}

/**
 * Demo 5: Mixed operations (CRUD + query)
 * Create, update, delete, and query in one batch
 */
async function mixedOperationsDemo(client: DataverseClient): Promise<void> {
  console.log(chalk.bold.blue("\n=== Demo 5: Mixed Operations (CRUD + Query) ===\n"));
  console.log(chalk.gray("Performing create, update, delete, and query in one batch..."));

  // Step 1: Create test accounts first (outside batch)
  console.log(chalk.gray("  Setting up: Creating test accounts..."));
  const testAccount = await client
    .api("/accounts")
    .header("Prefer", "return=representation")
    .post<{ accountid: string }>({
      name: named("Account to Update"),
      telephone1: "555-5001",
    });
  const testAccountId = testAccount.accountid;

  const deleteAccount = await client
    .api("/accounts")
    .header("Prefer", "return=representation")
    .post<{ accountid: string }>({
      name: named("Account to Delete"),
      telephone1: "555-5002",
    });
  const deleteAccountId = deleteAccount.accountid;

  console.log(chalk.gray("  Test data created, executing mixed batch..."));

  // Step 2: Build batch with mixed operations
  const batch = new BatchRequestBuilder(client);

  // Query operation
  batch.addRequest("query", "GET", "/accounts?$select=name&$top=5");

  // Changeset with create, update, delete
  batch.beginChangeset();

  // Create operation
  batch.addRequest(
    "create",
    "POST",
    "/accounts",
    { "Content-Type": "application/json", Prefer: "return=representation" },
    {
      name: named("New Account from Mixed Batch"),
      telephone1: "555-5003",
    }
  );

  // Update operation
  batch.addRequest(
    "update",
    "PATCH",
    `/accounts(${testAccountId})`,
    { "Content-Type": "application/json" },
    {
      websiteurl: "https://updated.example.com",
      description: "Updated via mixed batch",
    }
  );

  // Delete operation
  batch.addRequest("delete", "DELETE", `/accounts(${deleteAccountId})`);

  batch.endChangeset();

  const startTime = Date.now();
  const result = await batch.execute();
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log(chalk.green(`✓ Mixed batch completed in ${duration}s`));
  console.log(chalk.gray(`  Operations: 1 query, 1 create, 1 update, 1 delete`));

  // Show query results
  const queryResponse = result.responses.get("query");
  if (queryResponse?.status === 200 && queryResponse.body) {
    const body = queryResponse.body as { value?: Array<{ name: string }> };
    if (body.value) {
      console.log(chalk.gray(`\n  Query returned ${String(body.value.length)} accounts:`));
      body.value.slice(0, 3).forEach((acc) => {
        console.log(chalk.gray(`    • ${acc.name}`));
      });
    }
  }

  // Cleanup the test account
  await client.api(`/accounts(${testAccountId})`).delete();
}

/**
 * Demo 6: Performance comparison
 * Individual vs Batch vs Bulk operations
 */
async function performanceComparisonDemo(client: DataverseClient): Promise<void> {
  console.log(chalk.bold.blue("\n=== Demo 6: Performance Comparison ===\n"));

  const recordCount = 10;

  // Method 1: Individual API calls
  console.log(chalk.gray(`Creating ${String(recordCount)} accounts individually...`));
  const startIndividual = Date.now();
  const individualIds: string[] = [];

  for (let i = 0; i < recordCount; i++) {
    const response = await client
      .api("/accounts")
      .header("Prefer", "return=representation")
      .post<{ accountid: string }>({
        name: named(`Individual Account ${String(i + 1)}`),
        telephone1: `555-6${String(i + 1).padStart(3, "0")}`,
      });
    individualIds.push(response.accountid);
  }

  const durationIndividual = ((Date.now() - startIndividual) / 1000).toFixed(2);
  const rateIndividual = (recordCount / parseFloat(durationIndividual)).toFixed(1);

  console.log(chalk.yellow(`  Individual: ${durationIndividual}s (${rateIndividual} records/sec)`));

  // Method 2: Batch with changeset
  console.log(chalk.gray(`\nCreating ${String(recordCount)} accounts in batch...`));
  const startBatch = Date.now();

  const batch = new BatchRequestBuilder(client);
  batch.beginChangeset();

  for (let i = 0; i < recordCount; i++) {
    batch.addRequest(
      `batch-${String(i)}`,
      "POST",
      "/accounts",
      { "Content-Type": "application/json", Prefer: "return=representation" },
      {
        name: named(`Batch Account ${String(i + 1)}`),
        telephone1: `555-7${String(i + 1).padStart(3, "0")}`,
      }
    );
  }

  batch.endChangeset();
  const batchResult = await batch.execute();

  const durationBatch = ((Date.now() - startBatch) / 1000).toFixed(2);
  const rateBatch = (recordCount / parseFloat(durationBatch)).toFixed(1);

  console.log(chalk.green(`  Batch: ${durationBatch}s (${rateBatch} records/sec)`));

  // Extract batch IDs
  const batchIds: string[] = [];
  for (const [, resp] of batchResult.responses) {
    if (resp.status === 201 && resp.body && typeof resp.body === "object") {
      const body = resp.body as { accountid?: string };
      if (body.accountid) {
        batchIds.push(body.accountid);
      }
    }
  }

  // Method 3: Bulk (CreateMultiple)
  console.log(chalk.gray(`\nCreating ${String(recordCount)} accounts with CreateMultiple...`));

  const bulkAccounts = Array.from({ length: recordCount }, (_, i) => ({
    "@odata.type": "Microsoft.Dynamics.CRM.account",
    name: named(`Bulk Account ${String(i + 1)}`),
    telephone1: `555-8${String(i + 1).padStart(3, "0")}`,
  }));

  const startBulk = Date.now();
  const action = new CreateMultipleAction("accounts", { Targets: bulkAccounts });
  const bulkResponse = await client.execute(action);
  const durationBulk = ((Date.now() - startBulk) / 1000).toFixed(2);
  const rateBulk = (recordCount / parseFloat(durationBulk)).toFixed(1);

  console.log(chalk.green(`  Bulk: ${durationBulk}s (${rateBulk} records/sec)`));

  // Summary
  console.log(chalk.bold.cyan("\n  Performance Summary:"));
  console.log(chalk.gray(`    Individual: ${durationIndividual}s (baseline)`));
  console.log(
    chalk.gray(
      `    Batch:      ${durationBatch}s (${(parseFloat(durationIndividual) / parseFloat(durationBatch)).toFixed(1)}x faster)`
    )
  );
  console.log(
    chalk.gray(
      `    Bulk:       ${durationBulk}s (${(parseFloat(durationIndividual) / parseFloat(durationBulk)).toFixed(1)}x faster)`
    )
  );

  // Cleanup
  console.log(chalk.gray("\n  Cleaning up test data..."));
  const allIds: string[] = [...individualIds, ...batchIds, ...bulkResponse.Ids];

  // Delete in batch
  const cleanupBatch = new BatchRequestBuilder(client);
  cleanupBatch.beginChangeset();
  allIds.forEach((id, i) => {
    cleanupBatch.addRequest(`delete-${String(i)}`, "DELETE", `/accounts(${id})`);
  });
  cleanupBatch.endChangeset();
  await cleanupBatch.execute();

  console.log(chalk.green(`  ✓ Deleted ${String(allIds.length)} test accounts`));
}

/**
 * Main application flow
 */
async function main() {
  console.log(chalk.bold.cyan("\n=== Dataverse SDK - Batch Operations Sample ===\n"));

  // Initialize authentication
  console.log(chalk.blue("🔐 Initializing authentication..."));

  const cca = new ConfidentialClientApplication({
    auth: {
      clientId: env.clientId,
      authority: `https://login.microsoftonline.com/${env.tenantId}`,
      clientSecret: env.clientSecret,
    },
  });

  const tokenProvider = new MsalNodeTokenProvider(cca, {
    flow: "clientCredentials",
    scopes: [`${new URL(env.dataverseUrl).origin}/.default`],
  });

  console.log(chalk.green("✓ Authenticated"));
  console.log(chalk.gray(`  Environment: ${env.dataverseUrl}\n`));

  // Create client
  const client = new DataverseClient({
    baseUrl: env.dataverseUrl,
    tokenProvider,
  });

  console.log(chalk.gray(`  Run id: ${runId} (every record this run creates is named with it)\n`));

  let failed = false;
  try {
    // Run all demos
    await simpleBatchDemo(client);
    await changesetDemo(client);
    await contentIdReferenceDemo(client);
    await continueOnErrorDemo(client);
    await mixedOperationsDemo(client);
    await performanceComparisonDemo(client);

    console.log(chalk.bold.green("\n✅ All batch operation demos completed!\n"));

    // Summary
    console.log(chalk.bold.cyan("Key Takeaways:"));
    console.log(chalk.gray("  1. Use changesets for transactional operations"));
    console.log(
      chalk.gray("  2. Content-ID references ($<id>) link related records in a change set")
    );
    console.log(chalk.gray("  3. continue-on-error enables partial success"));
    console.log(chalk.gray("  4. Batch is usually faster than individual calls"));
    console.log(chalk.gray("  5. Use bulk operations for same-entity creates/updates"));
    console.log(chalk.gray("  6. Use batch for mixed operations and relationships\n"));
  } catch (error: unknown) {
    failed = true;
    console.error(chalk.bold.red("\n❌ Demo failed:"), error);
  } finally {
    // Demos 1 to 4 leave their records in place; this deletes them, and anything a failed demo
    // left behind
    if (!(await cleanup(client))) failed = true;
  }
  if (failed) process.exit(1);
}

/**
 * Delete every contact and account of this run that is still there: contacts by last name,
 * then accounts by name. Returns false if any couldn't be deleted.
 */
async function cleanup(client: DataverseClient): Promise<boolean> {
  console.log(chalk.bold.blue("\n=== Cleanup ===\n"));
  let ok = true;
  const tables = [
    { set: "contacts", key: "contactid", nameColumn: "lastname" },
    { set: "accounts", key: "accountid", nameColumn: "name" },
  ];
  for (const { set, key, nameColumn } of tables) {
    try {
      const rows = await client
        .api(`/${set}`)
        .select(key)
        .filter(odata.startsWith(nameColumn, runId))
        .getAll<Record<string, string>>();
      let deleted = 0;
      for (const row of rows) {
        try {
          await client.api(`/${set}(${row[key]})`).delete();
          deleted++;
        } catch (error: unknown) {
          // Already gone (deleting an account can delete its contacts) counts as deleted
          if (error instanceof DataverseError && error.status === 404) continue;
          ok = false;
          console.error(chalk.red(`  ❌ Could not delete ${set}(${row[key]}):`), error);
        }
      }
      console.log(chalk.green(`  ✓ Deleted ${String(deleted)} ${set}`));
    } catch (error: unknown) {
      ok = false;
      console.error(chalk.red(`  ❌ Could not look for this run's ${set}:`), error);
    }
  }
  if (!ok) console.error(chalk.red(`  Delete the records named ${runId} by hand.`));
  return ok;
}

// Run the application
main().catch((error: unknown) => {
  console.error(chalk.bold.red("Unhandled error:"), error);
  process.exit(1);
});
