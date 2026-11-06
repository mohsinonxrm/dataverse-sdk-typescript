# SDK Messages Sample (Sales + Customer Service)

This sample demonstrates **SDK Messages** using the C#-familiar `OrganizationService.execute(request)` pattern with typed request/response pairs from `@mohsinonxrm/dataverse-sdk-messages`.

## What are SDK Messages?

SDK Messages are typed request/response pairs that wrap **Dataverse Web API operations**. They provide:

- **Strong typing** for request parameters and response values
- **Direct exports** - All message classes exported directly (e.g., `ExecuteWorkflowRequest`, `WinOpportunityRequest`)
- **Executable interface** - Each message implements `Executable<TResponse>`
- **EntityReference** support with `createEntityReference()` helper

### Messages vs Actions vs CRUD

| Approach                   | When to Use                                 | Example                                               |
| -------------------------- | ------------------------------------------- | ----------------------------------------------------- |
| **SDK Messages**           | OrganizationService pattern, typed messages | `orgService.execute(new ExecuteWorkflowRequest(...))` |
| **Actions/Functions**      | Direct HTTP execution                       | `client.execute(new WhoAmIFunction())`                |
| **CRUD (DataverseClient)** | Direct OData operations                     | `client.api('/accounts').get()`                       |

**All three approaches work** - choose based on your team's preference.

## What's in This Sample

This sample demonstrates:

1. **WhoAmI** (Function) - Get current user info
2. **Assign** (OrganizationService) - Assign a record to a user/team
3. **SetState** (OrganizationService) - Activate/deactivate records
4. **ExecuteWorkflow** (SDK Message) - Run on-demand workflows
5. **WinOpportunity** (SDK Message) - Mark opportunity as won
6. **Merge** (SDK Message) - Merge duplicate records
7. **ExportSolution** (SDK Message) - Export solution as ZIP
8. **PublishXml** (SDK Message) - Publish customizations
9. **Generic OrganizationRequest** - For custom/unlisted messages
10. **OptionSet Value Handling** - Plain numbers for choice values, and the execution patterns

## Prerequisites

### 1. Azure AD App Registration

Create an app registration with:

- **Client credentials** (client secret)
- **API permissions**: `Dynamics CRM > user_impersonation` or `.default`
- **Grant admin consent**

### 2. Application User

Create an Application User in your Dataverse environment:

1. Navigate to **Settings > Security > Users**
2. Switch view to **Application Users**
3. Create new application user linked to your Azure AD app
4. Assign **System Administrator** role

### 3. Environment Setup

```bash
# From repository root, install all dependencies
pnpm install

# Navigate to this sample
cd samples/messages-sales-cs

# Copy environment template
cp .env.example .env

# Edit .env with your values
```

Your `.env` should look like:

```env
AZURE_CLIENT_ID=12345678-1234-1234-1234-123456789abc
AZURE_TENANT_ID=87654321-4321-4321-4321-cba987654321
AZURE_CLIENT_SECRET=your-client-secret-here
DATAVERSE_URL=https://your-org.crm.dynamics.com

# Optional: For specific demos
# TEST_WORKFLOW_ID=00000000-0000-0000-0000-000000000000
# TEST_USER_ID=00000000-0000-0000-0000-000000000000
# SOLUTION_NAME=YourSolutionUniqueName
```

## Running the Sample

### Build the Sample

```bash
# From the sample directory
pnpm build
```

This compiles TypeScript to JavaScript in the `dist/` folder.

### Run the Sample

```bash
# Run directly with tsx (no build needed)
pnpm start

# Or run the built version
node dist/index.js

# Or use tsx directly
npx tsx src/index.ts
```

The sample will:

1. Authenticate using client credentials
2. Run all 10 demos in sequence
3. Show colored output for each message
4. Clean up test data automatically
5. Display message-to-WebAPI mappings

## Demo 1: WhoAmI (Function)

**Note**: WhoAmI is a Web API **function**, not a message. It's available as `WhoAmIFunction` from `@mohsinonxrm/dataverse-sdk-functions`.

