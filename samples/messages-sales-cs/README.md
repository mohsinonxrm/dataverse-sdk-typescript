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
2. **Assign** (SDK Message) - Assign record to user/team
3. **SetState** (SDK Message) - Activate/deactivate records
4. **ExecuteWorkflow** (SDK Message) - Run on-demand workflows
5. **WinOpportunity** (SDK Message) - Mark opportunity as won
6. **Merge** (SDK Message) - Merge duplicate records
7. **ExportSolution** (SDK Message) - Export solution as ZIP
8. **PublishXml** (SDK Message) - Publish customizations
9. **Generic OrganizationRequest** - For custom/unlisted messages
10. **Message Execution Patterns** - Common patterns and best practices

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

## Demo 2: Assign (SDK Message)

**Message**: Assigns a record to a different user or team.

```typescript
import { AssignRequest } from "@mohsinonxrm/dataverse-sdk-messages";
import { createEntityReference } from "@mohsinonxrm/dataverse-sdk-messages";

const accountId = "11111111-1111-1111-1111-111111111111";
const targetUserId = "22222222-2222-2222-2222-222222222222";

const request = new AssignRequest(
  createEntityReference("account", accountId),
  createEntityReference("systemuser", targetUserId) // or 'team'
);

await orgService.execute(request);
```

**Constructor:**

```typescript
new AssignRequest(
  target: EntityReference,    // Record to assign
  assignee: EntityReference   // User or team to assign to
)
```

**When to use:**

- Reassign records during workflow
- Load balancing (distribute leads to sales team)
- Escalation scenarios (assign case to manager)

---

## Demo 3: SetState (SDK Message)

**Message**: Changes the state (statecode) and status (statuscode) of a record.

```typescript
import { SetStateRequest } from "@mohsinonxrm/dataverse-sdk-messages";
import { createEntityReference } from "@mohsinonxrm/dataverse-sdk-messages";

const accountId = "11111111-1111-1111-1111-111111111111";

// Deactivate account
const request = new SetStateRequest(
  createEntityReference("account", accountId),
  1, // State: Inactive
  2 // Status: Inactive
);

await orgService.execute(request);
```

**Constructor:**

```typescript
new SetStateRequest(
  entityMoniker: EntityReference,
  state: number,
  status: number
)
```

**Common State/Status Codes:**

| Entity              | State         | Status                        | Meaning |
| ------------------- | ------------- | ----------------------------- | ------- |
| **account**         | 0 / 1         | Active / Inactive             |
| **contact**         | 0 / 1         | Active / Inactive             |
| **opportunity**     | 0 / 1 / 2     | Open / Won / Lost             |
| **incident (case)** | 0 / 1 / 2     | Active / Resolved / Canceled  |
| **quote**           | 0 / 1 / 2 / 3 | Draft / Active / Won / Closed |

**When to use:**

- Activate/deactivate records
- Change opportunity to won/lost
- Resolve/cancel cases
- Close quotes

**vs PATCH /api/data/v9.2/accounts(id):**

- SetState validates state transitions
- SetState triggers plugins/workflows for state changes
- PATCH may fail on invalid transitions

---

## Demo 4: ExecuteWorkflow (SDK Message)

**Message**: Executes an on-demand workflow against a record.

```typescript
import { ExecuteWorkflowRequest } from "@mohsinonxrm/dataverse-sdk-messages";

const workflowId = "12345678-1234-1234-1234-123456789abc";
const targetRecordId = "11111111-1111-1111-1111-111111111111";

const request = new ExecuteWorkflowRequest(
  workflowId,
  targetRecordId,
  {} // Optional input arguments
);

const response = await orgService.execute(request);

console.log(`Async Operation ID: ${response.Id}`);
```

**Constructor:**

```typescript
new ExecuteWorkflowRequest(
  workflowId: string,
  entityId: string,
  inputArguments?: Record<string, unknown>
)
```

**Response Type:**

```typescript
interface ExecuteWorkflowResponse {
  Id: string; // asyncoperationid for monitoring
}
```

**Monitoring Workflow Execution:**

