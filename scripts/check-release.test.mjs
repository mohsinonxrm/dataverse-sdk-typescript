// node --test scripts/
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  MAX_NOTES,
  checkPackages,
  entries,
  newestSection,
  releaseNotes,
  section,
} from "./check-release.mjs";

const changelog = (name, version, body) =>
  `# ${name}\n\n## ${version}\n\n${body}\n\n## 1.0.0\n\n### Major Changes\n\n- 78fc1e1: Initial release\n`;

const coreBody = `### Major Changes

- abc1234: **Breaking.** One thing.

  With a second paragraph.

### Patch Changes

- def5678: A fix in core and batch.
- Updated dependencies [abc1234]
  - @mohsinonxrm/dataverse-sdk-core@2.0.0`;

const batchBody = `### Patch Changes

- def5678: A fix in core and batch.
- Updated dependencies [abc1234]
  - @mohsinonxrm/dataverse-sdk-core@2.0.0`;

const pkgs = (version = "2.0.0") => [
  { dir: "core", name: "@x/core", version, changelog: changelog("@x/core", version, coreBody) },
  { dir: "batch", name: "@x/batch", version, changelog: changelog("@x/batch", version, batchBody) },
];

test("newestSection reads the first ## heading", () => {
  assert.equal(newestSection(changelog("a", "2.0.0-beta.1", "")), "2.0.0-beta.1");
  assert.equal(newestSection("# a\n"), undefined);
});

test("checkPackages accepts one version with current CHANGELOGs and a matching tag", () => {
  assert.deepEqual(checkPackages(pkgs(), "v2.0.0"), []);
});

test("checkPackages reports a version mismatch, a stale CHANGELOG and a wrong tag", () => {
  const p = pkgs();
  p[1] = { ...p[1], version: "2.0.1" };
  const problems = checkPackages(p, "v2.0.0");
  assert.ok(problems.some((m) => m.includes("different versions")));
  assert.ok(problems.some((m) => m.includes("@x/batch: CHANGELOG.md's newest section is 2.0.0")));
  assert.deepEqual(checkPackages(pkgs(), "v2.0.1").length, 1);
});

test("section and entries keep multi-line entries and drop Updated dependencies", () => {
  const e = entries(section(changelog("a", "2.0.0", coreBody), "2.0.0"));
  assert.deepEqual(e.get("Major Changes"), [
    "- abc1234: **Breaking.** One thing.\n\n  With a second paragraph.",
  ]);
  assert.deepEqual(e.get("Patch Changes"), ["- def5678: A fix in core and batch."]);
});

test("releaseNotes merges the packages' entries once each and lists the packages", () => {
  const notes = releaseNotes(pkgs(), "2.0.0", "o/r");
  assert.equal(notes.match(/def5678/g)?.length, 1);
  assert.match(notes, /blob\/v2\.0\.0\/docs\/migration-2\.0\.md/);
  assert.match(notes, /## Major Changes[\s\S]*## Patch Changes[\s\S]*## Packages/);
  assert.match(notes, /npmjs\.com\/package\/@x\/batch\/v\/2\.0\.0/);
  assert.doesNotMatch(notes, /Updated dependencies/);
});

test("pre-release notes name the beta tag and skip the migration line", () => {
  const notes = releaseNotes(pkgs("2.0.0-beta.0"), "2.0.0-beta.0", "o/r");
  assert.match(notes, /npm `beta` tag/);
  assert.doesNotMatch(notes, /migration guide/);
});

test("notes under the limit list every change and no Changelogs section", () => {
  const notes = releaseNotes(pkgs(), "2.0.0", "o/r");
  assert.doesNotMatch(notes, /## Changelogs/);
});

test("notes over the limit leave out patch changes first and link the CHANGELOGs", () => {
  const patches = Array.from({ length: 50 }, (_, i) => `- p${String(i)}: ${"x".repeat(700)}`);
  const body = `### Major Changes\n\n- abc1234: **Breaking.** One thing.\n\n### Patch Changes\n\n${patches.join("\n")}`;
  const one = [
    {
      dir: "core",
      name: "@x/core",
      version: "2.0.0",
      changelog: changelog("@x/core", "2.0.0", body),
    },
  ];
  const notes = releaseNotes(one, "2.0.0", "o/r", 10_000);
  assert.ok(notes.length <= 10_000, String(notes.length));
  assert.match(notes, /## Major Changes[\s\S]*abc1234/);
  assert.doesNotMatch(notes, /## Patch Changes/);
  assert.match(notes, /## Changelogs[\s\S]*blob\/v2\.0\.0\/packages\/core\/CHANGELOG\.md/);
  assert.match(notes, /## Packages/);
});

test("a release as big as 2.0.0 stays under MAX_NOTES, with its breaking changes", () => {
  // 2.0.0's merged entries came to 182,808 characters
  const many = (kind, n) =>
    `### ${kind}\n\n${Array.from({ length: n }, (_, i) => `- ${kind[0]}${String(i).padStart(6, "0")}: ${"x".repeat(700)}`).join("\n")}`;
  const body = [
    many("Major Changes", 20),
    many("Minor Changes", 160),
    many("Patch Changes", 60),
  ].join("\n\n");
  const big = [
    {
      dir: "core",
      name: "@x/core",
      version: "2.0.0",
      changelog: changelog("@x/core", "2.0.0", body),
    },
  ];
  const notes = releaseNotes(big, "2.0.0", "o/r");
  assert.ok(notes.length <= MAX_NOTES, `${String(notes.length)} > ${String(MAX_NOTES)}`);
  assert.match(notes, /## Major Changes/);
  assert.match(notes, /## Changelogs/);
});
