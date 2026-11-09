# Release Process

How to cut and publish a release is in **[RELEASING.md](../RELEASING.md)**: branches, release-prep
PRs, tags, hotfixes, support lines, rehearsals and the one-time npm setup. This page covers what
gates a release, how versions work, and the plan for 2.0.0.

## Release gates

`.github/workflows/release.yml` publishes when a `vX.Y.Z` tag is pushed (#365). Before anything
reaches npm, its `build` and `live` jobs run:

1. `scripts/check-release.mjs`: every published package has the same version, each CHANGELOG's
   newest section is that version, and the tag matches it.
2. The release channel: `-beta.N` / `-rc.N` → npm `beta`; a stable version on `main`'s release
   line → `latest`; on `support/X.Y` → `support-X.Y`. Anything else fails.
3. `pnpm audit --prod`, `pnpm format:check`, `pnpm build`, the generated packages matching the
   committed `$metadata` snapshot, `pnpm typecheck`, `pnpm lint` and `pnpm test` (core's `test`
   includes its coverage gate).
4. `pnpm check:packages`: `publint` and `@arethetypeswrong/cli` (ESM-only profile) on every
   published package, and a check that each one loads with `require()`. Run it locally after
   `pnpm build`; it works on Windows, macOS and Linux.
5. `pnpm check:size`: one action, function or message bundled for the browser must stay a small
   fraction of its whole package (tree-shaking works), and the main entry points must stay within
   their gzipped budgets in `scripts/bundle-budgets.json` (#307). `node scripts/check-bundle-size.mjs --update`
   prints current sizes and suggested budgets.
6. `pnpm test:browser`: the Vite-built SPA smoke tests in Chromium under a strict CSP.
7. `pnpm test:integration`: the live suite against the dev org, with
   `DATAVERSE_INTEGRATION_REQUIRED=1`, so missing secrets fail the run instead of skipping. It
   shares the nightly run's concurrency group, so two suites never use the org at once. Then, in
   the same job, `pnpm samples:live` runs the five non-interactive Node samples end to end
   against the org (`scripts/samples-live.mjs`).

If any gate fails, nothing is published. The `publish` job then publishes the 16 tarballs the
build packed (`pnpm pack` writes real versions for `workspace:*` dependencies) with
`npm publish --provenance`, through trusted publishing and the `npm` environment, and
`github-release` creates the GitHub Release.

## Versioning

- **SemVer** via changesets.
- **All published packages share one version.** They are one `fixed` group in
  `.changeset/config.json` (#313), so every release bumps all of them together, and
  `@mohsinonxrm/dataverse-sdk-*` packages with the same version always work together. A package
  with no changes of its own still gets the new version.
- A new published package must be added to that `fixed` group, and to the trusted-publisher loop
  in RELEASING.md.
- Version bumps: `patch` (bug fix) | `minor` (feature) | `major` (breaking).
- Packages depend on each other with `workspace:*` as regular dependencies, never as peer
  dependencies: a peer dependency on another package of the group makes changesets turn every
  minor release into a major (#364).

## Releasing 2.0.0

All 16 packages are on npm as **1.0.0** (published 2026-02-11, with provenance). `main` is 1.0.0
and `dev` holds 2.0. Under RELEASING.md:

1. Do the one-time setup: the `npm` environment and the 16 trusted publishers.
2. Once the v2.0.0 milestone's fixes are in `dev`, cut `release/2.0` from `dev`.
3. Beta: a `chore/release-2.0.0-beta.0` PR into `release/2.0` with `pnpm changeset pre enter beta`
   and `pnpm changeset version`; tag `v2.0.0-beta.0`. That publishes `2.0.0-beta.0` to npm `beta`;
   `latest` stays 1.0.0. Try it in an app (`npm i @mohsinonxrm/dataverse-sdk-core@beta`; see
   [migration-2.0.md](./migration-2.0.md)).
4. Stable: a `chore/release-2.0.0` PR into `release/2.0` with `pnpm changeset pre exit` and
   `pnpm changeset version`; merge `release/2.0` into `main` with a merge commit; tag `v2.0.0` on
   `main`. That publishes 2.0.0 to `latest` and creates the GitHub Release.
5. Check on npmjs.com that the 2.0.0 versions show provenance through the trusted publisher, and
   that `npm view @mohsinonxrm/dataverse-sdk-core version` is 2.0.0. Merge `main` into `dev`.

Checked before the release: all 16 tarballs contain only `dist/` (plus the generator's
`templates/` and notices), `README.md` and `LICENSE`; `provenance: true` is set in every
package's `publishConfig`; a fresh project that installs the tarballs type-checks with
`tsc --strict` and runs against a live org.

## Changelog

Changesets writes each package's `CHANGELOG.md` (`packages/*/CHANGELOG.md`) from the changeset
descriptions when a release-prep PR runs `pnpm changeset version`. The GitHub Release merges the
version's entries from all 16.

## References

- [RELEASING.md](../RELEASING.md)
- [Changesets guide](./changesets-guide.md)
- [CI workflow](../.github/workflows/ci.yml) and [Release workflow](../.github/workflows/release.yml)
- [Migrating to 2.0](./migration-2.0.md)
