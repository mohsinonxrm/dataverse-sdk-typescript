#!/usr/bin/env node
/**
 * Release metadata check and release notes (#365, RELEASING.md).
 *
 *   node scripts/check-release.mjs                     every published package has the same
 *                                                      version, and each CHANGELOG's newest
 *                                                      section is that version
 *   node scripts/check-release.mjs --tag v2.0.0        also: the tag is "v" + that version
 *   node scripts/check-release.mjs --notes notes.md    also: write the GitHub Release notes
 *   node scripts/check-release.mjs --version           print the version and exit
 *
 * CI runs it on every PR and push, so a release-prep PR that misses a package fails before it
 * merges; release.yml runs it on the tag.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

/** The published packages (not private), with their version and CHANGELOG text. */
export function readPackages(root = ROOT) {
  const out = [];
  for (const dir of readdirSync(join(root, "packages")).sort()) {
    let pkg;
    try {
      pkg = JSON.parse(readFileSync(join(root, "packages", dir, "package.json"), "utf8"));
    } catch {
      continue;
    }
    if (pkg.private) continue;
    let changelog = "";
    try {
      changelog = readFileSync(join(root, "packages", dir, "CHANGELOG.md"), "utf8");
    } catch {
      // reported by checkPackages
    }
    out.push({ dir, name: pkg.name, version: pkg.version, changelog });
  }
  return out;
}

/** The version of a CHANGELOG's newest `## x.y.z` section, or undefined. */
export function newestSection(changelog) {
  return /^## (\S+)\s*$/m.exec(changelog)?.[1];
}

/** Problems with the packages' versions and CHANGELOGs; empty when the release metadata is consistent. */
export function checkPackages(packages, tag) {
  const problems = [];
  if (packages.length === 0) return ["no published packages found"];
  const versions = new Set(packages.map((p) => p.version));
  if (versions.size > 1) {
    problems.push(
      `published packages have different versions (they are one changesets "fixed" group): ${packages
        .map((p) => `${p.name}@${p.version}`)
        .join(", ")}`
    );
  }
  for (const p of packages) {
    if (!p.changelog) {
      problems.push(`${p.name}: no CHANGELOG.md`);
      continue;
    }
    const newest = newestSection(p.changelog);
    if (newest !== p.version) {
      problems.push(
        `${p.name}: CHANGELOG.md's newest section is ${newest ?? "(none)"}, not ${p.version}. Run \`pnpm changeset version\` in the release-prep PR.`
      );
    }
  }
  const version = packages[0].version;
  if (tag !== undefined && tag !== `v${version}`) {
    problems.push(
      `tag ${tag} doesn't match the packages' version ${version} (expected v${version})`
    );
  }
  return problems;
}

/** The body of the `## <version>` section of a CHANGELOG, without the heading. */
export function section(changelog, version) {
  const lines = changelog.split(/\r?\n/);
  const start = lines.findIndex((l) => l.trim() === `## ${version}`);
  if (start === -1) return "";
  let end = lines.findIndex((l, i) => i > start && /^## /.test(l));
  if (end === -1) end = lines.length;
  return lines.slice(start + 1, end).join("\n");
}

const KINDS = ["Major Changes", "Minor Changes", "Patch Changes"];

/**
 * The entries of a section, by kind (`Major Changes`, …). An entry is a top-level `- ` bullet and
 * its indented continuation lines. "Updated dependencies" entries are dropped: every package of
 * the fixed group depends on the same new version.
 */
export function entries(sectionText) {
  const out = new Map(KINDS.map((k) => [k, []]));
  let kind;
  let current;
  const flush = () => {
    if (kind && current && !/^- Updated dependencies/.test(current)) out.get(kind)?.push(current);
    current = undefined;
  };
  for (const line of sectionText.split("\n")) {
    const heading = /^### (.+?)\s*$/.exec(line);
    if (heading) {
      flush();
      kind = KINDS.includes(heading[1]) ? heading[1] : undefined;
    } else if (line.startsWith("- ")) {
      flush();
      current = line;
    } else if (current !== undefined && (line.startsWith(" ") || line.trim() === "")) {
      current += `\n${line}`;
    } else {
      flush();
    }
  }
  flush();
  for (const [k, list] of out)
    out.set(
      k,
      list.map((e) => e.replace(/\s+$/, ""))
    );
  return out;
}

/**
 * GitHub Release notes: every package's entries for `version`, merged by kind, each entry once
 * (a changeset that names several packages appears in each CHANGELOG), then the packages.
 */
export function releaseNotes(packages, version, repository) {
  const merged = new Map(KINDS.map((k) => [k, []]));
  for (const p of packages) {
    for (const [kind, list] of entries(section(p.changelog, version))) {
      const seen = merged.get(kind);
      for (const entry of list) if (!seen.includes(entry)) seen.push(entry);
    }
  }
  const prerelease = version.includes("-");
  const parts = [];
  if (merged.get("Major Changes").length > 0 && !prerelease) {
    parts.push(
      `This is a major release with breaking changes; see the [migration guide](https://github.com/${repository}/blob/v${version}/docs/migration-${version.split(".")[0]}.0.md).`
    );
  }
  for (const kind of KINDS) {
    const list = merged.get(kind);
    if (list.length > 0) parts.push(`## ${kind}\n\n${list.join("\n")}`);
  }
  parts.push(
    `## Packages\n\nAll ${String(packages.length)} packages are published at ${version}${
      prerelease ? " under the npm `beta` tag" : ""
    }:\n\n${packages
      .map((p) => `- [\`${p.name}\`](https://www.npmjs.com/package/${p.name}/v/${version})`)
      .join("\n")}`
  );
  return `${parts.join("\n\n")}\n`;
}

function main(argv) {
  const arg = (name) => {
    const i = argv.indexOf(name);
    return i === -1 ? undefined : argv[i + 1];
  };
  const packages = readPackages();
  if (argv.includes("--version")) {
    console.log(packages[0]?.version ?? "");
    return 0;
  }
  const problems = checkPackages(packages, arg("--tag"));
  if (problems.length > 0) {
    for (const p of problems) console.error(`::error::${p}`);
    return 1;
  }
  const version = packages[0].version;
  console.log(`✔ ${String(packages.length)} published packages at ${version}, CHANGELOGs current`);
  const notes = arg("--notes");
  if (notes) {
    const repository = arg("--repository") ?? "mohsinonxrm/dataverse-sdk-typescript";
    writeFileSync(notes, releaseNotes(packages, version, repository));
    console.log(`✔ release notes written to ${notes}`);
  }
  return 0;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  process.exit(main(process.argv.slice(2)));
}
