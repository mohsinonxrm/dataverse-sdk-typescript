# @mohsinonxrm/dataverse-sdk-auth-msal-node

> MSAL Node authentication provider for Dataverse SDK. Implements `AccessTokenProvider` using `@azure/msal-node` for Node.js applications. Supports 5 authentication flows: device code, client credentials, authorization code + PKCE, username/password, and silent token refresh.

## Features

- ✅ **5 Authentication Flows** - Device Code, Client Credentials, Authorization Code + PKCE, Username/Password, Silent
- ✅ **CLI Tools** - Device code flow with customizable user prompts
- ✅ **Daemon Services** - Client credentials for unattended background apps
- ✅ **Web Servers** - Authorization code with PKCE for server-side web apps (Express.js, Next.js API routes)
- ✅ **TypeScript-first** - Fully typed with discriminated union for flow-specific options
- ✅ **Automatic Token Management** - MSAL handles token caching, refresh, and expiration
- ✅ **Comprehensive Validation** - Flow-specific parameter validation with typed errors

## Installation

```bash
pnpm add @mohsinonxrm/dataverse-sdk-auth-msal-node @mohsinonxrm/dataverse-sdk-core @azure/msal-node
```

**Peer dependencies:**

- `@azure/msal-node` (^2.0.0)
- `@mohsinonxrm/dataverse-sdk-core` (workspace dependency)

## Authentication Flows

### 1. Device Code Flow (CLI Applications)

**Best for:** Interactive CLI tools, cross-platform terminal apps, development/testing

The device code flow displays a user code and URL, allowing users to authenticate on any browser-enabled device.

```typescript
import { PublicClientApplication } from "@azure/msal-node";
import { MsalNodeTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-node";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";

// Create Public Client Application
const pca = new PublicClientApplication({
  auth: {
    clientId: "your-app-client-id", // Azure AD App Registration client ID
    authority: "https://login.microsoftonline.com/your-tenant-id",
  },
});

// Create token provider with device code flow
const tokenProvider = new MsalNodeTokenProvider(pca, {
  flow: "deviceCode",
  scopes: ["https://your-org.crm.dynamics.com/.default"],

  // Callback to display authentication instructions to user
  deviceCodeCallback: (response) => {
    console.log("\n" + "=".repeat(70));
    console.log(response.message);
    console.log("=".repeat(70) + "\n");

    // response.message contains:
    // "To sign in, use a web browser to open the page https://microsoft.com/devicelogin
    //  and enter the code XXXXXXXXX to authenticate."
  },
});

// Create Dataverse client
const client = new DataverseClient({
  baseUrl: "https://your-org.crm.dynamics.com",
  tokenProvider,
});

// First API call triggers device code flow
const whoami = await client.api("/WhoAmI").get();
console.log(`✓ Authenticated as user: ${whoami.UserId}`);
```

**Device code flow details:**

- Requires `PublicClientApplication`
- User sees code and URL in terminal
- User authenticates in browser on any device
- Token automatically cached for subsequent requests
- Ideal for CLI tools where browser redirect isn't available

### 2. Client Credentials Flow (Daemon Applications)

**Best for:** Background services, scheduled jobs, server-to-server apps, automation scripts

Client credentials flow uses application identity (client secret or certificate) for authentication without user interaction.

