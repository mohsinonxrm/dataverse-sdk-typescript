---
"@mohsinonxrm/dataverse-sdk-auth-msal-node": major
---

The device code, authorization code and username/password flows sign in once, then go silent (#85). `@azure/msal-node` is now a **peer dependency**.

The core client asks for a token on every request, and before this change these flows went to Entra ID every time: device code showed a new prompt on **every API call**, the single-use authorization code was redeemed again on the second request (which failed), and username/password sent the password on every request.

- **Device code / username/password:** the first `getToken()` signs in; later calls use `acquireTokenSilent` with the signed-in account (MSAL's cache, then its refresh token). They sign in again only when MSAL says the account needs it (`InteractionRequiredAuthError`). Concurrent first requests share one sign-in, so the user sees one prompt.
- **Authorization code:** the code is redeemed once. Later calls go silent; when a new sign-in is needed, `getToken()` throws `DataverseAuthenticationError` instead of redeeming the spent code again.
- `TokenOptions.forceRefresh` (after a 401) reaches `acquireTokenSilent` in these flows too, so the retry uses the refresh token.
- MSAL failures keep the MSAL error as `cause` on the `DataverseAuthenticationError` (`TokenAcquisitionFailed`).

**Install change:** `@azure/msal-node` moved from `dependencies` to `peerDependencies` (`^2.16.3 || ^3.0.0 || ^5.0.0 || ^6.0.0 || ^7.0.0`). The package imports only MSAL's types and checks the client application by its methods instead of `instanceof`, so an application from the app's own MSAL copy, of any of those majors, is accepted, and no second MSAL copy is installed. If your app didn't list `@azure/msal-node` itself, add it:

```bash
npm install @azure/msal-node
```

The constructor, `new MsalNodeTokenProvider(clientApplication, { flow, scopes, … })`, is unchanged.
