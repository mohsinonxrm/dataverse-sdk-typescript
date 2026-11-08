#!/usr/bin/env node
/**
 * API reports (#306): API Extractor writes each published package's public API to
 * `packages/<pkg>/etc/<unscoped-name>.api.md`. The reports are committed, so every change to a
 * public API shows up in the PR diff, and CI fails when a report is out of date.
 *
 *   node scripts/api-report.mjs            check: fails if a report differs from the build
 *   node scripts/api-report.mjs --update   rewrite the reports
 *
 * Run after `pnpm build`: API Extractor reads the d.ts that tsup bundles (`dist/index.d.ts`),
 * with the package's own tsconfig.json for the compiler options. The configuration lives here,
 * not in per-package api-extractor.json files. No .d.ts rollup, doc model or tsdoc metadata.
 *
 * The three generated packages (actions, functions, messages) have no report: their public API
 * is the generator's output for the committed $metadata snapshot, which CI's regen check already
 * enforces, and their reports would be megabytes.
 */
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { Extractor, ExtractorConfig } from "@microsoft/api-extractor";

// fileURLToPath, not URL.pathname: on Windows that is "/C:/…" with %20 for spaces (#365).
const root = fileURLToPath(new URL("..", import.meta.url));
const update = process.argv.includes("--update");

/** Generated from the $metadata snapshot; checked by CI's regen step instead (see above). */
const GENERATED = new Set([
  "dataverse-sdk-actions",
  "dataverse-sdk-functions",
  "dataverse-sdk-messages",
]);

/**
 * Release tags (@public, @beta, ...) aren't used in this repo, and TSDoc syntax in doc comments
 * isn't part of the API, so those messages are off. Messages API Extractor can record in the
 * report (e.g. ae-forgotten-export) go there, so they show up in the diff. Everything else is an
 * error: a compiler error in a package's d.ts or a symbol API Extractor can't analyze fails.
 */
const messages = {
  compilerMessageReporting: { default: { logLevel: "error" } },
  extractorMessageReporting: {
    default: { logLevel: "error" },
    "ae-missing-release-tag": { logLevel: "none" },
    "ae-undocumented": { logLevel: "none" },
    "ae-unresolved-link": { logLevel: "none" },
    // tsup moves a @packageDocumentation comment away from the top of the bundled d.ts
    "ae-misplaced-package-tag": { logLevel: "none" },
    // A type the public API uses must be exported, so apps can name it (#397): fail, don't just note it.
    "ae-forgotten-export": { logLevel: "error", addToApiReportFile: false },
    "ae-incompatible-release-tags": { logLevel: "warning", addToApiReportFile: true },
    "ae-internal-missing-underscore": { logLevel: "warning", addToApiReportFile: true },
    "ae-internal-mixed-release-tag": { logLevel: "warning", addToApiReportFile: true },
    "ae-unresolved-inheritdoc-reference": { logLevel: "warning", addToApiReportFile: true },
    "ae-unresolved-inheritdoc-base": { logLevel: "warning", addToApiReportFile: true },
  },
  tsdocMessageReporting: { default: { logLevel: "none" } },
};

const tempRoot = mkdtempSync(join(tmpdir(), "api-report-"));
const changed = [];
let failed = 0;

for (const dir of readdirSync(join(root, "packages")).sort()) {
  const pkgDir = join(root, "packages", dir);
  const pkgJsonPath = join(pkgDir, "package.json");
  if (!existsSync(pkgJsonPath)) continue;
  const pkg = JSON.parse(readFileSync(pkgJsonPath, "utf8"));
  if (pkg.private || GENERATED.has(dir)) continue;

  const entry = join(pkgDir, "dist", "index.d.ts");
  if (!existsSync(entry)) {
    failed++;
    console.error(`✖ ${pkg.name}: ${relative(root, entry)} is missing. Run 'pnpm build' first.`);
    continue;
  }

  const problems = [];
  let diff = "";
  let config;
  let result;
  try {
    config = ExtractorConfig.prepare({
      configObject: {
        projectFolder: pkgDir,
        mainEntryPointFilePath: entry,
        compiler: { tsconfigFilePath: join(pkgDir, "tsconfig.json") },
        apiReport: {
          enabled: true,
          reportFileName: "<unscopedPackageName>",
          reportFolder: join(pkgDir, "etc"),
          reportTempFolder: join(tempRoot, dir),
        },
        docModel: { enabled: false },
        dtsRollup: { enabled: false },
        tsdocMetadata: { enabled: false },
        newlineKind: "lf",
        enumMemberOrder: "by-name",
        messages,
      },
      packageJsonFullPath: pkgJsonPath,
    });
    if (update) mkdirSync(config.reportFolder, { recursive: true });
    result = Extractor.invoke(config, {
      // localBuild writes a changed report to etc/; otherwise it only goes to the temp folder
      localBuild: update,
      printApiReportDiff: !update,
      messageCallback(message) {
        // API Extractor's own console output (version notices, "the API report changed", ...)
        // is replaced by the summary below
        if (message.category === "console") {
          if (message.messageId === "console-api-report-diff") diff = message.text;
          if (message.logLevel !== "error") message.logLevel = "none";
        }
        if (message.logLevel === "error" || message.logLevel === "warning") {
          problems.push(message.formatMessageWithLocation(root));
        }
        message.handled = true;
      },
    });
  } catch (err) {
    problems.push(err instanceof Error ? err.message : String(err));
  }

  if (problems.length || !config || !result) {
    failed++;
    console.error(`✖ ${pkg.name}:\n  ${problems.join("\n  ")}`);
    continue;
  }

  // One report per package: the "complete" variant, `<unscoped-name>.api.md`
  const reportPath = join(config.reportFolder, config.reportConfigs[0].fileName);
  const shortPath = relative(root, reportPath).replaceAll("\\", "/");
  if (result.apiReportChanged) {
    if (update) {
      console.log(`✎ ${pkg.name}: updated ${shortPath}`);
    } else {
      changed.push(shortPath);
      console.error(`✖ ${pkg.name}: ${shortPath} differs from the build`);
      if (diff) printDiff(diff);
    }
    continue;
  }
  console.log(`✔ ${pkg.name}`);
}

rmSync(tempRoot, { recursive: true, force: true });

if (changed.length) {
  console.error(
    `\nThe public API changed in:\n  ${changed.join("\n  ")}\n\n` +
      "If the change is intended, run 'pnpm build && pnpm api:update', commit the report(s), and\n" +
      "add a changeset for each package with the right bump (CONTRIBUTING.md, 'API reports')."
  );
}
if (failed) console.error(`\n${String(failed)} package(s) failed.`);
if (changed.length || failed) process.exit(1);

/** API Extractor's diff of the committed report and the new one, cut short for the CI log */
function printDiff(text) {
  const lines = text.split("\n");
  const max = 120;
  console.error(lines.slice(0, max).join("\n"));
  if (lines.length > max) console.error(`  … ${String(lines.length - max)} more lines`);
}
