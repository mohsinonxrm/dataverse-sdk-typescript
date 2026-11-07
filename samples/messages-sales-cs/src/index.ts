/**
 * SDK Messages Sample (Sales + Customer Service)
 *
 * Demonstrates OrganizationService.execute() with typed messages
 * generated from Dataverse Web API actions.
 *
 * This sample uses the C#-familiar OrganizationService facade pattern,
 * where messages are strongly typed request/response pairs executed
 * via orgService.execute(request).
 *
 * Prerequisites:
 * 1. Azure AD app registration with client credentials
 * 2. Application User in Dataverse with System Administrator role
 * 3. Sales and/or Customer Service solutions installed
 * 4. Copy .env.example to .env and configure
 */

import { config } from "dotenv";
import chalk from "chalk";
import { ConfidentialClientApplication } from "@azure/msal-node";
import { DataverseClient, DataverseError } from "@mohsinonxrm/dataverse-sdk-core";
import { MsalNodeTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-node";
import { OrganizationService } from "@mohsinonxrm/dataverse-sdk-xrm";
import { WhoAmIFunction } from "@mohsinonxrm/dataverse-sdk-functions";
import {
  OrganizationRequest,
  OrganizationResponse,
  createEntityReference,
  ExecuteWorkflowRequest,
  ExecuteWorkflowResponse,
  WinOpportunityRequest,
  WinOpportunityResponse,
  MergeRequest,
  MergeResponse,
  ExportSolutionRequest,
  ExportSolutionResponse,
  PublishXmlRequest,
  PublishXmlResponse,
} from "@mohsinonxrm/dataverse-sdk-messages";

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
  incidents: [] as string[],
};

/** The message of a caught error (anything can be thrown). */
function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

/**
 * Demo 1: WhoAmI (Function)
 *
 * Retrieves information about the current user.
 * WhoAmI is a Web API function, not a message.
 */
async function whoAmIDemo(client: DataverseClient): Promise<void> {
  console.log(chalk.cyan("\n━━━ Demo 1: WhoAmI (Function) ━━━\n"));

  const whoAmI = new WhoAmIFunction();
  const response = await client.execute(whoAmI);

  console.log("Current User Information:");
  console.log(`  User ID: ${chalk.green(response.UserId)}`);
  console.log(`  Business Unit ID: ${chalk.green(response.BusinessUnitId)}`);
  console.log(`  Organization ID: ${chalk.green(response.OrganizationId)}`);

  console.log(chalk.dim("\nℹ️  WhoAmI is a Web API function, available as WhoAmIFunction"));
}

/**
 * Demo 2: Assign (OrganizationService)
 *
 * Assigns a record to a different user or team.
 * Uses OrganizationService.update() with ownerid.
 */
async function assignDemo(orgService: OrganizationService, client: DataverseClient): Promise<void> {
  console.log(chalk.cyan("\n━━━ Demo 2: Assign (OrganizationService) ━━━\n"));

  // Create test account
  console.log("Creating test account...");
  const accountId = await orgService.create("accounts", {
    name: "Test Account for Assignment",
    accountnumber: "ASSIGN-001",
  });

  createdRecords.accounts.push(accountId);
  console.log(`  Created: ${chalk.dim(accountId.substring(0, 8) + "...")}`);

  // Get another user to assign to
  const targetUserId = process.env.TEST_USER_ID;

  if (!targetUserId) {
    console.log(chalk.yellow("\n⚠ TEST_USER_ID not configured - skipping actual assignment"));
    console.log(chalk.dim("  To test: Set TEST_USER_ID in .env to a valid systemuser ID"));
    console.log(chalk.dim("\nExample code:"));
    console.log(
      chalk.dim(`
  await orgService.update('accounts', accountId, {
    'ownerid@odata.bind': \`/systemusers(\${targetUserId})\`,
  });
    `)
    );
    return;
  }

  console.log(`\nAssigning account to user ${chalk.dim(targetUserId.substring(0, 8) + "...")}`);

  await orgService.update("accounts", accountId, {
    "ownerid@odata.bind": `/systemusers(${targetUserId})`,
  });

  console.log(chalk.green("✓ Account assigned successfully"));

  // Verify assignment
  const account = await client
    .api(`/accounts(${accountId})`)
    .select("name", "_ownerid_value")
    .get<{ name: string; _ownerid_value: string }>();
  console.log(`\nVerified owner: ${chalk.yellow(account._ownerid_value)}`);
  console.log(chalk.dim("\nℹ️  Assignment is done via ownerid navigation property"));
}

