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

import { randomBytes } from "node:crypto";
import { config } from "dotenv";
import chalk from "chalk";
import { ConfidentialClientApplication } from "@azure/msal-node";
import { DataverseClient, DataverseError, odata } from "@mohsinonxrm/dataverse-sdk-core";
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
 * Every record this run creates is named `sdk-sample-<tag> ...` (leads by subject), so cleanup
 * can find them all. SAMPLE_RUN_TAG sets the tag (lowercase letters and digits); otherwise it's
 * random.
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
  incidents: [] as string[],
  solutions: [] as string[],
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
    name: `${runId} Test Account for Assignment`,
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
    name: `${runId} Test Account for State Change`,
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
    name: `${runId} Test Opportunity for Win`,
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
      subject: `${runId} Won: Test Opportunity`,
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
 * All related records move to target, subordinate is deactivated.
 */
async function mergeDemo(orgService: OrganizationService, client: DataverseClient): Promise<void> {
  console.log(chalk.cyan("\n━━━ Demo 6: Merge (MergeRequest) ━━━\n"));

  // Create two test leads
  console.log("Creating two leads for merge...");

  const targetId = await orgService.create("leads", {
    firstname: "Target",
    lastname: "Lead",
    subject: `${runId} Primary lead record`,
    companyname: "Target Corp",
  });
  createdRecords.leads.push(targetId);

  const subordinateId = await orgService.create("leads", {
    firstname: "Subordinate",
    lastname: "Lead",
    subject: `${runId} Duplicate lead record`,
    companyname: "Subordinate Corp",
  });
  // Merge deactivates the subordinate; it doesn't delete it, so cleanup deletes it
  createdRecords.leads.push(subordinateId);

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
      subject: `${runId} Merged lead - consolidated from duplicate`,
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

  // Verify subordinate deactivated (a lead's inactive state is Disqualified, statecode 2)
  const subordinate = await client
    .api(`/leads(${subordinateId})`)
    .select("statecode")
    .get<{ statecode: number }>();
  if (subordinate.statecode === 0) {
    throw new Error("The subordinate lead is still open after the merge");
  }
  console.log(
    chalk.green(`✓ Subordinate lead deactivated (statecode ${String(subordinate.statecode)})`)
  );

  console.log(chalk.dim("\nℹ️  Merge supports: account, contact, lead, incident"));
}

/**
 * Demo 7: ExportSolution (Message - Customization)
 *
 * Exports a solution as a zip file.
 * Requires solution to exist.
 */
async function exportSolutionDemo(
  orgService: OrganizationService,
  client: DataverseClient
): Promise<void> {
  console.log(chalk.cyan("\n━━━ Demo 7: ExportSolution (ExportSolutionRequest) ━━━\n"));

  // The Default solution can't be exported, so without SOLUTION_NAME the sample exports an
  // empty solution it creates (and deletes in cleanup)
  const solutionName = process.env.SOLUTION_NAME ?? (await createEmptySolution(client));

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
      console.log(chalk.dim("  Set SOLUTION_NAME in .env to an existing unmanaged solution,"));
      console.log(chalk.dim("  or leave it out to export an empty solution the sample creates"));
    }
    throw error;
  }
}

/**
 * Create an empty unmanaged solution, named with this run's id, under the publisher of the
 * Default solution. Returns its unique name.
 */
async function createEmptySolution(client: DataverseClient): Promise<string> {
  const uniqueName = `sdksample${runTag}`;
  console.log(`Creating an empty solution to export: ${chalk.cyan(uniqueName)}`);
  const { value } = await client
    .api("/solutions")
    .select("_publisherid_value")
    .filter(odata.eq("uniquename", "Default"))
    .get<{ value: Array<{ _publisherid_value: string }> }>();
  const publisherId = value.at(0)?._publisherid_value;
  if (!publisherId) throw new Error("The org has no Default solution to take a publisher from");
  const solutionId = await client.api("/solutions").createAndGetId({
    uniquename: uniqueName,
    friendlyname: `${runId} export demo`,
    version: "1.0.0.0",
    "publisherid@odata.bind": `/publishers(${publisherId})`,
  });
  createdRecords.solutions.push(solutionId);
  return uniqueName;
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
    throw error;
  }
}

/**
 * Demo 9: Generic OrganizationRequest
 *
 * For messages not yet typed in the SDK, use generic OrganizationRequest.
 */
