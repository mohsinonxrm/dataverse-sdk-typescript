# Changesets Quick Reference

> **Purpose:** Developer guide for using changesets in this monorepo

---

## What is Changesets?

Changesets automates:

- ✅ Version bumps (respects SemVer)
- ✅ CHANGELOG generation
- ✅ Monorepo dependency updates
- ✅ npm publishing

---

## Developer Workflow

### 1. Make Your Changes

```bash
git checkout -b feat/my-feature
# ... make code changes ...
```

### 2. Add a Changeset

```bash
pnpm changeset
```

**Interactive prompts:**

```
🦋  Which packages would you like to include?
  ◯ @mohsinonxrm/dataverse-sdk-core
  ◉ @mohsinonxrm/dataverse-sdk-batch
  ◯ @mohsinonxrm/dataverse-sdk-xrm

🦋  What kind of change is this for @mohsinonxrm/dataverse-sdk-batch?
  ◯ major (breaking change)
  ◉ minor (new feature)
  ◯ patch (bug fix)

🦋  Summary
  │ Add support for 1000-request batches with auto-splitting
```

This creates `.changeset/random-name.md`:

```markdown
---
"@mohsinonxrm/dataverse-sdk-batch": minor
---

Add support for 1000-request batches with auto-splitting
```

### 3. Commit the Changeset

```bash
git add .changeset/
git commit -m "feat(batch): add auto-splitting for large batches"
git push
```

### 4. Create PR

- PRs into `main`, `release/*` and `support/*` must include a changeset (CI checks it; release-prep `chore/release-*` and forward-merge `merge/*` PRs are exempt). PRs to `dev` aren't checked, but add one whenever the change affects package consumers, so it isn't forgotten at release time
- Reviewer sees what will be released
- Merge when approved

### 5. Release (Maintainers Only)

- A **release-prep PR** (`chore/release-X.Y.Z`) runs `pnpm changeset version`: it bumps all 16 packages, writes the CHANGELOGs and deletes the consumed changesets
- After it merges, the maintainer pushes the `vX.Y.Z` tag; `release.yml` publishes to npm and creates the GitHub Release
- See [RELEASING.md](../RELEASING.md)

---

## Common Scenarios

### Bug Fix (Patch)

```bash
pnpm changeset
# Select: affected package(s)
# Type: patch
# Summary: "Fix retry logic for 503 errors"
```

### New Feature (Minor)

```bash
pnpm changeset
# Select: affected package(s)
# Type: minor
# Summary: "Add Prefer.maxPageSize() helper"
```

### Breaking Change (Major)

```bash
pnpm changeset
# Select: affected package(s)
# Type: major
# Summary: "BREAKING: rename DataverseClient to DataverseServiceClient"
```

### Multiple Packages

```bash
pnpm changeset
# Select multiple packages with space bar
# Set version type for each
# One summary for the whole change
```

### Documentation-Only Changes

**No changeset needed** for:

- README updates
- Comment changes
- Test-only changes
- Build script changes

---

## Commands

### Add a changeset

```bash
pnpm changeset
```

### Preview what will be versioned

```bash
pnpm changeset version
# Creates CHANGELOG.md entries (don't commit this manually)
```

### Check status

```bash
pnpm changeset status
# Shows pending changesets and expected version bumps
```

### Publish (maintainers only)

```bash
pnpm changeset publish
# Run by CI, not manually
```

---

## CI/CD Integration

### PR Checks

`.github/workflows/ci.yml` runs:

```yaml
check-changeset:
  - Validates a changeset exists on PRs into main, release/* and support/*
  - Skips release-prep (chore/release-*) and forward-merge (merge/*) PRs
release metadata (scripts/check-release.mjs):
  - Every published package has one version, and each CHANGELOG's newest section is it
```

### Release Automation

`.github/workflows/release.yml` runs when a `vX.Y.Z` tag is pushed (the release-prep PR has
already run `pnpm changeset version`): it runs every gate, publishes the 16 packages with
`npm publish --provenance` through trusted publishing, and creates the GitHub Release. Run by hand
on a branch, it rehearses with `npm publish --dry-run`. See [RELEASING.md](../RELEASING.md).