/**
 * Demo 3: SetState (OrganizationService)
 *
 * Changes the state and status of a record.
 * Uses OrganizationService.update() with statecode/statuscode.
 */
async function setStateDemo(
  orgService: OrganizationService,
  client: DataverseClient
): Promise<void> {
  console.log(chalk.cyan("\n━━━ Demo 3: SetState (OrganizationService) ━━━\n"));

  // Create test account
  console.log("Creating test account...");
  const accountId = await orgService.create("accounts", {
    name: "Test Account for State Change",
    accountnumber: "STATE-001",
  });

  createdRecords.accounts.push(accountId);
  console.log(
    `  Created: ${chalk.dim(accountId.substring(0, 8) + "...")} - Status: ${chalk.green("Active")}`
  );

  // Deactivate account
  console.log("\nDeactivating account...");

  await orgService.update("accounts", accountId, {
    statecode: 1, // Inactive
    statuscode: 2, // Inactive
  });

  console.log(chalk.green("✓ Account deactivated"));

  // Verify state change
  const account = await client
    .api(`/accounts(${accountId})`)
    .select("name", "statecode", "statuscode")
    .get<{ name: string; statecode: number; statuscode: number }>();
  console.log(`\nVerified state:`);
  console.log(
    `  State Code: ${chalk.yellow(String(account.statecode))} (${account.statecode === 1 ? "Inactive" : "Active"})`
  );
  console.log(`  Status Code: ${chalk.yellow(String(account.statuscode))}`);

  console.log(chalk.dim("\nℹ️  SetState is done via statecode/statuscode properties"));
}

/**
 * Demo 4: ExecuteWorkflow (Message)
 *
 * Executes an on-demand workflow.
 * Requires a workflow to be created and activated.
 */
async function executeWorkflowDemo(orgService: OrganizationService): Promise<void> {
  console.log(chalk.cyan("\n━━━ Demo 4: ExecuteWorkflow (ExecuteWorkflowRequest) ━━━\n"));

  const workflowId = process.env.TEST_WORKFLOW_ID;

  if (!workflowId) {
    console.log(chalk.yellow("⚠ TEST_WORKFLOW_ID not configured - skipping"));
    console.log(chalk.dim("  To test:"));
    console.log(chalk.dim("  1. Create an on-demand workflow in Settings > Processes"));
    console.log(chalk.dim("  2. Activate the workflow"));
    console.log(chalk.dim("  3. Set TEST_WORKFLOW_ID in .env to the workflow GUID"));
    console.log(chalk.dim("\nExample code:"));
    console.log(
      chalk.dim(`
  const request = new ExecuteWorkflowRequest(workflowId, { EntityId: targetRecordId });
  const response = await orgService.execute(request);
  console.log(\`Async Operation ID: \${response.result?.asyncoperationid}\`);
    `)
    );
    return;
  }

  if (createdRecords.accounts.length === 0) {
    console.log(chalk.yellow("⚠ Need at least 1 account from previous demos"));
    return;
  }

  const targetAccount = createdRecords.accounts[0];

  console.log(`Executing workflow ${chalk.dim(workflowId.substring(0, 8) + "...")}`);
  console.log(`  On account: ${chalk.dim(targetAccount.substring(0, 8) + "...")}`);
  // InputArguments is optional; this workflow takes none
  const request = new ExecuteWorkflowRequest(workflowId, { EntityId: targetAccount });
  const response = await orgService.execute<ExecuteWorkflowResponse>(request);

  console.log(chalk.green("✓ Workflow execution initiated"));
  // The asyncoperation record, or null if the Web API answered 204 No Content
  console.log(`  Async Operation ID: ${chalk.yellow(response.result?.asyncoperationid ?? "")}`);
  console.log(chalk.dim("\nℹ️  Monitor execution in Settings > System Jobs"));
}

