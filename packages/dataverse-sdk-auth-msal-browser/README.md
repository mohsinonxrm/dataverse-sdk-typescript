# @mohsinonxrm/dataverse-sdk-auth-msal-browser

> MSAL Browser authentication provider for Dataverse SDK. Implements `AccessTokenProvider` using `@azure/msal-browser` for Single Page Applications (SPAs). Supports popup and redirect authentication flows with automatic silent token refresh.

## Features

- ✅ **Popup & Redirect Flows** - Choose interaction type: popup windows or full-page redirects
- ✅ **Silent Token Acquisition** - Automatic token refresh without user interaction (MSAL handles internally)
- ✅ **React Integration** - Works seamlessly with `@azure/msal-react` and React apps
- ✅ **Multi-Account Support** - Handle multiple signed-in accounts with active account tracking
- ✅ **TypeScript-first** - Fully typed with comprehensive IntelliSense
- ✅ **Conditional Access** - Support for claims challenges and step-up authentication
- ✅ **Browser Storage** - SessionStorage or LocalStorage for token caching

## Installation

```bash
pnpm add @mohsinonxrm/dataverse-sdk-auth-msal-browser @mohsinonxrm/dataverse-sdk-core @azure/msal-browser
```

**Peer dependency:** `@azure/msal-browser` `^3.30.0 || ^4.0.0 || ^5.0.0`. Install it yourself (as above); this package does not bring its own copy. The provider uses the `PublicClientApplication` your app creates, so the app, `@azure/msal-react` and this provider share one MSAL copy and one token cache.

Errors are classified by MSAL's `name` and `errorCode`, never by `instanceof`, so "interaction required" from any of those MSAL majors starts the interactive flow. The same check is exported as `isInteractionRequiredError(error)` for app code.

## Quick Start

### 1. Basic Setup with Popup Flow (Recommended)

**Best for:** Most SPA scenarios, React apps, Vue apps, Angular apps

Popup flow shows login in a popup window, keeping the main app page loaded.

```typescript
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalBrowserTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-browser";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";

// Step 1: Configure MSAL
const msalConfig = {
  auth: {
    clientId: "your-client-id", // Azure AD App Registration client ID
    authority: "https://login.microsoftonline.com/your-tenant-id",
    redirectUri: window.location.origin, // Must match app registration
  },
  cache: {
    cacheLocation: "sessionStorage", // 'sessionStorage' or 'localStorage'
    storeAuthStateInCookie: false, // Set to true for IE11/Edge legacy
  },
};

// Step 2: Initialize MSAL (required before use)
const pca = new PublicClientApplication(msalConfig);
await pca.initialize();

// Step 3: Create token provider with popup interaction
const tokenProvider = new MsalBrowserTokenProvider(pca, {
  scopes: ["https://your-org.crm.dynamics.com/.default"],
  interactionType: "popup", // Default: popup
});

// Step 4: Create Dataverse client
const client = new DataverseClient({
  baseUrl: "https://your-org.crm.dynamics.com",
  tokenProvider,
});

// Step 5: Use the client - first call triggers popup login automatically
const accounts = await client.api("/accounts").select("name", "accountnumber").top(10).get();

console.log(`Retrieved ${accounts.value.length} accounts`);
```

**How it works:**

1. First API call triggers `getToken()`
2. With no signed-in account, the popup opens right away. Otherwise the provider tries silent acquisition first
3. If MSAL says interaction is required (`interaction_required`, `consent_required`, `login_required`, `no_account_error`, ...), the popup opens, with the signed-in account and `loginHint`, so the user is not asked to pick an account again
4. User authenticates in popup; the account it returns becomes MSAL's active account
5. Token cached for future requests
6. Subsequent calls use cached token (automatic refresh)

Concurrent calls that need interaction share **one** popup: MSAL allows one interaction at a time. A call for other scopes waits for the running popup, then tries silently before prompting.

> Browsers block popups that don't come from a user gesture. A popup opened from a background request can be blocked; see [Popup blocked by browser](#popup-blocked-by-browser).

### 2. Redirect Flow

**Best for:** Mobile browsers where popups may be blocked, full-page authentication UX

