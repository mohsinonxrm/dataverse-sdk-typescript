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

- PRs to `main` must include a changeset (CI checks it). PRs to `dev` don't need one, but add one whenever the change affects package consumers, so it isn't forgotten when `dev` is merged to `main`
- Reviewer sees what will be released
- Merge when approved

### 5. Automated Release (Maintainers Only)

- **Automatic:** "Version Packages" PR appears on main
- **Review:** Check version bumps + CHANGELOG
- **Merge:** Packages auto-publish to npm

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
  - Validates changeset exists
  - Skips on release PRs (changeset-release/*)
```

### Release Automation

`.github/workflows/changeset-version.yml` runs on merge to main:

```yaml
1. Detects pending changesets
2. Runs: pnpm changeset version
   → Bumps package.json
   → Generates CHANGELOG.md
3. Creates "Version Packages" PR
4. On merge → publishes to npm
```

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

Maintainers publish prereleases from `dev` with the **Release (next)** workflow (see [release.md](./release.md#prerelease-channel-next)). It runs the equivalent of:

```bash
pnpm changeset version --snapshot next   # e.g. 2.0.0-next-20261105123456, not committed
pnpm changeset publish --tag next --no-git-tag
```

### Linked Packages (Always Version Together)

Edit `.changeset/config.json`:

```json
{
  "linked": [["@mohsinonxrm/dataverse-sdk-core", "@mohsinonxrm/dataverse-sdk-xrm"]]
}
```

### Fixed Packages (Share Version Number)

This repository uses one `fixed` group with every published package listed by name (see `.changeset/config.json`, #313). Add new published packages to it. The generic form looks like this:

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
- Commit the output of `changeset version` yourself (the Release workflow does this in the "Version Packages" PR)

---

## FAQ

**Q: When should I add a changeset?**  
A: Whenever you make changes that affect package consumers (API changes, bug fixes, new features).

**Q: Can I have multiple changesets in one PR?**  
A: Yes! Useful if you have logically separate changes.

**Q: What happens if I forget a changeset?**  
A: On a PR to `main`, CI fails with "No changeset detected". On a PR to `dev` it doesn't, so add one yourself for any consumer-facing change.

**Q: Can I edit a changeset after creating it?**  
A: Yes - it's just a markdown file in `.changeset/`.

**Q: Who merges the "Version Packages" PR?**  
A: Maintainers only. Merging triggers npm publish.

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
