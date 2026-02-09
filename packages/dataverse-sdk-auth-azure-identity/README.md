# @mohsinonxrm/dataverse-sdk-auth-azure-identity

Azure Identity authentication provider for Dataverse SDK. Supports authentication using any credential from [@azure/identity](https://www.npmjs.com/package/@azure/identity), making it ideal for Azure-hosted applications, local development, and service principal scenarios.

## Installation

```bash
npm install @mohsinonxrm/dataverse-sdk-auth-azure-identity @mohsinonxrm/dataverse-sdk-core @azure/identity
```

## Features

- ✅ **Managed Identity**: Seamless authentication for Azure-hosted resources
- ✅ **DefaultAzureCredential**: Automatic credential chain for development and production
- ✅ **Service Principal**: Client secret or certificate-based authentication
- ✅ **Azure CLI**: Local development using `az login`
- ✅ **Environment Variables**: Credential configuration via environment
- ✅ **Workload Identity**: Kubernetes workload identity support
- ✅ **TypeScript first**: Fully typed with comprehensive IntelliSense

## Supported Credentials

Works with **any** `TokenCredential` from `@azure/identity`:

| Credential                     | Best For                                          | Authentication Method                    |
| ------------------------------ | ------------------------------------------------- | ---------------------------------------- |
| `ManagedIdentityCredential`    | Azure VMs, App Service, Functions, Container Apps | System/user-assigned managed identity    |
| `DefaultAzureCredential`       | Development & Production                          | Tries multiple credential types in order |
| `ClientSecretCredential`       | Service principals                                | Client ID + secret                       |
| `ClientCertificateCredential`  | Service principals                                | Client ID + certificate                  |
| `EnvironmentCredential`        | CI/CD pipelines                                   | Environment variables                    |
| `AzureCliCredential`           | Local development                                 | `az login`                               |
| `AzurePowerShellCredential`    | Local development                                 | `Connect-AzAccount`                      |
| `DeviceCodeCredential`         | CLI tools                                         | Device code flow                         |
| `InteractiveBrowserCredential` | Desktop apps                                      | Browser popup                            |
| `UsernamePasswordCredential`   | Legacy scenarios                                  | Username + password                      |
| `WorkloadIdentityCredential`   | Kubernetes                                        | Workload identity federation             |

## Usage

### Managed Identity (Recommended for Azure)

Best for: Azure VMs, App Service, Functions, Container Apps, AKS

```typescript
import { ManagedIdentityCredential } from "@azure/identity";
import { AzureIdentityTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-azure-identity";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";

// System-assigned managed identity
const credential = new ManagedIdentityCredential();

// Or user-assigned managed identity
// const credential = new ManagedIdentityCredential('client-id-of-user-assigned-identity');

const tokenProvider = new AzureIdentityTokenProvider(credential, {
  scopes: ["https://your-org.crm.dynamics.com/.default"],
});

const client = new DataverseClient({
  baseUrl: "https://your-org.crm.dynamics.com",
  tokenProvider,
});

// Use the client
const accounts = await client.api("/accounts").top(10).get();
```

### DefaultAzureCredential (Development & Production)

Best for: Applications that run both locally and in Azure

```typescript
import { DefaultAzureCredential } from "@azure/identity";
import { AzureIdentityTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-azure-identity";

// Tries credentials in this order:
// 1. Environment variables
// 2. Workload Identity (Kubernetes)
// 3. Managed Identity
// 4. Azure CLI
// 5. Azure PowerShell
const credential = new DefaultAzureCredential();

const tokenProvider = new AzureIdentityTokenProvider(credential, {
  scopes: ["https://your-org.crm.dynamics.com/.default"],
});
```

### Service Principal with Client Secret

Best for: CI/CD pipelines, daemon apps, server-to-server

```typescript
import { ClientSecretCredential } from "@azure/identity";
import { AzureIdentityTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-azure-identity";

const credential = new ClientSecretCredential("tenant-id", "client-id", "client-secret");

const tokenProvider = new AzureIdentityTokenProvider(credential, {
  scopes: ["https://your-org.crm.dynamics.com/.default"],
});
```

### Service Principal with Certificate

Best for: Production daemons, enhanced security requirements

```typescript
import { ClientCertificateCredential } from "@azure/identity";
import { AzureIdentityTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-azure-identity";
import { readFileSync } from "fs";

const certificatePath = "/path/to/certificate.pem";
const certificate = readFileSync(certificatePath, "utf-8");

const credential = new ClientCertificateCredential("tenant-id", "client-id", certificate);

const tokenProvider = new AzureIdentityTokenProvider(credential, {
  scopes: ["https://your-org.crm.dynamics.com/.default"],
});
```

### Azure CLI Credential (Local Development)

Best for: Local development, quick prototyping

```typescript
import { AzureCliCredential } from "@azure/identity";
import { AzureIdentityTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-azure-identity";

// Requires: az login
const credential = new AzureCliCredential();

const tokenProvider = new AzureIdentityTokenProvider(credential, {
  scopes: ["https://your-org.crm.dynamics.com/.default"],
});
```

### Environment Variables

Best for: CI/CD, containerized apps

```bash
# Set environment variables for service principal
export AZURE_TENANT_ID="your-tenant-id"
export AZURE_CLIENT_ID="your-client-id"
export AZURE_CLIENT_SECRET="your-client-secret"
```

```typescript
import { EnvironmentCredential } from "@azure/identity";
import { AzureIdentityTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-azure-identity";

const credential = new EnvironmentCredential();

const tokenProvider = new AzureIdentityTokenProvider(credential, {
  scopes: ["https://your-org.crm.dynamics.com/.default"],
});
```

### Workload Identity (Kubernetes)

Best for: AKS workloads with federated identity

```typescript
import { WorkloadIdentityCredential } from "@azure/identity";
import { AzureIdentityTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-azure-identity";

const credential = new WorkloadIdentityCredential({
  tenantId: "tenant-id",
  clientId: "client-id",
});

const tokenProvider = new AzureIdentityTokenProvider(credential, {
  scopes: ["https://your-org.crm.dynamics.com/.default"],
});
```

## Complete Examples

### Azure Function with Managed Identity

```typescript
import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { ManagedIdentityCredential } from "@azure/identity";
import { AzureIdentityTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-azure-identity";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";

// Initialize once (cold start)
const credential = new ManagedIdentityCredential();
const tokenProvider = new AzureIdentityTokenProvider(credential, {
  scopes: [process.env.DATAVERSE_URL + "/.default"],
});

const client = new DataverseClient({
  baseUrl: process.env.DATAVERSE_URL!,
  tokenProvider,
});

export async function getAccounts(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log("HTTP trigger function processing request");

  try {
    const result = await client.api("/accounts").select("name", "accountnumber").top(100).get();

    return {
      status: 200,
      jsonBody: result.value,
    };
  } catch (error) {
    context.error("Error fetching accounts:", error);
    return {
      status: 500,
      body: "Internal server error",
    };
  }
}

app.http("getAccounts", {
  methods: ["GET"],
  authLevel: "function",
  handler: getAccounts,
});
```

### Multi-Environment Configuration

```typescript
import {
  DefaultAzureCredential,
  AzureCliCredential,
  ManagedIdentityCredential,
} from "@azure/identity";
import { AzureIdentityTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-azure-identity";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";

function createTokenProvider() {
  const scopes = [process.env.DATAVERSE_URL + "/.default"];

  let credential;

  if (process.env.NODE_ENV === "development") {
    // Local development: use Azure CLI
    credential = new AzureCliCredential();
    console.log("Using Azure CLI credential for local development");
  } else if (process.env.USE_MANAGED_IDENTITY === "true") {
    // Production: use managed identity
    credential = new ManagedIdentityCredential();
    console.log("Using Managed Identity credential for production");
  } else {
    // Fallback: try DefaultAzureCredential
    credential = new DefaultAzureCredential();
    console.log("Using DefaultAzureCredential");
  }

  return new AzureIdentityTokenProvider(credential, { scopes });
}

const tokenProvider = createTokenProvider();
const client = new DataverseClient({
  baseUrl: process.env.DATAVERSE_URL!,
  tokenProvider,
});
```

## API Reference

### Constructor

```typescript
constructor(
  credential: TokenCredential,
  options: AzureIdentityTokenProviderOptions
)
```

**Parameters:**

- `credential` (required): Any `TokenCredential` from `@azure/identity`
- `options` (required): Configuration options

**Options:**

- `scopes` (required): Default scopes (e.g., `['https://org.crm.dynamics.com/.default']`)
- `tenantId` (optional): Tenant ID for multi-tenant scenarios
- `getTokenOptions` (optional): Additional `GetTokenOptions` for Azure Identity

### Methods

#### `getToken(scopes?, options?): Promise<string>`

Acquires an access token using the configured credential.

**Parameters:**

- `scopes` (optional): String or array of scopes to override default scopes
- `options` (optional): Token options
  - `tenantId`: Override tenant ID for multi-tenant scenarios
  - `claims`: Claims challenge from server (Conditional Access)
  - `correlationId`: Correlation ID for telemetry (not passed to Azure Identity)

**Returns:** `Promise<string>` - Access token

**Throws:**

- `DataverseAuthenticationError` - Token acquisition failed
- `DataverseInvalidRequestError` - Invalid scopes or configuration

```typescript
// Use default scopes
const token = await tokenProvider.getToken();

// Override with different scopes
const token = await tokenProvider.getToken(["https://other-org.crm.dynamics.com/.default"]);

// Pass additional options
const token = await tokenProvider.getToken(undefined, {
  tenantId: "specific-tenant-id",
  claims: '{"access_token":{"email":{"essential":true}}}',
  correlationId: "correlation-123", // Stored but not passed to Azure Identity
});
```

#### `getCredential(): TokenCredential`

Gets the underlying `TokenCredential` instance for advanced scenarios.

**Returns:** `TokenCredential` - The Azure Identity credential

```typescript
const credential = tokenProvider.getCredential();
// Use credential directly if needed
```

#### `getOptions(): Readonly<AzureIdentityTokenProviderOptions>`

Gets the current configuration options (frozen copy).

**Returns:** `Readonly<AzureIdentityTokenProviderOptions>` - Immutable options object

```typescript
const options = tokenProvider.getOptions();
console.log("Default scopes:", options.scopes);
console.log("Tenant ID:", options.tenantId);
```

## Error Handling

```typescript
import {
  DataverseAuthenticationError,
  DataverseInvalidRequestError,
} from "@mohsinonxrm/dataverse-sdk-core";

try {
  const token = await tokenProvider.getToken();
} catch (error) {
  if (error instanceof DataverseAuthenticationError) {
    console.error("Authentication failed:", error.message);
    // Original Azure Identity error available in error.cause
    if (error.cause) {
      console.error("Azure Identity error:", error.cause);
    }
  } else if (error instanceof DataverseInvalidRequestError) {
    console.error("Invalid configuration:", error.message);
  }
}
```

## Azure Setup

### 1. Create Managed Identity

```bash
# System-assigned (VM, App Service, Function)
az vm identity assign --name myVM --resource-group myResourceGroup

# User-assigned
az identity create --name myIdentity --resource-group myResourceGroup
```

### 2. Grant Dataverse Permissions

1. Go to [Power Platform Admin Center](https://admin.powerplatform.microsoft.com)
2. Select your environment
3. Settings → Users + permissions → Application users
4. Click "+ New app user"
5. Add the managed identity or service principal
6. Assign security roles (e.g., System Administrator, System Customizer)

### 3. Configure App Registration (Service Principal)

```bash
# Create app registration
az ad app create --display-name "Dataverse SDK App"

# Create service principal
az ad sp create --id <app-id>

# Create client secret
az ad app credential reset --id <app-id>
```

## Comparison with MSAL

| Feature                | Azure Identity    | MSAL Node            | MSAL Browser |
| ---------------------- | ----------------- | -------------------- | ------------ |
| Managed Identity       | ✅ Yes            | ❌ No                | ❌ No        |
| Azure CLI              | ✅ Yes            | ❌ No                | ❌ No        |
| DefaultAzureCredential | ✅ Yes            | ❌ No                | ❌ No        |
| Service Principal      | ✅ Yes            | ✅ Yes               | ❌ No        |
| Device Code            | ✅ Yes            | ✅ Yes               | ❌ No        |
| Interactive Browser    | ✅ Yes (desktop)  | ❌ No                | ✅ Yes (SPA) |
| **Best For**           | Azure-hosted apps | Multi-flow Node apps | Browser SPAs |

**Recommendation**: Use Azure Identity for server-side Azure apps, MSAL for client apps or multi-flow requirements.

## Troubleshooting

### Managed Identity 403 Forbidden

Ensure:

1. Managed identity is enabled on Azure resource
2. Application user created in Dataverse with managed identity's client ID
3. Security roles assigned to application user

### DefaultAzureCredential Fails Locally

```bash
# Sign in with Azure CLI
az login

# Or sign in with Azure PowerShell
Connect-AzAccount
```

### Environment Variables Not Working

Verify all three are set:

```bash
echo $AZURE_TENANT_ID
echo $AZURE_CLIENT_ID
echo $AZURE_CLIENT_SECRET
```

### Certificate Authentication Issues

Ensure certificate is in PEM format:

```bash
# Convert PFX to PEM
openssl pkcs12 -in cert.pfx -out cert.pem -nodes
```

## License

AGPL-3.0