```typescript
// Poll for completion
let asyncOp;
do {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2s

  asyncOp = await client
    .api(`/asyncoperations(${response.Id})`)
    .select("statuscode", "message", "friendlymessage")
    .get();

  console.log(`Status: ${asyncOp.statuscode}`);
} while (asyncOp.statuscode === 0); // 0 = In Progress

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

**When to use:**

- Trigger complex business logic
- Run background processes
- Execute long-running operations asynchronously

**Requirements:**

- Workflow must be **Activated**
- Workflow must be **On Demand** (not background)
- User must have **Execute** privilege

---

## Demo 5: WinOpportunity (SDK Message)

**Message**: Marks an opportunity as won and creates an opportunity close activity.

```typescript
import { WinOpportunityRequest } from "@mohsinonxrm/dataverse-sdk-messages";
import { createEntityReference } from "@mohsinonxrm/dataverse-sdk-messages";

const opportunityId = "11111111-1111-1111-1111-111111111111";

const request = new WinOpportunityRequest(
  {
    subject: "Won: Big Enterprise Deal",
    actualrevenue: 125000,
    opportunityid: createEntityReference("opportunity", opportunityId),
    actualend: new Date().toISOString(),
    description: "Closed after 3 months of negotiation",
  },
  -1 // Won status code
);

await orgService.execute(request);
```

**Constructor:**

```typescript
new WinOpportunityRequest(
  opportunityClose: Record<string, unknown>,
  status: number
)
```

**Result:**

- Opportunity `statecode` = 1 (Won)
- Opportunity `statuscode` = 3 (Won)
- Creates `opportunityclose` activity record
- Updates `actualrevenue` on opportunity
- Updates `actualend` date

**When to use:**

- Close opportunities as won
- Set actual revenue (may differ from estimate)
- Trigger win-related plugins/workflows
- Generate reports on won deals

---

## Demo 6: Merge (SDK Message)

**Message**: Merges two records of the same entity type. Moves all related data to target and deletes subordinate.

```typescript
import { MergeRequest } from "@mohsinonxrm/dataverse-sdk-messages";
import { createEntityReference } from "@mohsinonxrm/dataverse-sdk-messages";

const targetId = "11111111-1111-1111-1111-111111111111";
const subordinateId = "22222222-2222-2222-2222-222222222222";

const request = new MergeRequest(
  createEntityReference("account", targetId),
  subordinateId,
  {
    revenue: 800000, // Combined revenue from both accounts
    description: "Merged from duplicate record",
  },
  false // PerformParentingChecks
);

await orgService.execute(request);
```

**Constructor:**

```typescript
new MergeRequest(
  target: EntityReference,
  subordinateId: string,
  updateContent: Record<string, unknown>,
  performParentingChecks: boolean
)
```

**What Happens:**

1. All activities, notes, attachments move from subordinate to target
2. All relationships (contacts, opportunities) reassigned to target
3. Target record updated with `updateContent`
4. Subordinate record **permanently deleted**
5. Cannot be undone!

**Supported Entities:**

- `account`
- `contact`
- `lead`
- `incident` (case)

**When to use:**

- Deduplicate customer records
- Consolidate data after import
- Merge duplicate leads from different sources
- Clean up after data migration

**Best Practices:**

```typescript
// 1. Export subordinate data as backup
const subordinate = await client
  .api(`/accounts(${subordinateId})`)
  .expand("contact_customer_accounts", "opportunity_customer_accounts")
  .get();

await fs.writeFile("backup.json", JSON.stringify(subordinate, null, 2));

// 2. Review related records
const relatedContacts = await client
  .api("/contacts")
  .filter(`_parentcustomerid_value eq ${subordinateId}`)
  .get();

console.log(`Will reassign ${relatedContacts.value.length} contacts to target`);

// 3. Combine numeric fields
const target = await client.api(`/accounts(${targetId})`).select("revenue").get();
const sub = await client.api(`/accounts(${subordinateId})`).select("revenue").get();

const updateContent = {
  revenue: (target.revenue || 0) + (sub.revenue || 0),
};

// 4. Merge with combined data
await orgService.execute(request);
```

**Common Errors:**

**Error:** `The record you are trying to merge has child records`

**Fix:** Set `performParentingChecks: true` or delete child records first

**Error:** `You do not have sufficient permissions`

**Fix:** User needs **Merge** privilege on the entity

---

## Demo 7: ExportSolution (SDK Message)

**Message**: Exports a solution as a base64-encoded ZIP file.

```typescript
import { ExportSolutionRequest } from "@mohsinonxrm/dataverse-sdk-messages";
import fs from "fs/promises";

const request = new ExportSolutionRequest(
  "MySolution", // SolutionName
  false, // Managed
  {
    // Options
    ExportAutoNumberingSettings: false,
    ExportCalendarSettings: false,
    ExportCustomizationSettings: false,
    ExportEmailTrackingSettings: false,
    ExportGeneralSettings: false,
    ExportMarketingSettings: false,
    ExportOutlookSynchronizationSettings: false,
    ExportRelationshipRoles: false,
    ExportIsvConfig: false,
    ExportSales: false,
    ExportExternalApplications: false,
  }
);

