---
"@mohsinonxrm/dataverse-sdk-otel": major
"@mohsinonxrm/dataverse-sdk-appinsights": major
---

**Install change:** the OpenTelemetry and Azure Monitor packages are now **peer dependencies** of the telemetry adapters (#159). The app installs them, and the adapters use the app's copies.

Before, they were regular dependencies. The adapter could then get its own `@opentelemetry/api` next to the app's. With two copies the adapter's spans could go to a no-op tracer instead of the app's provider. For example, with an app on `@opentelemetry/api` 1.8, the old adapter got its own 1.10 copy and recorded no dependency span. Installing the Application Insights adapter also always installed the whole Azure Monitor distro, about 190 packages.

- **otel:** `@opentelemetry/api` `^1.9.0` is a peer.
- **appinsights:** `@opentelemetry/api` `^1.9.0` and `@opentelemetry/api-logs` `^0.221.0` are peers. `@azure/monitor-opentelemetry` `^1.20.1` and `@opentelemetry/resources` `^2.0.0` are **optional** peers: only the `connectionString` (and `cloudRoleName`) setup needs them. The adapter imports them only if they are installed, so an app that calls `useAzureMonitor()` itself, or uses another OpenTelemetry setup, can leave them out. Passing `connectionString` without the distro throws a `DataverseInvalidRequestError` that names the package to install.
- Both `package.json` files list `types` first in `exports`, with `default` instead of `import`, so TypeScript always resolves the types.

**Migration:** add the packages to your app if it doesn't list them already:

```bash
# otel
npm install @opentelemetry/api
# appinsights
npm install @opentelemetry/api @opentelemetry/api-logs @azure/monitor-opentelemetry
```

An app on a version outside these ranges now gets a peer-dependency error from npm when it installs, instead of a silent second copy.