Redirect flow navigates the entire page to login, then redirects back to your app.

```typescript
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalBrowserTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-browser";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";

const msalConfig = {
  auth: {
    clientId: "your-client-id",
    authority: "https://login.microsoftonline.com/your-tenant-id",
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "sessionStorage",
  },
};

const pca = new PublicClientApplication(msalConfig);
await pca.initialize();

// IMPORTANT: Handle redirect promise after page loads
const tokenResponse = await pca.handleRedirectPromise();
if (tokenResponse) {
  console.log("User signed in via redirect:", tokenResponse.account.username);
  pca.setActiveAccount(tokenResponse.account);
}

// Create token provider with redirect interaction
const tokenProvider = new MsalBrowserTokenProvider(pca, {
  scopes: ["https://your-org.crm.dynamics.com/.default"],
  interactionType: "redirect",
});

const client = new DataverseClient({
  baseUrl: "https://your-org.crm.dynamics.com",
  tokenProvider,
});

// First API call will redirect entire page to login
// After login, user is redirected back to redirectUri
// handleRedirectPromise() captures the result
const accounts = await client.api("/accounts").top(10).get();
```

**Redirect flow lifecycle:**

1. App loads → `handleRedirectPromise()` checks for redirect result
2. If no auth → API call triggers `acquireTokenRedirect()`
3. Page redirects to Microsoft login
4. User authenticates
5. Page redirects back to `redirectUri`
6. `handleRedirectPromise()` resolves with tokens
7. Token cached, app continues

### 3. Pre-authenticated Setup (Recommended for Production)

**Best for:** Apps with dedicated login page/flow, explicit auth control

Login explicitly before creating the Dataverse client.

```typescript
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalBrowserTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-browser";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";

const pca = new PublicClientApplication(msalConfig);
await pca.initialize();

// Explicit login via popup
const loginResponse = await pca.loginPopup({
  scopes: ["https://your-org.crm.dynamics.com/.default"],
  prompt: "select_account", // Force account picker
});

// Set as active account
pca.setActiveAccount(loginResponse.account);
console.log(`Signed in as: ${loginResponse.account.username}`);

// Create token provider with specific account
const tokenProvider = new MsalBrowserTokenProvider(pca, {
  scopes: ["https://your-org.crm.dynamics.com/.default"],
  account: loginResponse.account, // Use specific account
  interactionType: "popup",
});

const client = new DataverseClient({
  baseUrl: "https://your-org.crm.dynamics.com",
  tokenProvider,
});

// All API calls use silent token acquisition (no popup after initial login)
const whoami = await client.api("/WhoAmI").get();
console.log(`User ID: ${whoami.UserId}`);
```

### 4. SPA Helpers

Helpers for the setup code every SPA repeats. They don't depend on React or any UI framework.

```typescript
import { PublicClientApplication } from "@azure/msal-browser";
import {
  authorityFor,
  createMsalBrowserProvider,
  initializeMsal,
  scopesForEnvironment,
} from "@mohsinonxrm/dataverse-sdk-auth-msal-browser";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";

const environmentUrl = "https://contoso.crm.dynamics.com";

const pca = new PublicClientApplication({
  auth: {
    clientId: "your-client-id",
    authority: authorityFor("public", "contoso.onmicrosoft.com"),
    redirectUri: window.location.origin,
  },
});

// initialize() + handleRedirectPromise() + active account, on every page load
await initializeMsal(pca);

const tokenProvider = createMsalBrowserProvider(pca, { environmentUrl });
const client = new DataverseClient({ baseUrl: environmentUrl, tokenProvider });

// For a login button:
await pca.loginPopup({ scopes: scopesForEnvironment(environmentUrl) });
```

| Helper                                          | Returns                                                                                                                                                                                   |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `initializeMsal(pca)`                           | Runs `initialize()` and `handleRedirectPromise()`, and returns the redirect result or `null`. It makes the result's account active, or the only cached account when no account is active. |
| `scopesForEnvironment(url, kind?)`              | `["https://<host>/user_impersonation"]` (default) or `["https://<host>/.default"]`. Throws for a non-`https` URL.                                                                         |
| `authorityFor(cloud, tenant = "organizations")` | `https://<host>/<tenant>` for `public` (`login.microsoftonline.com`), `usgov` / `usgovdod` (`login.microsoftonline.us`) or `china` (`login.partner.microsoftonline.cn`).                  |
| `createMsalBrowserProvider(pca, options)`       | A `MsalBrowserTokenProvider`. It takes the same options, plus `environmentUrl` / `scopeKind` in place of `scopes`.                                                                        |

