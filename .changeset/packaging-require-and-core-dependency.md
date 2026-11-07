---
"@mohsinonxrm/dataverse-sdk-appinsights": patch
"@mohsinonxrm/dataverse-sdk-auth-azure-identity": patch
---

Packaging fixes (#364):

- appinsights: CommonJS apps can `require()` the package. It used top-level `await` to load its optional peers, which fails with `ERR_REQUIRE_ASYNC_MODULE`. `@azure/monitor-opentelemetry` and `@opentelemetry/resources` are now loaded on first use, only on the `connectionString` path, so an app that doesn't pass a connection string never loads the Azure Monitor distro.
- auth-azure-identity: `@mohsinonxrm/dataverse-sdk-core` is a regular dependency, as in the other auth packages, instead of an exact-version peer dependency. As a peer it would have made every later minor release of the SDK a major one.