/**
 * Demo 5: WinOpportunity (Message - Sales)
 *
 * Marks an opportunity as won.
 * Requires Sales solution.
 */
async function winOpportunityDemo(
  orgService: OrganizationService,
  client: DataverseClient
): Promise<void> {
  console.log(chalk.cyan("\n━━━ Demo 5: WinOpportunity (WinOpportunityRequest) ━━━\n"));

  // Create test opportunity
  console.log("Creating test opportunity...");
  const opportunityId = await orgService.create("opportunities", {
    name: "Test Opportunity for Win",
    estimatedvalue: 75000,
    estimatedclosedate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  });

  createdRecords.opportunities.push(opportunityId);
  console.log(`  Created: ${chalk.dim(opportunityId.substring(0, 8) + "...")}`);
  console.log(`  Status: ${chalk.yellow("Open")}`);

  // Win the opportunity
  console.log("\nWinning opportunity...");

  const request = new WinOpportunityRequest({
    OpportunityClose: {
      "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose",
      "opportunityid@odata.bind": `/opportunities(${opportunityId})`,
      actualrevenue: 78000,
    },
    Status: 3,
  });

  await orgService.execute<WinOpportunityResponse>(request);

  console.log(chalk.green("✓ Opportunity won"));

  // Verify state change
  const opportunity = await client
    .api(`/opportunities(${opportunityId})`)
    .select("name", "statecode", "statuscode", "actualrevenue")
    .get<{ name: string; statecode: number; statuscode: number; actualrevenue: number | null }>();

  console.log("\nVerified opportunity:");
  console.log(`  State: ${chalk.yellow(opportunity.statecode === 1 ? "Won" : "Unknown")}`);
  console.log(`  Status Code: ${chalk.yellow(String(opportunity.statuscode))}`);
  console.log(
    `  Actual Revenue: ${chalk.green("$" + String(opportunity.actualrevenue?.toLocaleString()))}`
  );

  console.log(chalk.dim("\nℹ️  Similar messages: LoseOpportunity, CloseOpportunity"));
}

/**
 * Demo 6: Merge (Message - Platform)
 *
 * Merges two records of the same type.
 * All related records move to target, subordinate is deleted.
 */
