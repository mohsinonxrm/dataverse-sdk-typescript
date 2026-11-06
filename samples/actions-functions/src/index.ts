/**
 * Actions & Functions Sample
 *
 * Demonstrates typed Web API Actions (POST) and Functions (GET):
 * - Functions: WhoAmI (unbound, GET, no side effects)
 * - Business Actions: ExecuteWorkflow, WinOpportunity, Merge
 * - Bulk Operations: CreateMultiple, UpdateMultiple, UpsertMultiple
 * - File Operations: InitializeFileBlocksUpload, UploadBlock, CommitFileBlocksUpload
 *
 * Prerequisites:
 * 1. Azure AD app registration with client credentials
 * 2. Application User in Dataverse with System Administrator role
 * 3. Copy .env.example to .env and configure
 */

import { config } from "dotenv";
import chalk from "chalk";
import { ConfidentialClientApplication } from "@azure/msal-node";
import { DataverseClient, DataverseError } from "@mohsinonxrm/dataverse-sdk-core";
import { MsalNodeTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-node";
import { WhoAmIFunction } from "@mohsinonxrm/dataverse-sdk-functions";
import {
  CreateMultipleAction,
  UpdateMultipleAction,
  UpsertMultipleAction,
  ExecuteWorkflowAction,
  WinOpportunityAction,
  MergeAction,
  InitializeFileBlocksUploadAction,
  UploadBlockAction,
  CommitFileBlocksUploadAction,
  createEntityReference,
} from "@mohsinonxrm/dataverse-sdk-actions";

config();

// Validation
if (
  !process.env.AZURE_CLIENT_ID ||
  !process.env.AZURE_TENANT_ID ||
  !process.env.AZURE_CLIENT_SECRET ||
  !process.env.DATAVERSE_URL
) {
  console.error(
    chalk.red("Missing required environment variables. Copy .env.example to .env and configure.")
  );
  process.exit(1);
}

// Track created entities for cleanup
const createdRecords = {
  accounts: [] as string[],
  contacts: [] as string[],
  opportunities: [] as string[],
  leads: [] as string[],
};

/**
 * Demo 1: WhoAmI Function (GET)
 *
 * Unbound function that returns current user information.
 * Functions are GET operations and should not have side effects.
 */
async function whoAmiFunctionDemo(client: DataverseClient): Promise<void> {
  console.log(chalk.cyan("\n━━━ Demo 1: WhoAmI Function (GET) ━━━\n"));

  const whoAmiFn = new WhoAmIFunction();
  const result = await client.execute(whoAmiFn);

  console.log("Current User Info:");
  console.log(`  User ID: ${chalk.green(result.UserId)}`);
  console.log(`  Business Unit ID: ${chalk.green(result.BusinessUnitId)}`);
  console.log(`  Organization ID: ${chalk.green(result.OrganizationId)}`);
}

/**
 * Demo 2: CreateMultiple Action (Bulk Create)
 *
 * Creates multiple records in a single request.
 * More efficient than individual creates but less transactional than $batch changeset.
 *
 * Decision Matrix: CreateMultiple vs $batch
 * - CreateMultiple: Simpler API, single entity type, returns all IDs
 * - $batch changeset: Multiple entity types, transactional, Content-ID references
 */
async function createMultipleDemo(client: DataverseClient): Promise<void> {
  console.log(chalk.cyan("\n━━━ Demo 2: CreateMultiple Action (Bulk Create) ━━━\n"));

  const accounts = [
    {
      "@odata.type": "Microsoft.Dynamics.CRM.account",
      name: "Bulk Account 1",
      accountnumber: "BULK-001",
      revenue: 100000,
    },
    {
      "@odata.type": "Microsoft.Dynamics.CRM.account",
      name: "Bulk Account 2",
      accountnumber: "BULK-002",
      revenue: 150000,
    },
    {
      "@odata.type": "Microsoft.Dynamics.CRM.account",
      name: "Bulk Account 3",
      accountnumber: "BULK-003",
      revenue: 200000,
    },
  ];

  console.log(`Creating ${String(accounts.length)} accounts with CreateMultiple...`);
  const startTime = Date.now();

  const createMultiple = new CreateMultipleAction("accounts", { Targets: accounts });

  const result = await client.execute(createMultiple);
  const duration = Date.now() - startTime;

  console.log(
    chalk.green(`✓ Created ${String(result.Ids.length)} accounts in ${String(duration)}ms`)
  );
  console.log(
    `  Rate: ${chalk.yellow((result.Ids.length / (duration / 1000)).toFixed(2))} records/sec`
  );
  console.log(
    `  IDs: ${result.Ids.map((id: string) => chalk.dim(id.substring(0, 8) + "...")).join(", ")}`
  );

  // Track for cleanup
  createdRecords.accounts.push(...result.Ids);

  // Performance comparison info
  console.log(chalk.dim("\nℹ️  For 3 records:"));
  console.log(chalk.dim("   - Individual creates: ~1.5-3s (0.5-1 record/sec)"));
  console.log(chalk.dim("   - CreateMultiple: ~0.5-1s (2-6 records/sec) ← 2-3x faster"));
  console.log(chalk.dim("   - $batch changeset: ~0.8-1.5s (1.5-3 records/sec) + transactional"));
}

/**
 * Demo 3: UpdateMultiple Action (Bulk Update)
 *
 * Updates multiple records in a single request.
 * Returns 204 No Content on success.
 */
async function updateMultipleDemo(client: DataverseClient): Promise<void> {
  console.log(chalk.cyan("\n━━━ Demo 3: UpdateMultiple Action (Bulk Update) ━━━\n"));

  if (createdRecords.accounts.length < 3) {
    console.log(chalk.yellow("⚠ Skipping - need at least 3 accounts from CreateMultiple demo"));
    return;
  }

  const updates = createdRecords.accounts.slice(0, 3).map((id, index) => ({
    "@odata.type": "Microsoft.Dynamics.CRM.account",
    accountid: id,
    revenue: 250000 + index * 50000,
    description: `Updated via UpdateMultiple at ${new Date().toISOString()}`,
  }));

  console.log(`Updating ${String(updates.length)} accounts with UpdateMultiple...`);
  const startTime = Date.now();

  const updateMultiple = new UpdateMultipleAction("accounts", { Targets: updates });

  await client.execute(updateMultiple);
  const duration = Date.now() - startTime;

  console.log(chalk.green(`✓ Updated ${String(updates.length)} accounts in ${String(duration)}ms`));
  console.log(
    `  Rate: ${chalk.yellow((updates.length / (duration / 1000)).toFixed(2))} records/sec`
  );
  console.log(
    `  New revenues: ${updates.map((u) => chalk.green("$" + u.revenue.toLocaleString())).join(", ")}`
  );
}

/**
 * Demo 4: UpsertMultiple Action (Bulk Upsert)
 *
 * Creates or updates multiple records based on alternate key.
 * Returns 204 No Content on success.
 */
async function upsertMultipleDemo(client: DataverseClient): Promise<void> {
  console.log(chalk.cyan("\n━━━ Demo 4: UpsertMultiple Action (Bulk Upsert) ━━━\n"));

  const accounts = [
    {
      "@odata.type": "Microsoft.Dynamics.CRM.account",
      accountnumber: "UPSERT-001", // Alternate key
      name: "Upsert Account 1",
      revenue: 300000,
    },
    {
      "@odata.type": "Microsoft.Dynamics.CRM.account",
      accountnumber: "UPSERT-002",
      name: "Upsert Account 2",
      revenue: 350000,
    },
  ];

  console.log(`Upserting ${String(accounts.length)} accounts (first run - creates)...`);
  let startTime = Date.now();

  const upsertMultiple1 = new UpsertMultipleAction("accounts", { Targets: accounts });

  await client.execute(upsertMultiple1);
  let duration = Date.now() - startTime;

  console.log(
    chalk.green(`✓ Upserted ${String(accounts.length)} accounts in ${String(duration)}ms (created)`)
  );

  // Run again - this time updates
  console.log(`\nUpserting ${String(accounts.length)} accounts (second run - updates)...`);
  accounts[0].revenue = 320000;
  accounts[1].revenue = 370000;

  startTime = Date.now();

  const upsertMultiple2 = new UpsertMultipleAction("accounts", { Targets: accounts });

  await client.execute(upsertMultiple2);
  duration = Date.now() - startTime;

  console.log(
    chalk.green(`✓ Upserted ${String(accounts.length)} accounts in ${String(duration)}ms (updated)`)
  );
  console.log(chalk.dim("\nℹ️  UpsertMultiple uses alternate keys to determine create vs update"));

  // Query to get IDs for cleanup
  const retrievedAccounts = await client
    .api("/accounts")
    .filter(`accountnumber eq 'UPSERT-001' or accountnumber eq 'UPSERT-002'`)
    .select("accountid")
    .get<{ value: Array<{ accountid: string }> }>();

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (retrievedAccounts.value) {
    const ids = retrievedAccounts.value.map((a) => a.accountid);
    createdRecords.accounts.push(...ids);
  }
}

/**
 * Demo 5: ExecuteWorkflow Action (Bound to workflow)
 *
 * Executes an on-demand workflow against a record.
 * Returns the async operation ID for tracking.
 *
 * Note: This demo requires a workflow to exist in your environment.
 */
async function executeWorkflowDemo(client: DataverseClient): Promise<void> {
  console.log(chalk.cyan("\n━━━ Demo 5: ExecuteWorkflow Action (Bound to workflow) ━━━\n"));

  const workflowId = process.env.TEST_WORKFLOW_ID;

  if (!workflowId) {
    console.log(chalk.yellow("⚠ Skipping - TEST_WORKFLOW_ID not configured in .env"));
    console.log(chalk.dim("  To test:"));
    console.log(chalk.dim("  1. Create an on-demand workflow in your environment"));
    console.log(chalk.dim("  2. Set TEST_WORKFLOW_ID in .env"));
    console.log(chalk.dim("  3. Run this demo again"));
    return;
  }

  if (createdRecords.accounts.length === 0) {
    console.log(chalk.yellow("⚠ Skipping - need at least 1 account from previous demos"));
    return;
  }

  const targetAccount = createdRecords.accounts[0];

  console.log(
    `Executing workflow ${chalk.dim(workflowId.substring(0, 8) + "...")} on account ${chalk.dim(targetAccount.substring(0, 8) + "...")}`
  );

  const executeWorkflow = new ExecuteWorkflowAction(workflowId, {
    EntityId: targetAccount,
    InputArguments: {
      Arguments: { Count: 0, IsReadOnly: false, Keys: [], Values: [] },
    },
  });

  const result = await client.execute(executeWorkflow);

  console.log(chalk.green("✓ Workflow execution initiated"));
  console.log(`  Async Operation ID: ${chalk.yellow(result.asyncoperationid ?? "")}`);
  console.log(chalk.dim("\nℹ️  Monitor workflow execution in Settings > System Jobs"));
}

/**
 * Demo 6: WinOpportunity Action (Unbound business action)
 *
 * Marks an opportunity as won and creates an opportunity close record.
 *
 * Note: This demo requires an opportunity to exist.
 */
async function winOpportunityDemo(client: DataverseClient): Promise<void> {
  console.log(chalk.cyan("\n━━━ Demo 6: WinOpportunity Action (Unbound) ━━━\n"));

  // Create test opportunity first
  console.log("Creating test opportunity...");
  const opportunity = await client.api("/opportunities").post<{ opportunityid: string }>({
    name: "Test Opportunity for Win",
    estimatedvalue: 50000,
    estimatedclosedate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
  });

  const opportunityId = opportunity.opportunityid;
  createdRecords.opportunities.push(opportunityId);

  console.log(`  Created: ${chalk.dim(opportunityId.substring(0, 8) + "...")}`);

  // Win the opportunity
  console.log("\nWinning the opportunity...");

  const opportunityClose = {
    "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose",
    subject: "Won: Test Opportunity",
    "opportunityid@odata.bind": `/opportunities(${opportunityId})`,
    actualrevenue: 52000, // Can be different from estimated
    actualend: new Date().toISOString(),
  };

  const winOpp = new WinOpportunityAction({
    OpportunityClose: opportunityClose,
    Status: 3,
  }); // 3 = Won; Caller is left out (the calling user)

  await client.execute(winOpp);

  console.log(chalk.green("✓ Opportunity marked as Won"));
  console.log(`  Actual Revenue: ${chalk.green("$52,000")}`);
  console.log(`  Status: ${chalk.yellow("Won")}`);

  // Verify state change
  const updated = await client
    .api(`/opportunities(${opportunityId})`)
    .select("name", "statecode", "statuscode", "actualrevenue")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .get<any>();

  console.log("\nVerified state:");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.log(`  State Code: ${chalk.yellow(String(updated.statecode))} (Won)`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.log(`  Status Code: ${chalk.yellow(String(updated.statuscode))}`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.log(
    `  Actual Revenue: ${chalk.green("$" + String(updated.actualrevenue?.toLocaleString()))}`
  );
}

/**
 * Demo 7: Merge Action (Unbound business action)
 *
 * Merges two account records, moving related data to the target.
 * Supports: account, contact, lead, incident.
 */
async function mergeDemo(client: DataverseClient): Promise<void> {
  console.log(chalk.cyan("\n━━━ Demo 7: Merge Action (Unbound) ━━━\n"));

  // Create two test accounts
  console.log("Creating two accounts for merge...");

  const account1 = await client.api("/accounts").post<{ accountid: string; name: string }>({
    name: "Merge Target Account",
    accountnumber: "MERGE-TARGET",
    revenue: 500000,
    description: "This account will survive the merge",
  });

  const account2 = await client.api("/accounts").post<{ accountid: string; name: string }>({
    name: "Merge Subordinate Account",
    accountnumber: "MERGE-SUB",
    revenue: 300000,
    description: "This account will be merged into target",
  });

  const targetId = account1.accountid;
  const subordinateId = account2.accountid;

  createdRecords.accounts.push(targetId); // Only track target (subordinate will be deleted)

  console.log(
    `  Target: ${chalk.green(account1.name)} (${chalk.dim(targetId.substring(0, 8) + "...")})`
  );
  console.log(
    `  Subordinate: ${chalk.yellow(account2.name)} (${chalk.dim(subordinateId.substring(0, 8) + "...")})`
  );

  // Merge subordinate into target
  console.log("\nMerging accounts...");

  const merge = new MergeAction({
    Target: createEntityReference("account", targetId),
    Subordinate: createEntityReference("account", subordinateId),
    UpdateContent: createEntityReference("account", targetId),
    PerformParentingChecks: false,
  });

  await client.execute(merge);

  console.log(chalk.green("✓ Accounts merged successfully"));

  // Verify target account updated
  const merged = await client
    .api(`/accounts(${targetId})`)
    .select("name", "accountnumber", "revenue", "description")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .get<any>();

  console.log("\nMerged account:");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.log(`  Name: ${chalk.green(merged.name)}`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.log(
    `  Revenue: ${chalk.green("$" + String(merged.revenue?.toLocaleString()))} (updated)`
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.log(`  Description: ${chalk.dim(merged.description)}`);

  // Verify subordinate deleted
  try {
    await client.api(`/accounts(${subordinateId})`).get();
    console.log(chalk.red("✗ Subordinate account still exists (unexpected)"));
  } catch (error: unknown) {
    if (error instanceof DataverseError && error.status === 404) {
      console.log(chalk.green("✓ Subordinate account deleted"));
    }
  }

  console.log(chalk.dim("\nℹ️  Merge moves all related records to target and deletes subordinate"));
}

/**
 * Demo 8: File Operations Actions (Chunked Upload)
 *
 * Demonstrates chunked file upload using three actions:
 * 1. InitializeFileBlocksUpload - Get upload token and block size
 * 2. UploadBlock - Upload each chunk
 * 3. CommitFileBlocksUpload - Finalize upload
 *
 * Note: Requires an entity with a File or Image column.
 */
async function fileOperationsDemo(client: DataverseClient): Promise<void> {
  console.log(chalk.cyan("\n━━━ Demo 8: File Operations (Chunked Upload) ━━━\n"));

  if (createdRecords.accounts.length === 0) {
    console.log(chalk.yellow("⚠ Skipping - need at least 1 account from previous demos"));
    return;
  }

  const targetAccount = createdRecords.accounts[0];

  // Create sample file data (simulate 8MB file)
  const fileSize = 8 * 1024 * 1024; // 8MB
  const fileData = Buffer.alloc(fileSize, "A"); // Fill with 'A'
  const fileName = "test-document.txt";

  console.log(
    `Uploading file: ${chalk.cyan(fileName)} (${chalk.yellow((fileSize / 1024 / 1024).toFixed(2) + " MB")})`
  );

  // Step 1: Initialize upload
  console.log("\n1. Initializing file upload...");

  const initialize = new InitializeFileBlocksUploadAction({
    Target: createEntityReference("account", targetAccount),
    FileName: fileName,
    FileAttributeName: "entityimage",
  });

  const initResult = await client.execute(initialize);

  console.log(chalk.green("✓ Upload initialized"));
  console.log(
    `  Upload Token: ${chalk.dim(initResult.FileContinuationToken.substring(0, 20) + "...")}`
  );

  // Step 2: Upload blocks (using 4MB default chunk size)
  const blockSize = 4 * 1024 * 1024; // 4MB
  const blockCount = Math.ceil(fileSize / blockSize);
  const blockIds: string[] = [];

  console.log(`\n2. Uploading ${String(blockCount)} blocks...`);

  for (let i = 0; i < blockCount; i++) {
    const start = i * blockSize;
    const end = Math.min(start + blockSize, fileSize);
    const blockData = fileData.subarray(start, end);
    const blockId = Buffer.from(`block-${i.toString().padStart(6, "0")}`).toString("base64");

    blockIds.push(blockId);

    const uploadBlock = new UploadBlockAction({
      BlockId: blockId,
      BlockData: blockData.toString("base64"),
      FileContinuationToken: initResult.FileContinuationToken,
    });

    await client.execute(uploadBlock);

    const progress = (((i + 1) / blockCount) * 100).toFixed(1);
    console.log(
      `  Block ${String(i + 1)}/${String(blockCount)}: ${chalk.green("✓")} (${progress}%)`
    );
  }

  // Step 3: Commit upload
  console.log("\n3. Committing file upload...");

  const commit = new CommitFileBlocksUploadAction({
    FileName: fileName,
    MimeType: "image/png",
    BlockList: blockIds,
    FileContinuationToken: initResult.FileContinuationToken,
  });

  await client.execute(commit);

  console.log(chalk.green("✓ File upload completed successfully"));
  console.log(chalk.dim("\nℹ️  File is now attached to the account record"));
}

/**
 * Cleanup - Delete all created test records
 */
async function cleanup(client: DataverseClient): Promise<void> {
  console.log(chalk.cyan("\n━━━ Cleanup ━━━\n"));

  let deletedCount = 0;

  // Delete opportunities (closes related opportunityclose records)
  for (const id of createdRecords.opportunities) {
    try {
      await client.api(`/opportunities(${id})`).delete();
      deletedCount++;
      console.log(
        `${chalk.green("✓")} Deleted opportunity ${chalk.dim(id.substring(0, 8) + "...")}`
      );
    } catch (error: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/restrict-template-expressions
      const errorMessage = (error as any).message as string;
      console.log(`${chalk.red("\u2717")} Failed to delete opportunity: ${errorMessage}`);
    }
  }

  // Delete accounts
  for (const id of createdRecords.accounts) {
    try {
      await client.api(`/accounts(${id})`).delete();
      deletedCount++;
      console.log(`${chalk.green("✓")} Deleted account ${chalk.dim(id.substring(0, 8) + "...")}`);
    } catch (error: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      console.log(`${chalk.red("✗")} Failed to delete account: ${String((error as any).message)}`);
    }
  }

  // Delete contacts
  for (const id of createdRecords.contacts) {
    try {
      await client.api(`/contacts(${id})`).delete();
      deletedCount++;
      console.log(`${chalk.green("✓")} Deleted contact ${chalk.dim(id.substring(0, 8) + "...")}`);
    } catch (error: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      console.log(`${chalk.red("✗")} Failed to delete contact: ${String((error as any).message)}`);
    }
  }

  // Delete leads
  for (const id of createdRecords.leads) {
    try {
      await client.api(`/leads(${id})`).delete();
      deletedCount++;
      console.log(`${chalk.green("✓")} Deleted lead ${chalk.dim(id.substring(0, 8) + "...")}`);
    } catch (error: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      console.log(`${chalk.red("✗")} Failed to delete lead: ${String((error as any).message)}`);
    }
  }

  console.log(chalk.green(`\n✓ Cleanup complete - deleted ${String(deletedCount)} records`));
}

/**
 * Main execution
 */
async function main(): Promise<void> {
  console.log(chalk.bold.cyan("\n╔═══════════════════════════════════════════════════════╗"));
  console.log(chalk.bold.cyan("║   Actions & Functions Sample                         ║"));
  console.log(chalk.bold.cyan("║   @mohsinonxrm/dataverse-sdk-typescript               ║"));
  console.log(chalk.bold.cyan("╚═══════════════════════════════════════════════════════╝\n"));

  // Initialize client
  const cca = new ConfidentialClientApplication({
    auth: {
      clientId: process.env.AZURE_CLIENT_ID!,
      authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID!}`,
      clientSecret: process.env.AZURE_CLIENT_SECRET!,
    },
  });

  const tokenProvider = new MsalNodeTokenProvider(cca, {
    flow: "clientCredentials",
    scopes: [`${process.env.DATAVERSE_URL!}/.default`],
  });

  const client = new DataverseClient({
    baseUrl: process.env.DATAVERSE_URL!,
    apiVersion: "v9.2",
    tokenProvider,
  });

  console.log(`Connected to: ${chalk.green(process.env.DATAVERSE_URL!)}\\n`);

  try {
    // Run all demos
    await whoAmiFunctionDemo(client);
    await createMultipleDemo(client);
    await updateMultipleDemo(client);
    await upsertMultipleDemo(client);
    await executeWorkflowDemo(client);
    await winOpportunityDemo(client);
    await mergeDemo(client);
    await fileOperationsDemo(client);

    // Cleanup
    await cleanup(client);

    console.log(chalk.green.bold("\n✓ All demos completed successfully!\n"));
  } catch (error: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    console.error(chalk.red("\n✗ Error:"), String((error as any).message));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((error as any).response) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      console.error(chalk.dim(JSON.stringify((error as any).response, null, 2)));
    }

    // Attempt cleanup even on error
    try {
      await cleanup(client);
    } catch (_cleanupError: unknown) {
      console.error(chalk.red("✗ Cleanup also failed"));
    }

    process.exit(1);
  }
}

void main();
