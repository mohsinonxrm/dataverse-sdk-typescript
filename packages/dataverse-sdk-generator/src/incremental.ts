/**
 * Incremental generation (#347): a stamp file in the output folder records a hash of each table's
 * schema model and of the settings every file depends on, and the files the run wrote. The next
 * incremental run skips (doesn't render or write) a table whose hash and settings are unchanged
 * and whose files are still there, and removes files the previous run wrote that this one didn't.
 *
 * It also keeps each table's metadata (as RetrieveMetadataChanges returned it) and the
 * `ServerVersionStamp` of the run (#429), so the next run asks Dataverse only what changed since
 * then and reads again only the tables that changed.
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { type EntityMetadataDetail, optionValues } from "./metadata-service.js";
import type { DataverseGenConfig } from "./types.js";

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
  tables: Record<string, { hash: string; files: string[]; metadata?: EntityMetadataDetail }>;
  /** Every file the run wrote or kept, relative to the output folder, with `/`. */
  files: string[];
  /**
   * The metadata the tables' `metadata` was read from (#429): left out when Dataverse returned no
   * version stamp, and then the next run reads every table again.
   */
  metadata?: StampMetadata;
}

/** Where and when the metadata in a stamp was read (#429). */
export interface StampMetadata {
  /** The org and Web API version ({@link metadataSource}): another one reads every table again. */
  source: string;
  /**
   * The `ServerVersionStamp` of the run's first metadata request: the next run asks for the
   * changes since then (`ClientVersionStamp`).
   */
  versionStamp: string;
  /**
   * In all-tables mode, the entity types RetrieveMetadataChanges had no table for, so they weren't
   * generated: not asked about again until a change adds them.
   */
  skipped: string[];
}

/** The org and Web API version the metadata comes from, e.g. `https://contoso.crm.dynamics.com/api/data/v9.2`. */
export function metadataSource(config: DataverseGenConfig): string {
  // Trailing slashes dropped with an index scan (a `/\/+$/` regex is polynomial on long input)
  const url = config.environmentUrl;
  let end = url.length;
  while (end > 0 && url[end - 1] === "/") end--;
  return `${url.slice(0, end).toLowerCase()}/api/data/${config.apiVersion ?? "v9.2"}`;
}

/**
 * A copy of `value` without the properties whose value is `null`. RetrieveMetadataChanges returns
 * every property it wasn't asked for as `null`; without them, the metadata kept in the stamp is a
 * fraction of the size.
 */
export function withoutNulls<T>(value: T): T {
  if (Array.isArray(value)) return value.map((item: unknown) => withoutNulls(item)) as T;
  if (value === null || typeof value !== "object") return value;
  const copy: Record<string, unknown> = {};
  for (const [key, item] of Object.entries(value)) {
    if (item !== null) copy[key] = withoutNulls(item);
  }
  return copy as T;
}

const GUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * The MetadataIds in a `DeletedMetadata` collection, lower case. The ids of every kind are taken
 * (each is unique), so how the collection nests its `Values` doesn't matter.
 */
export function deletedIds(deletedMetadata: unknown): Set<string> {
  const ids = new Set<string>();
  const visit = (value: unknown): void => {
    if (typeof value === "string") {
      if (GUID.test(value)) ids.add(value.toLowerCase());
    } else if (Array.isArray(value)) {
      for (const item of value) visit(item);
    } else if (value !== null && typeof value === "object") {
      for (const item of Object.values(value)) visit(item);
    }
  };
  visit(deletedMetadata);
  return ids;
}

/**
 * What a table read again because of a change must show (#429): the columns (logical names, with
 * the option values listed for each) that RetrieveMetadataChanges listed as changed, and the
 * current option values of the global choices that changed.
 */
export interface ChangeExpectation {
  columns: Map<string, number[]>;
  globalChoices: Map<string, number[]>;
}

/**
 * The columns a RetrieveMetadataChanges change lists for a table, by logical name, each with the
 * option values listed for it (a new option is listed under its column). The change holds only
 * what changed, so these are columns that exist now and options they have now.
 */
export function changedColumns(change: EntityMetadataDetail): Map<string, number[]> {
  const columns = new Map<string, number[]>();
  for (const attribute of change.Attributes ?? []) {
    if (!attribute.LogicalName) continue;
    const values = (attribute.OptionSet?.Options ?? [])
      .map((o) => o.Value)
      .filter((v): v is number => typeof v === "number");
    columns.set(attribute.LogicalName, values);
  }
  return columns;
}

/**
 * Why a table read again because of a change doesn't show it yet (#429): a listed column or
 * option missing, a deleted column still there, or a global choice with other values. Empty when
 * the read is current. Right after a change, a request can reach a server whose metadata cache is
 * behind, which answers with the table as it was.
 */
export function staleReasons(
  fresh: EntityMetadataDetail,
  expected: ChangeExpectation,
  deleted: ReadonlySet<string>
): string[] {
  const reasons: string[] = [];
  const byName = new Map((fresh.Attributes ?? []).map((a) => [a.LogicalName, a]));
  for (const [column, values] of expected.columns) {
    const attribute = byName.get(column);
    if (!attribute) {
      reasons.push(`no column ${column}`);
      continue;
    }
    const has = new Set((attribute.OptionSet?.Options ?? []).map((o) => o.Value));
    const missing = values.filter((v) => !has.has(v));
    if (missing.length > 0) reasons.push(`${column} has no option ${missing.join(", ")}`);
  }
  for (const attribute of fresh.Attributes ?? []) {
    if (attribute.MetadataId && deleted.has(attribute.MetadataId.toLowerCase())) {
      reasons.push(`deleted column ${attribute.LogicalName ?? attribute.MetadataId} still there`);
    }
  }
  for (const [name, values] of expected.globalChoices) {
    const columns = (fresh.Attributes ?? []).filter((a) => a.OptionSet?.Name === name);
    const current = values.join(",");
    if (columns.some((a) => optionValues(a.OptionSet?.Options).join(",") !== current)) {
      reasons.push(`global choice ${name} has other option values`);
    }
  }
  return reasons;
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
