# dataverse-sdk-typescript: issues to file for FetchXML Studio (SWA)

These are the issues in [`mohsinonxrm/dataverse-sdk-typescript`](https://github.com/mohsinonxrm/dataverse-sdk-typescript)
that block the FetchXML Studio web app, or that it needs fixed.

- **Reviewed:** `main` at `f45e6fd` (packages 1.0.0), on 2026-11-04.
- **No duplicates:** the repository had no issues when this was written.
- **Evidence:** every issue was reproduced by running the built `dist/` packages against a fake
  `fetchProvider` (Node 22). Each issue includes the repro code and its actual output. The repro
  scripts are in [`repro/`](repro/).
- **Existing tests:** the SDK's suites pass on this commit (core 153, batch 58, xrm 30,
  auth-msal-browser 28). The tests mock the boundaries that are broken (see the test-infrastructure
  issue).

## Filing

Each `NN-*.md` file is one issue. Its first line is `# <title>`, and its second line is
`<!-- labels: a,b,c -->`. To create the labels and then file every issue with the GitHub CLI, run:

```bash
node docs/plans/sdk-issues/file-issues.mjs --repo mohsinonxrm/dataverse-sdk-typescript
```

Add `--dry-run` to print what would be filed without creating anything.

## Priority for FetchXML Studio

- **P0:** blocks the integration, or forces FetchXML Studio to bypass the SDK for that feature.
- **P1:** needed before FetchXML Studio relies on the feature.
- **P2:** quality or ergonomics.

The index of files, titles and priorities is in [`INDEX.md`](INDEX.md).