const response = await orgService.execute(request);

// Save to disk
const solutionZip = Buffer.from(response.ExportSolutionFile, "base64");
await fs.writeFile("MySolution.zip", solutionZip);

console.log(`Exported ${(solutionZip.length / 1024).toFixed(2)} KB`);
```

**Constructor:**

```typescript
new ExportSolutionRequest(
  solutionName: string,
  managed: boolean,
  options?: ExportSolutionOptions
)
```

**When to use:**

- Automate solution export in CI/CD pipeline
- Backup solutions before modifications
- Export for version control (Git)
- Migrate solutions between environments

**Performance:**

- Small solutions (10-50 components): 5-15 seconds
- Medium solutions (50-200 components): 15-45 seconds
- Large solutions (200+ components): 45-180 seconds

**Best Practices:**

```typescript
// 1. Export unmanaged for source control
const unmanagedRequest = new ExportSolutionRequest("MySolution", false, {
  // All settings: false for minimal diff
});

const unmanagedResponse = await orgService.execute(unmanagedRequest);
await fs.writeFile(
  "MySolution_unmanaged.zip",
  Buffer.from(unmanagedResponse.ExportSolutionFile, "base64")
);

// 2. Export managed for deployment
const managedRequest = new ExportSolutionRequest("MySolution", true);

const managedResponse = await orgService.execute(managedRequest);
await fs.writeFile(
  "MySolution_managed.zip",
  Buffer.from(managedResponse.ExportSolutionFile, "base64")
);

// 3. Add timestamp to filename
const timestamp = new Date().toISOString().replace(/:/g, "-").split(".")[0];
await fs.writeFile(`MySolution_${timestamp}.zip`, solutionZip);
```

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
      <entity>new_customentity</entity>
    </entities>
    <nodes/>
    <securityroles/>
    <settings/>
    <workflows/>
  </importexportxml>
`.trim();

const request = new PublishXmlRequest(parameterXml);

await orgService.execute(request);
```

**Constructor:**

```typescript
new PublishXmlRequest(parameterXml: string)
```

**When to use:**

- After creating/updating metadata (entities, attributes)
- After modifying forms or views
- After workflow changes
- Part of deployment automation

**vs PublishAllXml:**

| PublishXml                | PublishAllXml              |
| ------------------------- | -------------------------- |
| Publish specific entities | Publish all customizations |
| Faster (5-30 seconds)     | Slower (30-300 seconds)    |
| Less disruptive           | Can impact performance     |
| Use in development        | Use before major release   |

**Performance Impact:**

- Publishing can lock customizations temporarily
- Active users may experience brief slowness
- Schedule during maintenance window for large publishes

**Best Practices:**

```typescript
// 1. Publish only what changed
const publishAfterMetadataChange = async (entityLogicalName: string) => {
  const xml = `
    <importexportxml>
      <entities>
        <entity>${entityLogicalName}</entity>
      </entities>
      <nodes/>
      <securityroles/>
      <settings/>
      <workflows/>
    </importexportxml>
  `.trim();

  await orgService.execute(new PublishXmlRequest(xml));
};

// 2. Batch metadata changes, then publish once
await metadataClient.createEntity(/* ... */);
await metadataClient.createAttribute(/* ... */);
await metadataClient.createAttribute(/* ... */);

// Publish all changes at once
await orgService.execute(new PublishAllXmlRequest());
```

---

## Demo 9: Generic OrganizationRequest

For messages not yet typed in the SDK, use `OrganizationRequest`:

```typescript
import { OrganizationRequest } from "@mohsinonxrm/dataverse-sdk-messages";

// Generic request for WhoAmI (though WhoAmIFunction is preferred)
const request = new OrganizationRequest("WhoAmI", {});

const response = await orgService.execute(request);

console.log(response.Results.UserId);
console.log(response.Results.BusinessUnitId);
console.log(response.Results.OrganizationId);
```

**Use cases:**

### 1. Custom Actions

```typescript
// Execute custom action created in your environment
const customRequest = new OrganizationRequest("new_CalculateCommission", {
  Target: {
    "@odata.type": "Microsoft.Dynamics.CRM.opportunity",
    opportunityid: opportunityId,
  },
  CommissionRate: 0.05,
});

