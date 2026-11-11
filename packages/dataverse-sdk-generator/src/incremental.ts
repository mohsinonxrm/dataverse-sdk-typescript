/**
 * Incremental generation (#347): a stamp file in the output folder records a hash of each table's
 * schema model and of the settings every file depends on, and the files the run wrote. The next
 * incremental run skips (doesn't render or write) a table whose hash and settings are unchanged
 * and whose files are still there, and removes files the previous run wrote that this one didn't.
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import * as fs from "node:fs/promises";
import * as path from "node:path";

/** The stamp file, in the output folder. */
export const STAMP_FILE = ".dataverse-gen-stamp.json";

/** The generator's version (package.json is one folder up from `src/` and `dist/`). */
export const GENERATOR_VERSION = (
  JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf-8")) as {
    version: string;
  }
).version;

/** What the stamp file holds. */
export interface GenerationStamp {
  /** The stamp format. */
  format: 1;
  /** The generator version that wrote it: another version regenerates everything. */
  generator: string;
  /** Hash of what every table depends on: options, templates, the names of the generated tables. */
  settings: string;
  /**
   * Per table (logical name): the hash of its schema model and of the types it uses (enums, complex
   * types, the names of its create, update and form types), and the files generated from it.
   */
  tables: Record<string, { hash: string; files: string[] }>;
  /** Every file the run wrote or kept, relative to the output folder, with `/`. */
  files: string[];
}

/** SHA-256 of the parts, hex. */
export function hashOf(...parts: string[]): string {
  const hash = createHash("sha256");
  for (const part of parts) hash.update(part).update("\0");
  return hash.digest("hex");
}

/** The stamp of the previous run in `outputRoot`, or `undefined` (none, or unreadable). */
export async function readStamp(outputRoot: string): Promise<GenerationStamp | undefined> {
  try {
    const stamp = JSON.parse(
      await fs.readFile(path.join(outputRoot, STAMP_FILE), "utf-8")
    ) as Partial<GenerationStamp>;
    return stamp.format === 1 && stamp.tables && Array.isArray(stamp.files)
      ? (stamp as GenerationStamp)
      : undefined;
  } catch {
    return undefined;
  }
}

/** Write the stamp of this run. */
export async function writeStamp(outputRoot: string, stamp: GenerationStamp): Promise<void> {
  await fs.writeFile(
    path.join(outputRoot, STAMP_FILE),
    JSON.stringify(stamp, null, 2) + "\n",
    "utf-8"
  );
}

/** Whether every file (relative to `outputRoot`) exists. */
export async function allExist(outputRoot: string, files: string[]): Promise<boolean> {
  for (const file of files) {
    try {
      await fs.access(path.join(outputRoot, file));
    } catch {
      return false;
    }
  }
  return true;
}

/**
 * Remove the files the previous run wrote that this run didn't (a table, enum or operation no
 * longer generated). Only paths inside `outputRoot` that the stamp lists are touched.
 */
export async function removeStale(
  outputRoot: string,
  previous: string[],
  current: Set<string>
): Promise<string[]> {
  const root = path.resolve(outputRoot);
  const removed: string[] = [];
  for (const file of previous) {
    if (current.has(file)) continue;
    const full = path.resolve(root, file);
    if (!full.startsWith(root + path.sep)) continue;
    await fs.rm(full, { force: true });
    removed.push(file);
  }
  return removed;
}