## React Integration

### With @azure/msal-react (Recommended)

The `@azure/msal-react` library provides React-specific hooks and components for MSAL authentication.

```typescript
import React from 'react';
import { MsalProvider, useMsal, AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalBrowserTokenProvider } from '@mohsinonxrm/dataverse-sdk-auth-msal-browser';
import { DataverseClient } from '@mohsinonxrm/dataverse-sdk-core';

// MSAL configuration
const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_CLIENT_ID!,
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_TENANT_ID}`,
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'sessionStorage',
  },
};

const pca = new PublicClientApplication(msalConfig);
await pca.initialize(); // Initialize before rendering

// App wrapper with MsalProvider
export function App() {
  return (
    <MsalProvider instance={pca}>
      <AuthenticatedTemplate>
        <DataverseApp />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <LoginButton />
      </UnauthenticatedTemplate>
    </MsalProvider>
  );
}

// Login button component
function LoginButton() {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginPopup({
      scopes: [process.env.REACT_APP_DATAVERSE_SCOPE!],
    });
  };

  return <button onClick={handleLogin}>Sign In</button>;
}

// Component using Dataverse client
function DataverseApp() {
  const { instance, accounts } = useMsal();
  const [client, setClient] = React.useState<DataverseClient | null>(null);
  const [accounts, setAccounts] = React.useState([]);

  React.useEffect(() => {
    if (accounts.length > 0) {
      // Create token provider with first account
      const tokenProvider = new MsalBrowserTokenProvider(instance, {
        scopes: [process.env.REACT_APP_DATAVERSE_SCOPE!],
        account: accounts[0],
        interactionType: 'popup',
      });

      const dataverseClient = new DataverseClient({
        baseUrl: process.env.REACT_APP_DATAVERSE_URL!,
        tokenProvider,
      });

      setClient(dataverseClient);
    }
  }, [instance, accounts]);

  React.useEffect(() => {
    if (!client) return;

    // Fetch accounts from Dataverse
    client.api('/accounts')
      .select('name', 'accountnumber')
      .top(10)
      .get()
      .then(result => setAccounts(result.value))
      .catch(console.error);
  }, [client]);

  if (!client) {
    return <div>Initializing...</div>;
  }

  return (
    <div>
      <h1>Dataverse Accounts</h1>
      <ul>
        {accounts.map(acc => (
          <li key={acc.accountid}>{acc.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Custom React Hook for Dataverse Client

Create a reusable hook for the Dataverse client.

```typescript
import { useMsal } from '@azure/msal-react';
import { DataverseClient } from '@mohsinonxrm/dataverse-sdk-core';
import { MsalBrowserTokenProvider } from '@mohsinonxrm/dataverse-sdk-auth-msal-browser';
import { useMemo } from 'react';

export function useDataverseClient(): DataverseClient | null {
  const { instance, accounts } = useMsal();

  return useMemo(() => {
    if (accounts.length === 0) {
      return null;
    }

    const tokenProvider = new MsalBrowserTokenProvider(instance, {
      scopes: [process.env.REACT_APP_DATAVERSE_SCOPE!],
      account: accounts[0],
      interactionType: 'popup',
    });

    return new DataverseClient({
      baseUrl: process.env.REACT_APP_DATAVERSE_URL!,
      tokenProvider,
    });
  }, [instance, accounts]);
}

// Usage in component
function AccountList() {
  const client = useDataverseClient();
  const [accounts, setAccounts] = React.useState([]);

  React.useEffect(() => {
    if (!client) return;

    client.api('/accounts')
      .select('name', 'accountnumber')
      .top(10)
      .get()
      .then(result => setAccounts(result.value))
      .catch(console.error);
  }, [client]);

  if (!client) {
    return <div>Not authenticated</div>;
  }

  return (
    <div>
      {accounts.map(acc => (
        <div key={acc.accountid}>{acc.name}</div>
      ))}
    </div>
  );
}
```

      account: accounts[0],
      interactionType: 'popup',
    });

    return new DataverseClient({
      baseUrl: process.env.REACT_APP_DATAVERSE_URL!,
      tokenProvider,
    });

}, [instance, accounts]);
}

// Usage in component
function AccountList() {
const client = useDataverseClient();
const [accounts, setAccounts] = React.useState([]);

React.useEffect(() => {
if (!client) return;

    client.api('/accounts').top(10).get()
      .then(setAccounts)
      .catch(console.error);

}, [client]);

if (!client) {
return <div>Not authenticated</div>;
}

return <div>{/_ Render accounts _/}</div>;
}

````

## Account Management

### Multi-Account Scenarios

Handle multiple signed-in accounts in your SPA.

```typescript
const pca = new PublicClientApplication(msalConfig);
await pca.initialize();

const tokenProvider = new MsalBrowserTokenProvider(pca, {
  scopes: ['https://your-org.crm.dynamics.com/.default'],
});

// Get all cached accounts
const accounts = tokenProvider.getAccounts();
console.log(`Found ${accounts.length} cached account(s)`);

accounts.forEach(account => {
  console.log(`- ${account.username} (${account.name})`);
});

// Switch to a different account
if (accounts.length > 1) {
  tokenProvider.setActiveAccount(accounts[1]);
  console.log(`Switched to account: ${accounts[1].username}`);
}

// Get currently active account
const activeAccount = tokenProvider.getActiveAccount();
if (activeAccount) {
  console.log(`Active account: ${activeAccount.username}`);
} else {
  console.log('No active account set');
}

// The account is resolved on every request: MSAL's active account wins, so after
// setActiveAccount(), the next request uses the new account.
// To pin a provider to one account whatever the active account is, pass a function:
const specificTokenProvider = new MsalBrowserTokenProvider(pca, {
  scopes: ['https://your-org.crm.dynamics.com/.default'],
  account: () => accounts[0], // called on every request
});
````

**Account resolution, on every `getToken()` call:**

1. `account` function, if given and it returns an account
2. MSAL's active account (`pca.setActiveAccount()` / `tokenProvider.setActiveAccount()`)
3. `account` `AccountInfo`, if given
4. The first cached account
5. None: sign in interactively

### Guest users and other tenants

Pass `tenantId` to get a token from a specific tenant, for example a guest account whose home tenant isn't the Dataverse organization's tenant. It becomes the request's `authority`, on the host of your MSAL configuration's authority (for example `https://login.microsoftonline.com/<tenantId>`).

```typescript
const token = await tokenProvider.getToken(undefined, { tenantId: "<dataverse-tenant-id>" });
```

### Sign Out

Sign out the current user or a specific account.

```typescript
const tokenProvider = new MsalBrowserTokenProvider(pca, {
  scopes: ["https://your-org.crm.dynamics.com/.default"],
  interactionType: "popup", // Determines sign-out method
});

// Sign out current active account (popup)
await tokenProvider.signOut();
console.log("User signed out via popup");

// Sign out specific account
const accounts = tokenProvider.getAccounts();
if (accounts.length > 0) {
  await tokenProvider.signOut(accounts[0]);
}

// Redirect-based sign out
const redirectTokenProvider = new MsalBrowserTokenProvider(pca, {
  scopes: ["https://your-org.crm.dynamics.com/.default"],
  interactionType: "redirect",
});

await redirectTokenProvider.signOut();
// Page redirects to Microsoft logout, then back to app

// Sign out and clear all accounts
const allAccounts = pca.getAllAccounts();
for (const account of allAccounts) {
  await pca.logoutPopup({ account });
}
```

**Sign out behavior:**

- `interactionType: 'popup'` → `logoutPopup()` (popup window)
- `interactionType: 'redirect'` → `logoutRedirect()` (full page redirect)
- Clears tokens from browser cache
- Ends session with Microsoft identity platform

## API Reference

### Class: `MsalBrowserTokenProvider`

Implements `AccessTokenProvider` interface from `@mohsinonxrm/dataverse-sdk-core`.

#### Constructor

```typescript
constructor(
  publicClientApplication: IPublicClientApplication,
  options: MsalBrowserTokenProviderOptions
)
```

**Parameters:**

- `publicClientApplication` - Initialized MSAL `PublicClientApplication` or `IPublicClientApplication`
  - Must call `await pca.initialize()` before passing to constructor
- `options` - Configuration options (see below)

**Throws:**

- `DataverseInvalidRequestError` if parameters are invalid or missing

#### Methods

**`async getToken(scopes?, options?): Promise<string>`**

Acquires access token using silent flow first, falls back to interactive (popup/redirect) if needed.

```typescript
// Use configured scopes
const token = await tokenProvider.getToken();

// Override scopes for this request
const token = await tokenProvider.getToken(["https://org2.crm.dynamics.com/.default"]);

// With additional options
const token = await tokenProvider.getToken(undefined, {
  claims: '{"access_token":{"acrs":{"essential":true,"values":["c1"]}}}',
  correlationId: crypto.randomUUID(),
});
```

**`getAccounts(): AccountInfo[]`**

Returns all accounts cached by MSAL.

```typescript
const accounts = tokenProvider.getAccounts();
console.log(`Found ${accounts.length} account(s)`);
```

**`setActiveAccount(account: AccountInfo): void`**

Sets the active account for MSAL operations.

```typescript
const accounts = tokenProvider.getAccounts();
tokenProvider.setActiveAccount(accounts[0]);
```

**`getActiveAccount(): AccountInfo | null`**

Gets the currently active account.

```typescript
const activeAccount = tokenProvider.getActiveAccount();
if (activeAccount) {
  console.log(`Active: ${activeAccount.username}`);
}
```

**`async signOut(account?: AccountInfo): Promise<void>`**

Signs out a user using popup or redirect (based on `interactionType`).

```typescript
// Sign out active account
await tokenProvider.signOut();

// Sign out specific account
const accounts = tokenProvider.getAccounts();
await tokenProvider.signOut(accounts[0]);
```

### Configuration Options

#### `MsalBrowserTokenProviderOptions`

```typescript
interface MsalBrowserTokenProviderOptions {
  scopes: string[]; // Required
  account?: AccountInfo | (() => AccountInfo | null | undefined); // Optional
  interactionType?: "popup" | "redirect"; // Default: 'popup'
  fallbackToRedirect?: boolean; // Default: false
  claims?: string; // Optional
  correlationId?: string; // Optional
}
```

| Property             | Type                                       | Required | Default                    | Description                                |
| -------------------- | ------------------------------------------ | -------- | -------------------------- | ------------------------------------------ |
| `scopes`             | `string[]`                                 | ✅ Yes   | -                          | OAuth scopes for Dataverse access          |
| `account`            | `AccountInfo \| () => AccountInfo \| null` | ❌ No    | Active account, then first | Account to use; see account resolution     |
| `interactionType`    | `'popup' \| 'redirect'`                    | ❌ No    | `'popup'`                  | How to handle interactive auth             |
| `fallbackToRedirect` | `boolean`                                  | ❌ No    | `false`                    | Redirect when the browser blocks the popup |
| `claims`             | `string`                                   | ❌ No    | -                          | JSON string for Conditional Access claims  |
| `correlationId`      | `string`                                   | ❌ No    | -                          | Correlation ID for tracing                 |

### Common Scopes

| Scope Pattern                                       | Description                           | Example                                               |
| --------------------------------------------------- | ------------------------------------- | ----------------------------------------------------- |
| `https://<org>.crm.dynamics.com/.default`           | All permissions from app registration | `https://contoso.crm.dynamics.com/.default`           |
| `https://<org>.crm.dynamics.com/user_impersonation` | Act on behalf of signed-in user       | `https://contoso.crm.dynamics.com/user_impersonation` |

> **Recommendation**: Use `.default` scope for most scenarios. It requests all permissions granted to your app registration.

## Advanced Scenarios

### Conditional Access & Claims Challenges

Handle Conditional Access policies that require additional claims or step-up authentication.

```typescript
// Scenario: Dataverse protected by Conditional Access requiring device compliance
const tokenProvider = new MsalBrowserTokenProvider(pca, {
  scopes: ["https://your-org.crm.dynamics.com/.default"],
  claims: JSON.stringify({
    access_token: {
      acrs: {
        essential: true,
        values: ["c1"], // Compliance claim
      },
    },
  }),
});

// Dynamic claims challenges: after a 401, the SDK client gets a new token and resends the
// request once. In a browser, Dataverse doesn't expose `WWW-Authenticate` to scripts (it isn't a
// CORS-exposed header), so the claims of a challenge can't be read there and the SDK asks the
// provider for a fresh token (`forceRefresh`). In Node.js, the claims are passed to `getToken`
// automatically. To handle a challenge yourself, read it from the error:
import { parseClaimsChallenge, DataverseODataError } from "@mohsinonxrm/dataverse-sdk-core";

try {
  await client.api("/accounts").get();
} catch (error) {
  if (error instanceof DataverseODataError && error.status === 401) {
    const claims = parseClaimsChallenge(error.headers?.["www-authenticate"]);
    if (claims) await tokenProvider.getToken(undefined, { claims });
  }
}
```

### Custom Correlation IDs for Tracing

Add correlation IDs for distributed tracing and debugging.

```typescript
// Set correlation ID in provider options
const tokenProvider = new MsalBrowserTokenProvider(pca, {
  scopes: ["https://your-org.crm.dynamics.com/.default"],
  correlationId: crypto.randomUUID(),
});

// Or per-request correlation ID
const token = await tokenProvider.getToken(undefined, {
  correlationId: "my-request-correlation-id-123",
});
```

### Scope Override Per Request

Use different scopes for specific requests (multi-org scenarios).

```typescript
// Default provider for org1
const tokenProvider = new MsalBrowserTokenProvider(pca, {
  scopes: ["https://org1.crm.dynamics.com/.default"],
});

const client1 = new DataverseClient({
  baseUrl: "https://org1.crm.dynamics.com",
  tokenProvider,
});

// Override scopes for org2 access
const org2Token = await tokenProvider.getToken(["https://org2.crm.dynamics.com/.default"]);

// Use org2Token manually or create separate client
const client2 = new DataverseClient({
  baseUrl: "https://org2.crm.dynamics.com",
  tokenProvider: new MsalBrowserTokenProvider(pca, {
    scopes: ["https://org2.crm.dynamics.com/.default"],
  }),
});
```

## Error Handling

Token failures reject with `MsalBrowserAuthenticationError`, a `DataverseAuthenticationError` that keeps what MSAL said:

| Property        | Example                                  | Meaning                                        |
| --------------- | ---------------------------------------- | ---------------------------------------------- |
| `name`          | `TokenAcquisitionFailed`, `PopupBlocked` | Kind of failure                                |
| `code`          | `consent_required`, `popup_blocked`      | Stable code: `popup_blocked`, else MSAL's code |
| `errorCode`     | `consent_required`, `user_cancelled`     | MSAL `errorCode`                               |
| `subError`      | `consent_required`, `basic_action`       | MSAL `subError`                                |
| `errorNo`       | `65001`                                  | Entra ID error number (`AADSTS65001`)          |
| `correlationId` | `…`                                      | MSAL correlation id, for support               |
| `cause`         | the MSAL error                           | The original error                             |

```typescript
import { DataverseAuthenticationError } from "@mohsinonxrm/dataverse-sdk-core";
import { MsalBrowserAuthenticationError } from "@mohsinonxrm/dataverse-sdk-auth-msal-browser";

try {
  const accounts = await client.api("/accounts").get();
} catch (error) {
  if (error instanceof MsalBrowserAuthenticationError && error.errorNo === "65001") {
    showMessage("An administrator must consent to this app for your organization.");
  } else if (error instanceof DataverseAuthenticationError) {
    console.error("Authentication failed:", error.message);
  } else {
    console.error("API call failed:", error);
  }
}
```

## Browser Compatibility

- ✅ Chrome 90+
- ✅ Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+

> **Note**: Requires browsers with native `fetch` and `Promise` support. For older browsers, use polyfills.

## Storage Options

### Session Storage (Recommended)

```typescript
const msalConfig = {
  cache: {
    cacheLocation: "sessionStorage", // Tokens cleared on tab close
    storeAuthStateInCookie: false,
  },
};
```

### Local Storage (Persistent)

```typescript
const msalConfig = {
  cache: {
    cacheLocation: "localStorage", // Tokens persist across browser sessions
    storeAuthStateInCookie: false,
  },
};
```

### Cookies (IE 11 Support)

```typescript
const msalConfig = {
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true, // For IE 11 and Edge Legacy
  },
};
```

## Security Best Practices

1. ✅ **Use sessionStorage** for cache in most scenarios
2. ✅ **Set restrictive CORS** policies on your web server
3. ✅ **Use HTTPS** in production (required by MSAL)
4. ✅ **Configure redirect URI** to specific pages, not wildcards
5. ✅ **Enable PKCE** (automatic in MSAL Browser)
6. ✅ **Validate tokens** server-side for sensitive operations
7. ❌ **Don't store tokens** in localStorage if avoidable
8. ❌ **Don't expose client secrets** in browser code (use public client)

## Troubleshooting

### Popup blocked by browser

**Problem**: Login popup is blocked

When the browser blocks the popup (MSAL `popup_window_error` or `empty_window_error`), `getToken()` rejects with `MsalBrowserAuthenticationError` (`name: "PopupBlocked"`, `code: "popup_blocked"`, the MSAL error as `cause`). It is also a `DataverseAuthenticationError`.

**Solution**:

- Ensure login is triggered by user action (button click), for example by catching `popup_blocked` and showing a "Sign in" button that calls `getToken()` again
- Or fall back to a redirect automatically
- Or switch to redirect flow

```typescript
import { MsalBrowserAuthenticationError } from "@mohsinonxrm/dataverse-sdk-auth-msal-browser";

const tokenProvider = new MsalBrowserTokenProvider(pca, {
  scopes: ["https://org.crm.dynamics.com/.default"],
  fallbackToRedirect: true, // popup first, redirect if the popup is blocked
});

try {
  await client.api("/accounts").get();
} catch (error) {
  if (error instanceof MsalBrowserAuthenticationError && error.code === "popup_blocked") {
    showSignInButton(); // its click handler calls tokenProvider.getToken()
  }
}
```

### "Interaction required" errors

**Problem**: Silent token acquisition fails

**Solution**: This is normal behavior. The provider automatically falls back to popup/redirect.

### CORS errors

**Problem**: `No 'Access-Control-Allow-Origin' header`

**Solution**: Dataverse automatically allows CORS from your app's redirect URI origin. Ensure:

1. Redirect URI is correctly registered
2. Requests originate from that URI
3. Origin header is sent by browser

### Token expiration

**Problem**: API calls fail after some time

**Solution**: Token refresh is automatic. If seeing errors:

```typescript
// Force new token
const newToken = await tokenProvider.getToken(
  ["https://org.crm.dynamics.com/.default"],
  { forceRefresh: true } // Note: Not supported by default, handle manually
);
```

## Related Packages

- **@mohsinonxrm/dataverse-sdk-core** - Core SDK (required)
- **@mohsinonxrm/dataverse-sdk-auth-msal-node** - MSAL for Node.js apps
- **@mohsinonxrm/dataverse-sdk-auth-azure-identity** - Azure Identity for managed identity scenarios
- **@azure/msal-browser** - MSAL Browser library (peer dependency)
- **@azure/msal-react** - React integration for MSAL

## Examples

See complete examples in:

- **samples/spa-fluentui-v9** - Full React SPA with Fluent UI
- **samples/node-cli-devicecode** - CLI authentication (uses msal-node)

## License

GNU AGPL v3.0

## Support

- 📖 [Documentation](https://github.com/mohsinonxrm/dataverse-sdk-typescript)
- 🐛 [Report Issues](https://github.com/mohsinonxrm/dataverse-sdk-typescript/issues)
- 💬 [Discussions](https://github.com/mohsinonxrm/dataverse-sdk-typescript/discussions)
