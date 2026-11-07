# Release Process

## Overview

This project uses [Changesets](https://github.com/changesets/changesets) for versioning and publishing.

## Release gates

One workflow publishes to npm: `.github/workflows/release.yml`. Its `release` job runs on every push to `main`; before it opens the "Version Packages" PR or publishes, it runs:

1. `pnpm build` and `pnpm test` (core's `test` includes its coverage gate).
2. `pnpm check:packages`: `publint` and `@arethetypeswrong/cli` (ESM-only profile) on every published package, so a broken `exports` / `types` setup never reaches npm. Run it locally after `pnpm build`.
3. `pnpm test:browser`: the Vite-built SPA smoke tests in Chromium under a strict CSP.
4. `pnpm test:integration`: the live suite against the dev org. `DATAVERSE_INTEGRATION_REQUIRED=1`, so missing secrets fail the run instead of skipping.

If any gate fails, nothing is versioned or published.

## Prerelease channel (`next`)

To let consumer apps try unreleased fixes from `dev`:

1. In GitHub, open Actions → **Release** → Run workflow, and pick the `dev` branch. On `dev` the workflow runs its `publish-next` job; on `main` it runs `release`.
2. The job builds, tests, checks the packages and runs `changeset version --snapshot next`. Every package with a pending changeset gets a version like `2.0.0-next-20261105123456`.
3. It publishes those packages with the `next` dist-tag. Nothing is committed back to `dev`.
4. Consumers install them with `npm i @mohsinonxrm/dataverse-sdk-core@next`. `latest` is unchanged.

## npm authentication

Both jobs of `release.yml` publish with provenance (`id-token: write`) through the GitHub environment **`npm`**. Give that environment a required reviewer (Settings → Environments → npm), so nothing reaches npm without an approval; note that the `release` job then also waits for approval when it only opens the Version Packages PR. Until trusted publishing is set up (below), they authenticate with the `NPM_TOKEN` secret.

### Releasing 2.0.0

All 16 packages are already on npm as **1.0.0** (published 2026-02-11, with provenance), so each has a package page, and trusted publishing can be set up **before** the next publish:

1. On npmjs.com, add the trusted publishers for every package (next section). The 2.0.0 publishes can then go through OIDC with no long-lived token. Until that's done, both workflows fall back to the `NPM_TOKEN` secret.
2. Run **Release** from `dev` (the `publish-next` job). It publishes `2.0.0-next-…` under the `next` dist-tag; `latest` stays 1.0.0.
3. Try the prerelease in an app: `npm i @mohsinonxrm/dataverse-sdk-core@next …`. 2.0.0 is a major release with breaking changes; see `docs/migration-2.0.md`.
4. Merge `dev` into `main`, then merge the "Version Packages" PR. That publishes 2.0.0 as `latest`.

Checked locally before the release:

- `changeset publish` uses `pnpm publish`, so the `workspace:*` dependencies become real versions in the published `package.json`.
- All 16 tarballs contain only `dist/` (plus the generator's `templates/` and notices), `README.md` and `LICENSE`.
- `provenance: true` is set in every package's `publishConfig`.
- A fresh project that installs the tarballs type-checks with `tsc --strict` and runs against a live org.

### Moving to trusted publishing

**Moving to npm trusted publishing (OIDC)** removes the long-lived token. Each package needs one trusted publisher: the repository, the workflow file `release.yml` and the environment `npm`. A maintainer sets it up once, from a machine logged in to npm as the packages' owner:

1. Create the `npm` environment in the repository settings (Settings → Environments), with yourself as a required reviewer.
2. Install npm 11.15.0 or later (`npm install -g npm@latest`), run `npm login`, and make sure two-factor authentication is on for the account.
3. Add the trusted publisher to all 16 packages. The first call asks for two-factor authentication; tick "skip for the next 5 minutes" on the npm page and the rest go through:

   ```bash
   for p in actions appinsights auth-azure-identity auth-msal-browser auth-msal-node batch core discovery entities-runtime files functions generator messages metadata otel xrm; do
     npm trust github "@mohsinonxrm/dataverse-sdk-$p" --repo mohsinonxrm/dataverse-sdk-typescript --file release.yml --env npm --allow-publish --yes
     sleep 2
   done
   ```

   Check one with `npm trust list @mohsinonxrm/dataverse-sdk-core`. npm allows one trusted publisher per package; to change it, `npm trust revoke --id <id> <package>` and add it again.

4. Run **Release** from `dev`. The workflow installs a current npm (trusted publishing needs 11.5.1 or later). On npmjs.com, the new `2.0.0-next-…` version shows whether it was published through the trusted publisher. `changeset publish` runs `pnpm publish`; if that version was published with the token instead, pnpm didn't do the OIDC exchange, and the publish step needs to pack with pnpm and publish the tarballs with `npm publish`.
5. After one publish through the trusted publisher, remove the `NPM_TOKEN` secret and the `NODE_AUTH_TOKEN` / `NPM_TOKEN` lines from `release.yml`.

### Hotfixes (2.0.x while `dev` has 2.1 work)

`main` is what's released and `dev` is what's next. For a patch release while `dev` already holds new features:

1. Branch from `main`, fix, add a `patch` changeset, and open the PR against `main`.
2. Merging it makes the `release` job update the Version Packages PR; merging that publishes the patch.
3. Merge `main` back into `dev`, so the fix and the version bump aren't lost.

## Versioning

- **SemVer** via changesets
- **All published packages share one version.** They are one `fixed` group in `.changeset/config.json` (#313), so every release bumps all of them together, and `@mohsinonxrm/dataverse-sdk-*` packages with the same version always work together. A package with no changes of its own still gets the new version.
- A new published package must be added to that `fixed` group.
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

When PR is merged to `main`, the [Release workflow](../.github/workflows/release.yml) `release` job triggers:

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

- With trusted publishing: check `npm trust list <package>` names `release.yml` and the `npm` environment, and that the run used npm 11.5.1 or later
- Without it: check the `NPM_TOKEN` secret is valid
- Verify package names are available on npm
- Check npm 2FA settings

## References

- [Changesets Documentation](https://github.com/changesets/changesets/blob/main/docs/intro-to-using-changesets.md)
- [CI Workflow](../.github/workflows/ci.yml)
- [Release Workflow](../.github/workflows/release.yml)
- [Changesets Guide](./changesets-guide.md)
- [Migrating to 2.0](./migration-2.0.md)
