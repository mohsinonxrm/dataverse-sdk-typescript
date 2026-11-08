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

import { randomBytes } from "node:crypto";
import { crc32, deflateSync } from "node:zlib";
import { config } from "dotenv";
import chalk from "chalk";
import { ConfidentialClientApplication } from "@azure/msal-node";
import { DataverseClient, DataverseError, odata } from "@mohsinonxrm/dataverse-sdk-core";
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

/** The connection settings: AZURE_* (this sample's names) or DATAVERSE_* (the live CI's names). */
function loadSettings(): {
  clientId: string;
  tenantId: string;
  clientSecret: string;
  dataverseUrl: string;
} {
  const setting = (...names: string[]): string | undefined =>
    names.map((name) => process.env[name]).find(Boolean);
  const clientId = setting("AZURE_CLIENT_ID", "DATAVERSE_CLIENT_ID");
  const tenantId = setting("AZURE_TENANT_ID", "DATAVERSE_TENANT_ID");
  const clientSecret = setting("AZURE_CLIENT_SECRET", "DATAVERSE_CLIENT_SECRET");
  const dataverseUrl = setting("DATAVERSE_URL");

  if (!clientId || !tenantId || !clientSecret || !dataverseUrl) {
    console.error(
      chalk.red("Missing required environment variables. Copy .env.example to .env and configure.")
    );
    console.error(
      chalk.yellow(
        "Needs AZURE_CLIENT_ID, AZURE_TENANT_ID, AZURE_CLIENT_SECRET (or DATAVERSE_CLIENT_ID, " +
          "DATAVERSE_TENANT_ID, DATAVERSE_CLIENT_SECRET) and DATAVERSE_URL."
      )
    );
    process.exit(1);
  }
  return { clientId, tenantId, clientSecret, dataverseUrl };
}

const settings = loadSettings();

/**
 * Every record this run creates is named `sdk-sample-<tag> ...`, so cleanup can find them all.
 * SAMPLE_RUN_TAG sets the tag (lowercase letters and digits); otherwise it's random.
 */
const runTag = process.env.SAMPLE_RUN_TAG ?? randomBytes(3).toString("hex");
if (!/^[a-z0-9]{1,10}$/.test(runTag)) {
  console.error(chalk.red("SAMPLE_RUN_TAG must be 1 to 10 lowercase letters or digits."));
  process.exit(1);
}
const runId = `sdk-sample-${runTag}`;

// Track created entities for cleanup
const createdRecords = {
  accounts: [] as string[],
  contacts: [] as string[],
  opportunities: [] as string[],
  leads: [] as string[],
};

