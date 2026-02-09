# Release Process

## Versioning

- SemVer via changesets
- Each package versioned independently, but we may use coordinated releases for major milestones.

## Workflow

1. Merge PRs with changesets
2. Run `pnpm changeset version` to bump versions and update changelog
3. Run `pnpm -r build && pnpm -r test`
4. Publish via CI:
   - `pnpm changeset publish`

## Changelog

- Maintained automatically by changesets per package.

## Release gates

- Unit + contract + type tests must pass
- Integration tests recommended for releases
