/**
 * Interactive Node.js CLI demonstrating device code authentication
 * and basic CRUD operations with Dataverse SDK
 */

import * as fs from "node:fs";
import * as path from "node:path";
import chalk from "chalk";
import prompts from "prompts";
import { PublicClientApplication } from "@azure/msal-node";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { MsalNodeTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-node";
import { DiscoveryClient } from "@mohsinonxrm/dataverse-sdk-discovery";
import { WhoAmIFunction } from "@mohsinonxrm/dataverse-sdk-functions";
import type { OrganizationDetail } from "@mohsinonxrm/dataverse-sdk-discovery";

// Load environment variables
const env = loadEnv();

interface Config {
  clientId: string;
  tenantId: string;
  dataverseUrl?: string;
}

interface AccountRecord {
  accountid: string;
  name?: string;
  telephone1?: string;
  address1_city?: string;
  createdon?: string;
}

interface AccountQueryResponse {
  value: AccountRecord[];
}

/**
 * Simple .env file loader (no dependencies)
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

  if (!clientId || !tenantId) {
    console.error(chalk.red("❌ Missing required environment variables!"));
    console.error(chalk.yellow("Please create a .env file with:"));
    console.error(chalk.yellow("  AZURE_CLIENT_ID=your-app-registration-id"));
    console.error(chalk.yellow("  AZURE_TENANT_ID=your-tenant-id"));
    process.exit(1);
  }

  return {
    clientId,
    tenantId,
    dataverseUrl: env.DATAVERSE_URL || process.env.DATAVERSE_URL,
  };
}

/**
 * Get or select Dataverse organization
 */
async function getOrganization(tokenProvider: MsalNodeTokenProvider): Promise<OrganizationDetail> {
  // If URL is provided in config, use it
  if (env.dataverseUrl) {
    console.log(chalk.blue(`Using configured environment: ${env.dataverseUrl}`));
    return {
      Id: "manual",
      UniqueName: "manual",
      FriendlyName: "Manual Configuration",
      Endpoints: {
        WebApiUrl: `${env.dataverseUrl}/api/data/v9.2`,
        WebApplicationUrl: env.dataverseUrl,
      },
      State: "Enabled",
      Version: "9.2",
      UrlName: "",
      Geo: "",
      TenantId: env.tenantId,
      EnvironmentId: "",
      Region: "",
    };
  }

  // Otherwise, discover organizations
  console.log(chalk.blue("🔍 Discovering your Dataverse organizations..."));
  const discoveryClient = new DiscoveryClient(tokenProvider);

  try {
    const orgs = await discoveryClient.getEnabledOrganizations();

    if (orgs.length === 0) {
      console.error(chalk.red("❌ No enabled organizations found for this user."));
      process.exit(1);
    }

    if (orgs.length === 1) {
      console.log(chalk.green(`✓ Found 1 organization: ${orgs[0].FriendlyName}`));
      return orgs[0];
    }

    // Multiple orgs - let user choose
    console.log(chalk.green(`✓ Found ${String(orgs.length)} organizations`));
    const { selectedOrg } = await prompts({
      type: "select",
      name: "selectedOrg",
      message: "Select an organization:",
      choices: orgs.map((org) => ({
        title: `${org.FriendlyName} (${org.UniqueName}) - ${org.Geo}`,
        value: org,
      })),
    });

    if (!selectedOrg) {
      console.error(chalk.red("No organization selected."));
      process.exit(1);
    }

    return selectedOrg;
  } catch (error) {
    console.error(chalk.red("❌ Failed to discover organizations:"), error);
    throw error;
  }
}

/**
 * Call WhoAmI to verify connection and get user info
 */
async function callWhoAmI(client: DataverseClient): Promise<void> {
  console.log(chalk.blue("\n📞 Calling WhoAmI function..."));

  try {
    const whoAmI = new WhoAmIFunction();
    const response = await client.execute(whoAmI);

    console.log(chalk.green("✓ WhoAmI response:"));
    console.log(chalk.gray(`  User ID: ${response.UserId}`));
    console.log(chalk.gray(`  Business Unit: ${response.BusinessUnitId}`));
    console.log(chalk.gray(`  Organization: ${response.OrganizationId}`));
  } catch (error) {
    console.error(chalk.red("❌ WhoAmI failed:"), error);
    throw error;
  }
}

/**
 * Create a sample account record
 */
async function createAccount(client: DataverseClient, accountName: string): Promise<string> {
  console.log(chalk.blue(`\n➕ Creating account: ${accountName}...`));

  try {
    const accountData = {
      name: accountName,
      telephone1: "555-0100",
      address1_city: "Seattle",
      address1_stateorprovince: "WA",
      address1_country: "USA",
    };

    const response = await client
      .api("/accounts")
      .header("Prefer", "return=representation")
      .post<AccountRecord>(accountData);

    const accountId = response.accountid;
    console.log(chalk.green(`✓ Account created with ID: ${accountId}`));
    return accountId;
  } catch (error) {
    console.error(chalk.red("❌ Create account failed:"), error);
    throw error;
  }
}

/**
 * Retrieve the account record
 */
async function retrieveAccount(client: DataverseClient, accountId: string): Promise<void> {
  console.log(chalk.blue(`\n🔍 Retrieving account ${accountId}...`));

  try {
    const account = await client
      .api(`/accounts(${accountId})`)
      .select("name", "telephone1", "address1_city", "createdon")
      .get<AccountRecord>();

    console.log(chalk.green("✓ Account retrieved:"));
    console.log(chalk.gray(`  Name: ${String(account.name)}`));
    console.log(chalk.gray(`  Phone: ${String(account.telephone1)}`));
    console.log(chalk.gray(`  City: ${String(account.address1_city)}`));
    console.log(chalk.gray(`  Created: ${String(account.createdon)}`));
  } catch (error) {
    console.error(chalk.red("❌ Retrieve account failed:"), error);
    throw error;
  }
}

/**
 * Update the account record
 */
async function updateAccount(client: DataverseClient, accountId: string): Promise<void> {
  console.log(chalk.blue(`\n✏️  Updating account ${accountId}...`));

  try {
    const updateData = {
      telephone1: "555-0199",
      websiteurl: "https://example.com",
    };

    await client.api(`/accounts(${accountId})`).patch(updateData);

    console.log(chalk.green("✓ Account updated successfully"));
  } catch (error) {
    console.error(chalk.red("❌ Update account failed:"), error);
    throw error;
  }
}

/**
 * Query accounts
 */
async function queryAccounts(client: DataverseClient): Promise<void> {
  console.log(chalk.blue("\n🔍 Querying all accounts (top 5)..."));

  try {
    const response = await client
      .api("/accounts")
      .select("name", "createdon")
      .orderBy("createdon desc")
      .top(5)
      .get<AccountQueryResponse>();

    console.log(chalk.green(`✓ Found ${String(response.value.length)} accounts:`));
    for (const account of response.value) {
      console.log(
        chalk.gray(`  • ${String(account.name)} (created: ${String(account.createdon)})`)
      );
    }
  } catch (error) {
    console.error(chalk.red("❌ Query accounts failed:"), error);
    throw error;
  }
}

/**
 * Delete the account record
 */
async function deleteAccount(client: DataverseClient, accountId: string): Promise<void> {
  console.log(chalk.blue(`\n🗑️  Deleting account ${accountId}...`));

  try {
    await client.api(`/accounts(${accountId})`).delete();
    console.log(chalk.green("✓ Account deleted successfully"));
  } catch (error) {
    console.error(chalk.red("❌ Delete account failed:"), error);
    throw error;
  }
}

/**
 * Main application flow
 */
async function main() {
  console.log(chalk.bold.cyan("\n=== Dataverse SDK - Node CLI Sample (Device Code Auth) ===\n"));

  // Step 1: Initialize token provider with device code flow
  console.log(chalk.blue("🔐 Initializing authentication (device code flow)..."));

  // Create MSAL Public Client Application
  const pca = new PublicClientApplication({
    auth: {
      clientId: env.clientId,
      authority: `https://login.microsoftonline.com/${env.tenantId}`,
    },
  });

  // Use global discovery scope for initial authentication
  const tokenProvider = new MsalNodeTokenProvider(pca, {
    flow: "deviceCode",
    scopes: ["https://globaldisco.crm.dynamics.com/.default"],
    deviceCodeCallback: (response) => {
      console.log(chalk.yellow("\n📱 Device Code Authentication"));
      console.log(chalk.white(response.message));
    },
  });

  // Step 2: Discover and select organization
  const org = await getOrganization(tokenProvider);
  console.log(chalk.green(`\n✓ Selected: ${org.FriendlyName}`));
  console.log(chalk.gray(`  Environment: ${org.Endpoints.WebApplicationUrl}`));

  // Step 3: Create Dataverse client
  const client = new DataverseClient({
    baseUrl: org.Endpoints.WebApplicationUrl,
    tokenProvider,
  });

  // Step 4: Call WhoAmI to verify connection
  await callWhoAmI(client);

  // Step 5: Interactive CRUD operations
  console.log(chalk.bold.yellow("\n=== Interactive CRUD Operations ===\n"));

  const { runCrud } = await prompts({
    type: "confirm",
    name: "runCrud",
    message: "Run sample CRUD operations (create/read/update/delete account)?",
    initial: true,
  });

  if (!runCrud) {
    console.log(chalk.yellow("\nSkipping CRUD operations. Goodbye!"));
    return;
  }

  const { accountName } = await prompts({
    type: "text",
    name: "accountName",
    message: "Enter a name for the sample account:",
    initial: "Contoso Sample Corp",
  });

  if (!accountName) {
    console.log(chalk.red("No account name provided. Exiting."));
    return;
  }

  try {
    // Create
    const accountId = await createAccount(client, accountName);

    // Retrieve
    await retrieveAccount(client, accountId);

    // Update
    await updateAccount(client, accountId);

    // Retrieve updated record
    await retrieveAccount(client, accountId);

    // Query
    await queryAccounts(client);

    // Ask before deleting
    const { shouldDelete } = await prompts({
      type: "confirm",
      name: "shouldDelete",
      message: "Delete the sample account?",
      initial: true,
    });

    if (shouldDelete) {
      await deleteAccount(client, accountId);
    } else {
      console.log(chalk.yellow(`\nℹ️  Account kept: ${accountId}`));
    }

    console.log(chalk.bold.green("\n✅ All operations completed successfully!\n"));
  } catch (error: unknown) {
    console.error(chalk.bold.red("\n❌ Operation failed:"), error);
    process.exit(1);
  }
}

// Run the application
main().catch((error: unknown) => {
  console.error(chalk.bold.red("Unhandled error:"), error);
  process.exit(1);
});