async function genericRequestDemo(
  orgService: OrganizationService,
  client: DataverseClient
): Promise<void> {
  console.log(chalk.cyan("\n━━━ Demo 9: Generic OrganizationRequest ━━━\n"));

  // A generic request runs as a Web API action (POST), so it suits actions such as
  // LoseOpportunity; a function (GET) such as WhoAmI takes WhoAmIFunction (Demo 1)
  console.log("Creating test opportunity...");
  const opportunityId = await orgService.create("opportunities", {
    name: `${runId} Test Opportunity for Lose`,
    estimatedvalue: 20000,
  });
  createdRecords.opportunities.push(opportunityId);
  console.log(`  Created: ${chalk.dim(opportunityId.substring(0, 8) + "...")}`);

  console.log("\nUsing generic OrganizationRequest for LoseOpportunity...");

  // Create generic request; parameter values take the Web API shapes
  const request = new OrganizationRequest("LoseOpportunity", {
    OpportunityClose: {
      "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose",
      subject: `${runId} Lost: Test Opportunity`,
      "opportunityid@odata.bind": `/opportunities(${opportunityId})`,
    },
    Status: 4, // Canceled, a statuscode of the Lost state
  });

  const response = await orgService.execute<OrganizationResponse>(request);

  console.log("\nGeneric response:");
  console.log(`  Message: ${chalk.green(response.messageName)}`);
  console.log(
    `  Results: ${chalk.dim(JSON.stringify(response.Results))} (LoseOpportunity has none)`
  );

  const opportunity = await client
    .api(`/opportunities(${opportunityId})`)
    .select("statecode", "statuscode")
    .get<{ statecode: number; statuscode: number }>();
  if (opportunity.statecode !== 2) {
    throw new Error(`The opportunity isn't lost (statecode ${String(opportunity.statecode)})`);
  }
  console.log(`  State: ${chalk.yellow("Lost")}, Status Code: ${String(opportunity.statuscode)}`);

  console.log(chalk.dim("\nℹ️  Use OrganizationRequest for:"));
  console.log(chalk.dim("  - Custom actions not in the SDK"));
  console.log(chalk.dim("  - Preview/beta messages"));
  console.log(chalk.dim("  - Partner/ISV messages"));

  console.log(chalk.dim("\nExample - Custom action:"));
  console.log(
    chalk.dim(`
  const customRequest = new OrganizationRequest('new_MyCustomAction', {
    Target: { '@odata.type': 'Microsoft.Dynamics.CRM.account', accountid: accountId },
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
 * Cleanup - Delete all created test records: the ones the demos tracked, then any record still
 * named with this run's id (anything a failed demo created but didn't track). Returns false if
 * any couldn't be deleted.
 */
async function cleanup(orgService: OrganizationService, client: DataverseClient): Promise<boolean> {
  console.log(chalk.cyan("\n━━━ Cleanup ━━━\n"));

  let deletedCount = 0;
  let ok = true;

  // Opportunities first (deleting one deletes its opportunityclose records)
  const tables = [
    {
      set: "opportunities",
      label: "opportunity",
      ids: createdRecords.opportunities,
      key: "opportunityid",
      nameColumn: "name",
    },
    {
      set: "leads",
      label: "lead",
      ids: createdRecords.leads,
      key: "leadid",
      nameColumn: "subject",
    },
    {
      set: "accounts",
      label: "account",
      ids: createdRecords.accounts,
      key: "accountid",
      nameColumn: "name",
    },
    { set: "contacts", label: "contact", ids: createdRecords.contacts, key: "contactid" },
    { set: "incidents", label: "incident", ids: createdRecords.incidents, key: "incidentid" },
    {
      set: "solutions",
      label: "solution",
      ids: createdRecords.solutions,
      key: "solutionid",
      nameColumn: "friendlyname",
    },
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
        await orgService.delete(set, id);
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
  console.log(chalk.bold.cyan("║   SDK Messages Sample (Sales + Customer Service)     ║"));
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

  const orgService = new OrganizationService(client);

  console.log(`Connected to: ${chalk.green(settings.dataverseUrl)}`);
  console.log(chalk.dim(`Run id: ${runId} (every record this run creates is named with it)\n`));

  let failed = false;
  try {
    // Run all demos
    await whoAmIDemo(client);
    await assignDemo(orgService, client);
    await setStateDemo(orgService, client);
    await executeWorkflowDemo(orgService);
    await winOpportunityDemo(orgService, client);
    await mergeDemo(orgService, client);
    await exportSolutionDemo(orgService, client);
    await publishXmlDemo(orgService);
    await genericRequestDemo(orgService, client);
    await optionSetDemo(orgService);
  } catch (error: unknown) {
    failed = true;
    console.error(chalk.red("\n✗ Error:"), errorMessage(error));
    // The Web API's error body, when Dataverse answered
    if (error instanceof DataverseError && error.raw !== undefined) {
      console.error(chalk.dim(JSON.stringify(error.raw, null, 2)));
    }
  } finally {
    // Cleanup, also when a demo failed
    if (!(await cleanup(orgService, client))) failed = true;
  }

  if (failed) process.exit(1);
  console.log(chalk.green.bold("\n✓ All demos completed successfully!\n"));
}

main().catch((error: unknown) => {
  console.error(chalk.red("Unhandled error:"), error);
  process.exit(1);
});
