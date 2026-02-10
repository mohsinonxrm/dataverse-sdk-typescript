# Release Process

## Overview

This project uses [Changesets](https://github.com/changesets/changesets) for versioning and publishing.

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

When PR is merged to `main`, the [Release workflow](.github/workflows/changeset-version.yml) triggers:

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

- ✅ Unit + contract + type tests must pass
- ✅ Build succeeds for all packages
- ✅ Lint passes with 0 errors
- ⚠️ Integration tests recommended (manual trigger via workflow_dispatch)

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
- [CI Workflow](.github/workflows/ci.yml)
- [Release Workflow](.github/workflows/changeset-version.yml)
- [Changesets Guide](./changesets-guide.md)