async function mergeDemo(orgService: OrganizationService, client: DataverseClient): Promise<void> {
  console.log(chalk.cyan("\n━━━ Demo 6: Merge (MergeRequest) ━━━\n"));

  // Create two test leads
  console.log("Creating two leads for merge...");

  const targetId = await orgService.create("leads", {
    firstname: "Target",
    lastname: "Lead",
    subject: "Primary lead record",
    companyname: "Target Corp",
  });

  const subordinateId = await orgService.create("leads", {
    firstname: "Subordinate",
    lastname: "Lead",
    subject: "Duplicate lead record",
    companyname: "Subordinate Corp",
  });

  createdRecords.leads.push(targetId); // Only track target (subordinate will be deleted)

  console.log(
    `  Target: ${chalk.green("Target Lead")} (${chalk.dim(targetId.substring(0, 8) + "...")})`
  );
  console.log(
    `  Subordinate: ${chalk.yellow("Subordinate Lead")} (${chalk.dim(subordinateId.substring(0, 8) + "...")})`
  );

  // Merge subordinate into target
  console.log("\nMerging leads...");

  const request = new MergeRequest({
    Target: createEntityReference("lead", targetId),
    Subordinate: createEntityReference("lead", subordinateId),
    UpdateContent: {
      "@odata.type": "Microsoft.Dynamics.CRM.lead",
      subject: "Merged lead - consolidated from duplicate",
    },
    PerformParentingChecks: false,
  });

  await orgService.execute<MergeResponse>(request);

  console.log(chalk.green("✓ Leads merged successfully"));

  // Verify target updated
  const merged = await client
    .api(`/leads(${targetId})`)
    .select("firstname", "lastname", "subject", "companyname")
    .get<{
      firstname: string | null;
      lastname: string;
      subject: string | null;
      companyname: string | null;
    }>();

  console.log("\nMerged lead:");
  console.log(`  Name: ${chalk.green(`${merged.firstname ?? ""} ${merged.lastname}`)}`);
  console.log(`  Subject: ${chalk.dim(merged.subject ?? "")}`);
  console.log(`  Company: ${chalk.dim(merged.companyname ?? "")}`);

  // Verify subordinate deleted
  try {
    await client.api(`/leads(${subordinateId})`).select("leadid").get<{ leadid: string }>();
    console.log(chalk.red("✗ Subordinate lead still exists (unexpected)"));
  } catch (error: unknown) {
    if (error instanceof DataverseError && error.status === 404) {
      console.log(chalk.green("✓ Subordinate lead deleted"));
    }
  }

  console.log(chalk.dim("\nℹ️  Merge supports: account, contact, lead, incident"));
}

/**
 * Demo 7: ExportSolution (Message - Customization)
 *
 * Exports a solution as a zip file.
 * Requires solution to exist.
 */
async function exportSolutionDemo(orgService: OrganizationService): Promise<void> {
  console.log(chalk.cyan("\n━━━ Demo 7: ExportSolution (ExportSolutionRequest) ━━━\n"));

  const solutionName = process.env.SOLUTION_NAME ?? "Default";

  console.log(`Exporting solution: ${chalk.cyan(solutionName)}`);
  console.log(chalk.dim("Note: This may take 10-60 seconds depending on solution size...\n"));

  // SolutionName and Managed are required; the Export*Settings flags default to false
  const request = new ExportSolutionRequest({ SolutionName: solutionName, Managed: false });

  const startTime = Date.now();

  try {
    const response = await orgService.execute<ExportSolutionResponse>(request);
    const duration = Date.now() - startTime;

    console.log(chalk.green(`✓ Solution exported in ${(duration / 1000).toFixed(2)}s`));

    // Get file size: the exported solution zip, base64 encoded
    const solutionZip = Buffer.from(response.result.ExportSolutionFile, "base64");
    const sizeKB = (solutionZip.length / 1024).toFixed(2);

    console.log(`  File size: ${chalk.yellow(sizeKB + " KB")}`);
    console.log(`  Format: ${chalk.dim("ZIP (base64 encoded)")}`);

    console.log(chalk.dim("\nℹ️  Save to disk with:"));
    console.log(
      chalk.dim(
        "  fs.writeFileSync('solution.zip', Buffer.from(response.result.ExportSolutionFile, 'base64'))"
      )
    );
  } catch (error: unknown) {
    if (errorMessage(error).includes("does not exist")) {
      console.log(chalk.yellow(`⚠ Solution '${solutionName}' not found`));
      console.log(chalk.dim("  Set SOLUTION_NAME in .env to an existing solution"));
      console.log(chalk.dim("  Or export the Default solution (already attempted)"));
    } else {
      throw error;
    }
  }
}

/**
 * Demo 8: PublishXml (Message - Customization)
 *
 * Publishes customizations (entities, attributes, etc.).
 */
