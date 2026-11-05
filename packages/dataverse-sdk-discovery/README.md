# @mohsinonxrm/dataverse-sdk-discovery

Global Discovery Service (GDS) v2.0 client: find the Dataverse environments the signed-in user can access, in the Commercial, GCC, GCC High (USG), DoD or China cloud.

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
import { PublicClientApplication } from "@azure/msal-node";
import { DiscoveryClient, toEnvironment } from "@mohsinonxrm/dataverse-sdk-discovery";
import { MsalNodeTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-node";

// Create token provider (using device code flow)
const pca = new PublicClientApplication({
  auth: {
    clientId: "your-client-id",
    authority: "https://login.microsoftonline.com/your-tenant-id",
  },
});
const tokenProvider = new MsalNodeTokenProvider(pca, {
  flow: "deviceCode",
  // The provider's default scopes; DiscoveryClient asks for its own scope on every call
  scopes: ["https://globaldisco.crm.dynamics.com/.default"],
  deviceCodeCallback: (response) => console.log(response.message),
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

## Clouds and Authentication Scopes

The Global Discovery Service runs in five clouds. Pick one with `cloud`; the client calls that
cloud's endpoint and requests a token for its `/.default` scope (the token audience is the
discovery host). Endpoints are from Microsoft Learn, [Discover user organizations](https://learn.microsoft.com/power-apps/developer/data-platform/discovery-service).

| `cloud`              | Cloud                         | Endpoint                                                          | Default scope                                           |
| -------------------- | ----------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------- |
| `"public"` (default) | Commercial                    | `https://globaldisco.crm.dynamics.com/api/discovery/v2.0`         | `https://globaldisco.crm.dynamics.com/.default`         |
| `"gcc"`              | US Government Community Cloud | `https://globaldisco.crm9.dynamics.com/api/discovery/v2.0`        | `https://globaldisco.crm9.dynamics.com/.default`        |
| `"usg"`              | US Government (GCC High)      | `https://globaldisco.crm.microsoftdynamics.us/api/discovery/v2.0` | `https://globaldisco.crm.microsoftdynamics.us/.default` |
| `"dod"`              | US Department of Defense      | `https://globaldisco.crm.appsplatform.us/api/discovery/v2.0`      | `https://globaldisco.crm.appsplatform.us/.default`      |
| `"china"`            | China (21Vianet)              | `https://globaldisco.crm.dynamics.cn/api/discovery/v2.0`          | `https://globaldisco.crm.dynamics.cn/.default`          |

```typescript
const gccHigh = new DiscoveryClient(tokenProvider, { cloud: "usg" });
```

The table is exported as `DISCOVERY_CLOUDS`. For a sovereign cloud, configure your token provider
with that cloud's Microsoft Entra authority (see Microsoft Entra "national clouds").

Pass `scopes` to request something else, for example the delegated permission
`https://globaldisco.crm.dynamics.com/user_impersonation` in a single-page app. With a custom
`baseUrl` and no `scopes`, the scope is `https://<baseUrl host>/.default`.

## API Reference

### `DiscoveryClient`

#### Constructor

```typescript
new DiscoveryClient(tokenProvider: AccessTokenProvider, options?: DiscoveryClientOptions)
new DiscoveryClient(tokenProvider: AccessTokenProvider, baseUrl?: string) // same as { baseUrl }

interface DiscoveryClientOptions {
  cloud?: "public" | "gcc" | "usg" | "dod" | "china"; // default "public"
  baseUrl?: string; // overrides the cloud's endpoint; a host-only URL gets /api/discovery/v2.0
  scopes?: string[]; // overrides the default https://<host>/.default
  fetchProvider?: FetchProvider; // defaults to the global fetch
  logger?: Logger;
  telemetry?: TelemetryClient;
  retry?: RetryOptions; // 429/502/503/504, honouring Retry-After
}
```

**Parameters:**

- `tokenProvider`: An instance of a token provider (e.g., `MsalNodeTokenProvider`, `MsalBrowserTokenProvider`)
- `options` (optional): the cloud, a custom endpoint and/or scopes, and pipeline options. Throws `DataverseInvalidRequestError` for an unknown `cloud` or a `baseUrl` that isn't an absolute https URL (plain http only for localhost).

Requests go through the same pipeline as `DataverseClient`: the injected `fetchProvider`, retries
with `Retry-After`, logging, telemetry and typed errors. The bearer token is sent only to the
discovery host, including on `@odata.nextLink` pages.

`getBaseUrl()` and `getScopes()` return the endpoint and scopes the client uses.

Every method takes an optional `{ signal }` (`listOrganizations` takes it in its options) to cancel
the request, including a retry wait.

### Methods

#### `listOrganizations(options?: DiscoveryOptions): Promise<OrganizationDetail[]>`

Lists all Dataverse organizations the authenticated user has access to.

**Parameters:**

- `options.filter`: OData filter expression (e.g., `"State eq 0"`). String comparisons are case sensitive. Sent as written: build it with `odata` from `@mohsinonxrm/dataverse-sdk-core` (or double each `'` yourself) when it contains user input. The helper methods escape their arguments.
- `options.select`: Array of properties to return
- `options.orderby`: Property to order results by
- `options.signal`: `AbortSignal` to cancel the request

All query values are percent-encoded. When the service returns `@odata.nextLink`, the pages are
followed and concatenated.

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
import { PublicClientApplication } from "@azure/msal-node";
import { DiscoveryClient, toEnvironment } from "@mohsinonxrm/dataverse-sdk-discovery";
import { MsalNodeTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-node";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";

async function selectOrganization() {
  const pca = new PublicClientApplication({
    auth: {
      clientId: process.env.CLIENT_ID!,
      authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
    },
  });
  const tokenProvider = new MsalNodeTokenProvider(pca, {
    flow: "deviceCode",
    scopes: ["https://globaldisco.crm.dynamics.com/.default"],
    deviceCodeCallback: (response) => console.log(response.message),
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

Error responses are thrown as the core SDK's typed errors: `DataverseODataError`, or
`DataverseThrottleError` for a 429 that is still throttled after the retries. Both extend
`DataverseError` and carry `status`, `code`, `requestId` and `raw`; `DataverseThrottleError` also has
`retryAfterMs`. Aborting rejects with an `AbortError`.

```typescript
import { DataverseError, DataverseThrottleError } from "@mohsinonxrm/dataverse-sdk-core";

try {
  const orgs = await discovery.listOrganizations();
  console.log(`Found ${orgs.length} organizations`);
} catch (error) {
  if (error instanceof DataverseThrottleError) {
    console.error(`Throttled; retry after ${error.retryAfterMs ?? "?"} ms`);
  } else if (error instanceof DataverseError && error.status === 401) {
    console.error("Authentication failed. Check your credentials.");
  } else if (error instanceof DataverseError && error.status === 403) {
    console.error("Access denied. You may not have permission to use the discovery service.");
  } else {
    throw error;
  }
}
```

## Related Packages

- [@mohsinonxrm/dataverse-sdk-core](../dataverse-sdk-core) - Core SDK with DataverseClient
- [@mohsinonxrm/dataverse-sdk-auth-msal-node](../dataverse-sdk-auth-msal-node) - Node authentication
- [@mohsinonxrm/dataverse-sdk-auth-msal-browser](../dataverse-sdk-auth-msal-browser) - Browser authentication

## License

AGPL-3.0-only
