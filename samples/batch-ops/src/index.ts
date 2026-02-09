/**
 * Comprehensive $batch operations sample demonstrating:
 * - Changesets (transactional groups)
 * - Content-ID references ($1, $2, etc.)
 * - Prefer: odata.continue-on-error
 * - Partial success handling
 * - Mixed operations (create, update, delete, query)
 * - Performance comparison: batch vs individual vs bulk
 */

import * as fs from "node:fs";
import * as path from "node:path";
import chalk from "chalk";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
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

  const clientId = env.AZURE_CLIENT_ID || process.env.AZURE_CLIENT_ID;
  const tenantId = env.AZURE_TENANT_ID || process.env.AZURE_TENANT_ID;
  const clientSecret = env.AZURE_CLIENT_SECRET || process.env.AZURE_CLIENT_SECRET;
  const dataverseUrl = env.DATAVERSE_URL || process.env.DATAVERSE_URL;

  if (!clientId || !tenantId || !clientSecret || !dataverseUrl) {
    console.error(chalk.red("❌ Missing required environment variables!"));
    console.error(chalk.yellow("Please create a .env file with:"));
    console.error(chalk.yellow("  AZURE_CLIENT_ID=your-app-registration-id"));
    console.error(chalk.yellow("  AZURE_TENANT_ID=your-tenant-id"));
    console.error(chalk.yellow("  AZURE_CLIENT_SECRET=your-client-secret"));
    console.error(chalk.yellow("  DATAVERSE_URL=https://yourorg.crm.dynamics.com"));
    process.exit(1);
  }

  return { clientId, tenantId, clientSecret, dataverseUrl };
}

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
      name: "Simple Batch Account 1",
      telephone1: "555-1001",
    }
  );

  batch.addRequest(
    "req2",
    "POST",
    "/accounts",
    { "Content-Type": "application/json", Prefer: "return=representation" },
    {
      name: "Simple Batch Account 2",
      telephone1: "555-1002",
    }
  );

  batch.addRequest(
    "req3",
    "POST",
    "/accounts",
    { "Content-Type": "application/json", Prefer: "return=representation" },
    {
      name: "Simple Batch Account 3",
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
      name: "Transactional Account",
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
      lastname: "Doe",
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
      lastname: "Smith",
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
 * Link created records using $1, $2 references
 */
async function contentIdReferenceDemo(client: DataverseClient): Promise<void> {
  console.log(chalk.bold.blue("\n=== Demo 3: Content-ID References ===\n"));
  console.log(chalk.gray("Creating account and linking 2 contacts using $1 reference..."));

  const batch = new BatchRequestBuilder(client);

  batch.beginChangeset();

  // Create parent account with Content-ID = 1
  batch.addRequest(
    "1",
    "POST",
    "/accounts",
    { "Content-Type": "application/json", Prefer: "return=representation" },
    {
      name: "Parent Account with References",
      telephone1: "555-3001",
    }
  );

  // Create first contact and link to parent using $1
  batch.addRequest(
    "2",
    "POST",
    "/contacts",
    { "Content-Type": "application/json", Prefer: "return=representation" },
    {
      firstname: "Child",
      lastname: "Contact 1",
      telephone1: "555-3002",
      // Reference the account created in Content-ID 1
      "parentcustomerid_account@odata.bind": "$1",
    }
  );

  // Create second contact and link to parent using $1
  batch.addRequest(
    "3",
    "POST",
    "/contacts",
    { "Content-Type": "application/json", Prefer: "return=representation" },
    {
      firstname: "Child",
      lastname: "Contact 2",
      telephone1: "555-3003",
      // Reference the same account
      "parentcustomerid_account@odata.bind": "$1",
    }
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
      name: "Valid Account 1",
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
      name: "Valid Account 2",
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
      name: "Invalid Account",
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
      name: "Valid Account 3",
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
      name: "Valid Account 4",
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
      name: "Account to Update",
      telephone1: "555-5001",
    });
  const testAccountId = testAccount.accountid;

  const deleteAccount = await client
    .api("/accounts")
    .header("Prefer", "return=representation")
    .post<{ accountid: string }>({
      name: "Account to Delete",
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
      name: "New Account from Mixed Batch",
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
        name: `Individual Account ${String(i + 1)}`,
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
        name: `Batch Account ${String(i + 1)}`,
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
    name: `Bulk Account ${String(i + 1)}`,
    telephone1: `555-8${String(i + 1).padStart(3, "0")}`,
  }));

  const startBulk = Date.now();
  const action = new CreateMultipleAction(bulkAccounts);
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
  const allIds = [...individualIds, ...batchIds, ...bulkResponse.Ids];

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
    console.log(chalk.gray("  2. Content-ID references ($1, $2) link related records"));
    console.log(chalk.gray("  3. continue-on-error enables partial success"));
    console.log(chalk.gray("  4. Batch is 3-5x faster than individual calls"));
    console.log(chalk.gray("  5. Use bulk operations for same-entity creates/updates"));
    console.log(chalk.gray("  6. Use batch for mixed operations and relationships\n"));
  } catch (error: unknown) {
    console.error(chalk.bold.red("\n❌ Demo failed:"), error);
    process.exit(1);
  }
}

// Run the application
main().catch((error: unknown) => {
  console.error(chalk.bold.red("Unhandled error:"), error);
  process.exit(1);
});