/** The message of a caught error (anything can be thrown). */
function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

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
      name: `${runId} Bulk Account 1`,
      accountnumber: "BULK-001",
      revenue: 100000,
    },
    {
      "@odata.type": "Microsoft.Dynamics.CRM.account",
      name: `${runId} Bulk Account 2`,
      accountnumber: "BULK-002",
      revenue: 150000,
    },
    {
      "@odata.type": "Microsoft.Dynamics.CRM.account",
      name: `${runId} Bulk Account 3`,
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

  // The account numbers carry the run tag, so the query below finds only this run's rows
  const upsertNumbers = [`${runTag}-UPSERT-1`, `${runTag}-UPSERT-2`];
  const accounts = [
    {
      "@odata.type": "Microsoft.Dynamics.CRM.account",
      accountnumber: upsertNumbers[0], // Alternate key
      name: `${runId} Upsert Account 1`,
      revenue: 300000,
    },
    {
      "@odata.type": "Microsoft.Dynamics.CRM.account",
      accountnumber: upsertNumbers[1],
      name: `${runId} Upsert Account 2`,
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
    .filter(odata.or(...upsertNumbers.map((n) => odata.eq("accountnumber", n))))
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
  // The asyncoperation record, or null if the Web API answered 204 No Content
  console.log(`  Async Operation ID: ${chalk.yellow(result?.asyncoperationid ?? "")}`);
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
  // createAndGetId reads the new record's id from the OData-EntityId header
  const opportunityId = await client.api("/opportunities").createAndGetId({
    name: `${runId} Test Opportunity for Win`,
    estimatedvalue: 50000,
    estimatedclosedate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
  });

  createdRecords.opportunities.push(opportunityId);

  console.log(`  Created: ${chalk.dim(opportunityId.substring(0, 8) + "...")}`);

  // Win the opportunity
  console.log("\nWinning the opportunity...");

  const opportunityClose = {
    "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose",
    subject: `${runId} Won: Test Opportunity`,
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
    .get<{
      name: string;
      statecode: number;
      statuscode: number;
      actualrevenue: number | null;
    }>();

  console.log("\nVerified state:");
  console.log(`  State Code: ${chalk.yellow(String(updated.statecode))} (Won)`);
  console.log(`  Status Code: ${chalk.yellow(String(updated.statuscode))}`);
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

  const targetName = `${runId} Merge Target Account`;
  const targetId = await client.api("/accounts").createAndGetId({
    name: targetName,
    accountnumber: "MERGE-TARGET",
    revenue: 500000,
    description: "This account will survive the merge",
  });
  createdRecords.accounts.push(targetId);

  const subordinateName = `${runId} Merge Subordinate Account`;
  const subordinateId = await client.api("/accounts").createAndGetId({
    name: subordinateName,
    accountnumber: "MERGE-SUB",
    revenue: 300000,
    description: "This account will be merged into target",
  });
  // Merge deactivates the subordinate; it doesn't delete it, so cleanup deletes it
  createdRecords.accounts.push(subordinateId);

  console.log(
    `  Target: ${chalk.green(targetName)} (${chalk.dim(targetId.substring(0, 8) + "...")})`
  );
  console.log(
    `  Subordinate: ${chalk.yellow(subordinateName)} (${chalk.dim(subordinateId.substring(0, 8) + "...")})`
  );

  // Merge subordinate into target
  console.log("\nMerging accounts...");

  const merge = new MergeAction({
    Target: createEntityReference("account", targetId),
    Subordinate: createEntityReference("account", subordinateId),
    // The target's new column values, as an entity payload
    UpdateContent: {
      "@odata.type": "Microsoft.Dynamics.CRM.account",
      revenue: 800000,
    },
    PerformParentingChecks: false,
  });

  await client.execute(merge);

  console.log(chalk.green("✓ Accounts merged successfully"));

  // Verify target account updated
  const merged = await client
    .api(`/accounts(${targetId})`)
    .select("name", "accountnumber", "revenue", "description")
    .get<{
      name: string;
      accountnumber: string | null;
      revenue: number | null;
      description: string | null;
    }>();

  console.log("\nMerged account:");
  console.log(`  Name: ${chalk.green(merged.name)}`);
  console.log(
    `  Revenue: ${chalk.green("$" + String(merged.revenue?.toLocaleString()))} (updated)`
  );
  console.log(`  Description: ${chalk.dim(merged.description ?? "")}`);

  // Verify subordinate deactivated
  const subordinate = await client
    .api(`/accounts(${subordinateId})`)
    .select("statecode")
    .get<{ statecode: number }>();
  if (subordinate.statecode !== 1) {
    throw new Error(
      `The subordinate account is still active (statecode ${String(subordinate.statecode)})`
    );
  }
  console.log(chalk.green("✓ Subordinate account deactivated"));

  console.log(
    chalk.dim("\nℹ️  Merge moves all related records to target and deactivates subordinate")
  );
}

/**
 * A size x size RGB PNG of pseudo-random pixels. Noise doesn't compress, so the file is about
 * size * size * 3 bytes: big enough to upload in more than one block.
 */
function noisePng(size: number): Buffer {
  const rows = new Uint8Array(size * (size * 3 + 1));
  let seed = 42;
  for (let i = 0; i < rows.length; i++) {
    // Each row starts with filter type 0 (none); the rest are pixel bytes
    seed = (Math.imul(seed, 1103515245) + 12345) >>> 0;
    rows[i] = i % (size * 3 + 1) === 0 ? 0 : seed >>> 24;
  }
  const chunk = (type: string, data: Uint8Array): Buffer => {
    const out = Buffer.alloc(12 + data.length);
    out.writeUInt32BE(data.length, 0);
    out.write(type, 4, "ascii");
    out.set(data, 8);
    out.writeUInt32BE(crc32(out.subarray(4, 8 + data.length)), 8 + data.length);
    return out;
  };
  const header = Buffer.alloc(13);
  header.writeUInt32BE(size, 0);
  header.writeUInt32BE(size, 4);
  header.set([8, 2, 0, 0, 0], 8); // 8-bit RGB
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", header),
    chunk("IDAT", deflateSync(rows)),
    chunk("IEND", new Uint8Array(0)),
  ]);
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

  // Sample file data: an image column takes only a real image, so make a ~5 MB PNG
  const fileData = noisePng(1300);
  const fileSize = fileData.length;
  const fileName = "sample-image.png";

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
async function cleanup(client: DataverseClient): Promise<boolean> {
  console.log(chalk.cyan("\n━━━ Cleanup ━━━\n"));

  let deletedCount = 0;
  let ok = true;

  // Opportunities first (deleting one deletes its opportunityclose records), then the rest. Each
  // set's tracked ids, then any row named with this run's id that is still there: the upserted
  // accounts, and anything a failed demo created but didn't track.
  const tables = [
    {
      set: "opportunities",
      label: "opportunity",
      ids: createdRecords.opportunities,
      key: "opportunityid",
      nameColumn: "name",
    },
    {
      set: "accounts",
      label: "account",
      ids: createdRecords.accounts,
      key: "accountid",
      nameColumn: "name",
    },
    { set: "contacts", label: "contact", ids: createdRecords.contacts, key: "contactid" },
    { set: "leads", label: "lead", ids: createdRecords.leads, key: "leadid" },
  ];

  for (const { set, label, ids, key, nameColumn } of tables) {
    const toDelete = new Set(ids);
    if (nameColumn) {
      try {
        const rows = await client
          .api(`/${set}`)
          .select(key)
          .filter(odata.startsWith(nameColumn, runId))
          .getAll<Record<string, string>>();
        for (const row of rows) toDelete.add(row[key]);
      } catch (error: unknown) {
        ok = false;
        console.log(
          `${chalk.red("✗")} Failed to look for this run's ${set}: ${errorMessage(error)}`
        );
      }
    }
    for (const id of toDelete) {
      try {
        await client.api(`/${set}(${id})`).delete();
        deletedCount++;
        console.log(
          `${chalk.green("✓")} Deleted ${label} ${chalk.dim(id.substring(0, 8) + "...")}`
        );
      } catch (error: unknown) {
        // Already gone counts as deleted
        if (error instanceof DataverseError && error.status === 404) continue;
        ok = false;
        console.log(`${chalk.red("✗")} Failed to delete ${label} ${id}: ${errorMessage(error)}`);
      }
    }
  }

  if (ok) {
    console.log(chalk.green(`\n✓ Cleanup complete - deleted ${String(deletedCount)} records`));
  } else {
    console.log(chalk.red(`\n✗ Cleanup incomplete: delete the records named ${runId} by hand`));
  }
  return ok;
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
      clientId: settings.clientId,
      authority: `https://login.microsoftonline.com/${settings.tenantId}`,
      clientSecret: settings.clientSecret,
    },
  });

  const tokenProvider = new MsalNodeTokenProvider(cca, {
    flow: "clientCredentials",
    scopes: [`${new URL(settings.dataverseUrl).origin}/.default`],
  });

  const client = new DataverseClient({
    baseUrl: settings.dataverseUrl,
    apiVersion: "v9.2",
    tokenProvider,
  });

  console.log(`Connected to: ${chalk.green(settings.dataverseUrl)}`);
  console.log(chalk.dim(`Run id: ${runId} (every record this run creates is named with it)\n`));

  let failed = false;
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
  } catch (error: unknown) {
    failed = true;
    console.error(chalk.red("\n✗ Error:"), errorMessage(error));
    // The Web API's error body, when Dataverse answered
    if (error instanceof DataverseError && error.raw !== undefined) {
      console.error(chalk.dim(JSON.stringify(error.raw, null, 2)));
    }
  } finally {
    // Cleanup, also when a demo failed
    if (!(await cleanup(client))) failed = true;
  }

  if (failed) process.exit(1);
  console.log(chalk.green.bold("\n✓ All demos completed successfully!\n"));
}

main().catch((error: unknown) => {
  console.error(chalk.red("Unhandled error:"), error);
  process.exit(1);
});