```typescript
import { WhoAmIFunction } from "@mohsinonxrm/dataverse-sdk-functions";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";

const whoAmI = new WhoAmIFunction();
const response = await client.execute(whoAmI);

console.log(`User ID: ${response.UserId}`);
console.log(`Business Unit ID: ${response.BusinessUnitId}`);
console.log(`Organization ID: ${response.OrganizationId}`);
```

**Response Type:**

```typescript
interface WhoAmIResponse {
  UserId: string; // Current user's systemuserid
  BusinessUnitId: string; // User's business unit GUID
  OrganizationId: string; // Organization/environment GUID
}
```

**When to use:**

- Verify authentication
- Get current user context
- Determine user's business unit
- Available in all Dataverse environments

---

## Demo 2: Assign (OrganizationService)

**Operation**: Assigns a record to a different user or team. The sample does this with an
`orgService.update()` that binds `ownerid`; no message class is involved.

```typescript
const accountId = await orgService.create("accounts", { name: "Test Account for Assignment" });

await orgService.update("accounts", accountId, {
  "ownerid@odata.bind": `/systemusers(${targetUserId})`, // or `/teams(${teamId})`
});
```

`OrganizationService` also has a ready-made `assign()` (it takes the table's logical name, the
record id and the assignee id; see the [xrm README](../../packages/dataverse-sdk-xrm/README.md)):

```typescript
await orgService.assign("account", accountId, targetUserId);
```

The demo needs `TEST_USER_ID` in `.env` and skips the assignment without it.

**When to use:**

- Reassign records during a workflow
- Load balancing (distribute leads to a sales team)
- Escalation scenarios (assign a case to a manager)

---

## Demo 3: SetState (OrganizationService)

**Operation**: Changes the state (`statecode`) and status (`statuscode`) of a record. The sample
does it with `orgService.update()`:

```typescript
// Deactivate an account
await orgService.update("accounts", accountId, {
  statecode: 1, // Inactive
  statuscode: 2, // Inactive
});
```

`orgService.setState("account", accountId, 1, 2)` does the same with the logical name.

**Common State/Status Codes:**

| Entity              | State         | Meaning                       |
| ------------------- | ------------- | ----------------------------- |
| **account**         | 0 / 1         | Active / Inactive             |
| **contact**         | 0 / 1         | Active / Inactive             |
| **opportunity**     | 0 / 1 / 2     | Open / Won / Lost             |
| **incident (case)** | 0 / 1 / 2     | Active / Resolved / Canceled  |
| **quote**           | 0 / 1 / 2 / 3 | Draft / Active / Won / Closed |

Status values depend on the table, so check its status options.

**When to use:**

- Activate/deactivate records
- Resolve or cancel cases (use the dedicated close messages for opportunities, cases and quotes)

---

## Demo 4: ExecuteWorkflow (SDK Message)

**Message**: Executes an on-demand workflow against a record.

```typescript
import { ExecuteWorkflowRequest } from "@mohsinonxrm/dataverse-sdk-messages";

const workflowId = "12345678-1234-1234-1234-123456789abc";
const targetRecordId = "11111111-1111-1111-1111-111111111111";

const request = new ExecuteWorkflowRequest(workflowId, targetRecordId, { Arguments: [] });

const response = await orgService.execute<ExecuteWorkflowResponse>(request);

console.log(`Async Operation ID: ${response.result.asyncoperationid}`);
```

**Constructor:**

```typescript
new ExecuteWorkflowRequest(
  workflowId: string,
  entityId: string,
  inputArguments: InputArgumentCollection
)
```

**Response:** `ExecuteWorkflowResponse` has a `result` property, the created `asyncoperation`
(its `asyncoperationid` is the job to monitor).

**Monitoring Workflow Execution:**

```typescript
const asyncOperationId = response.result.asyncoperationid;

// Poll for completion
let asyncOp;
do {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2s

  asyncOp = await client
    .api(`/asyncoperations(${asyncOperationId})`)
    .select("statuscode", "message", "friendlymessage")
    .get<{ statuscode: number; message?: string }>();

  console.log(`Status: ${asyncOp.statuscode}`);
} while (asyncOp.statuscode < 30); // below 30: still waiting or running

// Check final status
if (asyncOp.statuscode === 30) {
  console.log("Workflow succeeded");
} else if (asyncOp.statuscode === 31) {
  console.log(`Workflow failed: ${asyncOp.message}`);
} else if (asyncOp.statuscode === 32) {
  console.log("Workflow canceled");
}
```

