#!/usr/bin/env node
/**
 * Every published package must load from CommonJS with `require()` (Node 22.12+ loads ESM that
 * way), not only with `import`. A top-level `await` anywhere in a package's module graph breaks
 * that with ERR_REQUIRE_ASYNC_MODULE (#364). Run after `pnpm build`; part of `pnpm check:packages`.
 */
import { readdirSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
let failed = 0;

for (const dir of readdirSync(join(root, "packages")).sort()) {
  const pkgDir = join(root, "packages", dir);
  let pkg;
  try {
    pkg = JSON.parse(readFileSync(join(pkgDir, "package.json"), "utf8"));
  } catch {
    continue;
  }
  if (pkg.private || !pkg.exports?.["."]) continue;

  try {
    // Resolve the package by its own name from inside it (self-reference through `exports`).
    createRequire(join(pkgDir, "package.json"))(pkg.name);
    console.log(`✔ require("${pkg.name}")`);
  } catch (error) {
    failed++;
    console.error(
      `✖ require("${pkg.name}") failed: ${error?.code ?? ""} ${error?.message ?? error}`
    );
  }
}

if (failed) {
  console.error(`\n${String(failed)} package(s) can't be loaded with require().`);
  process.exit(1);
}
console.log("\nAll published packages load with require().");