async function publishXmlDemo(orgService: OrganizationService): Promise<void> {
  console.log(chalk.cyan("\n━━━ Demo 8: PublishXml (PublishXmlRequest) ━━━\n"));

  // Example: Publish specific entities
  const parameterXml = `
    <importexportxml>
      <entities>
        <entity>account</entity>
        <entity>contact</entity>
      </entities>
      <nodes/>
      <securityroles/>
      <settings/>
      <workflows/>
    </importexportxml>
  `.trim();

  console.log("Publishing customizations for: account, contact");
  console.log(chalk.dim("Note: Publishing can take 5-30 seconds...\n"));

  const request = new PublishXmlRequest({ ParameterXml: parameterXml });

  const startTime = Date.now();

  try {
    await orgService.execute<PublishXmlResponse>(request);
    const duration = Date.now() - startTime;

    console.log(chalk.green(`✓ Customizations published in ${(duration / 1000).toFixed(2)}s`));
    console.log(chalk.dim("\nℹ️  Use PublishAllXml to publish all customizations"));
  } catch (error: unknown) {
    console.log(chalk.red("✗ Publish failed:"), errorMessage(error));
  }
}

/**
 * Demo 9: Generic OrganizationRequest
 *
 * For messages not yet typed in the SDK, use generic OrganizationRequest.
 */
async function genericRequestDemo(orgService: OrganizationService): Promise<void> {
  console.log(chalk.cyan("\n━━━ Demo 9: Generic OrganizationRequest ━━━\n"));

  console.log("Using generic OrganizationRequest for WhoAmI...");

  // Create generic request
  const request = new OrganizationRequest("WhoAmI", {});

  const response = await orgService.execute<OrganizationResponse>(request);

  console.log("\nGeneric response:");
  console.log(`  User ID: ${chalk.green(response.Results.UserId)}`);
  console.log(`  Business Unit ID: ${chalk.green(response.Results.BusinessUnitId)}`);
  console.log(`  Organization ID: ${chalk.green(response.Results.OrganizationId)}`);
  console.log(`  User ID: ${chalk.green(response.Results.UserId)}`);
  console.log(`  Business Unit ID: ${chalk.green(response.Results.BusinessUnitId)}`);
  console.log(`  Organization ID: ${chalk.green(response.Results.OrganizationId)}`);

  console.log(chalk.dim("\nℹ️  Use OrganizationRequest for:"));
  console.log(chalk.dim("  - Custom actions not in the SDK"));
  console.log(chalk.dim("  - Preview/beta messages"));
  console.log(chalk.dim("  - Partner/ISV messages"));

  console.log(chalk.dim("\nExample - Custom action:"));
  console.log(
    chalk.dim(`
  const customRequest = new OrganizationRequest('new_MyCustomAction', {
    Target: { LogicalName: 'account', Id: accountId },
    InputParam1: 'value1',
    InputParam2: 42,
  });

  const customResponse = await orgService.execute(customRequest);
  console.log(customResponse.Results.OutputParam);
  `)
  );
}

/**
 * Demo 10: OptionSet Value Handling
 *
 * Demonstrates OptionSet ergonomics: number | { Value: number }
 */
// eslint-disable-next-line @typescript-eslint/require-await
async function optionSetDemo(_orgService: OrganizationService): Promise<void> {
  console.log(chalk.cyan("\n━━━ Demo 10: OptionSet Value Handling ━━━\n"));

  console.log("SDK Messages accept OptionSet values in two formats:\n");

  // Format 1: Plain number
  console.log(chalk.dim("Format 1: Plain number"));
  console.log(
    chalk.dim(`
  // Update with plain numbers
  await orgService.update('accounts', accountId, {
    statecode: 1,  // ← Plain number
    statuscode: 2, // ← Plain number
  });
  `)
  );

  // Format 2: Messages typically use numbers directly
  console.log(chalk.dim("Format 2: In messages, use numbers directly"));
  console.log(
    chalk.dim(`
  const request = new WinOpportunityRequest({
    OpportunityClose: opportunityClose,
    Status: 3, // ← Status as plain number
  });
  `)
  );

  console.log(chalk.green("\n✓ Both formats are supported"));
  console.log(chalk.dim("\nℹ️  Internally, SDK normalizes to { Value: number } for Web API"));
  console.log(chalk.dim("    Use whichever format is more convenient for your code"));
}

/**
 * Cleanup - Delete all created test records
 */