**Status Codes:**

- `0` - Waiting for Resources
- `10` - Waiting (queued)
- `20` - In Progress
- `21` - Pausing
- `22` - Canceling
- `30` - Succeeded
- `31` - Failed
- `32` - Canceled

**Requirements:**

- Workflow must be **Activated**
- Workflow must be **On Demand** (not background)
- User must have **Execute** privilege

The demo needs `TEST_WORKFLOW_ID` in `.env` and skips without it.

---

## Demo 5: WinOpportunity (SDK Message)

**Message**: Marks an opportunity as won and creates an opportunity close activity.

```typescript
import { WinOpportunityRequest } from "@mohsinonxrm/dataverse-sdk-messages";

const opportunityId = "11111111-1111-1111-1111-111111111111";

const request = new WinOpportunityRequest(
  {
    "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose",
    "opportunityid@odata.bind": `/opportunities(${opportunityId})`,
    subject: "Won: Big Enterprise Deal",
    actualrevenue: 125000,
    actualend: new Date().toISOString(),
  } as any, // the generated opportunityclose type does not model @odata.bind
  "", // caller: empty for the current user
  3 // status: a statuscode of the Won state
);

await orgService.execute<WinOpportunityResponse>(request);
```

**Constructor:**

```typescript
new WinOpportunityRequest(
  opportunityClose: opportunityclose,
  caller: string,
  status: number
)
```

**Result:**

- Opportunity `statecode` = 1 (Won), `statuscode` = 3 (Won)
- Creates an `opportunityclose` activity record
- Sets `actualrevenue` on the opportunity

---

## Demo 6: Merge (SDK Message)

**Message**: Merges two records of the same entity type. Moves related data to the target and
deletes the subordinate. The sample merges two leads.

```typescript
import { MergeRequest, createEntityReference } from "@mohsinonxrm/dataverse-sdk-messages";

const request = new MergeRequest(
  createEntityReference("lead", targetId), // target
  createEntityReference("lead", subordinateId), // subordinate
  {
    "@odata.type": "Microsoft.Dynamics.CRM.lead",
    subject: "Merged lead - consolidated from duplicate",
  } as any, // updateContent: the values to set on the target
  false // performParentingChecks
);

await orgService.execute<MergeResponse>(request);
```

**Constructor:**

```typescript
new MergeRequest(
  target: EntityReference,
  subordinate: EntityReference,
  updateContent: EntityReference, // typed as a reference; pass the entity values (cast as above)
  performParentingChecks: boolean
)
```

**What happens:**

1. Related records (activities, notes, relationships) move from the subordinate to the target
2. The target is updated with `updateContent`
3. The subordinate is **deleted**; this cannot be undone

Supported tables: `account`, `contact`, `lead`, `incident`.

---

## Demo 7: ExportSolution (SDK Message)

**Message**: Exports a solution as a base64-encoded ZIP file.

```typescript
import { ExportSolutionRequest } from "@mohsinonxrm/dataverse-sdk-messages";
import fs from "fs/promises";

const request = new ExportSolutionRequest(
  "MySolution", // solutionName
  false, // managed
  "", // targetVersion
  false, // exportAutoNumberingSettings
  false, // exportCalendarSettings
  false, // exportCustomizationSettings
  false, // exportEmailTrackingSettings
  false, // exportGeneralSettings
  false, // exportMarketingSettings
  false, // exportOutlookSynchronizationSettings
  false, // exportRelationshipRoles
  false, // exportIsvConfig
  false, // exportSales
  false, // exportExternalApplications
  {} // exportComponentsParams
);

const response = await orgService.execute<ExportSolutionResponse>(request);

// Save to disk
const solutionZip = Buffer.from(response.result.ExportSolutionFile ?? "", "base64");
await fs.writeFile("MySolution.zip", solutionZip);

console.log(`Exported ${(solutionZip.length / 1024).toFixed(2)} KB`);
```

The sample exports `SOLUTION_NAME` from `.env` (default: `Default`) and does not save the file.

**When to use:**

- Automate solution export in a CI/CD pipeline
- Back up solutions before modifications
- Export for version control
- Migrate solutions between environments

