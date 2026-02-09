# Contributing to Dataverse SDK TypeScript

Thank you for your interest in contributing to the Dataverse SDK TypeScript project!

## Requirements

- **Node 18+**
- **pnpm** (package manager)
- **ESM-only** packages

## Development Setup

```bash
# Clone the repository
git clone https://github.com/mohsinonxrm/dataverse-sdk-typescript.git
cd dataverse-sdk-typescript

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Run linter
pnpm lint
```

## Coding Standards

### TypeScript

- **TypeScript strict mode** is required
- **No `any`** in public APIs (internal use with `@internal` tag allowed)
- Prefer discriminated unions over string flags

### Public APIs

All public APIs must have:

- **JSDoc documentation** with usage examples
- **Unit tests** with >90% coverage
- **Type tests** (if impacting metadata types)

### Breaking Changes

- No breaking changes in core types without:
  - ADR documenting decision
  - Major version bump
- Prefer additive changes when possible

## Pull Request Checklist

Before submitting a PR, ensure:

- [ ] Tests added/updated for all changes
- [ ] Documentation updated:
  - [ ] Package README if API changed
  - [ ] `docs/mapping/` if actions/functions/messages added
  - [ ] `docs/api/` if new features added
- [ ] Changeset added (if user-facing change): `pnpm changeset`
- [ ] All checks pass:
  ```bash
  pnpm lint
  pnpm typecheck
  pnpm test
  pnpm build
  ```
- [ ] Commit messages follow convention:
  - `feat: add bulk operations support`
  - `fix: handle retry-after header correctly`
  - `docs: update batch operations guide`
  - `chore: update dependencies`

## Project Structure

```
packages/
  dataverse-sdk-core/          # Core HTTP pipeline & client
  dataverse-sdk-auth-*         # Auth providers (MSAL browser/node)
  dataverse-sdk-batch/         # $batch operations
  dataverse-sdk-messages/      # SDK message request/response
  dataverse-sdk-xrm/           # OrganizationService facade
  dataverse-sdk-actions/       # Typed Web API actions
  dataverse-sdk-functions/     # Typed Web API functions
  dataverse-sdk-metadata/      # Metadata types & client
  dataverse-sdk-files/         # File/image column operations
  dataverse-sdk-discovery/     # Global discovery service
  dataverse-sdk-generator/     # Early-bound entity generator
  dataverse-sdk-entities-runtime/ # Runtime for generated entities
  dataverse-sdk-appinsights/   # Application Insights telemetry
  dataverse-sdk-otel/          # OpenTelemetry adapter
```

## Testing Strategy

### Unit Tests (vitest)

- Test individual functions/classes
- Mock external dependencies
- Target: >90% coverage

### Contract Tests (MSW)

- Test HTTP request/response contracts
- Verify retry/throttle behavior
- Validate request formats

### Type Tests (tsd)

- Verify TypeScript type correctness
- Ensure invalid payloads don't compile
- Test metadata Read vs Create vs Update types

### Integration Tests (Gated)

- Run against real Dataverse environment
- Require environment secrets (CI only)

## Release Process

We use [Changesets](https://github.com/changesets/changesets) for versioning and releases.

### Adding a Changeset

When making a user-facing change:

```bash
pnpm changeset
```

Select:

- Package(s) affected
- Version bump type (patch/minor/major)
- Describe the change

### Release (Maintainers Only)

```bash
# Version packages based on changesets
pnpm version

# Publish to npm
pnpm release
```

## Architectural Decision Records (ADRs)

Major architectural decisions are documented in `docs/adr/`. Before proposing significant changes:

1. Review existing ADRs in `docs/adr/`
2. Create a new ADR if needed (follow template)
3. Discuss in issue/PR before implementing

## Licensing

All contributions must be compatible with **GNU AGPL v3.0**.

By submitting a pull request, you agree that your contributions will be licensed under the AGPL v3.0 license.

## Code of Conduct

- Be respectful and professional
- Focus on constructive feedback
- Help make the community welcoming for all

## Questions?

- Open an issue for bugs or feature requests
- Check existing issues/discussions first
- Tag issues appropriately (`bug`, `feature`, `question`, `docs`)

---

Thank you for contributing! 🎉
