#!/usr/bin/env node
/**
 * `pnpm --filter generate-sdk-types regen` (#293): regenerate the actions, functions and messages
 * packages and the generated docs from the committed `$metadata` snapshot, then format them.
 *
 * It reads only `metadata/dataverse-metadata.xml`: no org, no credentials, no `.env`, no
 * `sdk-gen.config.json`. CI runs it and fails on any diff, so the committed packages are always
 * what the generator makes from the committed snapshot. To take a new snapshot, see
 * `metadata/README.md`.
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import * as prettier from "prettier";
import { generateTargets, type GenerationTarget } from "./index.js";
import { OPERATION_DOCS, renderOperationBlocks } from "./docs/operation-docs.js";

const root = fileURLToPath(new URL("../../../", import.meta.url));
const snapshot = join(root, "tools", "generate-sdk-types", "metadata", "dataverse-metadata.xml");
const kinds = ["actions", "functions", "messages"] as const satisfies readonly GenerationTarget[];
const srcDir = (kind: string): string => join(root, "packages", `dataverse-sdk-${kind}`, "src");

await generateTargets(
  {
    targets: {
      actions: { enabled: true, outputPath: srcDir("actions") },
      functions: { enabled: true, outputPath: srcDir("functions") },
      messages: { enabled: true, outputPath: srcDir("messages") },
    },
  },
  [...kinds],
  { fromCsdl: snapshot, purge: true }
);

/** Every file under `dir`, in a stable order. */
function files(dir: string): string[] {
  return readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => join(entry.parentPath, entry.name))
    .sort();
}

/** Format `path` with the repository's prettier config (`.prettierignore` skips the packages). */
async function format(path: string): Promise<boolean> {
  const options = await prettier.resolveConfig(path);
  const before = readFileSync(path, "utf8");
  const after = await prettier.format(before, { ...options, filepath: path });
  if (after !== before) writeFileSync(path, after);
  return after !== before;
}

console.log("🎨 Formatting the generated packages...");
let formatted = 0;
for (const kind of kinds) {
  for (const path of files(srcDir(kind))) if (await format(path)) formatted++;
}
console.log(`✅ Formatted ${String(formatted)} files\n`);

// The operation lists and counts in the READMEs and docs/mapping (#88, #293)
let docs = 0;
for (const doc of OPERATION_DOCS) {
  const path = join(root, doc);
  const before = readFileSync(path, "utf8");
  writeFileSync(path, renderOperationBlocks(before, root));
  await format(path);
  if (readFileSync(path, "utf8") !== before) {
    docs++;
    console.log(`📝 Updated ${doc}`);
  }
}
console.log(`✅ ${String(docs)} of ${String(OPERATION_DOCS.length)} docs updated`);