Export unmanaged solutions for source control and managed ones for deployment. Export time
grows with the size of the solution.

---

## Demo 8: PublishXml (SDK Message)

**Message**: Publishes customizations (entities, attributes, forms, etc.) to make them available.

```typescript
import { PublishXmlRequest } from "@mohsinonxrm/dataverse-sdk-messages";

// Publish specific entities
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

await orgService.execute(new PublishXmlRequest(parameterXml));
```

**Constructor:** `new PublishXmlRequest(parameterXml: string)`

Notes:

- Publishing can lock customizations temporarily, so schedule large publishes.
- After several metadata changes, publish once at the end, or use `PublishAllXmlRequest` to publish everything.

---

## Demo 9: Generic OrganizationRequest

For messages without a typed class, use `OrganizationRequest`. It takes the message name and its
parameters, and the response has the returned values in `Results`:

```typescript
import { OrganizationRequest, OrganizationResponse } from "@mohsinonxrm/dataverse-sdk-messages";

const request = new OrganizationRequest("WhoAmI", {});
const response = await orgService.execute<OrganizationResponse>(request);

console.log(response.Results.UserId);
console.log(response.Results.BusinessUnitId);
console.log(response.Results.OrganizationId);
```

### 1. Custom Actions

```typescript
const customRequest = new OrganizationRequest("new_CalculateCommission", {
  OpportunityId: opportunityId,
  Rate: 0.05,
});

const customResponse = await orgService.execute(customRequest);
```

### 2. Partner/ISV Messages

```typescript
const isvRequest = new OrganizationRequest("contoso_ValidateAddress", { Street: "1 Main St" });
```

### 3. Preview/Beta Messages

Use the generic request for a message that was released after this SDK version, then read
its output parameters from `response.Results`.

---

## Demo 10: OptionSet Value Handling

The last demo prints how choice values are written. In messages and in `orgService` calls, use
plain numbers:

```typescript
await orgService.update("accounts", accountId, {
  statecode: 1, // plain number
  statuscode: 2, // plain number
});

const request = new WinOpportunityRequest(opportunityClose, "", 3); // status as a plain number
```

### Execution patterns used by the other demos

**Direct execution** - build the request and pass it to `orgService.execute()` (or
`client.execute()`):

```typescript
const response = await orgService.execute<ExecuteWorkflowResponse>(request);
```

**Error handling** - failures throw typed SDK errors:

```typescript
import { DataverseError } from "@mohsinonxrm/dataverse-sdk-core";

try {
  await orgService.execute(request);
} catch (error) {
  if (error instanceof DataverseError) {
    console.error(`Dataverse error: ${error.message}`);
    console.error(`Status: ${error.status}`);
  } else {
    throw error;
  }
}
```

**Batching** - message classes are executed one by one. To send several operations in one round
trip, use the `$batch` builder with plain Web API requests (see
[the batch README](../../packages/dataverse-sdk-batch/README.md) and the `batch-ops` sample);
a request object is not an input to `BatchRequestBuilder`.

---

## Message-to-Web API Mapping

All SDK Messages are implemented on top of Web API. Here's how they map:

| SDK Message         | Web API Endpoint                                             | HTTP Method         |
| ------------------- | ------------------------------------------------------------ | ------------------- |
| **WhoAmI**          | `/WhoAmI()`                                                  | GET (function)      |
| **Assign**          | `PATCH /entity(id)` with `ownerid@odata.bind` (or `/Assign`) | PATCH (POST action) |
| **SetState**        | `PATCH /entity(id)` with statecode/statuscode                | PATCH               |
| **ExecuteWorkflow** | `/workflows(id)/Microsoft.Dynamics.CRM.ExecuteWorkflow`      | POST (bound action) |
| **WinOpportunity**  | `/WinOpportunity`                                            | POST (action)       |
| **Merge**           | `/Merge`                                                     | POST (action)       |
| **ExportSolution**  | `/ExportSolution`                                            | POST (action)       |
| **PublishXml**      | `/PublishXml`                                                | POST (action)       |

**See [`docs/mapping/message-to-webapi.md`](../../docs/mapping/message-to-webapi.md) for complete mapping.**

---

## Common Errors

### 1. EntityReference LogicalName Incorrect

**Error:**

