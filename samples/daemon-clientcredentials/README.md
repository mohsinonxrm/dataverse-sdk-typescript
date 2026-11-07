# Daemon Sample - Client Credentials Authentication

Server-side daemon/service application demonstrating:

- **Client credentials authentication** (service principal / application user)
- **Bulk operations** using `CreateMultiple` and `UpdateMultiple` actions
- **High-throughput data processing** for background jobs
- **Error handling** for bulk operation failures
- **Performance monitoring** and rate calculations

This sample is perfect for:

- Scheduled background jobs
- Integration services
- Automated data synchronization
- Server-side applications without user interaction
- Bulk data imports and exports

---

## Prerequisites

### 1. Azure AD App Registration with Client Secret

Create an app registration in [Azure Portal](https://portal.azure.com):

1. Navigate to **Azure Active Directory** → **App registrations** → **New registration**
2. **Name:** `Dataverse SDK Daemon Service`
3. **Supported account types:** "Accounts in this organizational directory only" (single tenant)
4. **Redirect URI:** Leave blank (not needed for client credentials)
5. Click **Register**
6. Copy the **Application (client) ID** and **Directory (tenant) ID**

#### Create Client Secret

1. Go to **Certificates & secrets** → **New client secret**
2. **Description:** `Daemon Service Secret`
3. **Expires:** Choose appropriate duration (recommend: 12 months for dev, rotate regularly in prod)
4. Click **Add**
5. **⚠️ IMPORTANT:** Copy the **Value** immediately (you cannot retrieve it later)

#### API Permissions

None needed. Dynamics CRM exposes no application permissions (its only permission,
`user_impersonation`, is delegated, for apps where a user signs in), and admin consent doesn't
apply. App-only access comes from the application user below and its security role.

### 2. Create Application User in Dataverse

The app registration needs to be registered as an **Application User** in Dataverse:

1. Go to [Power Platform Admin Center](https://admin.powerplatform.microsoft.com)
2. Select your environment → **Settings** → **Users + permissions** → **Application users**
3. Click **+ New app user**
4. **App:** Select your app registration (use the client ID to search)
5. **Business unit:** Select appropriate business unit
6. **Security role:** Assign appropriate role (e.g., "System Administrator" for testing)
7. Click **Create**

### 3. Node.js 22+

Ensure you have Node.js 22 or later:

```bash
node --version  # Should be v22.0.0 or higher
```

---

## Setup

### 1. Install Dependencies

From the repository root:

```bash
pnpm install
```

### 2. Configure Environment

Copy the example environment file:

```bash
cd samples/daemon-clientcredentials
cp .env.example .env
```

Edit `.env` and fill in your values:

```bash
AZURE_CLIENT_ID=your-app-registration-client-id
AZURE_TENANT_ID=your-tenant-id
AZURE_CLIENT_SECRET=your-client-secret-value

DATAVERSE_URL=https://yourorg.crm.dynamics.com

# Optional: adjust batch size (default: 100)
BATCH_SIZE=100
```

**⚠️ Security Warning:**

- **Never commit** `.env` files to source control
- Store secrets in Azure Key Vault, AWS Secrets Manager, or similar in production
- Rotate client secrets regularly
- Use managed identities in Azure where possible

---

## Running the Sample

### Standard Mode

```bash
pnpm start
```

This will:

1. **Authenticate** using client credentials (silent, no user interaction)
2. **Bulk create** 100 accounts using `CreateMultiple` action
3. **Query** created accounts
4. **Bulk update** all created accounts using `UpdateMultiple` action
5. **Query** updated accounts
6. **Demonstrate error handling** for invalid data
7. **Cleanup** by deleting all created accounts

### Development Mode (Auto-Reload)

```bash
pnpm dev
```

Changes to `src/index.ts` will automatically reload the application.

### Custom Batch Size

```bash
BATCH_SIZE=500 pnpm start
```

**Note:** Dataverse supports:

- **Standard tables:** 100-1000 records per CreateMultiple/UpdateMultiple
- **Elastic tables:** up to 100 records
- Adjust batch size based on your table type and requirements

---

## Authentication Flow

### Client Credentials Flow

This flow authenticates as the **application itself** (not as a user):

```typescript
import { ConfidentialClientApplication } from "@azure/msal-node";
import { MsalNodeTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-node";

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
```

**Key Characteristics:**

- ✅ No user interaction required
- ✅ Perfect for background services
- ✅ Works in containerized environments
- ⚠️ Requires Application User in Dataverse
- ⚠️ Runs with permissions of the Application User

**Audit Trail:**
All operations will be audited as performed by the Application User, not a specific person.

---

## Sample Operations

### 1. Bulk Create (CreateMultiple Action)

Creates multiple records in a single API call:

```typescript
import { CreateMultipleAction } from "@mohsinonxrm/dataverse-sdk-actions";

const accounts = [
  { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Account 1" },
  { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Account 2" },
  // ... up to 1000 for standard tables
];

const action = new CreateMultipleAction("accounts", { Targets: accounts });
const response = await client.execute(action);

console.log("Created IDs:", response.Ids);
```

**Performance:**

- Creates 100 accounts in ~2-5 seconds (depending on network and org load)
- **~20-50 records/second** typical throughput
- Much faster than individual POST requests

**Requirements:**

- All records MUST include `@odata.type`
- All records must be for the same entity type
- Standard tables: 100-1000 records
- Elastic tables: up to 100 records

### 2. Bulk Update (UpdateMultiple Action)

Updates multiple records in a single API call:

```typescript
import { UpdateMultipleAction } from "@mohsinonxrm/dataverse-sdk-actions";

const updates = [
  {
    "@odata.type": "Microsoft.Dynamics.CRM.account",
    accountid: "id1",
    websiteurl: "https://example.com",
  },
  {
    "@odata.type": "Microsoft.Dynamics.CRM.account",
    accountid: "id2",
    websiteurl: "https://example.com",
  },
  // ... up to 1000 for standard tables
];

const action = new UpdateMultipleAction("accounts", { Targets: updates });
await client.execute(action); // Returns 204 No Content
```

**Performance:**

- Updates 100 accounts in ~2-5 seconds
- **~20-50 records/second** typical throughput

**Requirements:**

- All records MUST include `@odata.type`
- All records MUST include primary key (e.g., `accountid`)
- All records must be for the same entity type
- Standard tables: 100-1000 records
- Elastic tables: up to 100 records

### 3. Query with Filtering

`queryFunctions` writes Dataverse's query functions (`Today`, `LastXDays`, `In`, …), which work
only inside `$filter`:

```typescript
import { odata } from "@mohsinonxrm/dataverse-sdk-core";
import { queryFunctions } from "@mohsinonxrm/dataverse-sdk-functions";

const response = await client
  .api("/accounts")
  .select("name", "createdon", "websiteurl")
  .filter(
    odata.and(
      odata.contains("name", "Bulk Account"),
      queryFunctions.today({ PropertyName: "createdon" })
    )
  )
  .orderBy("createdon desc")
  .top(10)
  .get<{ value: { name: string; createdon: string; websiteurl?: string }[] }>();

console.log("Found:", response.value.length);
```

### 4. Individual Delete (No Bulk Delete for Standard Tables)

```typescript
import { OrganizationService } from "@mohsinonxrm/dataverse-sdk-xrm";

const orgService = new OrganizationService(client);

for (const id of accountIds) {
  await orgService.delete("accounts", id);
}
```

**Note:** `DeleteMultiple` action only works for **elastic tables**. For standard tables, use individual deletes or batch operations.

---

## Bulk Operations vs $batch

### When to Use Bulk Actions (CreateMultiple/UpdateMultiple)

✅ **Use bulk actions when:**

- All operations are on the **same entity type**
- You need **high throughput** (20-50 records/sec)
- You need **IDs returned** from creates
- Operations are **homogeneous** (all creates or all updates)
- Standard or elastic tables (100-1000 records)

### When to Use $batch

✅ **Use $batch when:**

- Operations span **multiple entity types**
- You need **transactions** (changesets with rollback)
- You need **Content-ID references** (`$<id>`)
- You have **mixed operations** (creates, updates, deletes, queries)
- Up to 1000 operations total

### Performance Comparison

| Operation           | Individual API Calls | Bulk Actions  | $batch        |
| ------------------- | -------------------- | ------------- | ------------- |
| Create 100 accounts | ~30-60 seconds       | ~2-5 seconds  | ~5-10 seconds |
| Update 100 accounts | ~30-60 seconds       | ~2-5 seconds  | ~5-10 seconds |
| Mixed operations    | Varies               | Not supported | ~5-15 seconds |

---

## Error Handling

### Handling Bulk Operation Failures

Bulk operations are **all-or-nothing** - if one record fails, the entire operation fails:

```typescript
try {
  const action = new CreateMultipleAction("accounts", { Targets: accounts });
  const response = await client.execute(action);
  console.log("Success:", response.Ids);
} catch (error) {
  console.error("Bulk create failed:", error);
  // All records failed - none were created

  // Fallback: create individually to identify bad records
  for (const account of accounts) {
    try {
      await client.api("/accounts").post(account);
    } catch (e) {
      console.error("Bad record:", account, e);
    }
  }
}
```

### Common Errors

**❌ "Invalid @odata.type"**

- **Cause:** Missing or incorrect `@odata.type` in record
- **Fix:** Ensure all records include `@odata.type: 'Microsoft.Dynamics.CRM.{entityname}'`

**❌ "Request length too large"**

- **Cause:** Batch size exceeds limit (>1000 for standard tables, >100 for elastic)
- **Fix:** Reduce `BATCH_SIZE` in `.env`

**❌ "Insufficient privileges"**

- **Cause:** Application User lacks required security role
- **Fix:** Assign appropriate security role in Power Platform Admin Center

**❌ "Principal user is missing"**

- **Cause:** Application User not created in Dataverse
- **Fix:** Create Application User as described in Prerequisites

---

## Code Structure

```
src/
  index.ts              Main daemon logic
.env.example            Environment variable template
.env                    Your actual config (gitignored)
package.json            Dependencies and scripts
tsconfig.json           TypeScript configuration
README.md               This file
```

---

## Troubleshooting

### "Missing required environment variables"

**Cause:** `.env` file not found or incomplete

**Fix:**

1. Copy `.env.example` to `.env`
2. Fill in all required values from Azure Portal

### "401 Unauthorized"

**Cause:** Invalid client credentials or missing admin consent

**Fix:**

1. Verify `AZURE_CLIENT_SECRET` is correct (copy fresh from Azure Portal if needed)
2. Ensure admin consent granted for API permissions
3. Verify client secret hasn't expired

### "403 Forbidden"

**Cause:** Application User lacks required permissions

**Fix:**

1. In Power Platform Admin Center → Environment → Application users
2. Select your app user
3. Click **Manage roles** and assign appropriate security role
4. Wait 5-10 minutes for permissions to propagate

### "Principal user (Application User) is missing"

**Cause:** App registration not registered as Application User in Dataverse

**Fix:** Follow "Create Application User in Dataverse" steps in Prerequisites

---

## Production Considerations

### Security Best Practices

1. **Secret Management:**

   ```typescript
   // Don't use .env files in production
   // Use Azure Key Vault, AWS Secrets Manager, etc.
   import { SecretClient } from "@azure/keyvault-secrets";

   const secretClient = new SecretClient(vaultUrl, credential);
   const secret = await secretClient.getSecret("dataverse-client-secret");
   const clientSecret = secret.value;
   ```

2. **Managed Identity (Azure):**
   - Use Azure Managed Identity instead of client secrets when running in Azure
   - No secrets to manage or rotate
   - See: https://learn.microsoft.com/azure/active-directory/managed-identities-azure-resources/overview

3. **Least Privilege:**
   - Assign Application User only the minimum required security role
   - Consider creating custom security role for specific operations

4. **Secret Rotation:**
   - Rotate client secrets every 3-6 months
   - Use multiple secrets for zero-downtime rotation
   - Monitor secret expiration dates

### Monitoring and Logging

```typescript
// Add structured logging
import winston, { createLogger } from "winston";

const logger = createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

logger.info("Bulk create started", { count: accounts.length });
logger.info("Bulk create completed", { duration: durationMs, idsPerSec });
```

### Rate Limiting and Retry

The SDK includes built-in retry logic for 429 (throttling) responses, but consider:

```typescript
// Add custom retry configuration
const client = new DataverseClient({
  baseUrl: env.dataverseUrl,
  tokenProvider,
  retry: {
    maxRetries: 5, // default 6
    baseDelayMs: 1000, // default 3000; doubles per retry
    maxDelayMs: 30000, // default 30000
    onRetry: ({ attempt, maxRetries, status, delayMs }) =>
      console.warn(`HTTP ${status}, retry ${attempt}/${maxRetries} in ${delayMs} ms`),
  },
});
```

---

## Extending This Sample

### Add More Bulk Operations

```typescript
// Upsert (create or update)
import { UpsertMultipleAction } from "@mohsinonxrm/dataverse-sdk-actions";

const records = [
  { "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: "existing-id", name: "Updated" },
  { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "New Account" },
];

const action = new UpsertMultipleAction("accounts", { Targets: records });
await client.execute(action);
```

### Combine with $batch for Complex Workflows

```typescript
import { BatchRequestBuilder } from "@mohsinonxrm/dataverse-sdk-batch";

const batch = new BatchRequestBuilder(client);

// A change set is one transaction. A Content-ID reference ($<id>) only works inside the change
// set that created the record, so the parent and its children go together.
batch.beginChangeset();
batch.addRequest("parent", "POST", "accounts", undefined, { name: "Parent 1" });
batch.addRequest(
  "child",
  "POST",
  "contacts",
  undefined,
  {
    firstname: "Child",
    lastname: "Contact",
    "parentcustomerid_account@odata.bind": "$parent",
  },
  ["parent"]
);
batch.endChangeset();

const result = await batch.execute(); // throws DataverseBatchError if a request fails
console.log(result.success);
```

---

## Learn More

- [Dataverse SDK Core Documentation](../../packages/dataverse-sdk-core/README.md)
- [MSAL Node Authentication](../../packages/dataverse-sdk-auth-msal-node/README.md)
- [Actions Package - Bulk Operations](../../packages/dataverse-sdk-actions/README.md)
- [OrganizationService Documentation](../../packages/dataverse-sdk-xrm/README.md)

---

## License

This sample is part of the `dataverse-sdk-typescript` monorepo and is licensed under **GNU AGPL v3.0**. See [LICENSE](../../LICENSE) for details.
