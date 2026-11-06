# Contributing to Dataverse SDK TypeScript

Thank you for your interest in contributing to the Dataverse SDK TypeScript project!

## How work gets done: issue first, maintainer-triaged

This project follows a **planned, milestone-driven workflow**. Every change starts as an issue, the maintainer decides whether and when it is worked on, and work follows the milestone plan.

1. **Open an issue first.** Use one of the [issue templates](https://github.com/mohsinonxrm/dataverse-sdk-typescript/issues/new/choose): bug report, feature request or question. Search [existing issues](https://github.com/mohsinonxrm/dataverse-sdk-typescript/issues) before opening a new one. **Don't open a pull request for an issue that hasn't been triaged.**
2. **The maintainer triages it.** New issues are labelled `needs-triage`. The maintainer analyses and reviews each one, then:
   - adds a type label (`bug`, `enhancement`, `documentation`, `ci`, `security`) and package labels (`pkg:*`);
   - sets a priority (`P0` to `P3`, defined below);
   - assigns a milestone (`v1.1.0`, `v1.2.0` or `Backlog`);
   - replaces `needs-triage` with `accepted`, or closes the issue with a reason (duplicate, won't fix, needs more information).
3. **Work follows the milestones.** Issues are worked in milestone order, highest priority first. See the [milestones](https://github.com/mohsinonxrm/dataverse-sdk-typescript/milestones) and the tracking issue pinned to each one.
4. **Want to work on an issue?** Comment on an `accepted` issue and wait for the maintainer to assign it to you before you start. This avoids duplicated effort and work that conflicts with the plan.
5. **Pull requests must link their issue.** Put `Fixes #123` (or `Refs #123` for partial work) in the PR description. A PR without a linked, accepted issue is converted to a draft or closed, however good the change is. Keep each PR to one issue.

### Priorities

| Priority | Meaning                                          |
| -------- | ------------------------------------------------ |
| `P0`     | Blocks browser or SPA use, or a security problem |
| `P1`     | Wrong behaviour, likely to hit real users        |
| `P2`     | Correctness or ergonomics gap with a workaround  |
| `P3`     | Polish                                           |

### Security issues

**Don't report security vulnerabilities in public issues.** See [SECURITY.md](./SECURITY.md).

## Requirements

- **Node 22+** (Node 18 and 20 are end of life). CI tests on Node 22, 24 and 26.
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
- **No `any`** in the public API. Use `unknown` for values the SDK can't know (response bodies, request bodies, extra properties), with a generic defaulting to `unknown` where the caller knows the type (`BatchResponseStep<TBody = unknown>`). Lint enforces it (`@typescript-eslint/no-explicit-any` is an error); a disable comment needs a reason and is only for internal code
- Prefer discriminated unions over string flags

### Public APIs

All public APIs must have:

- **JSDoc documentation** with usage examples
- **Unit tests** that keep the package's coverage gate green (core's `pnpm test` fails below 85% statements/functions/lines and 80% branches; see `packages/dataverse-sdk-core/vitest.config.ts`)
- **Type tests** (if impacting metadata types)

### Breaking Changes

- No breaking changes in core types without:
  - ADR documenting decision
  - Major version bump
- Prefer additive changes when possible

## Pull Request Checklist

Before submitting a PR, ensure:

- [ ] The PR links an `accepted` issue that is assigned to you (`Fixes #123`)
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
  dataverse-sdk-auth-*         # Auth providers (MSAL browser, MSAL node, Azure Identity)
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
- Coverage: core enforces its thresholds on every `pnpm test`; don't lower them, raise them as tests grow

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
pnpm run version

# Publish to npm
pnpm run release
```

## Architectural Decision Records (ADRs)

Major architectural decisions are documented in `docs/adr/`. Before proposing significant changes:

1. Review existing ADRs in `docs/adr/`
2. Create a new ADR if needed: copy the structure of an existing one (Status, Context, Decision, Consequences) and number it next in sequence
3. Discuss in issue/PR before implementing

## Licensing

All contributions must be compatible with **GNU AGPL v3.0**.

By submitting a pull request, you agree that your contributions will be licensed under the AGPL v3.0 license.

## Code of Conduct

- Be respectful and professional
- Focus on constructive feedback
- Help make the community welcoming for all

## Questions?

- Search the existing issues first.
- Then open an issue with the **Question** template. The maintainer labels it during triage, so you don't need to.

---

Thank you for contributing! 🎉
