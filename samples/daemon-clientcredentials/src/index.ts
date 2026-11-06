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

import * as fs from "node:fs";
import * as path from "node:path";
import chalk from "chalk";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { MsalNodeTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-node";
import { CreateMultipleAction } from "@mohsinonxrm/dataverse-sdk-actions";
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

  return {
    clientId,
    tenantId,
    clientSecret,
    dataverseUrl,
    batchSize: parseInt(env.BATCH_SIZE || "100", 10),
  };
}

/**
 * Generate sample account data
 */
function generateAccountData(count: number): Array<Record<string, unknown>> {
  const accounts: Array<Record<string, unknown>> = [];
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, -5);

  for (let i = 1; i <= count; i++) {
    accounts.push({
      "@odata.type": "Microsoft.Dynamics.CRM.account",
      name: `Bulk Account ${String(i)} - ${timestamp}`,
      telephone1: `555-${String(i).padStart(4, "0")}`,
      address1_city: i % 2 === 0 ? "Seattle" : "Redmond",
      address1_stateorprovince: "WA",
      address1_country: "USA",
      numberofemployees: Math.floor(Math.random() * 1000) + 10,
      revenue: Math.floor(Math.random() * 10000000) + 100000,
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
    const action = new CreateMultipleAction("accounts", accounts);
    const response = await client.execute(action);

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    const idsPerSecond = (count / parseFloat(duration)).toFixed(1);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log(chalk.green(`✓ Created ${String(response.Ids.length)} accounts in ${duration}s`));
    console.log(chalk.gray(`  Rate: ${idsPerSecond} records/sec`));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
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
    const action = new UpdateMultipleAction("accounts", updates);
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .get<any>();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log(
      chalk.green(`✓ Found ${String(response.value.length)} accounts (showing first 10):`)
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    for (const account of response.value) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.log(
        chalk.gray(`  • ${String(account.name)} (${String(account.websiteurl ?? "no website")})`)
      );
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
        name: "Valid Account",
        telephone1: "555-0001",
      },
      {
        // Missing required @odata.type - will fail
        name: "Invalid Account",
        telephone1: "555-0002",
      } as Record<string, unknown>,
    ];

    const action = new CreateMultipleAction("accounts", invalidAccounts);
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

  try {
    // Demo 1: Bulk create
    const accountIds = await bulkCreateAccounts(client, env.batchSize);

    // Demo 2: Query created accounts
    await queryAccounts(
      client,
      `contains(name, 'Bulk Account') and Microsoft.Dynamics.CRM.Today()`
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
    console.error(chalk.bold.red("\n❌ Operation failed:"), error);
    process.exit(1);
  }
}

// Run the application
main().catch((error: unknown) => {
  console.error(chalk.bold.red("Unhandled error:"), error);
  process.exit(1);
});
