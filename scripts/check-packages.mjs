#!/usr/bin/env node
/**
 * Package hygiene gate for publishing (#108): runs publint and @arethetypeswrong/cli (ESM-only
 * profile) on every published package. Run after `pnpm build`. Exits non-zero on any publint
 * error or attw problem, so a broken `exports`/`types` setup never reaches npm.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

// fileURLToPath, not URL.pathname: on Windows that is "/C:/…" with %20 for spaces (#365).
const root = fileURLToPath(new URL("..", import.meta.url));

/**
 * `node <the package's bin script>`: the same on every platform, where spawning
 * `node_modules/.bin/<name>` needs a shell for the `.cmd` shim on Windows.
 */
function bin(pkgName, binName) {
  const dir = join(root, "node_modules", pkgName);
  const { bin: bins } = JSON.parse(readFileSync(join(dir, "package.json"), "utf8"));
  const script = typeof bins === "string" ? bins : bins[binName];
  return [process.execPath, [join(dir, script)]];
}
let failed = 0;

for (const dir of readdirSync(join(root, "packages")).sort()) {
  const pkgDir = join(root, "packages", dir);
  let pkg;
  try {
    pkg = JSON.parse(readFileSync(join(pkgDir, "package.json"), "utf8"));
  } catch {
    continue;
  }
  if (pkg.private) continue;

  const checks = [
    ["publint", bin("publint", "publint"), ["--level", "error"]],
    [
      "attw",
      bin("@arethetypeswrong/cli", "attw"),
      ["--pack", ".", "--profile", "esm-only", "--format", "ascii"],
    ],
  ];
  let ok = true;
  for (const [label, [cmd, prefix], args] of checks) {
    const r = spawnSync(cmd, [...prefix, ...args], { cwd: pkgDir, encoding: "utf8" });
    if (r.status !== 0) {
      ok = false;
      failed++;
      console.error(`✖ ${pkg.name}: ${label} failed\n${r.stdout}${r.stderr}`);
    }
  }
  if (ok) console.log(`✔ ${pkg.name}`);
}

if (failed) {
  console.error(`\n${String(failed)} package check(s) failed.`);
  process.exit(1);
}
console.log("\nAll published packages pass publint and attw.");
