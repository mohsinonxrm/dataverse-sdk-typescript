# @mohsinonxrm/dataverse-sdk-discovery

Global Discovery Service client for discovering Dataverse organizations across all regions in the Commercial cloud.

## Features

- ✅ **Multi-region discovery**: Find organizations across all Dataverse regions (NA, EMEA, APAC, etc.)
- ✅ **Filtering support**: Filter by state, region, or any organization property
- ✅ **Type-safe**: Full TypeScript support with comprehensive types
- ✅ **OData queries**: Use $filter, $select, and $orderby for precise queries
- ✅ **Helper methods**: Convenient methods for common discovery scenarios

## Installation

```bash
pnpm add @mohsinonxrm/dataverse-sdk-discovery @mohsinonxrm/dataverse-sdk-auth-msal-node
```

## Quick Start

```typescript
import { DiscoveryClient } from "@mohsinonxrm/dataverse-sdk-discovery";
import { MsalNodeTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-node";

// Create token provider (using device code flow)
const tokenProvider = new MsalNodeTokenProvider({
  clientId: "your-client-id",
  authority: "https://login.microsoftonline.com/your-tenant-id",
  flow: "deviceCode",
});

// Create discovery client
const discovery = new DiscoveryClient(tokenProvider);

// List all organizations
const orgs = await discovery.listOrganizations();

console.log(`You have access to ${orgs.length} organizations`);
orgs.forEach((org) => {
  console.log(`${org.FriendlyName} (${org.UniqueName})`);
  console.log(`  Region: ${org.Geo}`);
  console.log(`  State: ${org.State}`);
  console.log(`  Web API: ${org.Endpoints.WebApiUrl}\n`);
});
```

## Authentication Scopes

The Discovery Service requires the following scope:

```typescript
const DISCOVERY_SCOPES = ["https://globaldisco.crm.dynamics.com/.default"];
```

This scope is automatically used by the `DiscoveryClient` when requesting tokens.

## API Reference

### `DiscoveryClient`

#### Constructor

```typescript
new DiscoveryClient(tokenProvider: AccessTokenProvider, baseUrl?: string)
```

**Parameters:**

- `tokenProvider`: An instance of a token provider (e.g., `MsalNodeTokenProvider`, `MsalBrowserTokenProvider`)
- `baseUrl` (optional): Custom discovery endpoint. Defaults to Commercial cloud global discovery.

**Example:**

```typescript
const discovery = new DiscoveryClient(tokenProvider);
```

### Methods

#### `listOrganizations(options?: DiscoveryOptions): Promise<OrganizationDetail[]>`

Lists all Dataverse organizations the authenticated user has access to.

**Parameters:**

- `options.filter`: OData filter expression (e.g., `"State eq 'Enabled'"`)
- `options.select`: Array of properties to return
- `options.orderby`: Property to order results by

**Examples:**

```typescript
// List all organizations
const allOrgs = await discovery.listOrganizations();

// Filter for enabled organizations only
const enabledOrgs = await discovery.listOrganizations({
  filter: "State eq 'Enabled'",
});

// Select specific properties
const basicInfo = await discovery.listOrganizations({
  select: ["UniqueName", "FriendlyName", "Geo", "Endpoints"],
});

// Order by friendly name
const orderedOrgs = await discovery.listOrganizations({
  orderby: "FriendlyName",
});

// Complex filter: Enabled North American organizations
const naEnabledOrgs = await discovery.listOrganizations({
  filter: "State eq 'Enabled' and Geo eq 'NA'",
});
```

#### `getOrganization(uniqueName: string): Promise<OrganizationDetail | null>`

Gets a specific organization by its unique name.

**Parameters:**

- `uniqueName`: The unique name of the organization (e.g., `'contoso'`)

**Returns:** Organization detail if found, `null` otherwise

**Example:**

```typescript
const org = await discovery.getOrganization("contoso");

if (org) {
  console.log(`Found: ${org.FriendlyName}`);
  console.log(`Web API: ${org.Endpoints.WebApiUrl}`);
  console.log(`Region: ${org.Geo}`);
} else {
  console.log("Organization not found");
}
```

#### `getOrganizationsByRegion(geo: string): Promise<OrganizationDetail[]>`

Gets all organizations in a specific geographic region.

**Parameters:**

- `geo`: Geographic region code (e.g., `'NA'`, `'EMEA'`, `'APAC'`, `'SAM'`, `'OCE'`, `'JPN'`, `'IND'`, `'CAN'`, `'GCC'`, `'GCCHigh'`, `'DOD'`)

**Common Region Codes:**