async function cleanup(orgService: OrganizationService): Promise<void> {
  console.log(chalk.cyan("\n━━━ Cleanup ━━━\n"));

  let deletedCount = 0;

  // Delete opportunities (closes related opportunityclose records)
  for (const id of createdRecords.opportunities) {
    try {
      await orgService.delete("opportunities", id);
      deletedCount++;
      console.log(
        `${chalk.green("✓")} Deleted opportunity ${chalk.dim(id.substring(0, 8) + "...")}`
      );
    } catch (error: unknown) {
      console.log(`${chalk.red("✗")} Failed to delete opportunity: ${errorMessage(error)}`);
    }
  }

  // Delete leads
  for (const id of createdRecords.leads) {
    try {
      await orgService.delete("leads", id);
      deletedCount++;
      console.log(`${chalk.green("✓")} Deleted lead ${chalk.dim(id.substring(0, 8) + "...")}`);
    } catch (error: unknown) {
      console.log(`${chalk.red("✗")} Failed to delete lead: ${errorMessage(error)}`);
    }
  }

  // Delete accounts
  for (const id of createdRecords.accounts) {
    try {
      await orgService.delete("accounts", id);
      deletedCount++;
      console.log(`${chalk.green("✓")} Deleted account ${chalk.dim(id.substring(0, 8) + "...")}`);
    } catch (error: unknown) {
      console.log(`${chalk.red("✗")} Failed to delete account: ${errorMessage(error)}`);
    }
  }

  // Delete contacts
  for (const id of createdRecords.contacts) {
    try {
      await orgService.delete("contacts", id);
      deletedCount++;
      console.log(`${chalk.green("✓")} Deleted contact ${chalk.dim(id.substring(0, 8) + "...")}`);
    } catch (error: unknown) {
      console.log(`${chalk.red("✗")} Failed to delete contact: ${errorMessage(error)}`);
    }
  }

  // Delete incidents
  for (const id of createdRecords.incidents) {
    try {
      await orgService.delete("incidents", id);
      deletedCount++;
      console.log(`${chalk.green("✓")} Deleted incident ${chalk.dim(id.substring(0, 8) + "...")}`);
    } catch (error: unknown) {
      console.log(`${chalk.red("✗")} Failed to delete incident: ${errorMessage(error)}`);
    }
  }

  console.log(chalk.green(`\n✓ Cleanup complete - deleted ${String(deletedCount)} records`));
}

/**
 * Main execution
 */
async function main(): Promise<void> {
  console.log(chalk.bold.cyan("\n╔═══════════════════════════════════════════════════════╗"));
  console.log(chalk.bold.cyan("║   SDK Messages Sample (Sales + Customer Service)     ║"));
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

  const orgService = new OrganizationService(client);

  console.log(`Connected to: ${chalk.green(process.env.DATAVERSE_URL)}\n`);

  try {
    // Run all demos
    await whoAmIDemo(client);
    await assignDemo(orgService, client);
    await setStateDemo(orgService, client);
    await executeWorkflowDemo(orgService);
    await winOpportunityDemo(orgService, client);
    await mergeDemo(orgService, client);
    await exportSolutionDemo(orgService);
    await publishXmlDemo(orgService);
    await genericRequestDemo(orgService);
    await optionSetDemo(orgService);

    // Cleanup
    await cleanup(orgService);

    console.log(chalk.green.bold("\n✓ All demos completed successfully!\n"));
  } catch (error: unknown) {
    console.error(chalk.red("\n✗ Error:"), errorMessage(error));
    // The Web API's error body, when Dataverse answered
    if (error instanceof DataverseError && error.raw !== undefined) {
      console.error(chalk.dim(JSON.stringify(error.raw, null, 2)));
    }

    // Attempt cleanup even on error
    try {
      await cleanup(orgService);
    } catch (_cleanupError: unknown) {
      console.error(chalk.red("✗ Cleanup also failed"));
    }

    process.exit(1);
  }
}

void main();
