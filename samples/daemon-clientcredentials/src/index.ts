/**
 * Daemon/service application demonstrating client credentials authentication
 * and bulk operations with Dataverse SDK
 *
 * Perfect for:
 * - Scheduled jobs and background tasks
 * - Server-side applications
 * - Integration services
 * - Automated data processing
 */

import { randomBytes } from "node:crypto";
import * as fs from "node:fs";
import * as path from "node:path";
import chalk from "chalk";
import { DataverseClient, odata } from "@mohsinonxrm/dataverse-sdk-core";
import { MsalNodeTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-node";
import { CreateMultipleAction } from "@mohsinonxrm/dataverse-sdk-actions";
import { queryFunctions } from "@mohsinonxrm/dataverse-sdk-functions";
import { OrganizationService } from "@mohsinonxrm/dataverse-sdk-xrm";

// Load environment variables
const env = loadEnv();

interface Config {
  clientId: string;
  tenantId: string;
  clientSecret: string;
  dataverseUrl: string;
  batchSize: number;
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

  return {
    clientId,
    tenantId,
    clientSecret,
    dataverseUrl,
    batchSize: parseInt(setting("BATCH_SIZE") ?? "100", 10),
  };
}

/**
 * Every account this run creates is named `sdk-sample-<tag> ...`, so cleanup can find them all.
 * SAMPLE_RUN_TAG sets the tag (lowercase letters and digits); otherwise it's random.
 */
const runTag = process.env.SAMPLE_RUN_TAG ?? randomBytes(3).toString("hex");
if (!/^[a-z0-9]{1,10}$/.test(runTag)) {
  console.error(chalk.red("❌ SAMPLE_RUN_TAG must be 1 to 10 lowercase letters or digits."));
  process.exit(1);
}
const runId = `sdk-sample-${runTag}`;

/**
 * Generate sample account data
 */
function generateAccountData(count: number): Array<Record<string, unknown>> {
  const accounts: Array<Record<string, unknown>> = [];

  for (let i = 1; i <= count; i++) {
    accounts.push({
      "@odata.type": "Microsoft.Dynamics.CRM.account",
      name: `${runId} Bulk Account ${String(i)}`,
      telephone1: `555-${String(i).padStart(4, "0")}`,
      address1_city: i % 2 === 0 ? "Seattle" : "Redmond",
      address1_stateorprovince: "WA",
      address1_country: "USA",
      // Varied but deterministic sample values
      numberofemployees: ((i * 37) % 1000) + 10,
      revenue: ((i * 7919) % 10000) * 1000 + 100000,
    });
  }

  return accounts;
}

/**
 * Bulk create accounts using CreateMultiple action
 */
async function bulkCreateAccounts(client: DataverseClient, count: number): Promise<string[]> {
  console.log(chalk.blue(`\n➕ Creating ${String(count)} accounts using CreateMultiple...`));

  const accounts = generateAccountData(count);
  const startTime = Date.now();

  try {
    const action = new CreateMultipleAction("accounts", { Targets: accounts });
    const response = await client.execute(action);

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    const idsPerSecond = (count / parseFloat(duration)).toFixed(1);

    console.log(chalk.green(`✓ Created ${String(response.Ids.length)} accounts in ${duration}s`));
    console.log(chalk.gray(`  Rate: ${idsPerSecond} records/sec`));
    console.log(chalk.gray(`  IDs: ${response.Ids.slice(0, 3).join(", ")}...`));

    return response.Ids;
  } catch (error) {
    console.error(chalk.red("❌ Bulk create failed:"), error);
    throw error;
  }
}

/**
 * Bulk update accounts using UpdateMultiple action
 */
async function bulkUpdateAccounts(client: DataverseClient, accountIds: string[]): Promise<void> {
  console.log(
    chalk.blue(`\n✏️  Updating ${String(accountIds.length)} accounts using UpdateMultiple...`)
  );

  const updates = accountIds.map((id) => ({
    "@odata.type": "Microsoft.Dynamics.CRM.account",
    accountid: id,
    websiteurl: "https://updated.example.com",
    description: `Updated by daemon at ${new Date().toISOString()}`,
  }));

  const startTime = Date.now();

  try {
    // Note: UpdateMultiple is imported from actions package
    const { UpdateMultipleAction } = await import("@mohsinonxrm/dataverse-sdk-actions");
    const action = new UpdateMultipleAction("accounts", { Targets: updates });
    await client.execute(action);

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    const idsPerSecond = (accountIds.length / parseFloat(duration)).toFixed(1);

    console.log(chalk.green(`✓ Updated ${String(accountIds.length)} accounts in ${duration}s`));
    console.log(chalk.gray(`  Rate: ${idsPerSecond} records/sec`));
  } catch (error) {
    console.error(chalk.red("❌ Bulk update failed:"), error);
    throw error;
  }
}

/**
 * Query accounts with filtering
 */
async function queryAccounts(client: DataverseClient, filter: string): Promise<void> {
  console.log(chalk.blue(`\n🔍 Querying accounts with filter: ${filter}...`));

  try {
    const response = await client
      .api("/accounts")
      .select("name", "createdon", "websiteurl")
      .filter(filter)
      .orderBy("createdon desc")
      .top(10)
      .get<{ value: Array<{ name: string; createdon: string; websiteurl: string | null }> }>();

    console.log(
      chalk.green(`✓ Found ${String(response.value.length)} accounts (showing first 10):`)
    );
    for (const account of response.value) {
      console.log(chalk.gray(`  • ${account.name} (${account.websiteurl ?? "no website"})`));
    }
  } catch (error) {
    console.error(chalk.red("❌ Query failed:"), error);
    throw error;
  }
}

/**
 * Bulk delete accounts using OrganizationService
 */
async function bulkDeleteAccounts(
  orgService: OrganizationService,
  accountIds: string[]
): Promise<void> {
  console.log(chalk.blue(`\n🗑️  Deleting ${String(accountIds.length)} accounts...`));
  console.log(chalk.yellow(`⚠️  Note: DeleteMultiple only works for elastic tables`));
  console.log(chalk.yellow(`⚠️  Using individual delete operations instead...`));

  const startTime = Date.now();
  let deletedCount = 0;

  try {
    // Delete in batches to avoid overwhelming the API
    const batchSize = 10;
    for (let i = 0; i < accountIds.length; i += batchSize) {
      const batch = accountIds.slice(i, i + batchSize);
      await Promise.all(
        batch.map(async (id) => {
          await orgService.delete("accounts", id);
          deletedCount++;
        })
      );

      const progress = ((deletedCount / accountIds.length) * 100).toFixed(0);
      console.log(
        chalk.gray(
          `  Progress: ${String(deletedCount)}/${String(accountIds.length)} (${progress}%)`
        )
      );
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(chalk.green(`✓ Deleted ${String(deletedCount)} accounts in ${duration}s`));
  } catch (error) {
    console.error(
      chalk.red(`❌ Bulk delete failed (deleted ${String(deletedCount)} before error):`),
      error
    );
    throw error;
  }
}

/**
 * Demonstrate error handling for bulk operations
 */
async function demonstrateErrorHandling(client: DataverseClient): Promise<void> {
  console.log(chalk.blue("\n⚠️  Demonstrating error handling..."));

  try {
    // Attempt to create accounts with some invalid data
    const invalidAccounts = [
      {
        "@odata.type": "Microsoft.Dynamics.CRM.account",
        name: `${runId} Valid Account`,
        telephone1: "555-0001",
      },
      {
        // Missing required @odata.type - will fail
        name: `${runId} Invalid Account`,
        telephone1: "555-0002",
      } as Record<string, unknown>,
    ];

    const action = new CreateMultipleAction("accounts", { Targets: invalidAccounts });
    await client.execute(action);
  } catch (error) {
    console.log(chalk.yellow("✓ Error caught as expected:"));
    if (error instanceof Error) {
      console.log(chalk.gray(`  Message: ${error.message}`));
    }
    console.log(chalk.gray("  Tip: Always include @odata.type for bulk operations"));
  }
}

/**
 * Main application flow
 */
async function main() {
  console.log(chalk.bold.cyan("\n=== Dataverse SDK - Daemon Sample (Client Credentials) ===\n"));

  // Step 1: Initialize token provider with client credentials
  console.log(chalk.blue("🔐 Initializing authentication (client credentials flow)..."));

  const { ConfidentialClientApplication } = await import("@azure/msal-node");
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

  console.log(chalk.green(`✓ Authenticated as service principal`));
  console.log(chalk.gray(`  Environment: ${env.dataverseUrl}`));

  // Step 2: Create Dataverse client
  const client = new DataverseClient({
    baseUrl: env.dataverseUrl,
    tokenProvider,
  });

  // Step 3: Create OrganizationService (alternative API)
  const orgService = new OrganizationService(client);

  console.log(chalk.bold.yellow("\n=== Bulk Operations Demo ===\n"));

  console.log(chalk.gray(`  Run id: ${runId} (every account this run creates starts with it)`));

  let failed = false;
  try {
    // Demo 1: Bulk create
    const accountIds = await bulkCreateAccounts(client, env.batchSize);

    // Demo 2: Query this run's accounts created today. Today is a Dataverse query function: it
    // only works inside $filter, with the column as PropertyName.
    await queryAccounts(
      client,
      odata.and(
        odata.contains("name", `${runId} Bulk Account`),
        queryFunctions.today({ PropertyName: "createdon" })
      )
    );

    // Demo 3: Bulk update
    await bulkUpdateAccounts(client, accountIds);

    // Demo 4: Query updated accounts
    await queryAccounts(client, `contains(websiteurl, 'updated.example.com')`);

    // Demo 5: Error handling
    await demonstrateErrorHandling(client);

    // Demo 6: Bulk delete (cleanup)
    console.log(chalk.bold.yellow("\n=== Cleanup ==="));
    await bulkDeleteAccounts(orgService, accountIds);

    console.log(chalk.bold.green("\n✅ All operations completed successfully!\n"));
    console.log(chalk.gray("Performance Summary:"));
    console.log(chalk.gray(`  - CreateMultiple: Fast, returns IDs`));
    console.log(chalk.gray(`  - UpdateMultiple: Fast, no response body`));
    console.log(chalk.gray(`  - DeleteMultiple: ⚠️  Elastic tables only`));
    console.log(chalk.gray(`  - Individual deletes: Works for all tables, slower\n`));
  } catch (error) {
    failed = true;
    console.error(chalk.bold.red("\n❌ Operation failed:"), error);
  } finally {
    // Whatever happened above, leave no account of this run behind
    if (!(await deleteLeftovers(client, orgService))) failed = true;
  }
  if (failed) process.exit(1);
}

/**
 * Delete every account of this run that is still there (all of them if a demo failed before its
 * cleanup ran). Returns false if any couldn't be deleted.
 */
async function deleteLeftovers(
  client: DataverseClient,
  orgService: OrganizationService
): Promise<boolean> {
  try {
    const leftovers = await client
      .api("/accounts")
      .select("accountid")
      .filter(odata.startsWith("name", runId))
      .getAll<{ accountid: string }>();
    if (leftovers.length === 0) return true;
    console.log(chalk.yellow(`\n🧹 Deleting ${String(leftovers.length)} leftover accounts...`));
    let ok = true;
    for (const { accountid } of leftovers) {
      try {
        await orgService.delete("accounts", accountid);
      } catch (error) {
        ok = false;
        console.error(chalk.red(`❌ Could not delete account ${accountid}:`), error);
      }
    }
    return ok;
  } catch (error) {
    console.error(chalk.red(`❌ Could not look for leftover accounts named ${runId}:`), error);
    return false;
  }
}

// Run the application
main().catch((error: unknown) => {
  console.error(chalk.bold.red("Unhandled error:"), error);
  process.exit(1);
});