```
InvalidArgument: Entity logical name 'Account' is not valid. Expected 'account'
```

**Fix:**

```typescript
// ❌ Wrong - Capital A
createEntityReference("Account", accountId);

// ✅ Correct - lowercase
createEntityReference("account", accountId);
```

**Logical names are always lowercase:**

- `account`, `contact`, `opportunity`, `lead`
- `systemuser`, `team`, `businessunit`
- Custom entities: `new_customentity` (prefix + lowercase)

### 2. Workflow Not Activated

**Error:**

```
ObjectDoesNotExist: Workflow with Id = ... is not activated
```

**Fix:**

1. Navigate to **Settings > Processes**
2. Find your workflow
3. Click **Activate**
4. Ensure workflow type is **On Demand**

### 3. Missing Privilege

**Error:**

```
PrivilegeNotGranted: Principal user (Id=..., type=8) is missing prvMergeAccount privilege
```

**Fix:**

- Assign security role with required privilege
- For Application Users, use **System Administrator** for testing
- In production, create custom role with specific privileges

### 4. Solution Not Found

**Error:**

```
ObjectDoesNotExist: Solution 'MySolution' does not exist
```

**Fix:**

- Use **unique name**, not display name
- Check spelling (case-sensitive)
- Verify solution exists in **Settings > Solutions**

### 5. Invalid State Transition

**Error:**

```
InvalidStateTransition: Cannot change statecode from 1 to 0 with statuscode 1
```

**Fix:**

- Check valid state/status combinations for entity
- Some transitions may be blocked by business rules
- Use correct status code for target state

---

## Best Practices

### 1. Use Typed Messages When Available

```typescript
// ✅ Preferred - Use WhoAmIFunction (typed function)
import { WhoAmIFunction } from "@mohsinonxrm/dataverse-sdk-functions";

const whoAmiFn = new WhoAmIFunction();
const response = await client.execute(whoAmiFn);
console.log(response.UserId); // TypeScript autocomplete works!

// ⚠️ Fallback - Untyped (for custom messages)
const genericRequest = new OrganizationRequest("new_CustomMessage", {});
const genericResponse = await orgService.execute(genericRequest);
console.log(genericResponse.Results.SomeOutput); // No autocomplete
```

### 2. Handle Async Operations

For messages that return async operation IDs:

```typescript
import { ExecuteWorkflowRequest } from "@mohsinonxrm/dataverse-sdk-messages";

const executeWf = new ExecuteWorkflowRequest(workflowId, entityId, { Arguments: [] });
const response = await orgService.execute<ExecuteWorkflowResponse>(executeWf);

// Monitor completion
const asyncOpId = response.result.asyncoperationid;
let completed = false;

while (!completed) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const asyncOp = await client
    .api(`/asyncoperations(${asyncOpId})`)
    .select("statuscode", "message")
    .get<{ statuscode: number; message?: string }>();

  if (asyncOp.statuscode >= 30) {
    // 30=Success, 31=Failed, 32=Canceled
    completed = true;
    if (asyncOp.statuscode === 30) {
      console.log("Workflow succeeded");
    } else {
      console.error(`Workflow failed: ${asyncOp.message}`);
    }
  }
}
```

### 3. Backup Before Destructive Operations

Before merge or delete:

```typescript
// Export record as JSON backup
const subordinate = await client
  .api(`/accounts(${subordinateId})`)
  .expand("contact_customer_accounts", "opportunity_customer_accounts", "annotation_account")
  .get();

const backup = {
  timestamp: new Date().toISOString(),
  record: subordinate,
};

await fs.writeFile(`backup_${subordinateId}.json`, JSON.stringify(backup, null, 2));

// Now safe to merge
await orgService.execute(mergeRequest);
```

### 4. Use OrganizationService for .NET SDK Familiarity

If migrating from .NET:

```typescript
// .NET: orgService.Execute(new WinOpportunityRequest { ... })

// TypeScript SDK - similar pattern
import { WinOpportunityRequest } from "@mohsinonxrm/dataverse-sdk-messages";
import { OrganizationService } from "@mohsinonxrm/dataverse-sdk-xrm";

const orgService = new OrganizationService(client);

await orgService.execute(new WinOpportunityRequest(opportunityClose, "", 3));

// CRUD, associate, assign and setState are methods on the service
await orgService.assign("account", accountId, userId);
```