- `NA` - North America
- `EMEA` - Europe, Middle East, and Africa
- `APAC` - Asia Pacific
- `SAM` - South America
- `OCE` - Oceania
- `JPN` - Japan
- `IND` - India
- `CAN` - Canada
- `GCC` - US Government Community Cloud
- `GCCHigh` - US Government Community Cloud High
- `DOD` - US Department of Defense

**Example:**

```typescript
// Get all North American organizations
const naOrgs = await discovery.getOrganizationsByRegion("NA");

// Get all European organizations
const emeaOrgs = await discovery.getOrganizationsByRegion("EMEA");

console.log(`Found ${naOrgs.length} organizations in North America`);
console.log(`Found ${emeaOrgs.length} organizations in EMEA`);
```

#### `getEnabledOrganizations(): Promise<OrganizationDetail[]>`

Gets all enabled organizations.

**Example:**

```typescript
const enabledOrgs = await discovery.getEnabledOrganizations();

console.log(`You have access to ${enabledOrgs.length} enabled organizations`);

// Pick the first enabled organization
if (enabledOrgs.length > 0) {
  const org = enabledOrgs[0];
  console.log(`Using: ${org.FriendlyName}`);
  console.log(`Web API: ${org.Endpoints.WebApiUrl}`);
}
```

## Types

### `OrganizationDetail`

```typescript
interface OrganizationDetail {
  Id: string; // Unique identifier
  UniqueName: string; // Unique name (e.g., 'contoso')
  FriendlyName: string; // Display name (e.g., 'Contoso Corporation')
  Endpoints: OrganizationEndpoints; // API endpoints
  State: string; // 'Enabled' or 'Disabled'
  Version: string; // Dataverse version
  UrlName: string; // URL name
  Geo: string; // Geographic region code
  TenantId: string; // Azure AD tenant ID
  EnvironmentId: string; // Environment ID
  Region: string; // Data center region code
}
```

### `OrganizationEndpoints`

```typescript
interface OrganizationEndpoints {
  WebApiUrl: string; // Web API endpoint (e.g., 'https://contoso.api.crm.dynamics.com')
  WebApplicationUrl: string; // Web app endpoint (e.g., 'https://contoso.crm.dynamics.com')
}
```

## Complete Example: Interactive Organization Selector

```typescript
import { DiscoveryClient } from "@mohsinonxrm/dataverse-sdk-discovery";
import { MsalNodeTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-node";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";

async function selectOrganization() {
  // Create token provider for discovery
  const tokenProvider = new MsalNodeTokenProvider({
    clientId: process.env.CLIENT_ID!,
    authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
    flow: "deviceCode",
  });

  // Create discovery client
  const discovery = new DiscoveryClient(tokenProvider);

  // Get all enabled organizations
  const orgs = await discovery.getEnabledOrganizations();

  if (orgs.length === 0) {
    console.log("No organizations found");
    return;
  }

  // Display organizations
  console.log("\nAvailable organizations:");
  orgs.forEach((org, index) => {
    console.log(`${index + 1}. ${org.FriendlyName} (${org.UniqueName}) - ${org.Geo}`);
  });

  // User selects organization (simplified - use readline in real app)
  const selectedIndex = 0; // First org for demo

  const selectedOrg = orgs[selectedIndex];
  console.log(`\nSelected: ${selectedOrg.FriendlyName}`);
  console.log(`Web API: ${selectedOrg.Endpoints.WebApiUrl}`);

  // Create Dataverse client for selected organization
  const client = new DataverseClient({
    baseUrl: selectedOrg.Endpoints.WebApiUrl,
    tokenProvider: tokenProvider,
  });

  // Now you can use the client with the selected organization
  const whoami = await client.api("/WhoAmI").get();
  console.log("User ID:", whoami.UserId);
}

selectOrganization().catch(console.error);
```

## Error Handling

```typescript
try {
  const orgs = await discovery.listOrganizations();
  console.log(`Found ${orgs.length} organizations`);
} catch (error) {
  if (error instanceof Error) {
    if (error.message.includes("401")) {
      console.error("Authentication failed. Check your credentials.");
    } else if (error.message.includes("403")) {
      console.error("Access denied. You may not have permission to use the discovery service.");
    } else {
      console.error("Discovery request failed:", error.message);
    }
  }
}
```

## Related Packages

- [@mohsinonxrm/dataverse-sdk-core](../dataverse-sdk-core) - Core SDK with DataverseClient
- [@mohsinonxrm/dataverse-sdk-auth-msal-node](../dataverse-sdk-auth-msal-node) - Node authentication
- [@mohsinonxrm/dataverse-sdk-auth-msal-browser](../dataverse-sdk-auth-msal-browser) - Browser authentication

## License

AGPL-3.0-only
