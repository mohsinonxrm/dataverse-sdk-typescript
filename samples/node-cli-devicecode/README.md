# Node CLI Sample - Device Code Authentication

Interactive Node.js command-line application demonstrating:

- **Device code authentication** (no browser redirect needed)
- **Organization discovery** via Global Discovery Service
- **WhoAmI function** to verify connection
- **Complete CRUD operations** (Create, Read, Update, Delete)
- **OData query** with filtering and ordering

This sample is perfect for:

- Learning the Dataverse SDK basics
- Testing authentication without a web server
- Interactive CLI tools and automation scripts
- Environments where browser redirect isn't available

---

## Prerequisites

### 1. Azure AD App Registration

Create an app registration in [Azure Portal](https://portal.azure.com):

1. Navigate to **Azure Active Directory** → **App registrations** → **New registration**
2. **Name:** `Dataverse SDK CLI Sample`
3. **Supported account types:** "Accounts in this organizational directory only" (single tenant)
4. **Redirect URI:** Select "Public client/native (mobile & desktop)" and use:
   ```
   http://localhost
   ```
5. Click **Register**
6. Copy the **Application (client) ID** and **Directory (tenant) ID**

#### Configure API Permissions

1. Go to **API permissions** → **Add a permission**
2. Select **Dynamics CRM** (or "Common Data Service")
3. Select **Delegated permissions**
4. Check **user_impersonation**
5. Click **Add permissions**
6. **Grant admin consent** (if required by your tenant)

#### Enable Public Client Flow

1. Go to **Authentication**
2. Under **Advanced settings** → **Allow public client flows**
3. Set to **Yes**
4. Click **Save**

### 2. Node.js 22+

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
cd samples/node-cli-devicecode
cp .env.example .env
```

Edit `.env` and fill in your values:

```bash
AZURE_CLIENT_ID=your-app-registration-client-id
AZURE_TENANT_ID=your-tenant-id

# Optional: Skip discovery and use specific environment
# DATAVERSE_URL=https://yourorg.crm.dynamics.com
```

---

## Running the Sample

### Interactive Mode (Recommended)

```bash
pnpm start
```

This will:

1. **Authenticate** using device code flow (you'll see a code to enter at https://microsoft.com/devicelogin)
2. **Discover organizations** (if `DATAVERSE_URL` not set)
3. **Call WhoAmI** to verify connection
4. **Prompt** you to run CRUD operations
5. **Create** a sample account
6. **Retrieve** the account
7. **Update** the account
8. **Query** all accounts
9. **Delete** the sample account (with confirmation)

### Development Mode (Auto-Reload)

```bash
pnpm dev
```

Changes to `src/index.ts` will automatically reload the application.

---

## Authentication Flow

### Device Code Flow

When you run the sample, you'll see output like:

```
🔐 Initializing authentication (device code flow)...

To sign in, use a web browser to open the page https://microsoft.com/devicelogin
and enter the code ABC123DEF to authenticate.
```

**Steps:**

1. Open https://microsoft.com/devicelogin in any browser (can be on a different device)
2. Enter the code displayed
3. Sign in with your Dataverse user account
4. Approve the permissions
5. Return to the terminal - authentication will complete automatically

**When to use device code:**

- Running on a server without a browser
- Remote SSH sessions
- Containerized environments
- CI/CD pipelines (with service principal as alternative)

---

## Organization Discovery

If you don't specify `DATAVERSE_URL` in `.env`, the sample uses the **Global Discovery Service** to list all Dataverse organizations accessible to your user account.

### Single Organization

If you have access to only one organization, it will be automatically selected:

```
✓ Found 1 organization: Contoso Production
```

### Multiple Organizations

If you have access to multiple organizations, you'll see an interactive menu:

```
✓ Found 3 organizations
? Select an organization:
  ❯ Contoso Production (contoso-prod) - NA
    Contoso Dev (contoso-dev) - NA
    Fabrikam Test (fabrikam-test) - EMEA
```

Use arrow keys to select and press Enter.

### Skip Discovery

To skip discovery and use a specific environment, set `DATAVERSE_URL` in `.env`:

```bash
DATAVERSE_URL=https://yourorg.crm.dynamics.com
```

---

## Sample Operations

### 1. WhoAmI Function

Verifies authentication and connection:

```typescript
const whoAmI = new WhoAmIFunction();
const response = await client.execute(whoAmI);

console.log("User ID:", response.UserId);
console.log("Business Unit:", response.BusinessUnitId);
console.log("Organization:", response.OrganizationId);
```

### 2. Create Account

Creates a new account record:

```typescript
const accountData = {
  name: "Contoso Sample Corp",
  telephone1: "555-0100",
  address1_city: "Seattle",
  address1_stateorprovince: "WA",
  address1_country: "USA",
};

const response = await client
  .api("/accounts")
  .prefer(Prefer.returnRepresentation())
  .post<{ accountid: string }>(accountData);

const accountId = response.accountid;
```

### 3. Retrieve Account

Retrieves the account with selected columns:

```typescript
const account = await client
  .api(`/accounts(${accountId})`)
  .select("name", "telephone1", "address1_city", "createdon")
  .get<{
    name: string;
    telephone1: string | null;
    address1_city: string | null;
    createdon: string;
  }>();

console.log("Name:", account.name);
```

### 4. Update Account

Updates specific fields:

```typescript
const updateData = {
  telephone1: "555-0199",
  websiteurl: "https://example.com",
};

await client.api(`/accounts(${accountId})`).patch(updateData);
```

### 5. Query Accounts

Queries with OData operators:

```typescript
const response = await client
  .api("/accounts")
  .select("name", "createdon")
  .orderBy("createdon desc")
  .top(5)
  .get<{ value: { name: string }[] }>();

for (const account of response.value) {
  console.log(account.name);
}
```

### 6. Delete Account

Deletes the account record:

```typescript
await client.api(`/accounts(${accountId})`).delete();
```

---

## Code Structure

```
src/
  index.ts              Main application logic
.env.example            Environment variable template
.env                    Your actual config (gitignored)
package.json            Dependencies and scripts
tsconfig.json           TypeScript configuration
README.md               This file
```

---

## Troubleshooting

### "Missing required environment variables"

**Cause:** `.env` file not found or missing `AZURE_CLIENT_ID` / `AZURE_TENANT_ID`

**Fix:**

1. Copy `.env.example` to `.env`
2. Fill in your client ID and tenant ID from Azure Portal

### "No enabled organizations found"

**Cause:** The signed-in user doesn't have access to any Dataverse environments

**Fix:**

1. Verify user has a Dataverse license
2. Assign user to at least one environment
3. Or set `DATAVERSE_URL` directly in `.env`

### "401 Unauthorized" or "403 Forbidden"

**Cause:** App registration missing API permissions or consent

**Fix:**

1. In Azure Portal → App registrations → Your app → API permissions
2. Ensure "Dynamics CRM" / "user_impersonation" is added
3. Click "Grant admin consent for [tenant]"
4. Ensure "Allow public client flows" is enabled in Authentication settings

### "device_code_expired"

**Cause:** You didn't enter the device code within the time limit (usually 15 minutes)

**Fix:** Re-run the sample and enter the code promptly

### TypeScript Errors

**Cause:** Missing type definitions or outdated dependencies

**Fix:**

```bash
# From repo root
pnpm install
pnpm -r build

# From sample directory
cd samples/node-cli-devicecode
pnpm start
```

---

## Extending This Sample

### Add More Operations

```typescript
// Associate a contact with an account (OrganizationService, shown below)
import { createEntityReference } from "@mohsinonxrm/dataverse-sdk-xrm";

await orgService.associate("accounts", accountId, "contact_customer_accounts", [
  createEntityReference("contact", contactId),
]);

// Use $batch for multiple operations
import { BatchRequestBuilder } from "@mohsinonxrm/dataverse-sdk-batch";

const batch = new BatchRequestBuilder(client);
batch.addRequest("who", "GET", "WhoAmI");
batch.addRequest("top", "GET", "accounts?$select=name&$top=5");
const result = await batch.execute();
console.log(result.responses.get("top")?.body);
```

### Add Metadata Operations

```typescript
import { MetadataClient } from "@mohsinonxrm/dataverse-sdk-metadata";

const metadataClient = new MetadataClient(client);
const entities = await metadataClient.getEntityDefinitions({
  filter: "IsCustomEntity eq true",
  select: ["LogicalName", "DisplayName"],
});
```

### Use Organization Service Facade

```typescript
import { OrganizationService } from "@mohsinonxrm/dataverse-sdk-xrm";

const orgService = new OrganizationService(client);
const accountId = await orgService.create("accounts", {
  name: "Contoso",
});
```

---

## Learn More

- [Dataverse SDK Core Documentation](../../packages/dataverse-sdk-core/README.md)
- [MSAL Node Authentication](../../packages/dataverse-sdk-auth-msal-node/README.md)
- [Discovery Service](../../packages/dataverse-sdk-discovery/README.md)
- [Functions Package](../../packages/dataverse-sdk-functions/README.md)

---

## License

This sample is part of the `dataverse-sdk-typescript` monorepo and is licensed under **GNU AGPL v3.0**. See [LICENSE](../../LICENSE) for details.