const customResponse = await orgService.execute(customRequest);
console.log(`Commission: $${customResponse.Results.CommissionAmount}`);
```

### 2. Partner/ISV Messages

```typescript
// Execute ISV-provided custom message
const isvRequest = new OrganizationRequest("contoso_ValidateAddress", {
  Street: "123 Main St",
  City: "Seattle",
  State: "WA",
  ZipCode: "98101",
});

const isvResponse = await orgService.execute(isvRequest);
console.log(`Valid: ${isvResponse.Results.IsValid}`);
```

### 3. Preview/Beta Messages

```typescript
// Use preview messages before SDK support
const previewRequest = new OrganizationRequest("msdyn_NewFeatureRequest", {
  InputParameter: "value",
});

const previewResponse = await orgService.execute(previewRequest);
```

**Response Structure:**

```typescript
interface OrganizationResponse {
  Results: Record<string, any>; // Output parameters
}
```

Access output parameters via `Results`:

```typescript
const response = await orgService.execute(request);

// Access outputs
const outputValue = response.Results.OutputParameterName;
const anotherValue = response.Results.AnotherParameter;
```

---

## Demo 10: Message Execution Patterns

SDK Messages provide a consistent execution pattern across all operations:

### Pattern 1: Direct Message Execution

```typescript
import { AssignRequest, SetStateRequest } from "@mohsinonxrm/dataverse-sdk-messages";
import { createEntityReference } from "@mohsinonxrm/dataverse-sdk-messages";

// Create request with typed constructor
const request = new AssignRequest(
  createEntityReference("account", accountId),
  createEntityReference("systemuser", userId)
);

// Execute through OrganizationService
const response = await orgService.execute(request);
```

### Pattern 2: Error Handling

```typescript
import { DataverseError } from "@mohsinonxrm/dataverse-sdk-core";

try {
  await orgService.execute(request);
} catch (error) {
  if (error instanceof DataverseError) {
    console.error(`Dataverse error: ${error.message}`);
    console.error(`Status: ${error.statusCode}`);
  } else {
    throw error;
  }
}
```

### Pattern 3: Batch Execution

```typescript
// Messages can be batched for better performance
import { createBatch } from "@mohsinonxrm/dataverse-sdk-batch";

const batch = createBatch(client);

// Add multiple message executions
batch.addChangeSet([
  new AssignRequest(/* ... */),
  new SetStateRequest(/* ... */),
  new ExecuteWorkflowRequest(/* ... */),
]);

const responses = await batch.execute();
```

---

## Message-to-Web API Mapping

All SDK Messages are implemented on top of Web API. Here's how they map:

| SDK Message         | Web API Endpoint                                        | HTTP Method         |
| ------------------- | ------------------------------------------------------- | ------------------- |
| **WhoAmI**          | `/WhoAmI()`                                             | GET (function)      |
| **Assign**          | `/Assign`                                               | POST (action)       |
| **SetState**        | `PATCH /entity(id)` with statecode/statuscode           | PATCH               |
| **ExecuteWorkflow** | `/workflows(id)/Microsoft.Dynamics.CRM.ExecuteWorkflow` | POST (bound action) |
| **WinOpportunity**  | `/WinOpportunity`                                       | POST (action)       |
| **Merge**           | `/Merge`                                                | POST (action)       |
| **ExportSolution**  | `/ExportSolution`                                       | POST (action)       |
| **PublishXml**      | `/PublishXml`                                           | POST (action)       |

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
Target: { LogicalName: 'Account', Id: accountId }

// ✅ Correct - lowercase
Target: { LogicalName: 'account', Id: accountId }
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

const executeWf = new ExecuteWorkflowRequest(workflowId, entityId, {});
const response = await orgService.execute(executeWf);

// Monitor completion
const asyncOpId = response.Id;
let completed = false;

while (!completed) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const asyncOp = await client
    .api(`/asyncoperations(${asyncOpId})`)
    .select("statuscode", "message")
    .get();

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
// .NET SDK pattern
var orgService = new OrganizationService(client);

var assignRequest = new AssignRequest {
  Target = new EntityReference("account", accountId),
  Assignee = new EntityReference("systemuser", userId)
};
orgService.Execute(assignRequest);

// TypeScript SDK - similar pattern!
import { AssignRequest, createEntityReference } from '@mohsinonxrm/dataverse-sdk-messages';
import { OrganizationService } from '@mohsinonxrm/dataverse-sdk-xrm';

const orgService = new OrganizationService(client);

const assignRequest = new AssignRequest(
  createEntityReference('account', accountId),
  createEntityReference('systemuser', userId)
);
await orgService.execute(assignRequest);
```

