## ADR 0007 — Versioning & Release Strategy

**File:** `docs/adr/0007-versioning-release.md`  
**Status:** Accepted  
**Date:** 2026-01-25  
**Decision Owners:** SDK maintainers

### Context

The SDK is organized as a monorepo with 15+ packages (core, auth, operations, metadata, files, tooling, optional telemetry). We need clear versioning and release strategy that:

1. Balances comprehensive v1.0 scope with timely delivery
2. Provides escape hatches for unsupported capabilities
3. Communicates post-v1 roadmap clearly
4. Follows semantic versioning with automated changelog

We use Changesets for SemVer management and automated changelog generation.

### Decision

> **Release status (November 2026):** v1.0.0 was released on 2026-02-11. The v1.1 and v1.2+ targets below are the original plan and are out of date: the work now scheduled is in the [v1.1.0](https://github.com/mohsinonxrm/dataverse-sdk-typescript/milestone/1) (browser and SPA readiness, core pipeline correctness, [#5](https://github.com/mohsinonxrm/dataverse-sdk-typescript/issues/5)) and [v1.2.0](https://github.com/mohsinonxrm/dataverse-sdk-typescript/milestone/2) (package correctness, [#6](https://github.com/mohsinonxrm/dataverse-sdk-typescript/issues/6)) milestones, and features promised here that don't exist yet are collected in the roadmap issue [#100](https://github.com/mohsinonxrm/dataverse-sdk-typescript/issues/100). The ✅ marks record the v1.0 plan, not verified behaviour.

#### **v1.0 Scope (released as 1.0.0 on 2026-02-11)**

**Core Capabilities:**

- ✅ Pipeline middleware (retry, concurrency, auth, telemetry, logging)
- ✅ Fluent HTTP/OData API with query builder
- ✅ OrganizationService facade (C#-familiar)
- ✅ MSAL authentication (browser + node)
- ✅ $batch operations with change sets
- ✅ Typed actions/functions (minimal set, expandable)
- ✅ Messages (1,356+ request/response classes, direct exports)
- ✅ Strict metadata typing (Read/Create/Update split)
- ✅ Metadata operations (entity, attribute, relationship, optionset, RetrieveMetadataChanges)
- ✅ File/image column operations (actions-based, chunked upload/download)
- ✅ Bulk operations (CreateMultiple/UpdateMultiple/UpsertMultiple/DeleteMultiple)
- ✅ Duplicate detection (header-based suppression)
- ✅ Conditional operations (If-Match, If-None-Match)
- ✅ Multi-table lookup support (polymorphic)
- ✅ Global Discovery Service (Commercial cloud)
- ✅ Generator (early-bound entity types)
- ✅ Optional telemetry (App Insights + OpenTelemetry adapters)

**Packages (v1.0):**

- `@mohsinonxrm/dataverse-sdk-core`
- `@mohsinonxrm/dataverse-sdk-auth-msal-browser`
- `@mohsinonxrm/dataverse-sdk-auth-msal-node`
- `@mohsinonxrm/dataverse-sdk-batch`
- `@mohsinonxrm/dataverse-sdk-xrm`
- `@mohsinonxrm/dataverse-sdk-messages`
- `@mohsinonxrm/dataverse-sdk-actions`
- `@mohsinonxrm/dataverse-sdk-functions`
- `@mohsinonxrm/dataverse-sdk-metadata`
- `@mohsinonxrm/dataverse-sdk-files` ← NEW
- `@mohsinonxrm/dataverse-sdk-discovery`
- `@mohsinonxrm/dataverse-sdk-generator`
- `@mohsinonxrm/dataverse-sdk-entities-runtime`
- `@mohsinonxrm/dataverse-sdk-appinsights` (optional)
- `@mohsinonxrm/dataverse-sdk-otel` (optional)

**Escape Hatches (v1.0):**

```typescript
// Generic OrganizationRequest for unsupported messages (runs as a Web API action)
await org.execute(new OrganizationRequest("CustomAction", { param1: value }));

// Raw .api() for maximum flexibility. Relative paths resolve against the Web API root
// (https://<org>/api/data/v9.2), so don't repeat /api/data/v9.2. Absolute URLs on the
// client's own origin work too.
await client.api("customendpoint").header("Custom-Header", "value").post({ data });

// Custom middleware for specialized behaviors, passed when the client is created
new DataverseClient({ baseUrl, tokenProvider, middleware: { append: [customMiddleware] } });
```

#### **v1.1 Fast-Follow (original plan, not scheduled)**

The v1.1.0 milestone has a different scope (see the release status above); the items below are tracked in [#100](https://github.com/mohsinonxrm/dataverse-sdk-typescript/issues/100) and, for stream-based file operations, [#95](https://github.com/mohsinonxrm/dataverse-sdk-typescript/issues/95).

**New Capabilities:**

- Typed duplicate detection package
- Stream-based file operations (alternative to actions-based)
- Expanded actions/functions coverage (Sales/Service specific)
- Additional messages coverage

**New Package:**

- `@mohsinonxrm/dataverse-sdk-duplicate-detection`
  - `RetrieveDuplicatesRequest/Response`
  - Duplicate rule management
  - Detection API integration

#### **v1.2+ Roadmap (original plan, not scheduled)**

The v1.2.0 milestone now covers package correctness; the items below are tracked in [#100](https://github.com/mohsinonxrm/dataverse-sdk-typescript/issues/100) and, for FetchXML, [#51](https://github.com/mohsinonxrm/dataverse-sdk-typescript/issues/51).

**Planned Capabilities:**

- Comprehensive audit operations
- Async operation polling and tracking
- Advanced resiliency (circuit breaker, bulkhead isolation)
- Bulk delete operations
- FetchXML query builder
- Relationship operations advanced patterns

**Potential Packages:**

- `@mohsinonxrm/dataverse-sdk-audit`
- `@mohsinonxrm/dataverse-sdk-async-operations`
- `@mohsinonxrm/dataverse-sdk-resiliency-advanced`
- `@mohsinonxrm/dataverse-sdk-fetchxml`

#### **Versioning Policy**

1. **Independent package versions:**
   - Each package follows SemVer independently
   - Core package is most stable (major changes rare)
   - Feature packages can evolve faster

2. **Breaking changes:**
   - Require major version bump
   - Coordinated across dependent packages
   - Documented in changelog with migration guide
   - Examples:
     - Changing public interface signatures
     - Removing deprecated APIs
     - Changing default behaviors

3. **Non-breaking changes:**
   - Minor version: new features, new typed actions/functions
   - Patch version: bug fixes, performance improvements

4. **Deprecation policy:**
   - Deprecate with `@deprecated` JSDoc
   - Minimum 1 minor version before removal
   - Provide migration path in deprecation notice

5. **Changelog automation:**
   - Changesets generates per-package changelogs
   - Release notes aggregated for multi-package releases
   - Breaking changes prominently highlighted

#### **Release Process**

1. **Development:**

   ```bash
   # Developer adds changeset for their change
   pnpm changeset add
   # Select affected packages, change type, describe change
   ```

2. **Version bump:**

   ```bash
   # CI runs on release branch
   pnpm changeset version
   # Updates package.json versions and changelogs
   ```

3. **Publish:**

   ```bash
   # CI publishes to npm
   pnpm changeset publish
   # Tags release in git
   ```

4. **Cadence:**
   - Patch releases: as needed (bug fixes)
   - Minor releases: monthly (new features)
   - Major releases: annually or as needed (breaking changes)

### Consequences

**Pros:**

- Clear v1.0 scope with comprehensive capabilities
- Escape hatches prevent blocking on unsupported features
- Fast-follow v1.1 addresses immediate feedback
- Transparent roadmap for v1.2+
- Automated versioning reduces human error

**Cons:**

- v1.0 scope is ambitious (10-15 weeks)
- Independent package versions may confuse users
- Need clear compatibility matrix documentation
- Breaking changes require coordination across packages

### Alternatives Considered

**Lockstep versioning:** Rejected because it forces unnecessary major bumps across all packages when one changes.

**Minimal v1.0 scope:** Rejected because file operations, bulk operations, and comprehensive metadata support are essential for a complete SDK.

**No escape hatches:** Rejected because we cannot implement every Dataverse capability in v1.0, and users need workarounds.
