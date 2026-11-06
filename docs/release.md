# Release Process

## Overview

This project uses [Changesets](https://github.com/changesets/changesets) for versioning and publishing.

## Release gates

The Release workflow (`.github/workflows/changeset-version.yml`) runs on every push to `main`. Before it opens the "Version Packages" PR or publishes, it runs:

1. `pnpm build` and `pnpm test` (core's `test` includes its coverage gate).
2. `pnpm check:packages`: `publint` and `@arethetypeswrong/cli` (ESM-only profile) on every published package, so a broken `exports` / `types` setup never reaches npm. Run it locally after `pnpm build`.
3. `pnpm test:browser`: the Vite-built SPA smoke tests in Chromium under a strict CSP.
4. `pnpm test:integration`: the live suite against the dev org. `DATAVERSE_INTEGRATION_REQUIRED=1`, so missing secrets fail the run instead of skipping.

If any gate fails, nothing is versioned or published.

## Prerelease channel (`next`)

To let consumer apps try unreleased fixes from `dev`:

1. In GitHub, open Actions → **Release (next)** → Run workflow, and pick the `dev` branch. Other branches are refused.
2. The workflow builds, tests, checks the packages and runs `changeset version --snapshot next`. Every package with a pending changeset gets a version like `2.0.0-next-20261105123456`.
3. It publishes those packages with the `next` dist-tag. Nothing is committed back to `dev`.
4. Consumers install them with `npm i @mohsinonxrm/dataverse-sdk-core@next`. `latest` is unchanged.

## npm authentication

Both workflows publish with provenance (`id-token: write`) and authenticate with the `NPM_TOKEN` secret.

**Moving to npm trusted publishing (OIDC)** removes the long-lived token. It's a maintainer step on npmjs.com, done once per package:

1. For each of the 16 `@mohsinonxrm/dataverse-sdk-*` packages, open its Settings on npmjs.com → Trusted Publisher → GitHub Actions. Enter the repository `mohsinonxrm/dataverse-sdk-typescript`, the workflow file `changeset-version.yml`, and add a second entry for `release-next.yml`.
2. Trusted publishing needs npm CLI 11.5.1 or later in the publish step. Check which client `changeset publish` uses under pnpm before relying on it; if needed, add a step that installs a current npm.
3. After one successful publish through OIDC, remove the `NPM_TOKEN` secret and the `NODE_AUTH_TOKEN` / `NPM_TOKEN` lines from both workflows.

## Versioning

- **SemVer** via changesets
- Each package versioned independently, but we may use coordinated releases for major milestones
- Version bumps: `patch` (bug fix) | `minor` (feature) | `major` (breaking)

## Development Workflow

### 1. Feature Development

```bash
# Create feature branch from dev
git checkout dev
git pull origin dev
git checkout -b feature/your-feature

# Make changes, commit
git add .
git commit -m "feat: your feature"
```

### 2. Add Changeset (Required for PRs to Main)

```bash
# Generate changeset
pnpm changeset

# Select packages affected
# Choose version bump type
# Write user-facing description

# Commit changeset
git add .changeset
git commit -m "chore: add changeset"
git push
```

### 3. Create PR to Dev

- PR: `feature/your-feature` → `dev`
- ✅ CI checks must pass (lint, test, build)
- ❌ Changeset NOT required for dev PRs
- Merge when approved

### 4. Release to Main (Maintainers Only)

Create PR from `dev` → `main`:

```bash
git checkout dev
git pull origin dev
git checkout -b release/vX.Y.Z
git push -u origin release/vX.Y.Z
```

**CI Requirements for PRs to main:**

- ✅ Build, Lint, Test must pass
- ✅ **Changeset required** (enforced by CI)

### 5. Automated Release Process

When PR is merged to `main`, the [Release workflow](../.github/workflows/changeset-version.yml) triggers:

1. **Changesets reads all `.changeset/*.md` files**
2. **Creates "Version Packages" PR** with:
   - Bumped versions in `package.json`
   - Updated `CHANGELOG.md` entries
   - Deleted consumed changeset files

3. **When "Version Packages" PR is merged:**
   - Packages published to npm
   - Git tags created
   - GitHub Releases created (if configured)

## Branch Strategy

```
main (protected) ← releases happen here
  ↑
  └─ dev (integration) ← PRs merge here first
       ↑
       ├─ feature/feature-1
       ├─ feature/feature-2
       └─ fix/bug-fix
```

## Manual Release Steps (For Reference)

If automated release fails, manual steps:

```bash
# 1. Version bump
pnpm changeset version

# 2. Build and test
pnpm -r build && pnpm -r test

# 3. Publish
pnpm changeset publish

# 4. Push tags
git push --follow-tags
```

## Changelog

- Maintained automatically by changesets per package
- Located at `packages/*/CHANGELOG.md`
- Generated from changeset descriptions

## Release Gates

See [Release gates](#release-gates) at the top: build, tests (with core's coverage gate), package checks, browser tests and the live integration suite must all pass before anything is versioned or published.

## Emergency Hotfix

For critical production fixes:

```bash
git checkout main
git checkout -b hotfix/critical-fix
# Make fix
pnpm changeset  # Select 'patch'
git commit -am "fix: critical issue"
git push -u origin hotfix/critical-fix

# PR: hotfix/critical-fix → main (bypasses dev)
# After publish, merge main back to dev:
git checkout dev
git merge main
git push origin dev
```

## Troubleshooting

### "No changeset detected" error

```bash
pnpm changeset
git add .changeset
git commit -m "chore: add changeset"
```

### Version Packages PR conflicts

```bash
git checkout changeset-release/main
git merge main
# Resolve conflicts
git commit
git push
```

### Failed npm publish

- Check `NPM_TOKEN` secret is valid
- Verify package names are available on npm
- Check npm 2FA settings

## References

- [Changesets Documentation](https://github.com/changesets/changesets/blob/main/docs/intro-to-using-changesets.md)
- [CI Workflow](../.github/workflows/ci.yml)
- [Release Workflow](../.github/workflows/changeset-version.yml)
- [Changesets Guide](./changesets-guide.md)
- [Migrating to 2.0](./migration-2.0.md)