### 5. Combine with DataverseClient for Flexibility

```typescript
import { WinOpportunityRequest } from "@mohsinonxrm/dataverse-sdk-messages";
import { OrganizationService } from "@mohsinonxrm/dataverse-sdk-xrm";

// Use OrganizationService for complex messages
const orgService = new OrganizationService(client);

const winRequest = new WinOpportunityRequest(opportunityClose, "", 3);
await orgService.execute(winRequest);

// Use DataverseClient for simple queries
const accounts = await client
  .api("/accounts")
  .filter("revenue gt 100000")
  .select("name", "revenue")
  .top(10)
  .get<{ value: { name: string; revenue?: number }[] }>();

// Best of both worlds!
```

---

## Advanced Patterns

### Pattern 1: Batch Message Execution

Message classes run one request at a time. To send several operations in one round trip, put the
equivalent Web API calls in a `$batch` changeset:

```typescript
import { BatchRequestBuilder } from "@mohsinonxrm/dataverse-sdk-batch";

const batch = new BatchRequestBuilder(client);
batch.beginChangeset();

batch.addRequest("win", "POST", "WinOpportunity", undefined, {
  OpportunityClose: {
    "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose",
    "opportunityid@odata.bind": `/opportunities(${opportunityId})`,
    subject: "Won Deal",
  },
  Status: 3,
});

batch.addRequest("assign", "PATCH", `accounts(${accountId})`, undefined, {
  "ownerid@odata.bind": `/systemusers(${userId})`,
});

batch.endChangeset();

const result = await batch.execute(); // throws DataverseBatchError if a request fails
// All requests ran in one transaction
```

### Pattern 2: Solution Export Automation (CI/CD)

```typescript
import fs from "fs/promises";
import path from "path";

async function exportSolutionForCI(
  orgService: OrganizationService,
  solutionName: string,
  outputDir: string
): Promise<void> {
  const timestamp = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  // Every export flag is positional; see Demo 7 for the full list
  const exportSolution = async (managed: boolean): Promise<Buffer> => {
    const request = new ExportSolutionRequest(
      solutionName,
      managed,
      "", // targetVersion
      false, // exportAutoNumberingSettings
      false, // exportCalendarSettings
      false, // exportCustomizationSettings
      false, // exportEmailTrackingSettings
      false, // exportGeneralSettings
      false, // exportMarketingSettings
      false, // exportOutlookSynchronizationSettings
      false, // exportRelationshipRoles
      false, // exportIsvConfig
      false, // exportSales
      false, // exportExternalApplications
      {} // exportComponentsParams
    );
    const response = await orgService.execute<ExportSolutionResponse>(request);
    return Buffer.from(response.result.ExportSolutionFile ?? "", "base64");
  };

  // Export unmanaged for source control, managed for deployment
  for (const managed of [false, true]) {
    const label = managed ? "managed" : "unmanaged";
    console.log(`Exporting ${solutionName} (${label})...`);

    const zip = await exportSolution(managed);
    const zipPath = path.join(outputDir, `${solutionName}_${timestamp}_${label}.zip`);
    await fs.writeFile(zipPath, zip);

    console.log(`✓ ${label}: ${zipPath} (${(zip.length / 1024).toFixed(2)} KB)`);
  }
}

// Usage in CI/CD pipeline
await exportSolutionForCI(orgService, "MySolution", "./exports");
```

### Pattern 3: Workflow Execution with Retry

```typescript
async function executeWorkflowWithRetry(
  orgService: OrganizationService,
  workflowId: string,
  entityId: string,
  maxRetries: number = 3
): Promise<string> {
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const request = new ExecuteWorkflowRequest(
        workflowId,
        entityId,
        { Arguments: [] } // input arguments
      );

      const response = await orgService.execute<ExecuteWorkflowResponse>(request);
      return response.result.asyncoperationid ?? ""; // asyncoperationid
    } catch (error: any) {
      attempt++;

      if (error.message?.includes("locked") && attempt < maxRetries) {
        console.log(`Attempt ${attempt} failed (locked), retrying...`);
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt)); // Exponential backoff
      } else {
        throw error;
      }
    }
  }

  throw new Error(`Failed to execute workflow after ${maxRetries} attempts`);
}
```

