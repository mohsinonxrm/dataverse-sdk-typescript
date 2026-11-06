# spa-fluentui-v9

A React 18 single-page app, built with [Fluent UI React v9](https://react.fluentui.dev/) and
following Fluent 2, that runs the `@mohsinonxrm/dataverse-sdk-*` packages in the browser. Every
scenario page runs real SDK calls and shows, for each scenario:

1. what it demonstrates, its inputs and a **Run** button;
2. **Code**: the exact code the Run button calls. It is read from the scenario module's own source
   (`src/scenarios/*.ts`, between `// #region` and `// #endregion`), so it can't drift from what
   runs;
3. **Result**: the value returned, or a card for the error thrown, laid out for its class;
4. **Requests**: every request the scenario sent, with method, URL, status, timing, headers and
   bodies, recorded by a middleware appended to the SDK pipeline (`middleware: { append: [...] }`).

It is a private sample (not published to npm), built against the packages in this workspace, and
compiles with `strict` TypeScript and no `any`.

## Run it

You need Node.js 22 or later and pnpm 9. From the repository root:

```bash
pnpm install
pnpm build                                  # the SDK packages the sample imports
pnpm --filter spa-fluentui-v9-sample dev    # http://localhost:3000
```

### Demo mode (no org needed)

Choose **Explore with demo data** on the sign-in page. The SDK clients are real; only their `fetch`
is replaced by an in-browser fake of a small Dataverse environment (`src/demo/`), so every request
still goes through the SDK pipeline and the inspector. Data lives in memory and resets on reload.

### Your own environment

1. **Register an app** in Microsoft Entra ID: platform "Single-page application", redirect URI
   `http://localhost:3000`, and the delegated permission `Dynamics CRM / user_impersonation`.
2. **Configure** the sample: `cp .env.example .env` in this folder, then set:

   | Variable                  | Meaning                                                         |
   | ------------------------- | --------------------------------------------------------------- |
   | `VITE_AZURE_CLIENT_ID`    | Application (client) id of the app registration                 |
   | `VITE_AZURE_TENANT_ID`    | Directory (tenant) id; defaults to `organizations`              |
   | `VITE_AZURE_REDIRECT_URI` | Redirect URI; defaults to the page's origin                     |
   | `VITE_DATAVERSE_URL`      | Environment URL, for example `https://yourorg.crm.dynamics.com` |

3. **Sign in with Microsoft** on the sign-in page. Write scenarios create, change and delete
   records in that environment.

MSAL is loaded only when you sign in with Microsoft, so demo mode never downloads it.

## Pages

| Group       | Route                 | Page           | What it shows                                                                                                                                                                              |
| ----------- | --------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Overview    | `/`                   | Overview       | `WhoAmI` through `client.api()` and the typed `WhoAmIFunction`, and how the client is configured                                                                                           |
| Diagnostics | `/diagnostics/errors` | Error handling | `DataverseODataError` (400, 404), `DataverseThrottleError`, `DataverseNetworkError`, `DataverseAbortError`, `DataverseInvalidRequestError`, `DataverseBatchError`, and the `ErrorBoundary` |

## Design

- **Shell:** `FluentProvider` with `webLightTheme` or `webDarkTheme`; the header's toggle switches
  them and remembers the choice in `localStorage`. The header shows the environment, a Demo badge in
  demo mode, and the signed-in user with **Sign out**.
- **Navigation:** `NavDrawer`, grouped by scenario area. It is inline on wide screens and an overlay
  below 64em, opened from the header.
- **Styling:** `makeStyles` and Fluent `tokens` only.
- **Components:** `Card` per scenario, `Field` and inputs, `MessageBar` for results and errors,
  `Toast` for copy and destructive actions, `Skeleton` and `Spinner` while loading, `Dialog` before
  destructive runs, `Badge` for methods and HTTP status.
- **Accessibility:** a skip link, one `h1` per page and `h2` per scenario, labelled fields, focus
  moved to the page after navigation, and an `aria-live` summary of each run.
- **Code splitting:** the sign-in page, the shell, MSAL, demo mode and every page are separate
  chunks, loaded with `React.lazy` when first needed.

## Layout

```
src/
├── auth/         # AuthProvider; MSAL sign-in (msalSession.ts, loaded on demand)
├── components/   # Scenario (the page pattern), CodeBlock, RequestInspector, ErrorCard, ErrorBoundary
├── demo/         # Demo mode: an in-browser fake of the Web API and the Global Discovery Service
├── lib/          # Snippet extraction, error classification, safe storage
├── pages/        # One lazily loaded page per route
├── scenarios/    # The code each scenario runs; its #regions are what the Code panels show
├── sdk/          # Client setup, the inspector middleware, the activity log
├── shell/        # Header, navigation, sign-in page
├── theme/        # Light and dark theme
└── routes.ts     # Every page, its group and its lazy import
```

## Scripts

| Script           | What it does                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------- |
| `pnpm dev`       | Vite dev server on port 3000                                                                |
| `pnpm build`     | Type-check, then `vite build`                                                               |
| `pnpm typecheck` | Type-check the app and the tests                                                            |
| `pnpm lint`      | ESLint with type-aware rules                                                                |
| `pnpm test`      | Unit tests: the scenarios against the SDK's recording fake fetch and against demo mode      |
| `pnpm test:e2e`  | Browser smoke tests: builds the app and drives it in Chromium with Playwright, in demo mode |

`pnpm test:e2e` uses the Chromium installed with Playwright (`pnpm exec playwright install chromium`);
set `PLAYWRIGHT_CHROMIUM_PATH` to use another one.

## Troubleshooting

- **Sign-in fails or loops:** the redirect URI in the app registration must match
  `VITE_AZURE_REDIRECT_URI` (or the page's origin) exactly.
- **Calls fail with 401 or 403:** `VITE_DATAVERSE_URL` must be the environment you consented
  `user_impersonation` for, and your user needs a security role in it.
- **Build errors about missing SDK exports:** run `pnpm build` at the repository root first.

## License

Part of `@mohsinonxrm/dataverse-sdk-typescript`, licensed under GNU AGPL v3.0. See
[LICENSE](../../LICENSE).
