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

**Dependencies:** `@azure/msal-node` (`^2.16.3`) and `@mohsinonxrm/dataverse-sdk-core` are regular
dependencies of this package. The provider checks the client application with `instanceof`, so
create your `PublicClientApplication` / `ConfidentialClientApplication` from the same
`@azure/msal-node` copy (install a matching version so your package manager dedupes them).

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
const whoami = await client.api("/WhoAmI").get<{ UserId: string }>();
console.log(`✓ Authenticated as user: ${whoami.UserId}`);
```

**Device code flow details:**

- Requires `PublicClientApplication`
- User sees code and URL in terminal
- User authenticates in browser on any device
- The provider calls `acquireTokenByDeviceCode` on every `getToken()` call and doesn't try the
  cache first, and the client asks for a token on every request, so each request prompts again
  (tracked in [#85](https://github.com/mohsinonxrm/dataverse-sdk-typescript/issues/85)). For
  more than one request, sign in once, then use the [silent flow](#5-silent-flow-token-cache--refresh)
  with the account from `getCachedAccount()`
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
const accounts = await client
  .api("/accounts")
  .select("name", "accountnumber")
  .top(100)
  .get<{ value: { name: string }[] }>();

console.log(`Retrieved ${accounts.value.length} accounts`);
```

**Client credentials flow details:**

- Requires `ConfidentialClientApplication`
- **No user interaction** - fully automated
- Use the `https://<org>.crm.dynamics.com/.default` scope
- Requires a Dataverse **Application User** for the app registration: that, and its security
  roles, is what grants access. Dynamics CRM has no application permissions to add in Entra ID
- Tokens acquired on behalf of the application, not a user
- Suitable for background tasks, data synchronization, reporting

**App setup:**

