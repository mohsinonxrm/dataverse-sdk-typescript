#!/usr/bin/env node
/**
 * Bundle-size budget (#307). The actions, functions and messages packages export about 1,500
 * operation classes each and set `sideEffects: false`; this checks that an app importing a few of
 * them gets only those. Each entry in `scripts/bundle-budgets.json` is bundled for the browser
 * with esbuild (minified, tree-shaken) from the packages' built `dist`, and its gzipped size must
 * stay within its budget. A "tree-shaking" entry must also stay under `maxShareOfFull` of the size
 * of the whole package it imports from. A `browser` entry must import no Node.js built-in, and no
 * entry may import a package listed in its `forbiddenImports` (a name, or a prefix ending in `/`),
 * so a browser entry point can't pull in Node-only peers (#158).
 *
 *   node scripts/check-bundle-size.mjs           check every budget (run after `pnpm build`)
 *   node scripts/check-bundle-size.mjs --update  print the sizes and suggested budgets
 */
import { readFileSync, realpathSync } from "node:fs";
import { builtinModules, createRequire } from "node:module";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";

const root = fileURLToPath(new URL("..", import.meta.url));
// The esbuild tsup builds the packages with; no separate dependency to keep in step.
const esbuild = createRequire(realpathSync(join(root, "node_modules", "tsup", "package.json")))(
  "esbuild"
);
const config = JSON.parse(readFileSync(join(root, "scripts", "bundle-budgets.json"), "utf8"));

/**
 * `@mohsinonxrm/dataverse-sdk-<name>` → that package's built entry, and `…/<subpath>` → its
 * `dist/<subpath>.js` (the package's `exports`); other packages are left out.
 */
const workspace = {
  name: "workspace",
  setup(build) {
    build.onResolve({ filter: /^@mohsinonxrm\/dataverse-sdk-[a-z-]+(?:\/[a-z-]+)?$/ }, (args) => {
      const [pkg, subpath] = args.path.replace("@mohsinonxrm/", "").split("/");
      return { path: join(root, "packages", pkg, "dist", `${subpath ?? "index"}.js`) };
    });
    // Peer dependencies (MSAL, OpenTelemetry, …) belong to the app, not to the SDK's budget.
    build.onResolve({ filter: /^[^./]/ }, (args) =>
      args.path.startsWith("@mohsinonxrm/") ? undefined : { path: args.path, external: true }
    );
  },
};

/** Gzipped size of `contents` bundled, and the bare imports left in the bundle. */
async function bundle(contents) {
  const result = await esbuild.build({
    stdin: { contents, resolveDir: root, loader: "js" },
    bundle: true,
    write: false,
    minify: true,
    treeShaking: true,
    format: "esm",
    platform: "browser",
    target: "es2022",
    logLevel: "silent",
    metafile: true,
    plugins: [workspace],
  });
  const imports = Object.values(result.metafile.outputs).flatMap((o) =>
    o.imports.filter((i) => i.external).map((i) => i.path)
  );
  return {
    size: gzipSync(result.outputFiles[0].contents, { level: 9 }).byteLength,
    imports: [...new Set(imports)],
  };
}

const isNodeBuiltin = (name) => name.startsWith("node:") || builtinModules.includes(name);
const matches = (name, pattern) =>
  pattern.endsWith("/")
    ? name.startsWith(pattern)
    : name === pattern || name.startsWith(`${pattern}/`);

const kb = (n) => `${(n / 1024).toFixed(1)} KB`;
const update = process.argv.includes("--update");
const fullSizes = new Map();
let failed = 0;

for (const entry of config.entries) {
  const { size, imports } = await bundle(entry.code);
  let line = `${entry.name.padEnd(42)} ${kb(size).padStart(10)}`;
  if (update) {
    // 15% headroom, rounded up to the next 0.5 KB
    const suggested = Math.ceil((size * 1.15) / 512) * 512;
    console.log(`${line}   suggested budget ${String(suggested)}`);
    continue;
  }
  const problems = [];
  if (size > entry.budget) problems.push(`over its budget of ${kb(entry.budget)}`);
  const forbidden = imports.filter(
    (name) =>
      (entry.browser && isNodeBuiltin(name)) ||
      (entry.forbiddenImports ?? []).some((pattern) => matches(name, pattern))
  );
  if (forbidden.length > 0) problems.push(`imports ${forbidden.join(", ")}, which it must not`);
  if (entry.fullPackage) {
    let full = fullSizes.get(entry.fullPackage);
    if (full === undefined) {
      ({ size: full } = await bundle(
        `import * as all from "${entry.fullPackage}"; globalThis.keep = all;`
      ));
      fullSizes.set(entry.fullPackage, full);
    }
    const share = size / full;
    line += `   ${(share * 100).toFixed(1)}% of all of ${entry.fullPackage} (${kb(full)})`;
    if (share > entry.maxShareOfFull) {
      problems.push(
        `${(share * 100).toFixed(1)}% of the whole package, more than ${String(entry.maxShareOfFull * 100)}%: tree-shaking isn't removing the unused operations`
      );
    }
  }
  if (problems.length > 0) {
    failed++;
    console.error(`✖ ${line}\n    ${problems.join("; ")}`);
  } else {
    console.log(`✔ ${line}`);
  }
}

if (failed > 0) {
  console.error(
    `\n${String(failed)} bundle(s) over budget. If the growth is intended, raise the budget in scripts/bundle-budgets.json (node scripts/check-bundle-size.mjs --update suggests one) and say why in the PR.`
  );
  process.exit(1);
}
if (!update) console.log("\nAll bundles are within their budgets.");
