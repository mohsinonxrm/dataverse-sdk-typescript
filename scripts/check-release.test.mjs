// node --test scripts/
import { test } from "node:test";
import assert from "node:assert/strict";
import { checkPackages, entries, newestSection, releaseNotes, section } from "./check-release.mjs";

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
  { name: "@x/core", version, changelog: changelog("@x/core", version, coreBody) },
  { name: "@x/batch", version, changelog: changelog("@x/batch", version, batchBody) },
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