---

## Changeset File Format

```markdown
---
"@mohsinonxrm/dataverse-sdk-core": minor
"@mohsinonxrm/dataverse-sdk-batch": patch
---

Add support for streaming large batches.

This change improves memory efficiency when processing
batches with thousands of requests.
```

**Rules:**

- YAML frontmatter = package names + version bumps
- Body = CHANGELOG entry (supports markdown)
- Multiple packages can be in one changeset
- One changeset can represent one logical change

---

## Advanced Usage

### Pre-release Versions

Betas and release candidates come from a `release/X.Y` branch in changesets' pre mode (see [RELEASING.md](../RELEASING.md#2-betas-from-releasexy)):

```bash
pnpm changeset pre enter beta   # once per release branch
pnpm changeset version          # 2.1.0-beta.0, then beta.1, …; commit it in a release-prep PR
```

Tagging the merged commit `v2.1.0-beta.0` publishes it to npm `beta`. `pnpm changeset pre exit` before the stable `pnpm changeset version`.

### Linked Packages (Always Version Together)

Not used in this repository: every published package is in the `fixed` group below, so a `linked` group would have no effect. For reference, a linked group in `.changeset/config.json` looks like this:

```json
{
  "linked": [["@mohsinonxrm/dataverse-sdk-core", "@mohsinonxrm/dataverse-sdk-xrm"]]
}
```

### Fixed Packages (Share Version Number)

This repository uses one `fixed` group with every published package listed by name (see `.changeset/config.json`, #313). Add new published packages to it. Because of it, a release bumps every published package to the same version, the highest bump any pending changeset asks for: one `major` changeset for one package makes every package's next version a major. Name only the packages your change affects; their CHANGELOGs get your entry. The generic form looks like this:

```json
{
  "fixed": [["@mohsinonxrm/dataverse-sdk-*"]]
}
```

---

## Troubleshooting

### "No changeset detected" error on PR

```bash
# Forgot to add changeset?
pnpm changeset
git add .changeset/
git commit -m "chore: add changeset"
git push
```

### Changeset validation fails but I added one

```bash
# Check status
pnpm changeset status --since=origin/main

# Ensure changeset file was committed
git status
```

### Want to edit changeset message

```bash
# Find file in .changeset/
# Edit the markdown content
# Commit changes
```

### Need to remove a changeset

```bash
rm .changeset/weird-name.md
git add .changeset/
git commit -m "chore: remove incorrect changeset"
```

---

## Best Practices

✅ **DO:**

- Add changeset as part of your PR
- Write clear, user-facing summaries
- Use conventional commit format in git message
- Select minimal set of affected packages
- Test your changes before adding changeset

❌ **DON'T:**

- Add changesets for docs-only changes
- Add changesets for internal build script changes
- Manually edit package.json versions
- Manually edit CHANGELOG.md
- Run `changeset version` in a feature PR (only release-prep PRs do, see RELEASING.md)

---

## FAQ

**Q: When should I add a changeset?**  
A: Whenever you make changes that affect package consumers (API changes, bug fixes, new features).

**Q: Can I have multiple changesets in one PR?**  
A: Yes! Useful if you have logically separate changes.

**Q: What happens if I forget a changeset?**  
A: On a PR into `main`, `release/*` or `support/*`, CI fails with "No changeset detected". On a PR to `dev` it doesn't, so add one yourself for any consumer-facing change.

**Q: Can I edit a changeset after creating it?**  
A: Yes - it's just a markdown file in `.changeset/`.

**Q: Who releases?**  
A: Maintainers only: they merge the release-prep PR and push the `vX.Y.Z` tag, which publishes.

**Q: How do I see what will be released?**  
A: `pnpm changeset status` shows pending changes.

**Q: Can I preview the CHANGELOG?**  
A: Run `pnpm changeset version` locally, look at the result, then discard it (`git checkout -- .`). Don't commit it.

---

## Resources

- [Changesets Docs](https://github.com/changesets/changesets)
- [SemVer Specification](https://semver.org/)
- [Our CI Workflows](../.github/workflows/)

---

**Questions?** Open an issue with the **Question** template.
