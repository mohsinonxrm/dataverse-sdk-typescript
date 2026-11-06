#!/usr/bin/env node
/**
 * `pnpm --filter generate-sdk-types regen` (#293): regenerate everything the generator owns from
 * the committed `$metadata` snapshot, then format it:
 *
 * - the actions, functions and messages packages (`src/`);
 * - the metadata package's types (`packages/dataverse-sdk-metadata/src/types`, #295);
 * - the entity sets and primary keys of `createEntityReference`
 *   (`packages/dataverse-sdk-entities-runtime/src/generated`, #295);
 * - the generated docs.
 *
 * The actions, functions and messages packages get only the platform, Sales and Customer Service
 * operations (#304): the ones whose solutions (`metadata/operation-solutions.json`) are prebuilt
 * in `metadata/prebuilt-solutions.json`. The solution table in `metadata/README.md` is rewritten
 * from the same two files.
 *
 * It reads only the files in `metadata/`: no org, no credentials, no `.env`, no
 * `sdk-gen.config.json`. CI runs it and fails on any diff, so the committed files are always
 * what the generator makes from the committed snapshot. To take a new snapshot, see
 * `metadata/README.md`.
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import * as prettier from "prettier";
import { ALL_TARGETS, generateTargets } from "./index.js";
import { OPERATION_DOCS, renderOperationBlocks } from "./docs/operation-docs.js";
import { type PrebuiltSolutions, renderSolutionBlocks } from "./prebuilt.js";
import type { OperationSolutions } from "./solutions.js";

const root = fileURLToPath(new URL("../../../", import.meta.url));
const metadataDir = join(root, "tools", "generate-sdk-types", "metadata");
const snapshot = join(metadataDir, "dataverse-metadata.xml");
const readJson = <T>(name: string): T => JSON.parse(readFileSync(join(metadataDir, name), "utf8")) as T;
const prebuilt = {
  operationSolutions: readJson<OperationSolutions>("operation-solutions.json"),
  prebuilt: readJson<PrebuiltSolutions>("prebuilt-solutions.json"),
};
const packageDir = (name: string, ...path: string[]): string =>
  join(root, "packages", `dataverse-sdk-${name}`, ...path);

/** Where each target writes; `regen` purges and rewrites each of these folders. */
const outputs = {
  metadata: packageDir("metadata", "src", "types"),
  references: packageDir("entities-runtime", "src", "generated"),
  messages: packageDir("messages", "src"),
  actions: packageDir("actions", "src"),
  functions: packageDir("functions", "src"),
} as const satisfies Record<(typeof ALL_TARGETS)[number], string>;

await generateTargets(
  {
    targets: {
      metadata: { enabled: true, outputPath: outputs.metadata },
      references: { enabled: true, outputPath: outputs.references },
      messages: { enabled: true, outputPath: outputs.messages },
      actions: { enabled: true, outputPath: outputs.actions },
      functions: { enabled: true, outputPath: outputs.functions },
    },
  },
  [...ALL_TARGETS],
  { fromCsdl: snapshot, purge: true, prebuilt }
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

console.log("🎨 Formatting the generated files...");
let formatted = 0;
for (const dir of Object.values(outputs)) {
  for (const path of files(dir)) if (await format(path)) formatted++;
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

// The solution table (#304)
const readme = join(metadataDir, "README.md");
const before = readFileSync(readme, "utf8");
writeFileSync(readme, renderSolutionBlocks(before, prebuilt));
await format(readme);
if (readFileSync(readme, "utf8") !== before) console.log("📝 Updated the solution table");
