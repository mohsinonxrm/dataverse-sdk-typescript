#!/usr/bin/env node
/**
 * Builds the non-interactive Node samples and runs each one, in turn, against a live Dataverse
 * org: `pnpm samples:live`. CI runs it after the live integration suite, in the same job and
 * concurrency group (integration-tests.yml and release.yml's `live` job).
 *
 * Needs the same four variables as the integration suite (never logged):
 *   DATAVERSE_URL, DATAVERSE_TENANT_ID, DATAVERSE_CLIENT_ID, DATAVERSE_CLIENT_SECRET
 * The app registration must be an application user in the org with the System Administrator
 * role (metadata-ops creates and deletes tables).
 *
 * Every sample names what it creates with `sdk-sample-<tag>` (SAMPLE_RUN_TAG, set here) and
 * deletes it before it exits, also when it fails part-way. A sample that fails, or can't delete
 * what it created, exits non-zero; this script runs the remaining samples anyway and exits
 * non-zero if any of them failed.
 *
 *   node scripts/samples-live.mjs [sample ...]   # run only the named samples
 *   node scripts/samples-live.mjs --no-build     # skip the build (CI built everything already)
 *
 * samples/node-cli-devicecode needs a person to sign in and samples/spa-fluentui-v9 is a browser
 * app with its own tests, so neither runs here.
 */
import { spawnSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/** The samples in the order they run, with the extra settings each gets. */
const SAMPLES = [
  // 25 accounts instead of 100: the same calls, less load on the shared org
  { dir: "daemon-clientcredentials", env: { BATCH_SIZE: "25" } },
  { dir: "actions-functions", env: {} },
  { dir: "batch-ops", env: {} },
  { dir: "messages-sales-cs", env: {} },
  // `new`: the default publisher's prefix, as the live metadata tests use
  { dir: "metadata-ops", env: { SCHEMA_PREFIX: "new" } },
];

/** A sample that runs longer than this is stopped and counts as failed. */
const TIMEOUT_MS = 25 * 60_000;

const REQUIRED = [
  "DATAVERSE_URL",
  "DATAVERSE_TENANT_ID",
  "DATAVERSE_CLIENT_ID",
  "DATAVERSE_CLIENT_SECRET",
];

const args = process.argv.slice(2);
const build = !args.includes("--no-build");
const only = args.filter((a) => !a.startsWith("--"));
const unknown = only.filter((name) => !SAMPLES.some((s) => s.dir === name));
if (unknown.length > 0) {
  console.error(`Unknown sample(s): ${unknown.join(", ")}`);
  console.error(`Samples: ${SAMPLES.map((s) => s.dir).join(", ")}`);
  process.exit(1);
}
const selected = only.length > 0 ? SAMPLES.filter((s) => only.includes(s.dir)) : SAMPLES;

const missing = REQUIRED.filter((name) => !process.env[name]);
if (missing.length > 0) {
  console.error(`samples:live needs a Dataverse org. Missing: ${missing.join(", ")}`);
  console.error("Set DATAVERSE_URL, DATAVERSE_TENANT_ID, DATAVERSE_CLIENT_ID and");
  console.error("DATAVERSE_CLIENT_SECRET (an app registration that is an application user in the");
  console.error("org), as for `pnpm test:integration`.");
  process.exit(1);
}

const pnpm = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
const packageName = (dir) =>
  JSON.parse(readFileSync(join(root, "samples", dir, "package.json"), "utf8")).name;

if (build) {
  console.log("Building the samples and the packages they use...");
  const filters = selected.map((s) => `--filter=${packageName(s.dir)}...`);
  const res = spawnSync(pnpm, ["exec", "turbo", "run", "build", ...filters], {
    cwd: root,
    stdio: "inherit",
    shell: process.platform === "win32",
  });
  if (res.status !== 0) {
    console.error("The build failed.");
    process.exit(1);
  }
}

// One base tag per run; each sample adds its index, so a sample only ever deletes its own rows
const base = randomBytes(4).readUInt32BE(0).toString(36).slice(0, 5).padStart(5, "0");
console.log(`Run tag: ${base} (records are named sdk-sample-${base}<n>...)`);

// Fold each sample's log in the Actions UI
const ci = process.env.GITHUB_ACTIONS === "true";
const results = [];
for (const [i, sample] of selected.entries()) {
  const cwd = join(root, "samples", sample.dir);
  const entry = join(cwd, "dist", "index.js");
  const tag = `${base}${String(i + 1)}`;
  console.log(`\n${ci ? "::group::" : "=== "}${sample.dir} (sdk-sample-${tag})`);
  const started = Date.now();
  let status;
  if (!existsSync(entry)) {
    console.error(`${entry} doesn't exist; build the sample first.`);
    status = 1;
  } else {
    const res = spawnSync(process.execPath, [entry], {
      cwd,
      stdio: "inherit",
      timeout: TIMEOUT_MS,
      env: { ...process.env, ...sample.env, SAMPLE_RUN_TAG: tag, FORCE_COLOR: "1" },
    });
    if (res.error) console.error(`${sample.dir}: ${res.error.message}`);
    status = res.status ?? 1;
  }
  const seconds = Math.round((Date.now() - started) / 1000);
  if (ci) console.log("::endgroup::");
  console.log(`${status === 0 ? "PASS" : "FAIL"} ${sample.dir} (${String(seconds)}s)`);
  results.push({ dir: sample.dir, tag, status, seconds });
}

console.log("\nSamples against the live org:");
for (const r of results) {
  console.log(
    `  ${r.status === 0 ? "PASS" : "FAIL"}  ${r.dir.padEnd(26)} sdk-sample-${r.tag}  ${String(r.seconds)}s`
  );
}
const failed = results.filter((r) => r.status !== 0);
if (failed.length > 0) {
  console.error(
    `\n${String(failed.length)} sample(s) failed: ${failed.map((r) => r.dir).join(", ")}. ` +
      "Anything a failed sample couldn't delete is named sdk-sample-<its tag> (see its log)."
  );
  process.exit(1);
}