```typescript
import { ConfidentialClientApplication } from "@azure/msal-node";
import { MsalNodeTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-node";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";

// Option 1: Using client secret
const cca = new ConfidentialClientApplication({
  auth: {
    clientId: "your-app-client-id",
    authority: "https://login.microsoftonline.com/your-tenant-id",
    clientSecret: "your-client-secret", // From Azure AD App Registration
  },
});

// Option 2: Using certificate (more secure, recommended for production)
const ccaWithCert = new ConfidentialClientApplication({
  auth: {
    clientId: "your-app-client-id",
    authority: "https://login.microsoftonline.com/your-tenant-id",
    clientCertificate: {
      thumbprint: "certificate-thumbprint",
      privateKey: certificatePrivateKey, // PEM-formatted private key
    },
  },
});

// Create token provider with client credentials flow
const tokenProvider = new MsalNodeTokenProvider(cca, {
  flow: "clientCredentials",
  scopes: ["https://your-org.crm.dynamics.com/.default"],

  // Optional: Override tenant for multi-tenant scenarios
  tenantId: "specific-tenant-id", // Overrides authority tenant
});

// Create Dataverse client
const client = new DataverseClient({
  baseUrl: "https://your-org.crm.dynamics.com",
  tokenProvider,
});

// Daemon can now make unattended API calls
const accounts = await client.api("/accounts").select("name", "accountnumber").top(100).get();

console.log(`Retrieved ${accounts.value.length} accounts`);
```

**Client credentials flow details:**

- Requires `ConfidentialClientApplication`
- **No user interaction** - fully automated
- Application must have **Application Permissions** (not Delegated) in Azure AD
- Requires Dataverse **Application User** setup
- Tokens acquired on behalf of the application, not a user
- Suitable for background tasks, data synchronization, reporting

**Azure AD App Setup:**

1. Register app in Azure AD
2. Add API Permission: `Dynamics CRM` → `Application Permissions` → `user_impersonation`
3. Admin consent required
4. Create Application User in Dataverse with appropriate security role

### 3. Authorization Code Flow with PKCE (Web Server Applications)

**Best for:** Express.js apps, Next.js API routes, server-side web apps with user authentication

Authorization code flow uses browser-based login with PKCE (Proof Key for Code Exchange) for secure token acquisition in web servers.

