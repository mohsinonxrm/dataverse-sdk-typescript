# Contributing

## Requirements

- Node 18+
- pnpm
- ESM-only packages

## Setup

- `pnpm install`
- `pnpm build`
- `pnpm test`

## Standards

- TypeScript strict mode
- No breaking changes in core types without ADR + major version bump
- Public APIs must have:
  - docs example
  - unit tests
  - type tests (if metadata related)

## PR checklist

- [ ] updated/added tests
- [ ] updated docs (mapping/support lists if actions/functions/messages)
- [ ] added changeset if user-facing change
- [ ] ran `pnpm lint && pnpm test && pnpm build`

## Licensing

All contributions must be compatible with GNU AGPL v3.0.
