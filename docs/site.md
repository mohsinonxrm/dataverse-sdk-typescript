# The explorer site

The SDK's public site is the Fluent UI sample app, [`samples/spa-fluentui-v9`](../samples/spa-fluentui-v9),
hosted on **Azure Static Web Apps** (Free plan). Anyone can open it and:

- run requests in **demo mode**, without signing in: the real SDK against an in-browser fake of a
  small Dataverse environment;
- or **sign in to their own environment** (MSAL in the browser, auth code with PKCE) with their own
  app registration, or the site's default one, then pick the environment from the list the
  Global Discovery Service returns for them (see [The visitor's flow](#the-visitors-flow));
- in the **Explorer** page, build a raw Web API request or pick one of the typed actions,
  functions and messages, see the SDK code for it, preview the request the SDK will send, run it
  and inspect the response; or try the sample queries;
- follow the **Documentation** page to the guides and the API reference in this repository.

There is no backend and there are no secrets: requests go straight from the visitor's browser to
their environment. What a visitor types (environment URL, client id, tenant, history) stays in
their browser's storage.

## How it is built and deployed

| Piece                                                 | Where                                                                                                                                          |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| The site                                              | `samples/spa-fluentui-v9` (`pnpm --filter spa-fluentui-v9-sample dev` runs it locally)                                                         |
| Response headers, SPA fallback                        | [`samples/spa-fluentui-v9/public/staticwebapp.config.json`](../samples/spa-fluentui-v9/public/staticwebapp.config.json), copied into the build |
| Build and deploy                                      | [`.github/workflows/site.yml`](../.github/workflows/site.yml): on every push to `main` (the stable release), and by hand                       |
| Tests (demo mode, under the site's headers, with axe) | `pnpm --filter spa-fluentui-v9-sample test:e2e`, in CI's `browser-tests` job                                                                   |

The workflow builds the SDK packages and the site, then uploads `samples/spa-fluentui-v9/dist`
with [`Azure/static-web-apps-deploy`](https://github.com/Azure/static-web-apps-deploy) (no Oryx
build). Until the deployment token secret exists, it builds the site and skips the deploy with a
notice, so the workflow stays green before the Azure side is set up. A run by hand on a branch
other than `main` deploys a preview environment instead of production.

The Content-Security-Policy allows scripts from the site only (no inline script, no `eval`; the
SDK's browser tests check the bundles under the same rule), requests to `*.dynamics.com` and
`login.microsoftonline.com` only, and no framing. Styles allow `'unsafe-inline'` because Fluent
UI inserts its styles at run time and a static host can't give each response a nonce. Because of
`connect-src`, the site works with public-cloud environments; `*.dynamics.com` also covers the
Commercial Global Discovery Service (`globaldisco.crm.dynamics.com`) the environment picker
calls. A sovereign cloud needs its hosts added there and in `validateEnvironmentUrl()`
(`src/config.ts`), and its own discovery endpoint (`DISCOVERY_CLOUDS` in the discovery package)
in `src/auth/environments.ts`.

## Maintainer setup (one time)

1. **Create the Static Web App.** In the Azure portal: _Create a resource_ → _Static Web App_.
   Plan **Free**; under _Deployment details_ choose **Other** (the repository's own workflow
   deploys with a token; choosing GitHub would make Azure commit a workflow of its own). Note the
   URL it gets, `https://<name>.azurestaticapps.net`. Or with the Azure CLI:

   ```bash
   az staticwebapp create --name dataverse-sdk-explorer --resource-group <group> --location westeurope --sku Free
   ```

2. **Store the deployment token as a secret.** Static Web App → _Overview_ → _Manage deployment
   token_ (or `az staticwebapp secrets list --name dataverse-sdk-explorer --query properties.apiKey -o tsv`),
   then in GitHub: _Settings_ → _Secrets and variables_ → _Actions_ → _New repository secret_
   named `AZURE_STATIC_WEB_APPS_API_TOKEN`, or:

   ```bash
   gh secret set AZURE_STATIC_WEB_APPS_API_TOKEN --repo mohsinonxrm/dataverse-sdk-typescript
   ```

3. **Deploy.** _Actions_ → _Site_ → _Run workflow_ on `main` (later, every push to `main`
   deploys). Check the headers: `curl -sI https://<name>.azurestaticapps.net/explorer` shows the
   `Content-Security-Policy` and returns 200 (the SPA fallback).

4. **Optional: a default app registration**, so visitors don't need their own. In Microsoft Entra
   ID: _App registrations_ → _New registration_:
   - Supported account types: **Accounts in any organizational directory** (multi-tenant).
   - Platform **Single-page application**, redirect URIs: the production URL
     (`https://<name>.azurestaticapps.net`), the custom domain if you add one, and
     `http://localhost:3000` for local runs. A preview environment has its own URL
     (`https://<name>-<environment>.<region>.azurestaticapps.net`); add it too if you sign in
     there (redirect URIs can't use wildcards).
   - _API permissions_ → _Add a permission_ → _Dynamics CRM_ → delegated **user_impersonation**.
   - No client secret: the site is a public client.

   Then set the repository **variables** (not secrets; a client id isn't secret)
   `EXPLORER_CLIENT_ID` = the application (client) id, and optionally `EXPLORER_TENANT_ID`
   (default `organizations`). The next deploy fills them in on the sign-in form. The one
   delegated permission covers both the environments and the Global Discovery Service: they are
   the same Dynamics CRM resource.

   **Publisher verification** (_Branding & properties_ → _Publisher verification_, with a
   Microsoft Cloud Partner Program id) puts a verified badge on the consent prompt, and some
   tenants only let users consent to apps from verified publishers (for permissions their admin
   classified as low impact). It helps, but it doesn't replace admin consent where user consent is
   off.

5. **Admin consent.** Some tenants let only an admin consent to `user_impersonation` (user
   consent turned off or limited to verified publishers). The sign-in page and the environment
   picker link the admin consent URL for the client id entered
   (`https://login.microsoftonline.com/<tenant>/adminconsent?client_id=<id>`); an admin of the
   visitor's tenant opens it once, for everyone in that tenant.

## The visitor's flow

1. **Sign in.** The form has the default app registration's client id filled in (or the visitor
   types their own) and the tenant (`organizations` for any work or school account). The
   environment URL is optional.
2. **With an environment URL**, sign-in asks for that environment's `user_impersonation` scope
   and the app opens in it.
3. **Without one**, sign-in asks for `https://globaldisco.crm.dynamics.com/user_impersonation`,
   and the **environment picker** lists the environments the Global Discovery Service returns for
   the visitor (`DiscoveryClient`): friendly name, URL, region, version and state, with a filter
   box when there are many. Disabled environments can't be picked. The visitor can type a URL
   there instead. Choosing one continues exactly as if its URL had been typed on the sign-in form
   (the environment's token is acquired silently, or with a popup if needed).
4. **Switch environment** in the header's account menu brings the picker back without signing
   out. The last environment each account chose is remembered in the browser's `localStorage` and
   listed first next time; a reload keeps the tab's environment.

An empty list or an error usually means the account has no Dataverse license or security role in
any environment, or the tenant needs admin consent for the app; the picker says so and links the
admin consent URL. Demo mode has the same picker, against a fake discovery service.

## Visitors with their own app registration

The sign-in page asks for the application (client) id, the tenant and, optionally, the
environment URL. Their app registration needs the SPA platform with the site's URL as a redirect
URI (the page shows the exact value) and the delegated Dynamics CRM `user_impersonation`
permission.
