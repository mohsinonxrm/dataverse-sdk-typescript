# @mohsinonxrm/dataverse-sdk-discovery

Global Discovery Service (GDS) v2.0 client: find the Dataverse environments the signed-in user can access.

## Features

- ✅ **Multi-region discovery**: Find environments across all regions of the cloud
- ✅ **Typed v2.0 response**: `OrganizationDetail` matches the documented `Instance` entity (`Url`, `ApiUrl`, integer `State`, `Region`, …)
- ✅ **OData queries**: Use `$filter`, `$select` and `$orderby`
- ✅ **Helpers**: `getEnabledOrganizations()`, `getOrganization()`, `getOrganizationByUrl()`, `getOrganizationsByRegion()` and `toEnvironment()`

## Installation

```bash
pnpm add @mohsinonxrm/dataverse-sdk-discovery @mohsinonxrm/dataverse-sdk-auth-msal-node
```

## Quick Start

```typescript
import { DiscoveryClient, toEnvironment } from "@mohsinonxrm/dataverse-sdk-discovery";
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
  const env = toEnvironment(org);
  console.log(`${env.name} (${env.uniqueName})`);
  console.log(`  Region: ${env.region}`);
  console.log(`  Enabled: ${env.enabled}`);
  console.log(`  Web API: ${env.webApiUrl}\n`);
});
```

The Global Discovery Service returns the environments of a **signed-in user** (a delegated token,
for example device code, authorization code or interactive). An app-only (client credentials)
token gets no environments.

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

### Methods

#### `listOrganizations(options?: DiscoveryOptions): Promise<OrganizationDetail[]>`

Lists all Dataverse organizations the authenticated user has access to.

**Parameters:**

- `options.filter`: OData filter expression (e.g., `"State eq 0"`). String comparisons are case sensitive.
- `options.select`: Array of properties to return
- `options.orderby`: Property to order results by

**Examples:**

```typescript
// List all organizations
const allOrgs = await discovery.listOrganizations();

// Enabled organizations only (State is an integer: 0 = enabled, 1 = disabled)
const enabledOrgs = await discovery.listOrganizations({ filter: "State eq 0" });

// Select just what an environment picker needs
const basicInfo = await discovery.listOrganizations({ select: ["FriendlyName", "ApiUrl"] });

// Order by friendly name
const orderedOrgs = await discovery.listOrganizations({ orderby: "FriendlyName" });

// Enabled North American organizations
const naEnabledOrgs = await discovery.listOrganizations({
  filter: "State eq 0 and Region eq 'NA'",
});
```

#### `getOrganization(uniqueName: string): Promise<OrganizationDetail | null>`

Gets a specific organization by its unique name (`UniqueName`). Returns `null` when none matches.

```typescript
const org = await discovery.getOrganization("unq6bcbf6bf1f2a4ab999012605b314d");
if (org) console.log(`${org.FriendlyName}: ${org.ApiUrl}`);
```

#### `getOrganizationByUrl(url: string): Promise<OrganizationDetail | null>`

Gets the organization served at a URL: its application URL (`Url`), its `ApiUrl`, or any URL on
either origin (such as a Web API root). Origins are compared case-insensitively; paths and trailing
slashes are ignored. The match is made on the client against the full list. Returns `null` when
none matches, and throws `DataverseInvalidRequestError` when `url` isn't an absolute http(s) URL.

```typescript
const org = await discovery.getOrganizationByUrl("https://contoso.crm.dynamics.com/");
```

#### `getOrganizationsByRegion(region: string): Promise<OrganizationDetail[]>`

Gets all organizations whose `Region` equals `region` (a 2-3 letter code such as `"NA"`; case sensitive).

```typescript
const naOrgs = await discovery.getOrganizationsByRegion("NA");
```

#### `getEnabledOrganizations(): Promise<OrganizationDetail[]>`

Gets all enabled organizations (sends `$filter=State eq 0`).

```typescript
const enabledOrgs = await discovery.getEnabledOrganizations();
console.log(`You have access to ${enabledOrgs.length} enabled organizations`);
```

### `toEnvironment(org: OrganizationDetail): DiscoveredEnvironment`

A camel-cased summary of an `OrganizationDetail`:

```typescript
interface DiscoveredEnvironment {
  id: string; // Id
  url: string; // Url, e.g. https://contoso.crm.dynamics.com
  apiUrl: string; // ApiUrl, e.g. https://contoso.api.crm.dynamics.com
  webApiUrl: string; // ApiUrl + /api/data/v9.2
  name: string; // FriendlyName
  uniqueName: string; // UniqueName
  enabled: boolean; // State === 0
  version: string; // Version
  region?: string; // Region
  environmentId?: string; // EnvironmentId
}
```

## Types

### `OrganizationDetail`

The `Instance` entity of the Global Discovery Service v2.0, with the service's property names.
The response is flat: there is no `Endpoints` object and no `Geo` property. With `$select`, only
the selected properties are present.

```typescript
interface OrganizationDetail {
  Id: string; // OrganizationId
  UniqueName: string;
  UrlName: string; // e.g. 'contoso'
  FriendlyName: string; // display name
  State: number; // 0 = enabled, 1 = disabled (OrganizationState)
  Version: string; // e.g. '9.2.24101.00177'
  Url: string; // application URL, e.g. 'https://contoso.crm.dynamics.com'
  ApiUrl: string; // web services URL, e.g. 'https://contoso.api.crm.dynamics.com'
  LastUpdated: string; // ISO 8601
  EnvironmentId?: string | null;
  TenantId?: string | null;
  Region?: string | null; // 2-3 letter code, e.g. 'NA'
  Purpose?: string | null;
  IsUserSysAdmin?: boolean;
  OrganizationType?: number;
  DatacenterId?: string | null;
  DatacenterName?: string | null;
  SchemaType?: string | null;
  StatusMessage?: number | null;
  TrialExpirationDate?: string | null;
  FinOpsUrl?: string | null; // returned live, not in the documented table
}
```

`OrganizationState` holds the `State` values: `OrganizationState.Enabled` (`0`) and `OrganizationState.Disabled` (`1`).

## Complete Example: Interactive Organization Selector

```typescript
import { DiscoveryClient, toEnvironment } from "@mohsinonxrm/dataverse-sdk-discovery";
import { MsalNodeTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-node";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";

async function selectOrganization() {
  const tokenProvider = new MsalNodeTokenProvider({
    clientId: process.env.CLIENT_ID!,
    authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
    flow: "deviceCode",
  });

  const discovery = new DiscoveryClient(tokenProvider);
  const environments = (await discovery.getEnabledOrganizations()).map(toEnvironment);

  if (environments.length === 0) {
    console.log("No organizations found");
    return;
  }

  environments.forEach((env, index) => {
    console.log(`${index + 1}. ${env.name} (${env.uniqueName}) - ${env.region ?? "?"}`);
  });

  const selected = environments[0]; // use readline in a real app

  // The discovery token is for the Global Discovery Service. Ask for a token for the selected
  // environment by passing its scope.
  const client = new DataverseClient({
    baseUrl: selected.apiUrl,
    tokenProvider,
    scopes: [`${selected.url}/.default`],
  });

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