### 5. Combine with DataverseClient for Flexibility

```typescript
import { WinOpportunityRequest, createEntityReference } from "@mohsinonxrm/dataverse-sdk-messages";
import { OrganizationService } from "@mohsinonxrm/dataverse-sdk-xrm";

// Use OrganizationService for complex messages
const orgService = new OrganizationService(client);

const winRequest = new WinOpportunityRequest(
  { subject: "Won Deal", opportunityid: createEntityReference("opportunity", oppId) },
  -1
);
await orgService.execute(winRequest);

// Use DataverseClient for simple queries
const accounts = await client
  .api("/accounts")
  .filter("revenue gt 100000")
  .select("name", "revenue")
  .top(10)
  .get();

// Best of both worlds!
```

---

## Advanced Patterns

### Pattern 1: Batch Message Execution

Execute multiple messages efficiently:

```typescript
// Use $batch to execute multiple messages
const batch = client.batch();

batch.beginChangeset();

// Add message requests as POST actions
batch.addRequest(
  client.api("/WinOpportunity").post({
    OpportunityClose: {/* ... */},
    Status: -1,
  })
);

batch.addRequest(
  client.api("/Assign").post({
    Target: {/* ... */},
    Assignee: {/* ... */},
  })
);

batch.endChangeset();

const batchResponse = await batch.execute();

// All messages executed transactionally
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

  // Export unmanaged for source control
  const unmanagedRequest = new ExportSolutionRequest(
    solutionName,
    false, // managed
    {
      ExportAutoNumberingSettings: false,
      ExportCalendarSettings: false,
      ExportCustomizationSettings: false,
      ExportEmailTrackingSettings: false,
      ExportGeneralSettings: false,
      ExportMarketingSettings: false,
      ExportOutlookSynchronizationSettings: false,
      ExportRelationshipRoles: false,
      ExportIsvConfig: false,
      ExportSales: false,
      ExportExternalApplications: false,
    }
  );

  console.log(`Exporting ${solutionName} (unmanaged)...`);
  const unmanagedResponse = await orgService.execute(unmanagedRequest);

  const unmanagedZip = Buffer.from(unmanagedResponse.ExportSolutionFile, "base64");
  const unmanagedPath = path.join(outputDir, `${solutionName}_${timestamp}_unmanaged.zip`);
  await fs.writeFile(unmanagedPath, unmanagedZip);

  console.log(`✓ Unmanaged: ${unmanagedPath} (${(unmanagedZip.length / 1024).toFixed(2)} KB)`);

  // Export managed for deployment
  const managedRequest = new ExportSolutionRequest(
    solutionName,
    true // managed
  );

  console.log(`Exporting ${solutionName} (managed)...`);
  const managedResponse = await orgService.execute(managedRequest);

  const managedZip = Buffer.from(managedResponse.ExportSolutionFile, "base64");
  const managedPath = path.join(outputDir, `${solutionName}_${timestamp}_managed.zip`);
  await fs.writeFile(managedPath, managedZip);

  console.log(`✓ Managed: ${managedPath} (${(managedZip.length / 1024).toFixed(2)} KB)`);
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
        {} // input arguments
      );

      const response = await orgService.execute(request);
      return response.Id; // asyncoperationid
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
  // Fetch both records
  const [target, subordinate] = await Promise.all([
    client.api(`/${entityLogicalName}s(${targetId})`).get(),
    client.api(`/${entityLogicalName}s(${subordinateId})`).get(),
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
    subordinateId,
    updateContent,
    false // PerformParentingChecks
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

✅ **SDK Messages**: AssignRequest, SetStateRequest, ExecuteWorkflowRequest, WinOpportunityRequest, MergeRequest, ExportSolutionRequest, PublishXmlRequest
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
5. **OptionSet values** accept plain numbers or `{ Value: number }`
6. **EntityReference** uses `{ LogicalName: 'entity', Id: 'guid' }`
7. **Async operations** require polling for completion
8. **Merge is destructive** - always backup subordinate data

**Next Steps:**

- Explore `@mohsinonxrm/dataverse-sdk-actions` for HTTP-first actions/functions
- See `actions-functions` sample for typed action executables
- Review `docs/mapping/message-to-webapi.md` for complete mapping
- Check `batch-ops` sample for transactional message execution

## License

This sample is part of `@mohsinonxrm/dataverse-sdk-typescript` and is licensed under GNU AGPL v3.0.
