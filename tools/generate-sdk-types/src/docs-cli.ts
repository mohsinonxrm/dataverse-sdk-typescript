#!/usr/bin/env node
/**
 * `pnpm --filter generate-sdk-types docs`: regenerate the operation lists and counts in the docs
 * from the committed actions, functions and messages packages (#88). Run it after regenerating
 * the packages; `test/operation-docs.test.ts` fails while a doc is stale.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { OPERATION_DOCS, renderOperationBlocks } from "./docs/operation-docs.js";

const root = fileURLToPath(new URL("../../../", import.meta.url));
let changed = 0;
for (const doc of OPERATION_DOCS) {
  const path = join(root, doc);
  const before = readFileSync(path, "utf8");
  const after = renderOperationBlocks(before, root);
  if (after !== before) {
    writeFileSync(path, after);
    changed++;
    console.log(`updated ${doc}`);
  }
}
console.log(`${String(changed)} of ${String(OPERATION_DOCS.length)} docs updated`);
