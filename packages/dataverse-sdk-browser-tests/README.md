# @mohsinonxrm/dataverse-sdk-browser-tests (internal)

Browser smoke tests for the SDK (#38). This package is private, **not published**, and not part of `pnpm test`.

`app/` imports every browser-facing package (core, auth-msal-browser, discovery, batch, files and metadata) just as a consumer SPA would. Vite builds it in production mode with no Node polyfills, and the page is served with a strict policy:

```
Content-Security-Policy: default-src 'self'; script-src 'self'; connect-src 'self' https://contoso.crm.dynamics.com
```

`test/smoke.browser.test.ts` drives the page in Chromium through Playwright, and checks that:

- every package loads with no page errors, console errors or CSP violations;
- the production bundle has no `eval(` or `new Function(` (#20);
- a GET runs through the real `DataverseClient` pipeline in the browser;
- the default logger is silent in the browser (#33);
- `bindMany()` runs in the bundle under `script-src 'self'` (#20);
- `FileColumnClient.upload()` works with a `Blob` (#58).

The scenarios use an in-page fake `fetch`, so nothing reaches a real org.

## Running

```bash
pnpm build
pnpm --filter @mohsinonxrm/dataverse-sdk-browser-tests exec playwright install chromium   # first time only
pnpm test:browser
```

`PLAYWRIGHT_CHROMIUM_PATH` points the tests at an existing Chromium binary.

CI runs this as the `browser-tests (Chromium)` job, which is part of the required `build-test-lint` check.
