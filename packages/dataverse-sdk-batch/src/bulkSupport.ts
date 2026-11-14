/**
 * @fileoverview Which bulk-operation messages a table supports (#346), read from
 * `sdkmessagefilters` and the table's metadata, and cached per client and table.
 */

import {
  DataverseInvalidRequestError,
  parseODataError,
  type DataverseClient,
} from "@mohsinonxrm/dataverse-sdk-core";
import { deadlineOf } from "./stop.js";

/** Which bulk-operation messages a table supports. */
export interface BulkOperationSupport {
  /** The table's logical name, lower-cased, e.g. `"account"`. */
  logicalName: string;

  /** True for an elastic table (`TableType` `"Elastic"`): it supports all four messages. */
  elastic: boolean;

  /** `CreateMultiple`: the table has an `sdkmessagefilter` for it, or is elastic. */
  createMultiple: boolean;

  /** `UpdateMultiple`: the table has an `sdkmessagefilter` for it, or is elastic. */
  updateMultiple: boolean;

  /**
   * `UpsertMultiple`: the table supports both `CreateMultiple` and `UpdateMultiple` (Dataverse
   * has no filter row for it), or has a filter for it, or is elastic.
   */
  upsertMultiple: boolean;

  /** `DeleteMultiple`: only elastic tables support it. */
  deleteMultiple: boolean;
}

/** Options for {@link getBulkOperationSupport}. */
export interface BulkOperationSupportOptions {
  /** Read the support again instead of using the cached answer, and cache the new one. */
  refresh?: boolean;

  /** Cancels the lookup. */
  signal?: AbortSignal;

  /** Time limit for each of the lookup's requests, in ms, retries included. */
  timeoutMs?: number;
}

/** The bulk messages whose `sdkmessagefilter` rows are looked up. */
const MESSAGES = ["CreateMultiple", "UpdateMultiple", "UpsertMultiple", "DeleteMultiple"] as const;

/** A table's logical name: safe to put in a quoted OData literal and a key segment as it is. */
const LOGICAL_NAME = /^[A-Za-z_][A-Za-z0-9_]*$/;

/** Answers per client, then per lower-cased logical name. Only successful lookups are cached. */
const cache = new WeakMap<DataverseClient, Map<string, BulkOperationSupport>>();

/**
 * Which bulk-operation messages (`CreateMultiple`, `UpdateMultiple`, `UpsertMultiple`,
 * `DeleteMultiple`) a table supports.
 *
 * Elastic tables support all four. A standard table supports `CreateMultiple` or
 * `UpdateMultiple` when it has an `sdkmessagefilter` row for the message, `UpsertMultiple` when
 * it supports both, and never `DeleteMultiple`. The lookup is read-only: two `GET`s, one for the
 * table's `TableType` (`EntityDefinitions`) and one for its `sdkmessagefilters`. The answer is
 * cached per client and table for the life of the client; pass `refresh: true` to read it again
 * (for example after a solution adds bulk support to a custom table).
 *
 * `createMultiple()`, `updateMultiple()`, `upsertMultiple()` and `deleteMultiple()` use it with
 * `strategy: "auto"` (and `deleteMultiple()` with `"bulk"`, to reject a standard table).
 *
 * @param client - The client to send the lookups with
 * @param logicalName - The table's logical name, e.g. `"account"`
 * @param options - `refresh`, `signal` and `timeoutMs`
 * @returns The messages the table supports
 * @throws DataverseInvalidRequestError for an invalid logical name
 * @throws DataverseODataError when a lookup fails, e.g. 404 for a table that doesn't exist, or 403
 *   without read access to `sdkmessagefilter`
 *
 * @example
 * ```typescript
 * import { getBulkOperationSupport } from "@mohsinonxrm/dataverse-sdk-batch";
 *
 * const support = await getBulkOperationSupport(client, "account");
 * if (support.createMultiple) {
 *   // send CreateMultiple
 * }
 * ```
 */
export async function getBulkOperationSupport(
  client: DataverseClient,
  logicalName: string,
  options: BulkOperationSupportOptions = {}
): Promise<BulkOperationSupport> {
  if (!LOGICAL_NAME.test(logicalName)) {
    throw new DataverseInvalidRequestError(
      `getBulkOperationSupport: logicalName must be a table's logical name, got ${JSON.stringify(logicalName)}.`
    );
  }
  const name = logicalName.toLowerCase();
  let perClient = cache.get(client);
  if (!perClient) {
    perClient = new Map();
    cache.set(client, perClient);
  }
  const cached = perClient.get(name);
  if (cached && !options.refresh) return { ...cached };

  const [tableType, messages] = await Promise.all([
    readTableType(client, name, options),
    readMessageFilters(client, name, options),
  ]);
  const elastic = tableType === "Elastic";
  const createMultiple = elastic || messages.has("createmultiple");
  const updateMultiple = elastic || messages.has("updatemultiple");
  const support: BulkOperationSupport = {
    logicalName: name,
    elastic,
    createMultiple,
    updateMultiple,
    upsertMultiple: elastic || (createMultiple && updateMultiple) || messages.has("upsertmultiple"),
    deleteMultiple: elastic,
  };
  perClient.set(name, support);
  return { ...support };
}

/** `GET EntityDefinitions(LogicalName='<name>')?$select=TableType`: the table's `TableType`. */
async function readTableType(
  client: DataverseClient,
  name: string,
  options: BulkOperationSupportOptions
): Promise<string | undefined> {
  const body = await getJson(
    client,
    `EntityDefinitions(LogicalName='${name}')`,
    { $select: "TableType" },
    options
  );
  const value = isRecord(body) ? body.TableType : undefined;
  return typeof value === "string" ? value : undefined;
}

/**
 * The lower-cased names of the bulk messages the table has `sdkmessagefilter` rows for, as
 * Microsoft's "Availability with standard tables" query reads them, for all four messages in one
 * request.
 */
async function readMessageFilters(
  client: DataverseClient,
  name: string,
  options: BulkOperationSupportOptions
): Promise<Set<string>> {
  const byMessage = MESSAGES.map((m) => `sdkmessageid/name eq '${m}'`).join(" or ");
  const body = await getJson(
    client,
    "sdkmessagefilters",
    {
      $select: "sdkmessagefilterid",
      $expand: "sdkmessageid($select=name)",
      $filter: `primaryobjecttypecode eq '${name}' and (${byMessage})`,
    },
    options
  );
  const rows = isRecord(body) && Array.isArray(body.value) ? (body.value as unknown[]) : [];
  const names = new Set<string>();
  for (const row of rows) {
    const message = isRecord(row) && isRecord(row.sdkmessageid) ? row.sdkmessageid.name : undefined;
    if (typeof message === "string") names.add(message.toLowerCase());
  }
  return names;
}

async function getJson(
  client: DataverseClient,
  url: string,
  query: Record<string, string>,
  options: BulkOperationSupportOptions
): Promise<unknown> {
  // Called by the bulk helpers with their execution's signal: its timeoutMs
  // deadline goes along, so a long Retry-After fails at once instead of at the timeout (#487).
  const deadline = deadlineOf(options.signal);
  const response = await client.send({
    method: "GET",
    url,
    query,
    headers: { accept: "application/json" },
    ...(options.signal ? { signal: options.signal } : {}),
    ...(deadline !== undefined ? { deadline } : {}),
    ...(options.timeoutMs !== undefined ? { timeoutMs: options.timeoutMs } : {}),
  });
  if (!response.ok) throw await parseODataError(response);
  return (await response.json()) as unknown;
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}