### Pattern 4: Smart Merge with Conflict Resolution

```typescript
interface MergeConflictResolver {
  resolveString?: (target: string, subordinate: string) => string;
  resolveNumber?: (target: number, subordinate: number) => number;
  resolveDate?: (target: Date, subordinate: Date) => Date;
}

async function smartMerge(
  orgService: OrganizationService,
  client: DataverseClient,
  entityLogicalName: string,
  targetId: string,
  subordinateId: string,
  resolver: MergeConflictResolver
): Promise<void> {
  // Fetch both records (the entity set name comes from metadata, not from adding an "s")
  const entitySet = await orgService.getEntitySetName(entityLogicalName);
  const [target, subordinate] = await Promise.all([
    client.api(`/${entitySet}(${targetId})`).get<Record<string, any>>(),
    client.api(`/${entitySet}(${subordinateId})`).get<Record<string, any>>(),
  ]);

  // Resolve conflicts
  const updateContent: any = {};

  for (const field of Object.keys(subordinate)) {
    if (field.startsWith("_") || field.startsWith("@")) continue; // Skip metadata

    const targetValue = target[field];
    const subValue = subordinate[field];

    if (subValue !== null && subValue !== undefined) {
      if (targetValue === null || targetValue === undefined) {
        // Target missing, use subordinate
        updateContent[field] = subValue;
      } else if (typeof subValue === "string" && resolver.resolveString) {
        updateContent[field] = resolver.resolveString(targetValue, subValue);
      } else if (typeof subValue === "number" && resolver.resolveNumber) {
        updateContent[field] = resolver.resolveNumber(targetValue, subValue);
      }
      // Add more type handlers as needed
    }
  }

  // Execute merge
  const mergeRequest = new MergeRequest(
    createEntityReference(entityLogicalName, targetId),
    createEntityReference(entityLogicalName, subordinateId),
    {
      "@odata.type": `Microsoft.Dynamics.CRM.${entityLogicalName}`,
      ...updateContent,
    },
    false // performParentingChecks
  );

  await orgService.execute(mergeRequest);
}

// Usage
await smartMerge(orgService, client, "account", targetId, subordinateId, {
  resolveString: (target, sub) => `${target}; ${sub}`, // Concatenate
  resolveNumber: (target, sub) => target + sub, // Sum
  resolveDate: (target, sub) => (target > sub ? target : sub), // Most recent
});
```

---

## Summary

This sample demonstrated:

✅ **SDK Messages**: ExecuteWorkflowRequest, WinOpportunityRequest, MergeRequest, ExportSolutionRequest, PublishXmlRequest
✅ **OrganizationService**: update/assign/setState for ownership and state changes
✅ **Functions**: WhoAmIFunction (from @mohsinonxrm/dataverse-sdk-functions)
✅ **Generic OrganizationRequest** for custom/unlisted messages  
✅ **EntityReference pattern**: `createEntityReference('entity', id)`
✅ **Async operation monitoring**: Poll statuscode for completion  
✅ **Best practices**: Backup before merge, privilege handling, state transitions  
✅ **Advanced patterns**: CI/CD automation, retry logic, conflict resolution

**Key Takeaways:**

1. **SDK Messages** provide .NET SDK-familiar patterns in TypeScript
2. **All message classes** are exported directly (no namespace organization)
3. **Each message** extends `OrganizationRequest` and implements `Executable<TResponse>`
4. **OrganizationService.execute()** is the entry point
5. **OptionSet values** are plain numbers in messages and in `orgService` calls
6. **EntityReference**: `createEntityReference('entity', id)` gives the Web API shape
7. **Async operations** require polling for completion
8. **Merge is destructive** - always backup subordinate data

**Next Steps:**

- Explore `@mohsinonxrm/dataverse-sdk-actions` for HTTP-first actions/functions
- See `actions-functions` sample for typed action executables
- Review `docs/mapping/message-to-webapi.md` for complete mapping
- See the `batch-ops` sample for `$batch` changesets (message classes themselves run one at a time)

## License

This sample is part of `@mohsinonxrm/dataverse-sdk-typescript` and is licensed under GNU AGPL v3.0.