```typescript
import express, { Request, Response } from "express";
import session from "express-session";
import { ConfidentialClientApplication } from "@azure/msal-node";
import { MsalNodeTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-node";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";

const app = express();

// Configure session middleware
app.use(
  session({
    secret: "your-session-secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Create Confidential Client Application
const cca = new ConfidentialClientApplication({
  auth: {
    clientId: "your-app-client-id",
    authority: "https://login.microsoftonline.com/your-tenant-id",
    clientSecret: "your-client-secret",
  },
});

// Login route - Redirect user to Azure AD
app.get("/auth/login", async (req: Request, res: Response) => {
  try {
    // Generate authorization URL with PKCE
    const authCodeUrl = await cca.getAuthCodeUrl({
      scopes: ["https://your-org.crm.dynamics.com/.default"],
      redirectUri: "http://localhost:3000/auth/callback",
      state: "random-state-value", // CSRF protection
    });

    res.redirect(authCodeUrl);
  } catch (error) {
    res.status(500).send("Error generating auth URL");
  }
});

// Callback route - Exchange code for token
app.get("/auth/callback", async (req: Request, res: Response) => {
  const code = req.query.code as string;
  const state = req.query.state as string;

  // Validate state for CSRF protection
  if (state !== "random-state-value") {
    return res.status(400).send("State mismatch");
  }

  try {
    // Exchange authorization code for token
    const tokenResponse = await cca.acquireTokenByCode({
      code,
      scopes: ["https://your-org.crm.dynamics.com/.default"],
      redirectUri: "http://localhost:3000/auth/callback",
    });

    // Store tokens in session
    req.session.accessToken = tokenResponse.accessToken;
    req.session.account = tokenResponse.account;

    res.redirect("/dashboard");
  } catch (error) {
    res.status(500).send("Error acquiring token");
  }
});

// Protected route - Use token to call Dataverse
app.get("/api/accounts", async (req: Request, res: Response) => {
  if (!req.session.accessToken) {
    return res.redirect("/auth/login");
  }

  // Create token provider with stored account
  const tokenProvider = new MsalNodeTokenProvider(cca, {
    flow: "silent",
    scopes: ["https://your-org.crm.dynamics.com/.default"],
    account: req.session.account,
  });

  const client = new DataverseClient({
    baseUrl: "https://your-org.crm.dynamics.com",
    tokenProvider,
  });

  const accounts = await client.api("/accounts").select("name", "accountnumber").top(10).get();

  res.json(accounts.value);
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

**Authorization code flow details:**

- Requires `ConfidentialClientApplication` (can use Public Client but not recommended)
- User authenticates via browser redirect
- PKCE (Proof Key for Code Exchange) provides additional security
- Redirect URI must match Azure AD app registration exactly
- Token cached in MSAL automatically, can also store in session
- Suitable for web apps where users log in via browser

### 4. Username/Password Flow (Resource Owner Password Credentials)

**Best for:** Testing scenarios only ⚠️

⚠️ **Not recommended for production:** This flow bypasses MFA, Conditional Access, and other security features. Use device code or auth code flows instead.

```typescript
import { PublicClientApplication } from "@azure/msal-node";
import { MsalNodeTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-node";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";

const pca = new PublicClientApplication({
  auth: {
    clientId: "your-app-client-id",
    authority: "https://login.microsoftonline.com/your-tenant-id",
  },
});

const tokenProvider = new MsalNodeTokenProvider(pca, {
  flow: "usernamePassword",
  scopes: ["https://your-org.crm.dynamics.com/.default"],
  username: "user@domain.com", // User's UPN or email
  password: "user-password",
});

const client = new DataverseClient({
  baseUrl: "https://your-org.crm.dynamics.com",
  tokenProvider,
});

// Token acquired automatically on first call
const result = await client.api("/WhoAmI").get();
console.log(`User ID: ${result.UserId}`);
```

**Username/password flow limitations:**

- ❌ Doesn't support MFA
- ❌ Bypasses Conditional Access policies
- ❌ Doesn't work with federated authentication
- ❌ Security risks: credentials in memory
- ✅ Only use for automated testing with dedicated test accounts

### 5. Silent Flow (Token Cache & Refresh)

**Best for:** Token refresh, subsequent requests after interactive login

Silent flow attempts to acquire tokens from cache or refresh tokens without user interaction. **Automatically used by all other flows** for token refresh.

```typescript
import { PublicClientApplication, AccountInfo } from "@azure/msal-node";
import { MsalNodeTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-node";

const pca = new PublicClientApplication({
  auth: {
    clientId: "your-app-client-id",
    authority: "https://login.microsoftonline.com/your-tenant-id",
  },
});

// Get accounts from cache (after previous authentication)
const accounts = await pca.getTokenCache().getAllAccounts();
const account: AccountInfo = accounts[0];

// Create silent token provider
const tokenProvider = new MsalNodeTokenProvider(pca, {
  flow: "silent",
  scopes: ["https://your-org.crm.dynamics.com/.default"],
  account, // Required: previously cached account
});

// Token acquired from cache or refresh token
const token = await tokenProvider.getToken();
console.log("Token acquired silently");

// Silent flow with force refresh
const tokenProviderForceRefresh = new MsalNodeTokenProvider(pca, {
  flow: "silent",
  scopes: ["https://your-org.crm.dynamics.com/.default"],
  account,
  forceRefresh: true, // Skip cache, always refresh
});
```

**Silent flow details:**

- Requires previously cached `AccountInfo`
- First checks cache for valid token
- Falls back to refresh token if cache expired
- Throws error if no cached account or refresh fails
- Use `forceRefresh: true` to bypass cache
- MSAL automatically uses silent flow internally for token refresh

## Complete Examples

### CLI Tool with Device Code

```typescript
import chalk from "chalk";
import { PublicClientApplication } from "@azure/msal-node";
import { MsalNodeTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-node";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";

async function main() {
  console.log(chalk.blue("Dataverse CLI Tool"));
  console.log(chalk.gray("─".repeat(50)));

  const pca = new PublicClientApplication({
    auth: {
      clientId: process.env.CLIENT_ID!,
      authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
    },
  });

  const tokenProvider = new MsalNodeTokenProvider(pca, {
    flow: "deviceCode",
    scopes: [`${process.env.DATAVERSE_URL}/.default`],
    deviceCodeCallback: (response) => {
      console.log(chalk.yellow("\n🔐 Authentication Required"));
      console.log(chalk.white(response.message));
      console.log(chalk.gray("─".repeat(50)));
    },
  });

  const client = new DataverseClient({
    baseUrl: process.env.DATAVERSE_URL!,
    tokenProvider,
  });

  console.log(chalk.cyan("\nFetching accounts..."));
  const result = await client.api("/accounts").select("name", "accountnumber").top(10).get();

  console.log(chalk.green(`\n✓ Found ${result.value.length} accounts\n`));
  result.value.forEach((account: any, i: number) => {
    console.log(chalk.white(`${i + 1}. ${account.name}`));
    console.log(chalk.gray(`   Account #: ${account.accountnumber || "N/A"}`));
  });
}

main().catch(console.error);
```

### Daemon Service with Scheduling

```typescript
import cron from "node-cron";
import { ConfidentialClientApplication } from "@azure/msal-node";
import { MsalNodeTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-node";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";

class DataverseSyncService {
  private client: DataverseClient;

  constructor() {
    const cca = new ConfidentialClientApplication({
      auth: {
        clientId: process.env.CLIENT_ID!,
        authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
        clientSecret: process.env.CLIENT_SECRET!,
      },
    });

    const tokenProvider = new MsalNodeTokenProvider(cca, {
      flow: "clientCredentials",
      scopes: [`${process.env.DATAVERSE_URL}/.default`],
    });

    this.client = new DataverseClient({
      baseUrl: process.env.DATAVERSE_URL!,
      tokenProvider,
    });
  }

  async syncAccounts() {
    console.log(`[${new Date().toISOString()}] Starting account sync...`);

    const accounts = await this.client
      .api("/accounts")
      .filter(`modifiedon gt ${this.getLastSyncTime()}`)
      .select("accountid", "name", "modifiedon")
      .get();

    console.log(`Synced ${accounts.value.length} modified accounts`);
    // Process accounts...

    this.updateLastSyncTime();
  }

  private getLastSyncTime(): string {
    // Implementation...
    return new Date(Date.now() - 3600000).toISOString();
  }

  private updateLastSyncTime(): void {
    // Implementation...
  }
}

// Run every hour
const service = new DataverseSyncService();
cron.schedule("0 * * * *", () => {
  service.syncAccounts().catch(console.error);
});

console.log("Daemon service started. Syncing accounts every hour.");
```

## API Reference

### Class: `MsalNodeTokenProvider`

Implements `AccessTokenProvider` interface from `@mohsinonxrm/dataverse-sdk-core`.

#### Constructor

```typescript
constructor(
  clientApplication: PublicClientApplication | ConfidentialClientApplication,
  options: MsalNodeTokenProviderOptions
)
```

**Parameters:**

- `clientApplication` - MSAL client application instance
  - `PublicClientApplication` for device code, username/password, silent flows
  - `ConfidentialClientApplication` for client credentials, auth code flows
- `options` - Flow-specific configuration (discriminated union by `flow` property)

**Throws:**

- `DataverseInvalidRequestError` if validation fails

#### Methods

**`getToken(scopes?, options?): Promise<string>`**

Acquires access token using configured flow. Automatically routes to correct MSAL method based on flow type.

```typescript
const token = await tokenProvider.getToken();
// Or override scopes
const token = await tokenProvider.getToken(["different-scope/.default"]);
```

**`getAuthCodeUrl(redirectUri, scopes?, state?, codeChallenge?): Promise<string>`**

Generates authorization URL for auth code flow (useful for web server login redirects).

```typescript
const authUrl = await tokenProvider.getAuthCodeUrl(
  "http://localhost:3000/callback",
  ["https://org.crm.dynamics.com/.default"],
  "random-state-csrf-token",
  "pkce-code-challenge"
);
```

**`getCachedAccount(): AccountInfo | undefined`**

Returns the most recently cached account (if available).

**`async getAccounts(): Promise<AccountInfo[]>`**

Returns all accounts in MSAL token cache.

```typescript
const accounts = await tokenProvider.getAccounts();
console.log(`Found ${accounts.length} cached accounts`);
```

**`async clearCache(): Promise<void>`**

Clears all accounts and tokens from MSAL cache.

```typescript
await tokenProvider.clearCache();
```

### Flow-Specific Options

#### `DeviceCodeFlowOptions`

```typescript
{
  flow: 'deviceCode';
  scopes: string[];
  deviceCodeCallback: (response: DeviceCodeResponse) => void;
  correlationId?: string;
  claims?: string;
}
```

#### `ClientCredentialsFlowOptions`

```typescript
{
  flow: 'clientCredentials';
  scopes: string[];
  tenantId?: string; // Override authority tenant
  correlationId?: string;
  claims?: string;
}
```

#### `AuthorizationCodeFlowOptions`

```typescript
{
  flow: 'authorizationCode';
  scopes: string[];
  redirectUri: string;
  code?: string; // Authorization code from callback
  codeVerifier?: string; // PKCE code verifier
  correlationId?: string;
  claims?: string;
}
```

#### `UsernamePasswordFlowOptions`

```typescript
{
  flow: 'usernamePassword';
  scopes: string[];
  username: string; // UPN format
  password: string;
  correlationId?: string;
  claims?: string;
}
```

#### `SilentFlowOptions`

```typescript
{
  flow: 'silent';
  scopes: string[];
  account: AccountInfo; // Required
  forceRefresh?: boolean; // Skip cache
  correlationId?: string;
  claims?: string;
}
```

## Token Caching & Persistence

MSAL Node automatically caches tokens in memory. For persistent caching across application restarts:

```typescript
import { DataProtectionScope } from "@azure/msal-node";
import { FilePersistencePlugin } from "@azure/msal-node/dist/cache/FilePersistence";

const cachePlugin = new FilePersistencePlugin({
  cachePath: "./data/token-cache.json",
  dataProtectionScope: DataProtectionScope.CurrentUser,
});

const pca = new PublicClientApplication({
  auth: {
    clientId: "your-client-id",
    authority: "https://login.microsoftonline.com/your-tenant-id",
  },
  cache: {
    cachePlugin,
  },
});
```

**Security notes:**

- Cache files contain sensitive tokens
- Use `DataProtectionScope.CurrentUser` to encrypt cache
- Ensure appropriate file permissions (e.g., `chmod 600`)
- Never commit cache files to version control

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
    // Authentication failures (wrong credentials, MFA required, etc.)
    console.error("Auth failed:", error.message);

    // Original MSAL error available in cause
    if (error.cause) {
      console.error("MSAL error:", error.cause);
    }
  } else if (error instanceof DataverseInvalidRequestError) {
    // Configuration errors (missing parameters, invalid flow, etc.)
    console.error("Invalid config:", error.message);
  }
}
```

**Common error scenarios:**

- `DataverseAuthenticationError`: User cancelled device code, invalid credentials, token expired
- `DataverseInvalidRequestError`: Missing required parameters, wrong client application type for flow
- MSAL errors wrapped in `error.cause`

## Security Best Practices

1. **Environment Variables:** Never hardcode secrets in source code

   ```typescript
   clientSecret: process.env.CLIENT_SECRET;
   ```

2. **Client Certificates:** Prefer certificates over secrets for production daemons

   ```typescript
   clientCertificate: {
     thumbprint: process.env.CERT_THUMBPRINT,
     privateKey: fs.readFileSync('./cert.pem', 'utf-8'),
   }
   ```

3. **Scope Minimization:** Request only scopes your app needs

   ```typescript
   scopes: ["https://org.crm.dynamics.com/.default"]; // Minimal scope
   ```

4. **Secret Rotation:** Implement regular rotation for client credentials

5. **Managed Identities:** Use Azure Managed Identity when running on Azure (with `@azure/identity`)

6. **Avoid Username/Password:** This flow doesn't support MFA, Conditional Access, or modern auth

7. **HTTPS Only:** Always use HTTPS for redirect URIs in production

8. **State Parameter:** Use state parameter in auth code flow for CSRF protection

## Troubleshooting

### Device Code Flow Timeout

```typescript
// User needs more time - device code expires after 15 minutes by default
// MSAL handles timeout internally, but you can inform users:
const tokenProvider = new MsalNodeTokenProvider(pca, {
  flow: "deviceCode",
  scopes: ["https://org.crm.dynamics.com/.default"],
  deviceCodeCallback: (response) => {
    console.log(response.message);
    console.log(`Code expires in ${response.expiresIn} seconds`);
  },
});
```

### Client Credentials: 403 Forbidden

**Checklist:**

1. App registration has API permission: `Dynamics CRM` → `user_impersonation` (Application permission)
2. Admin consent granted for permission
3. Application user created in Dataverse with appropriate security role
4. Application user security role has required privileges

**Create application user in Dataverse:**

```powershell
# PowerShell example
$appId = "your-app-client-id"
$tenantId = "your-tenant-id"

# In Dataverse: Settings → Security → Application Users → New
# Set Client ID and grant security role
```

### Authorization Code: State Mismatch

Ensure consistency across:

1. `getAuthCodeUrl()` state parameter
2. Callback validation
3. Session storage

```typescript
// Generate and store state
const state = crypto.randomBytes(16).toString("hex");
req.session.oauthState = state;

const authUrl = await cca.getAuthCodeUrl({
  scopes: ["..."],
  redirectUri: "http://localhost:3000/callback",
  state, // Must match in callback
});

// Validate in callback
if (req.query.state !== req.session.oauthState) {
  throw new Error("State mismatch - possible CSRF attack");
}
```

### Silent Token Acquisition Fails

If silent token acquisition fails, fall back to interactive flow:

```typescript
try {
  const token = await tokenProvider.getToken(); // Silent attempt
} catch (error) {
  // Fall back to device code or auth code flow
  console.log("Silent auth failed, prompting user...");
  // Re-authenticate
}
```

## TypeScript Support

Fully typed with discriminated unions for flow-specific options:

```typescript
// TypeScript enforces flow-specific requirements
const provider1: MsalNodeTokenProvider = new MsalNodeTokenProvider(pca, {
  flow: "deviceCode",
  scopes: ["..."],
  deviceCodeCallback: (r) => console.log(r.message), // Required for device code
});

const provider2: MsalNodeTokenProvider = new MsalNodeTokenProvider(cca, {
  flow: "clientCredentials",
  scopes: ["..."],
  // deviceCodeCallback not allowed here - compile error
});
```

## License

**GNU AGPL v3.0**

See [LICENSE](../../LICENSE) in repository root.

## Related Packages

- **[@mohsinonxrm/dataverse-sdk-core](../dataverse-sdk-core)** - Core HTTP client
- **[@mohsinonxrm/dataverse-sdk-auth-msal-browser](../dataverse-sdk-auth-msal-browser)** - Browser authentication
- **[@mohsinonxrm/dataverse-sdk-auth-azure-identity](../dataverse-sdk-auth-azure-identity)** - Azure Identity SDK adapter

## Support

- **Issues:** [GitHub Issues](https://github.com/mohsinonxrm/mxrm-dataverse-sdk-typescript/issues)
- **Documentation:** [docs/](../../docs/)
- **Samples:** [samples/node-cli-devicecode](../../samples/node-cli-devicecode), [samples/daemon-clientcredentials](../../samples/daemon-clientcredentials)
