# Releasing the Dataverse SDK

The 16 `@mohsinonxrm/dataverse-sdk-*` packages are published by CI
(`.github/workflows/release.yml`) when a `v*` tag is pushed. Nobody runs `npm publish` or
`changeset publish` locally. FetchXML Studio, Dataverse Request Studio and Command Bar Studio use
the same process; this repository adds [changesets](https://github.com/changesets/changesets) for
versions and CHANGELOGs, because it publishes 16 packages that always share one version (#313,
#365).

## Branches

Three lanes can be live at once: the stable release, the next release in beta, and the release
after that in development. Each has its own branch.

| Branch        | Holds                                                                                              | Tags                           | npm           |
| ------------- | -------------------------------------------------------------------------------------------------- | ------------------------------ | ------------- |
| `main`        | The current **stable** release, plus hotfixes                                                      | `vX.Y.Z`                       | `latest`      |
| `release/X.Y` | The next release while it **stabilises**; exists from the feature freeze until `X.Y.0` ships       | `vX.Y.0-beta.N`, `vX.Y.0-rc.N` | `beta`        |
| `dev`         | Development of the release after that; **never frozen**                                            | none                           | —             |
| `support/X.Y` | Critical fixes for the previous minor release; created only when needed (see _Supported versions_) | `vX.Y.Z`                       | `support-X.Y` |

For example, with 2.0 stable, 2.1 in beta and 2.2 in development: `main` is 2.0.x,
`release/2.1` tags `v2.1.0-beta.N`, and 2.2 PRs merge into `dev`.

- Work happens on branches cut from `dev` (`fix/<n>-…`, `feat/<n>-…`, `chore/…`), merged into
  `dev` by PR. Those PRs are **squashed**.
- Merges between the long-lived branches (`dev`, `release/*`, `main`, `support/*`) use a **merge
  commit**, never squash, so history is shared and fixes are never lost.
- CI (`ci.yml`) runs on every PR and on pushes to `dev`, `main`, `release/**` and `support/**`.

## Every PR

- Add a changeset (`pnpm changeset`) for every user-facing change; a breaking one starts with
  **Breaking.** and gets a note in the migration guide. See
  [docs/changesets-guide.md](./docs/changesets-guide.md).
- **Don't change versions or CHANGELOGs**: `changeset version` does that when a release is cut,
  so PRs stay independent and merge in any order.
- Put `Fixes #N` in the PR description, and give the PR the milestone of the release that ships
  it, labels and an assignee (CONTRIBUTING.md).

## Where a fix goes

**Fix on the oldest supported branch that has the bug, then merge forward:**
`support/X.Y` → `main` → `release/X.Y` → `dev`. Never copy a fix backwards from `dev`.

| The bug exists in                        | Fix PR into             | Release                           | Then merge forward                     |
| ---------------------------------------- | ----------------------- | --------------------------------- | -------------------------------------- |
| The current stable release (and later)   | `hotfix/<n>-…` → `main` | tag `vX.Y.Z` on `main` → `latest` | `main` → `release/*` (if open) → `dev` |
| Only the release being stabilised        | `release/X.Y`           | tag `vX.Y.0-beta.N` → `beta`      | `release/X.Y` → `dev`                  |
| Only `dev`                               | `dev`                   | with the next release             | —                                      |
| The previous minor only (support window) | `support/X.Y`           | tag `vX.Y.Z` → `support-X.Y`      | to `main` if it applies there too      |

Forward merges are PRs too (`merge/release-2.1-into-dev`, merge commit). CI doesn't ask them for
a changeset. When a forward merge conflicts in `package.json` versions, `CHANGELOG.md` or
`.changeset/`, keep the **higher** version with its CHANGELOG sections, and keep every changeset
file that hasn't been released on the target branch.

## Every release: what changes

A **release-prep PR** (branch `chore/release-X.Y.Z[-beta.N]`) cuts each release, beta, rc,
stable, hotfix or support. It contains only what these commands produce:

| What                        | How                                                                                      | Checked by                                       |
| --------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------ |
| **Versions** of all 16      | `pnpm changeset version` (inside `changeset pre` mode for betas and rcs)                 | `scripts/check-release.mjs` (CI and the release) |
| **CHANGELOGs**              | written by `changeset version` from the changesets; consumed ones are deleted            | `check-release.mjs`: newest section = version    |
| **Migration guide, README** | by hand, when the release changes what they document                                     | review                                           |
| **npm packages**            | published by `release.yml` on the tag, with provenance                                   | `release.yml`                                    |
| **GitHub Release**          | created by `release.yml` on the tag: the merged CHANGELOG entries, then GitHub's PR list | `release.yml`                                    |

CI skips the changeset check for `chore/release-*` branches, because they consume changesets.

## Release lifecycle

### 1. Feature freeze: cut the release branch

Once the release's scope is in `dev`:

```bash
git switch dev && git pull && git switch -c release/2.1 && git push -u origin release/2.1
```

`dev` carries on with the release after that straight away. Open a **"Release X.Y.0"** tracking
issue in the milestone for the stabilising checklist.

### 2. Betas (from `release/X.Y`)

1. On a branch from `release/2.1` (`chore/release-2.1.0-beta.0`):

   ```bash
   pnpm changeset pre enter beta   # first beta only: writes .changeset/pre.json
   pnpm changeset version          # 2.1.0-beta.0, then beta.1, beta.2 … on later runs
   pnpm install --lockfile-only
   ```

   Commit the result and PR it into `release/2.1`. Changesets numbers pre-releases from `.0`.

2. Tag the merged commit on `release/2.1` and push the tag:

   ```bash
   git switch release/2.1 && git pull && git tag v2.1.0-beta.0 && git push origin v2.1.0-beta.0
   ```

3. `release.yml` runs every gate (including the live suite) and publishes all 16 packages to npm
   `beta`, then creates a GitHub pre-release. Approve the `npm` environment when it asks.
4. Fixes found in the beta go into `release/2.1` by PR, each with a changeset; ship them as the
   next beta. Merge `release/2.1` into `dev` after a batch of fixes (`merge/release-2.1-into-dev`).
   `pre.json` comes along; `dev` never versions, so that's harmless.
5. For a release candidate: `pnpm changeset pre exit`, `pnpm changeset pre enter rc`,
   `pnpm changeset version` (`2.1.0-rc.0`), and tag `v2.1.0-rc.0` the same way.

### 3. Stable release

1. On a branch from `release/2.1` (`chore/release-2.1.0`): `pnpm changeset pre exit`, then
   `pnpm changeset version`. All 16 packages become `2.1.0`, each CHANGELOG gets its `## 2.1.0`
   section and `pre.json` and the changesets are removed. PR it into `release/2.1`.
2. Open a PR from `release/2.1` into `main` and merge it with a **merge commit**.
3. Tag the merge commit on `main`:

   ```bash
   git switch main && git pull && git tag v2.1.0 && git push origin v2.1.0
   ```

4. `release.yml` publishes to npm `latest` and creates the GitHub Release (marked latest).
5. Merge `main` into `dev` (`merge/main-into-dev`), delete `release/2.1`, and run _After every
   release_.

A release that doesn't need betas (a small minor) skips steps 1–2 of the lifecycle: cut
`chore/release-X.Y.0` from `dev`, run `pnpm changeset version`, PR it into `dev`, merge `dev`
into `main` with a merge commit, and tag `main`.

### Hotfixes

1. Branch `hotfix/<n>-…` from `main`, fix with a `patch` changeset, PR into `main`.
2. Release-prep PR from `main` (`chore/release-2.0.1`): `pnpm changeset version`; merge it.
3. Tag `main` (`v2.0.1`), push the tag, then merge `main` forward into `release/*` (if open) and
   `dev`.

## After every release

- `npm view @mohsinonxrm/dataverse-sdk-core dist-tags` shows the version under the expected tag,
  and the package page shows provenance.
- The GitHub Release exists with the right notes (pre-release for betas and rcs).
- Forward merges are done; the milestone is closed when its stable release ships.
- The **Site** workflow (`site.yml`) deployed the explorer site from `main` after the stable
  release's merge; its run shows "Site not deployed" until the Azure setup in
  [docs/site.md](./docs/site.md) is done.

## Rehearsing a release

Run **Release** by hand on any branch (Actions → Release → Run workflow, or
`gh workflow run release.yml --ref <branch>`). It runs every gate, packs the 16 tarballs, writes
the notes and runs `npm publish --dry-run`, without an npm token or a GitHub Release. Versions
already on npm are skipped in the dry run.

## Supported versions

The current minor gets fixes on `main`. When a critical fix is needed for the previous minor
after the next one has shipped, cut `support/X.Y` from the last `vX.Y.Z` tag and bring its
`.github/workflows/release.yml` and `scripts/` up to date first (a tag runs the workflow of its
own commit). Its tags publish to `support-X.Y`, never `latest`.

## One-time setup (maintainer)

Publishing uses npm **trusted publishing** (OIDC): no npm token is stored anywhere.

1. **GitHub environment:** Settings → Environments → **New environment** `npm`, with yourself as
   a required reviewer, so nothing reaches npm without your approval.
2. **Trusted publishers:** each package needs one, naming this repository, the workflow file
   `release.yml` and the environment `npm`. From a machine with npm 11.15.0 or later, logged in
   (`npm login`, two-factor on) as the packages' owner:

   ```bash
   for p in actions appinsights auth-azure-identity auth-msal-browser auth-msal-node batch core discovery entities-runtime files functions generator messages metadata otel xrm; do
     npm trust github "@mohsinonxrm/dataverse-sdk-$p" --repo mohsinonxrm/dataverse-sdk-typescript --file release.yml --env npm --allow-publish --yes
     sleep 2
   done
   ```

   Check one with `npm trust list @mohsinonxrm/dataverse-sdk-core`. npm allows one trusted
   publisher per package; to change it, `npm trust revoke --id <id> <package>` and add it again.

3. **Secrets:** `DATAVERSE_URL`, `DATAVERSE_TENANT_ID`, `DATAVERSE_CLIENT_ID` and
   `DATAVERSE_CLIENT_SECRET` (the live suite's dev org) are repository secrets. There is no
   `NPM_TOKEN`; delete it if it's still there.

4. **Explorer site:** create the Azure Static Web App (Free plan, deployment source "Other"), store
   its deployment token as the `AZURE_STATIC_WEB_APPS_API_TOKEN` secret, and, for a default
   sign-in, a multi-tenant SPA app registration whose redirect URI is the site's URL, with its
   client id in the `EXPLORER_CLIENT_ID` repository variable. Step by step in
   [docs/site.md](./docs/site.md).

## Troubleshooting

- **The build fails on "Check the versions, the CHANGELOGs and the tag":** the tag isn't `v` +
  the packages' version, or a release-prep PR missed `changeset version`. Delete the tag
  (`git push --delete origin vX.Y.Z`), fix with a PR, and tag again.
- **A publish failed half-way:** re-run the failed jobs. Versions already on npm are skipped, so
  the re-run publishes the rest. Never re-tag a version that is partly published.
- **`npm publish` says 404 or "not authorized":** the package's trusted publisher is missing or
  names another file or environment (`npm trust list <package>`).
- **The live suite fails on a timeout or `ECONNRESET`:** the org is slow at times; re-run the
  `live` job before treating it as a bug.
- **The `live` job was cancelled:** it shares the `integration-tests` concurrency group with the
  nightly and manual Integration Tests runs, and GitHub keeps only one pending run per group, so
  a run queued after it cancels it while it waits. Re-run the failed jobs once the other run is
  done. For the same reason, start manual Integration Tests runs one at a time.
