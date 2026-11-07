#!/usr/bin/env node
/**
 * A changed API report needs a changeset (#306). Fails when the branch changes a package's
 * `packages/<pkg>/etc/*.api.md` but adds no `.changeset/*.md` that names the package. Whether
 * the bump is right (major for a breaking change, minor for an addition, patch for a fix) is
 * left to review.
 *
 *   node scripts/check-api-changeset.mjs <base>     e.g. origin/dev
 *
 * Compares <base>...HEAD (the changes since the merge base), as `changeset status --since` does.
 * A new report (a package's first) needs no changeset: it starts tracking an API, it doesn't
 * change one. CI runs this on pull requests only, not on release-prep PRs or forward merges,
 * which carry or consume changesets that already exist (RELEASING.md).
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

// fileURLToPath, not URL.pathname: on Windows that is "/C:/…" with %20 for spaces (#365).
const root = fileURLToPath(new URL("..", import.meta.url));
const base = process.argv[2];
if (!base) {
  console.error("Usage: node scripts/check-api-changeset.mjs <base>   (e.g. origin/dev)");
  process.exit(2);
}

/** Paths that changed since the merge base, with the given `--diff-filter` */
function changedFiles(filter, pathspec) {
  const r = spawnSync(
    "git",
    ["diff", "--name-only", `--diff-filter=${filter}`, `${base}...HEAD`, "--", pathspec],
    { cwd: root, encoding: "utf8" }
  );
  if (r.status !== 0) {
    console.error(`git diff against ${base} failed:\n${r.stderr}`);
    process.exit(2);
  }
  return r.stdout.split("\n").filter(Boolean);
}

/** Package names in a changeset's frontmatter (`"@scope/name": patch`) */
function changesetPackages(file) {
  const text = readFileSync(join(root, file), "utf8").replace(/\r\n/g, "\n");
  const front = /^---\n([\s\S]*?)\n---/.exec(text)?.[1] ?? "";
  const names = new Set();
  for (const line of front.split("\n")) {
    const m = /^\s*(["']?)([^"':\s]+)\1\s*:\s*(major|minor|patch|none)\s*$/.exec(line);
    if (m) names.add(m[2]);
  }
  return names;
}

// Modified reports only (M): a new report starts tracking a package, a deleted one stops
const reports = changedFiles("M", "packages/*/etc/*.api.md").filter((f) =>
  /^packages\/[^/]+\/etc\/[^/]+\.api\.md$/.test(f)
);
if (!reports.length) {
  console.log("No API report changed.");
  process.exit(0);
}

const named = new Set();
const changesets = changedFiles("A", ".changeset/*.md").filter((f) => !f.endsWith("README.md"));
for (const file of changesets) for (const name of changesetPackages(file)) named.add(name);

const missing = [];
for (const report of reports) {
  const pkgJson = join(root, report.split("/").slice(0, 2).join("/"), "package.json");
  if (!existsSync(pkgJson)) continue;
  const { name } = JSON.parse(readFileSync(pkgJson, "utf8"));
  if (named.has(name)) console.log(`✔ ${report} (${name} has a changeset)`);
  else missing.push(`${report} (${name})`);
}

if (missing.length) {
  console.error(
    `\nThese API reports changed, but no changeset added in this PR names the package:\n  ` +
      missing.join("\n  ") +
      "\n\nA change to an API report is a change to the package's public API. Run 'pnpm changeset'\n" +
      "and pick the bump: major if the change can break a caller, minor if it only adds. This check\n" +
      "only looks for the changeset; review checks the bump (CONTRIBUTING.md, 'API reports')."
  );
  process.exit(1);
}