1. Register an app in Microsoft Entra ID and add a client secret or certificate
2. In the [Power Platform admin center](https://admin.powerplatform.microsoft.com), open the
   environment → Settings → Users + permissions → Application users → **New app user**, and pick
   the app registration
3. Assign the application user a security role with the privileges your code needs

No API permission or admin consent is needed for app-only access. The `Dynamics CRM` →
`user_impersonation` API permission is a **delegated** permission, for flows where a user signs in.

### 3. Authorization Code Flow with PKCE (Web Server Applications)

**Best for:** Express.js apps, Next.js API routes, server-side web apps with user authentication

Authorization code flow uses browser-based login with PKCE (Proof Key for Code Exchange) for secure token acquisition in web servers.

```typescript
import express, { Request, Response } from "express";
import session from "express-session";
import { AccountInfo, ConfidentialClientApplication, CryptoProvider } from "@azure/msal-node";
import { MsalNodeTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-node";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";

// What this app keeps in the session
declare module "express-session" {
  interface SessionData {
    oauthState?: string;
    pkceVerifier?: string;
    account?: AccountInfo;
  }
}

const app = express();
const cryptoProvider = new CryptoProvider();
const scopes = ["https://your-org.crm.dynamics.com/.default"];
const redirectUri = "http://localhost:3000/auth/callback";

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

// Login route - Redirect user to Entra ID
app.get("/auth/login", async (req: Request, res: Response) => {
  try {
    // PKCE: a one-time verifier, kept on the server, and its challenge, sent to Entra ID
    const { verifier, challenge } = await cryptoProvider.generatePkceCodes();
    req.session.pkceVerifier = verifier;
    req.session.oauthState = cryptoProvider.createNewGuid(); // CSRF protection

    const authCodeUrl = await cca.getAuthCodeUrl({
      scopes,
      redirectUri,
      state: req.session.oauthState,
      codeChallenge: challenge,
      codeChallengeMethod: "S256",
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
  if (!req.session.oauthState || state !== req.session.oauthState) {
    res.status(400).send("State mismatch");
    return;
  }

  try {
    // Exchange the authorization code (single use) for tokens, proving PKCE with the verifier
    const tokenResponse = await cca.acquireTokenByCode({
      code,
      scopes,
      redirectUri,
      codeVerifier: req.session.pkceVerifier,
    });

    // MSAL caches the tokens; the session only needs the account
    req.session.account = tokenResponse.account ?? undefined;
    req.session.pkceVerifier = undefined;
    req.session.oauthState = undefined;

    res.redirect("/dashboard");
  } catch (error) {
    res.status(500).send("Error acquiring token");
  }
});

// Protected route - Use the cached tokens to call Dataverse
app.get("/api/accounts", async (req: Request, res: Response) => {
  const account = req.session.account;
  if (!account) {
    res.redirect("/auth/login");
    return;
  }

  // Silent flow: tokens come from MSAL's cache (refreshed with the refresh token when needed)
  const tokenProvider = new MsalNodeTokenProvider(cca, {
    flow: "silent",
    scopes,
    account,
  });

  const client = new DataverseClient({
    baseUrl: "https://your-org.crm.dynamics.com",
    tokenProvider,
  });

  const accounts = await client
    .api("/accounts")
    .select("name", "accountnumber")
    .top(10)
    .get<{ value: unknown[] }>();

  res.json(accounts.value);
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

**Authorization code flow details:**

- Uses `ConfidentialClientApplication` here; MSAL redeems the code with `acquireTokenByCode`
- User authenticates via browser redirect
- PKCE: `CryptoProvider.generatePkceCodes()` gives a verifier and a challenge. The challenge goes
  to `getAuthCodeUrl({ codeChallenge, codeChallengeMethod: "S256" })`, the verifier to
  `acquireTokenByCode({ codeVerifier })`. `MsalNodeTokenProvider.getAuthCodeUrl(redirectUri, scopes, state, codeChallenge)`
  does the same as the first call
- Redirect URI must match the app registration exactly
- MSAL caches the tokens in the `ConfidentialClientApplication`'s cache (in memory by default; see
  [Token Caching & Persistence](#token-caching--persistence)), and the silent flow reads them
- `flow: "authorizationCode"` (with `code` and `codeVerifier`) redeems the code on every
  `getToken()` call, but a code is single use, so redeem it yourself as above and use the silent
  flow for requests ([#85](https://github.com/mohsinonxrm/dataverse-sdk-typescript/issues/85))
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
const result = await client.api("/WhoAmI").get<{ UserId: string }>();
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

Silent flow acquires tokens from MSAL's cache, or with a refresh token, without user interaction. The other flows don't fall back to it: each of them goes to Entra ID on every `getToken()` call ([#85](https://github.com/mohsinonxrm/dataverse-sdk-typescript/issues/85)), so after an interactive sign-in, create a silent provider for the account.

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
```

**Silent flow details:**

- Requires previously cached `AccountInfo`
- First checks cache for valid token
- Falls back to refresh token if cache expired
- Throws error if no cached account or refresh fails
- `SilentFlowOptions` has no `forceRefresh` option, and the provider doesn't act on
  `TokenOptions.forceRefresh` yet: it always calls `acquireTokenSilent` with `forceRefresh: false`
  ([#167](https://github.com/mohsinonxrm/dataverse-sdk-typescript/issues/167)). So after a 401,
  the client's one retry can get the same cached token back

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
  const result = await client
    .api("/accounts")
    .select("name", "accountnumber")
    .top(10)
    .get<{ value: { name: string; accountnumber?: string }[] }>();

  console.log(chalk.green(`\n✓ Found ${result.value.length} accounts\n`));
  result.value.forEach((account, i) => {
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
      .get<{ value: { accountid: string; name: string; modifiedon: string }[] }>();

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
  correlationId?: string;
  claims?: string;
}
```

## Token Caching & Persistence

MSAL Node caches tokens in memory, per client application. `@azure/msal-node` has no file cache of
its own: for a cache that survives restarts, use Microsoft's
[`@azure/msal-node-extensions`](https://www.npmjs.com/package/@azure/msal-node-extensions), which
stores it encrypted with DPAPI on Windows, the Keychain on macOS and libsecret on Linux:

```bash
pnpm add @azure/msal-node-extensions
```

```typescript
import { PublicClientApplication } from "@azure/msal-node";
import {
  DataProtectionScope,
  PersistenceCachePlugin,
  PersistenceCreator,
} from "@azure/msal-node-extensions";

const persistence = await PersistenceCreator.createPersistence({
  cachePath: "./data/token-cache.json",
  dataProtectionScope: DataProtectionScope.CurrentUser, // Windows (DPAPI)
  serviceName: "my-dataverse-app", // macOS Keychain / Linux libsecret
  accountName: "msal-token-cache",
  usePlaintextFileOnLinux: false,
});

const pca = new PublicClientApplication({
  auth: {
    clientId: "your-client-id",
    authority: "https://login.microsoftonline.com/your-tenant-id",
  },
  cache: {
    cachePlugin: new PersistenceCachePlugin(persistence),
  },
});
```

**Security notes:**

- Cache files contain sensitive tokens
- Keep `usePlaintextFileOnLinux: false` unless the machine has no libsecret and you accept a
  plain-text file
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

1. An application user exists in the Dataverse environment for the app registration's client ID
   (Power Platform admin center → environment → Settings → Users + permissions → Application users)
2. The application user has a security role, and the role has the privileges the request needs
3. The token is for the environment: scope `https://<org>.crm.dynamics.com/.default`
4. The tenant in the authority (or `tenantId`) is the environment's tenant

API permissions and admin consent don't matter for app-only access: Dynamics CRM exposes no
application permissions, only the delegated `user_impersonation`.

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

- **Issues:** [GitHub Issues](https://github.com/mohsinonxrm/dataverse-sdk-typescript/issues)
- **Documentation:** [docs/](../../docs/)
- **Samples:** [samples/node-cli-devicecode](../../samples/node-cli-devicecode), [samples/daemon-clientcredentials](../../samples/daemon-clientcredentials)
