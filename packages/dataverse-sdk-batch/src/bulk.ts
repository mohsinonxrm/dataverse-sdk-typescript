/**
 * @fileoverview Bulk helpers (#310, #434): `createMultiple()`, `updateMultiple()`,
 * `upsertMultiple()` and `deleteMultiple()` split a list of records into chunks, send each chunk
 * as one `CreateMultiple` / `UpdateMultiple` / `UpsertMultiple` / `DeleteMultiple` request (or as
 * one `$batch`), and report what happened to every record.
 */

import {
  DataverseError,
  DataverseInvalidRequestError,
  DataverseODataError,
  normalizeHeaders,
  parseODataError,
  type DataverseClient,
} from "@mohsinonxrm/dataverse-sdk-core";
import { BatchRequestBuilder } from "./BatchRequestBuilder.js";
import { entityIdFromBatchResponse } from "./entityId.js";
import { getBulkOperationSupport, type BulkOperationSupport } from "./bulkSupport.js";
import { executionSignal, fromStop, stopError, type ExecutionSignal } from "./stop.js";

/**
 * How the records are sent.
 *
 * - `"bulk"`: one `CreateMultiple` / `UpdateMultiple` / `UpsertMultiple` / `DeleteMultiple`
 *   request per chunk. On a standard table a chunk succeeds or fails as a whole (Dataverse rolls
 *   it back); on an elastic table records fail one by one. `DeleteMultiple` exists for elastic
 *   tables only.
 * - `"batch"`: one `$batch` per chunk, with one create (`POST`), update or upsert (`PATCH`) or
 *   delete (`DELETE`) per record and `Prefer: odata.continue-on-error`, so every record succeeds
 *   or fails on its own. For tables that don't support the bulk messages.
 */
export type BulkStrategy = "bulk" | "batch";

/** The table the records belong to. */
export interface BulkTable {
  /** Logical name, e.g. `"account"`. Each record is sent with `@odata.type` `Microsoft.Dynamics.CRM.<logicalName>`. */
  logicalName: string;
  /** Entity set name, e.g. `"accounts"`: the URL the requests go to. */
  entitySetName: string;
  /**
   * Primary key column, e.g. `"accountid"`. An update names its record with it, and a record's
   * `id` in the result is read from it when the response doesn't carry one.
   * @default `${logicalName}id` (activity tables use `"activityid"`: set it for them)
   */
  primaryIdAttribute?: string;
}

/**
 * Options for {@link createMultiple}, {@link updateMultiple}, {@link upsertMultiple} and
 * {@link deleteMultiple}.
 */
export interface BulkOperationOptions {
  /**
   * How the records are sent: `"bulk"` (the `CreateMultiple` / `UpdateMultiple` /
   * `UpsertMultiple` / `DeleteMultiple` messages), `"batch"` (`$batch`, for tables without bulk
   * support), or `"auto"`: `"bulk"` when the table supports the message, otherwise `"batch"`, as
   * `getBulkOperationSupport()` tells (looked up once per client and table, then cached). See
   * {@link BulkStrategy}.
   * @default "bulk"; `"auto"` for {@link deleteMultiple}, since only elastic tables have `DeleteMultiple`
   */
  strategy?: BulkStrategy | "auto";

  /**
   * Records per request (1 to 1000). Microsoft suggests 100 to 1,000 for standard tables and 100
   * for elastic tables; send fewer when requests hit the size or time limits.
   * @default 100
   */
  batchSize?: number;

  /**
   * Requests sent at the same time. The client's concurrency limit (`DataverseClientOptions.concurrency`)
   * still applies on top of it.
   * @default 1
   */
  maxParallel?: number;

  /**
   * Keep sending the remaining chunks after a chunk with a failed record. By default no chunk is
   * sent after one with a failure, and the records of the chunks not sent are `"skipped"`.
   * Chunks already in flight (with `maxParallel` above 1) still finish.
   * @default false
   */
  continueOnError?: boolean;

  /**
   * Headers for every request, e.g. `{ "MSCRM.BypassCustomPluginExecution": "true" }` or an
   * impersonation header. With `"batch"` they go on the `$batch` request.
   */
  headers?: Record<string, string>;

  /**
   * Cancels the operation: the requests in flight are aborted and no more are sent. An abort
   * doesn't undo records Dataverse already wrote. See {@link DataverseBulkOperationError}.
   */
  signal?: AbortSignal;

  /**
   * Time limit for the whole operation, in ms: every request, with its retries and waits. When it
   * passes, the operation stops as with `signal`, with `DataverseNetworkError` (`RequestTimeout`).
   * A retry whose wait (`Retry-After` or backoff) would end after it is not attempted: the
   * request fails at once with its own error (`DataverseThrottleError` for a 429).
   */
  timeoutMs?: number;

  /** Time limit for each attempt of each request, in ms. A timed-out attempt is not retried. */
  attemptTimeoutMs?: number;

  /**
   * Correlation id sent with every request (`x-ms-correlation-id`), so the requests of one
   * operation can be found together. A new one is generated per request when omitted.
   */
  correlationId?: string;
}

/**
 * What happened to one record.
 *
 * - `"succeeded"`: Dataverse created, updated, upserted or deleted it.
 * - `"failed"`: it wasn't written; `error` says why. On a standard table with `"bulk"`, every
 *   record of a chunk fails with the chunk's error, since Dataverse rolls the chunk back.
 * - `"skipped"`: it was never sent, because an earlier chunk failed (without `continueOnError`).
 */
export type BulkRecordStatus = "succeeded" | "failed" | "skipped";

/** The result for one record, at the same position as the record in the input. */
export interface BulkRecordResult {
  /** Position of the record in the input. */
  index: number;

  /** What happened to the record. */
  status: BulkRecordStatus;

  /**
   * The record id. For a create: the id Dataverse returned, or the primary key the record set.
   * For an update or a delete: the record's primary key. For an upsert: the record's primary key,
   * the GUID of its `@odata.id` (`accounts(<id>)`), or, with `"batch"`, the id in the response.
   * Absent when none is known (e.g. an upsert by alternate key with `"bulk"`).
   */
  id?: string;

  /**
   * Why the record failed: the typed error of its request (`DataverseODataError`,
   * `DataverseThrottleError`, `DataverseNetworkError`, …). For a record an elastic table reports
   * as failed, a `DataverseODataError` with the record's own `status`, whose `cause` is the
   * request's error.
   */
  error?: Error;
}

/** Result of {@link createMultiple}, {@link updateMultiple}, {@link upsertMultiple} or {@link deleteMultiple}. */
export interface BulkOperationResult {
  /** How the records were sent. */
  strategy: BulkStrategy;

  /** One result per input record, in input order. */
  results: BulkRecordResult[];

  /** True when every record succeeded. */
  success: boolean;

  /** Number of records that succeeded. */
  succeeded: number;

  /** Number of records that failed. */
  failed: number;

  /** Number of records never sent. */
  skipped: number;

  /** Requests sent: bulk-message calls (`CreateMultiple`, …), or `$batch` requests (retries not counted). */
  requests: number;

  /** True when chunks were left unsent because a chunk failed or the operation was stopped. */
  stoppedEarly: boolean;
}

/** Details for {@link DataverseBulkOperationError}. */
export interface DataverseBulkOperationErrorInit {
  /** What happened to every record before the operation stopped. */
  result: BulkOperationResult;
  /** Why it stopped: `DataverseAbortError`, or `DataverseNetworkError` (`RequestTimeout`). */
  cause?: unknown;
}

/**
 * Thrown by the bulk helpers ({@link createMultiple}, {@link updateMultiple},
 * {@link upsertMultiple}, {@link deleteMultiple}) when `signal` aborts or `timeoutMs`
 * passes after at least one request has finished. `result` holds every record's outcome: the
 * records of the requests in flight are `"failed"` with the abort error (Dataverse may still have
 * written them), and the records never sent are `"skipped"`. `cause` is the abort error.
 *
 * Stopped before any request finished, the helpers reject with the abort error itself
 * (`DataverseAbortError`, or `DataverseNetworkError` named `RequestTimeout`), as
 * `BatchRequestBuilder.execute()` does.
 */
export class DataverseBulkOperationError extends DataverseError {
  /** What happened to every record before the operation stopped. */
  readonly result: BulkOperationResult;

  constructor(message: string, init: DataverseBulkOperationErrorInit) {
    super(message, init.cause !== undefined ? { cause: init.cause } : undefined);
    this.name = "DataverseBulkOperationError";
    this.result = init.result;
  }
}

/**
 * Creates records in chunks with `CreateMultiple`, or with `$batch` (`strategy: "batch"`), and
 * reports the outcome of every record.
 *
 * Records are sent as given, with `@odata.type` added unless the record sets it. Failed records
 * don't make it throw: check `result.success` and each record's `status` and `error`.
 *
 * Requests go through the client, so its retry policy (429 and transient failures) and
 * concurrency limit apply to each of them.
 *
 * @param client - The client to send the requests with
 * @param table - The table: logical name and entity set name
 * @param records - The records to create, as Web API bodies (`{ name: "Contoso" }`)
 * @param options - Chunk size, strategy, parallelism and cancellation
 * @returns The outcome of every record, in input order; a created record's id is in `id`
 * @throws DataverseInvalidRequestError for invalid input, before anything is sent
 * @throws DataverseAbortError or DataverseNetworkError (`RequestTimeout`) when stopped before any
 *   request finished, otherwise {@link DataverseBulkOperationError} with the result so far
 *
 * @example
 * ```typescript
 * import { createMultiple } from "@mohsinonxrm/dataverse-sdk-batch";
 *
 * const result = await createMultiple(
 *   client,
 *   { logicalName: "account", entitySetName: "accounts" },
 *   [{ name: "Contoso" }, { name: "Fabrikam" }],
 *   { batchSize: 500 }
 * );
 * const ids = result.results.map((r) => r.id); // in input order
 * for (const r of result.results) {
 *   if (r.status === "failed") console.error(`Record ${r.index}:`, r.error?.message);
 * }
 * ```
 */
export function createMultiple(
  client: DataverseClient,
  table: BulkTable,
  records: readonly object[],
  options: BulkOperationOptions = {}
): Promise<BulkOperationResult> {
  return runBulkOperation(client, "CreateMultiple", table, records, options);
}

/**
 * Updates records in chunks with `UpdateMultiple`, or with `$batch` (`strategy: "batch"`), and
 * reports the outcome of every record.
 *
 * Each record names the row it updates with its primary key (`table.primaryIdAttribute`,
 * `"<logicalName>id"` by default) and holds only the columns to change. Records are sent with
 * `@odata.type` added unless the record sets it. With `"batch"`, each record is a
 * `PATCH <entitySet>(<id>)` with `If-Match: *`, so a missing row fails instead of being created,
 * as with `UpdateMultiple`.
 *
 * Failed records don't make it throw: check `result.success` and each record's `status` and
 * `error`. Requests go through the client, so its retry policy and concurrency limit apply.
 *
 * @param client - The client to send the requests with
 * @param table - The table: logical name, entity set name and, when it isn't `<logicalName>id`,
 *   the primary key column
 * @param records - The changes, each with the record's primary key
 * @param options - Chunk size, strategy, parallelism and cancellation
 * @returns The outcome of every record, in input order
 * @throws DataverseInvalidRequestError for invalid input (with `"batch"`, also a record without a
 *   GUID primary key), before anything is sent
 * @throws DataverseAbortError or DataverseNetworkError (`RequestTimeout`) when stopped before any
 *   request finished, otherwise {@link DataverseBulkOperationError} with the result so far
 *
 * @example
 * ```typescript
 * import { updateMultiple } from "@mohsinonxrm/dataverse-sdk-batch";
 *
 * const result = await updateMultiple(
 *   client,
 *   { logicalName: "account", entitySetName: "accounts" },
 *   accountIds.map((accountid) => ({ accountid, creditlimit: 75000 }))
 * );
 * if (!result.success) console.error(`${result.failed} record(s) failed`);
 * ```
 */
export function updateMultiple(
  client: DataverseClient,
  table: BulkTable,
  records: readonly object[],
  options: BulkOperationOptions = {}
): Promise<BulkOperationResult> {
  return runBulkOperation(client, "UpdateMultiple", table, records, options);
}

/**
 * Creates or updates records in chunks with `UpsertMultiple`, or with `$batch`
 * (`strategy: "batch"`), and reports the outcome of every record.
 *
 * Each record names the row it creates or updates, in one of two ways:
 *
 * - its primary key (`table.primaryIdAttribute`, `"<logicalName>id"` by default): a row with that
 *   id is updated, or created with that id;
 * - `@odata.id`, the row's URL relative to the Web API root, by primary key (`accounts(<id>)`) or
 *   by alternate key (`accounts(accountnumber='A-1')`; write the key as for any Web API URL, e.g.
 *   with `odataKey()` from the core package).
 *
 * Records are sent as given, with `@odata.type` added unless the record sets it. With `"batch"`,
 * each record is a `PATCH <entitySet>(<key>)` without `If-Match`, which Dataverse treats as an
 * upsert; `@odata.id` (or, when it names the row, the primary key) is left out of the body.
 * Dataverse rejects two records naming the same row in one `UpsertMultiple`, so a list that does
 * is rejected before anything is sent.
 *
 * `strategy: "auto"` sends `UpsertMultiple` when the table supports both `CreateMultiple` and
 * `UpdateMultiple` (every elastic table does), otherwise `$batch`. Failed records don't make it
 * throw: check `result.success` and each record's `status` and `error`. Requests go through the
 * client, so its retry policy and concurrency limit apply.
 *
 * @param client - The client to send the requests with
 * @param table - The table: logical name, entity set name and, when it isn't `<logicalName>id`,
 *   the primary key column
 * @param records - The records, each with its primary key or `@odata.id`
 * @param options - Chunk size, strategy, parallelism and cancellation
 * @returns The outcome of every record, in input order
 * @throws DataverseInvalidRequestError for invalid input (a record that names no row, or two that
 *   name the same row), before anything is sent
 * @throws DataverseAbortError or DataverseNetworkError (`RequestTimeout`) when stopped before any
 *   request finished, otherwise {@link DataverseBulkOperationError} with the result so far
 *
 * @example
 * ```typescript
 * import { upsertMultiple } from "@mohsinonxrm/dataverse-sdk-batch";
 * import { odataKey } from "@mohsinonxrm/dataverse-sdk-core";
 *
 * const result = await upsertMultiple(
 *   client,
 *   { logicalName: "account", entitySetName: "accounts" },
 *   rows.map((row) => ({
 *     "@odata.id": `accounts(${odataKey({ accountnumber: row.number })})`,
 *     name: row.name,
 *   })),
 *   { strategy: "auto" }
 * );
 * if (!result.success) console.error(`${result.failed} record(s) failed`);
 * ```
 */
export function upsertMultiple(
  client: DataverseClient,
  table: BulkTable,
  records: readonly object[],
  options: BulkOperationOptions = {}
): Promise<BulkOperationResult> {
  return runBulkOperation(client, "UpsertMultiple", table, records, options);
}

/**
 * Deletes records in chunks with `DeleteMultiple` (elastic tables), or with `$batch`, and reports
 * the outcome of every record.
 *
 * Each record is the row's id (a GUID), or an object with its primary key
 * (`table.primaryIdAttribute`, `"<logicalName>id"` by default) and, for an elastic table that
 * uses partitions, its `partitionid`.
 *
 * Dataverse has `DeleteMultiple` for elastic tables only. The default strategy, `"auto"`, sends
 * it for an elastic table and `$batch` otherwise, as `getBulkOperationSupport()` tells (looked up
 * once per client and table). `"bulk"` on a standard table is rejected with
 * `DataverseInvalidRequestError` before anything is deleted. With `"batch"`, each record is a
 * `DELETE <entitySet>(<id>)` (`<entitySet>(<primaryIdAttribute>=<id>,partitionid='<p>')` with a
 * `partitionid`), so a row that doesn't exist fails on its own (404) while the others are
 * deleted.
 *
 * Failed records don't make it throw: check `result.success` and each record's `status` and
 * `error`. Requests go through the client, so its retry policy and concurrency limit apply.
 *
 * @param client - The client to send the requests with
 * @param table - The table: logical name, entity set name and, when it isn't `<logicalName>id`,
 *   the primary key column
 * @param records - The rows to delete: ids, or objects with the primary key (and `partitionid`)
 * @param options - Chunk size, strategy (default `"auto"`), parallelism and cancellation
 * @returns The outcome of every record, in input order; `id` is the row's id
 * @throws DataverseInvalidRequestError for invalid input (a record without a GUID id), or for
 *   `strategy: "bulk"` on a table that isn't elastic, before anything is deleted
 * @throws DataverseAbortError or DataverseNetworkError (`RequestTimeout`) when stopped before any
 *   request finished, otherwise {@link DataverseBulkOperationError} with the result so far
 *
 * @example
 * ```typescript
 * import { deleteMultiple } from "@mohsinonxrm/dataverse-sdk-batch";
 *
 * const result = await deleteMultiple(
 *   client,
 *   { logicalName: "account", entitySetName: "accounts" },
 *   accountIds
 * );
 * for (const r of result.results) {
 *   if (r.status === "failed") console.error(`Record ${r.id}:`, r.error?.message);
 * }
 * ```
 */
export function deleteMultiple(
  client: DataverseClient,
  table: BulkTable,
  records: ReadonlyArray<string | object>,
  options: BulkOperationOptions = {}
): Promise<BulkOperationResult> {
  return runBulkOperation(client, "DeleteMultiple", table, records, {
    ...options,
    strategy: options.strategy ?? "auto",
  });
}

// ─────────────────────────────── implementation ───────────────────────────────

/** The messages the helpers send. */
type BulkMessage = "CreateMultiple" | "UpdateMultiple" | "UpsertMultiple" | "DeleteMultiple";

/** The outcome of one record of a chunk (no `index`: the chunk knows it). */
interface Outcome {
  status: "succeeded" | "failed";
  id?: string;
  error?: Error;
}

/** One record, checked and ready to send either way. */
interface Item {
  /** The bulk message's target, without `@odata.type` unless the record set it. */
  target: Record<string, unknown>;
  /** The record's own id (GUID), when it has one. */
  id?: string;
  /** For `$batch`: the URL of the row, relative to the Web API root (`accounts(<id>)`). */
  path?: string;
  /** For `$batch`: the body of the `POST` / `PATCH`. */
  body?: Record<string, unknown>;
}

/** Everything a chunk needs to be sent. */
interface Plan {
  client: DataverseClient;
  message: BulkMessage;
  table: Required<BulkTable>;
  items: Item[];
  strategy: BulkStrategy;
  options: BulkOperationOptions;
}

const DEFAULT_BATCH_SIZE = 100;
const MAX_BATCH_SIZE = 1000;
const GUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
/** A logical name or entity set name: what can go into `@odata.type` and the URL unescaped. */
const NAME = /^[A-Za-z_][A-Za-z0-9_]*$/;
/** Asks Dataverse for the per-record error details of elastic tables. */
const ERROR_DETAILS_PREFERENCE =
  'odata.include-annotations="Microsoft.PowerApps.CDS.ErrorDetails.*"';

async function runBulkOperation(
  client: DataverseClient,
  message: BulkMessage,
  table: BulkTable,
  records: readonly unknown[],
  options: BulkOperationOptions
): Promise<BulkOperationResult> {
  const { requested, ...checked } = validate(client, message, table, records, options);
  const batchSize = options.batchSize ?? DEFAULT_BATCH_SIZE;
  const count = checked.items.length;
  const results: BulkRecordResult[] = checked.items.map((_, index) => ({
    index,
    status: "skipped",
  }));

  const chunks: number[][] = [];
  for (let start = 0; start < count; start += batchSize) {
    chunks.push(Array.from({ length: Math.min(batchSize, count - start) }, (_, i) => start + i));
  }

  const execution = executionSignal(options.signal, options.timeoutMs);
  try {
    const strategy = await resolveStrategy(checked, requested, execution);
    return await runChunks({ ...checked, strategy }, chunks, results, execution);
  } finally {
    execution.dispose();
  }
}

/**
 * The strategy to send with. `"auto"` asks `getBulkOperationSupport()` (cached per client and
 * table) whether the table supports the message: `"bulk"` when it does, otherwise `"batch"`.
 * `"bulk"` for `DeleteMultiple` asks too, and rejects a table that isn't elastic before anything
 * is deleted. Nothing is looked up for an empty list.
 */
async function resolveStrategy(
  plan: Omit<Plan, "strategy">,
  requested: BulkStrategy | "auto",
  execution: ExecutionSignal
): Promise<BulkStrategy> {
  if (plan.items.length === 0) return requested === "auto" ? "bulk" : requested;
  if (requested === "batch") return "batch";
  if (requested === "bulk" && plan.message !== "DeleteMultiple") return "bulk";
  let support: BulkOperationSupport;
  try {
    support = await getBulkOperationSupport(plan.client, plan.table.logicalName, {
      ...(execution.signal ? { signal: execution.signal } : {}),
    });
  } catch (caught) {
    throw fromStop(caught, execution, plan.options.timeoutMs);
  }
  const supported = {
    CreateMultiple: support.createMultiple,
    UpdateMultiple: support.updateMultiple,
    UpsertMultiple: support.upsertMultiple,
    DeleteMultiple: support.deleteMultiple,
  }[plan.message];
  if (requested === "bulk" && !supported) {
    throw new DataverseInvalidRequestError(
      `${plan.message}: "${plan.table.logicalName}" is not an elastic table, and Dataverse supports DeleteMultiple for elastic tables only. Use strategy "auto" (the default) or "batch" to delete the records with $batch.`
    );
  }
  return supported ? "bulk" : "batch";
}

/** Sends the chunks, `maxParallel` at a time, and fills in `results`. */
async function runChunks(
  plan: Plan,
  chunks: number[][],
  results: BulkRecordResult[],
  execution: ExecutionSignal
): Promise<BulkOperationResult> {
  const { options } = plan;
  let next = 0;
  let sent = 0;
  let finished = 0;
  let halted = false;
  let stop: Error | undefined;

  const apply = (chunk: number[], outcomes: Outcome[]): void => {
    chunk.forEach((index, i) => {
      results[index] = { index, ...outcomes[i] };
    });
  };

  const worker = async (): Promise<void> => {
    while (!halted && next < chunks.length) {
      const chunk = chunks[next++];
      if (execution.signal?.aborted) {
        next--; // not sent
        halted = true;
        stop ??= stopError(execution, options.timeoutMs);
        return;
      }
      sent++;
      let outcomes: Outcome[];
      try {
        outcomes =
          plan.strategy === "bulk"
            ? await sendBulk(plan, chunk, execution)
            : await sendBatch(plan, chunk, execution.signal);
      } catch (caught) {
        // The request failed as a whole (network, auth, throttling after the retries, an abort):
        // every record of the chunk failed with that error.
        const err = fromStop(caught, execution, options.timeoutMs);
        const error = err instanceof Error ? err : new DataverseError(String(err));
        apply(
          chunk,
          chunk.map((index) => ({ status: "failed", error, ...idOf(primaryKeyOf(plan, index)) }))
        );
        if (execution.signal?.aborted) {
          halted = true;
          stop ??= error;
          return;
        }
        outcomes = [];
      }
      if (outcomes.length > 0) apply(chunk, outcomes);
      finished++;
      if (!options.continueOnError && chunk.some((i) => results[i].status === "failed")) {
        halted = true;
      }
    }
  };

  const workers = Math.min(options.maxParallel ?? 1, chunks.length);
  await Promise.all(Array.from({ length: workers }, worker));

  const result = summarize(plan.strategy, results, sent, sent < chunks.length);
  if (stop !== undefined) {
    if (finished === 0) throw stop;
    const reason = stop.message;
    throw new DataverseBulkOperationError(
      `${plan.message} stopped after ${String(finished)} of ${String(chunks.length)} request(s): ${reason}`,
      { result, cause: stop }
    );
  }
  return result;
}

/** Sends one chunk as a `CreateMultiple` / `UpdateMultiple` / `UpsertMultiple` / `DeleteMultiple` request. */
async function sendBulk(
  plan: Plan,
  chunk: number[],
  execution: ExecutionSignal
): Promise<Outcome[]> {
  const { client, table, options } = plan;
  const { signal, deadline } = execution;
  const targets = chunk.map((index) => ({
    "@odata.type": `Microsoft.Dynamics.CRM.${table.logicalName}`,
    ...plan.items[index].target,
  }));

  const headers = normalizeHeaders(options.headers);
  headers["content-type"] = "application/json";
  // Elastic tables report which records failed only when asked for the error details. A caller's
  // own include-annotations preference (e.g. "*") is kept as it is.
  const prefer = headers.prefer as string | undefined;
  if (!/odata\.include-annotations/i.test(prefer ?? "")) {
    headers.prefer = prefer ? `${prefer}, ${ERROR_DETAILS_PREFERENCE}` : ERROR_DETAILS_PREFERENCE;
  }

  const response = await client.send({
    method: "POST",
    url: `${table.entitySetName}/Microsoft.Dynamics.CRM.${plan.message}`,
    headers,
    body: { Targets: targets },
    // timeoutMs is the whole operation's: it is in `signal`, and its deadline goes along (#487).
    ...(signal ? { signal } : {}),
    ...(deadline !== undefined ? { deadline } : {}),
    ...(options.attemptTimeoutMs !== undefined
      ? { attemptTimeoutMs: options.attemptTimeoutMs }
      : {}),
    ...(options.correlationId ? { correlationId: options.correlationId } : {}),
  });

  if (!response.ok) return failedChunk(plan, chunk, await parseODataError(response));

  // CreateMultiple returns the ids in the order of Targets; the others return 204.
  let ids: unknown[] = [];
  if (plan.message === "CreateMultiple") {
    const body: unknown = await response.json().catch(() => undefined);
    const value = isRecord(body) ? body.Ids : undefined;
    if (Array.isArray(value)) ids = value;
  } else {
    await response.body?.cancel().catch(() => undefined);
  }
  return chunk.map((index, i) => {
    const id = ids[i];
    return {
      status: "succeeded",
      ...idOf(typeof id === "string" ? id : primaryKeyOf(plan, index)),
    };
  });
}

/**
 * The outcome of every record of a chunk whose request failed. An elastic table names the
 * records that failed (`…ErrorDetails.BulkApiErrorDetails`), and the others were written; on a
 * standard table the chunk was rolled back, so every record failed with the request's error.
 */
function failedChunk(plan: Plan, chunk: number[], error: Error): Outcome[] {
  const details = error instanceof DataverseError ? bulkErrorDetails(error.body) : undefined;
  if (!details || !(error instanceof DataverseError)) {
    return chunk.map((index) => ({ status: "failed", error, ...idOf(primaryKeyOf(plan, index)) }));
  }
  return chunk.map((index, i): Outcome => {
    const detail = details.get(i);
    if (!detail) return { status: "succeeded", ...idOf(primaryKeyOf(plan, index)) };
    const status = detail.StatusCode ?? error.status;
    const detailId = typeof detail.Id === "string" && GUID.test(detail.Id) ? detail.Id : undefined;
    return {
      status: "failed",
      ...idOf(detailId ?? primaryKeyOf(plan, index)),
      error: new DataverseODataError(
        `Record ${String(index)} failed${status !== undefined ? ` (HTTP ${String(status)})` : ""}: ${error.message}`,
        {
          status,
          code: error.code,
          requestId: error.requestId,
          correlationId: error.correlationId,
          headers: error.headers,
          raw: error.body,
          cause: error,
        }
      ),
    };
  });
}

/** One entry of `Microsoft.PowerApps.CDS.ErrorDetails.BulkApiErrorDetails`. */
interface BulkApiErrorDetail {
  RequestIndex: number;
  Id?: unknown;
  StatusCode?: number;
}

/**
 * The per-record failures an elastic table reports in the error body, by position in the request
 * (`RequestIndex`), or `undefined` when the body has none. The annotation's value is a JSON string
 * (or an array) of `{ RequestIndex, Id, StatusCode }`.
 */
function bulkErrorDetails(body: unknown): Map<number, BulkApiErrorDetail> | undefined {
  const error = isRecord(body) && isRecord(body.error) ? body.error : undefined;
  if (!error) return undefined;
  const key = Object.keys(error).find((k) => /BulkApiErrorDetails$/i.test(k));
  if (key === undefined) return undefined;
  let value: unknown = error[key];
  if (typeof value === "string") {
    try {
      value = JSON.parse(value);
    } catch {
      return undefined;
    }
  }
  if (!Array.isArray(value)) return undefined;
  const details = new Map<number, BulkApiErrorDetail>();
  for (const entry of value) {
    if (!isRecord(entry) || typeof entry.RequestIndex !== "number") continue;
    details.set(entry.RequestIndex, {
      RequestIndex: entry.RequestIndex,
      Id: entry.Id,
      ...(typeof entry.StatusCode === "number" ? { StatusCode: entry.StatusCode } : {}),
    });
  }
  return details.size > 0 ? details : undefined;
}

/** Sends one chunk as a `$batch`, one request per record, with continue-on-error. */
async function sendBatch(
  plan: Plan,
  chunk: number[],
  signal: AbortSignal | undefined
): Promise<Outcome[]> {
  const { client, table, options } = plan;
  const batch = new BatchRequestBuilder(client);
  const key = table.primaryIdAttribute;
  for (const index of chunk) {
    const { path = "", body } = plan.items[index];
    const requestId = `r${String(index)}`;
    switch (plan.message) {
      case "CreateMultiple":
        batch.addRequest(requestId, "POST", table.entitySetName, undefined, body);
        break;
      case "UpdateMultiple":
        // If-Match: * makes it an update only: a missing row fails instead of being created.
        batch.addRequest(requestId, "PATCH", path, { "if-match": "*" }, body);
        break;
      case "UpsertMultiple":
        // No If-Match: Dataverse creates the row when it doesn't exist.
        batch.addRequest(requestId, "PATCH", path, undefined, body);
        break;
      case "DeleteMultiple":
        batch.addRequest(requestId, "DELETE", path);
        break;
    }
  }

  const result = await batch.execute({
    continueOnError: true,
    batchSize: MAX_BATCH_SIZE,
    ...(options.headers ? { headers: options.headers } : {}),
    ...(signal ? { signal } : {}),
    ...(options.attemptTimeoutMs !== undefined
      ? { attemptTimeoutMs: options.attemptTimeoutMs }
      : {}),
    ...(options.correlationId ? { correlationId: options.correlationId } : {}),
  });

  return chunk.map((index): Outcome => {
    const requestId = `r${String(index)}`;
    const step = result.responses.get(requestId);
    const error = result.errors.get(requestId);
    if (error) return { status: "failed", error, ...idOf(primaryKeyOf(plan, index)) };
    if (!step) {
      return {
        status: "failed",
        error: new DataverseError(`Record ${String(index)} got no response in the $batch.`),
        ...idOf(primaryKeyOf(plan, index)),
      };
    }
    let id = primaryKeyOf(plan, index);
    if (plan.message === "CreateMultiple" || plan.message === "UpsertMultiple") {
      try {
        id = entityIdFromBatchResponse(step, { primaryIdAttribute: key });
      } catch {
        // No id in the response (or a URL by alternate key): keep the record's own id, if any.
      }
    }
    return { status: "succeeded", ...idOf(id) };
  });
}

/** Checks the input and resolves the defaults; throws before anything is sent. */
function validate(
  client: DataverseClient,
  message: BulkMessage,
  table: BulkTable,
  records: readonly unknown[],
  options: BulkOperationOptions
): Omit<Plan, "strategy"> & { requested: BulkStrategy | "auto" } {
  const invalid = (what: string): DataverseInvalidRequestError =>
    new DataverseInvalidRequestError(`${message}: ${what}`);

  if (!NAME.test(table.logicalName)) {
    throw invalid(
      `table.logicalName must be a table's logical name, got ${JSON.stringify(table.logicalName)}.`
    );
  }
  if (!NAME.test(table.entitySetName)) {
    throw invalid(
      `table.entitySetName must be an entity set name, got ${JSON.stringify(table.entitySetName)}.`
    );
  }
  const primaryIdAttribute = table.primaryIdAttribute ?? `${table.logicalName}id`;
  if (!NAME.test(primaryIdAttribute)) {
    throw invalid(
      `table.primaryIdAttribute must be a column name, got ${JSON.stringify(primaryIdAttribute)}.`
    );
  }

  const strategy: string = options.strategy ?? "bulk";
  if (strategy !== "bulk" && strategy !== "batch" && strategy !== "auto") {
    throw invalid(`strategy must be "bulk", "batch" or "auto", got ${JSON.stringify(strategy)}.`);
  }
  const batchSize = options.batchSize ?? DEFAULT_BATCH_SIZE;
  if (!Number.isInteger(batchSize) || batchSize < 1 || batchSize > MAX_BATCH_SIZE) {
    throw invalid(
      `batchSize must be an integer from 1 to ${String(MAX_BATCH_SIZE)}, got ${String(batchSize)}.`
    );
  }
  const maxParallel = options.maxParallel ?? 1;
  if (!Number.isInteger(maxParallel) || maxParallel < 1) {
    throw invalid(`maxParallel must be a positive integer, got ${String(maxParallel)}.`);
  }
  if (!Array.isArray(records)) throw invalid("records must be an array.");

  const set = table.entitySetName;
  const noKey = (index: number, what: string): DataverseInvalidRequestError =>
    invalid(
      `record ${String(index)} has no GUID in "${primaryIdAttribute}", the primary key that names the row to ${what}. Set table.primaryIdAttribute if the table's primary key has another name.`
    );
  /** For UpsertMultiple: the row each record names, to reject duplicates. */
  const rows = new Map<string, number>();

  const items = records.map((record, index): Item => {
    if (message === "DeleteMultiple" && typeof record === "string") {
      if (!GUID.test(record)) {
        throw invalid(`record ${String(index)} is not a GUID, got ${JSON.stringify(record)}.`);
      }
      return { target: { [primaryIdAttribute]: record }, id: record, path: `${set}(${record})` };
    }
    if (typeof record !== "object" || record === null || Array.isArray(record)) {
      throw invalid(`record ${String(index)} is not an object.`);
    }
    const value = record as Record<string, unknown>;
    const id = guidOf(value[primaryIdAttribute]);
    const { [primaryIdAttribute]: _key, ...changes } = value;

    switch (message) {
      case "CreateMultiple":
        return { target: value, body: value, ...idOf(id) };

      case "UpdateMultiple":
        // "auto" may pick $batch, which needs the key for the URL.
        if (!id && strategy !== "bulk") throw noKey(index, "update");
        return {
          target: value,
          body: changes,
          ...idOf(id),
          ...(id ? { path: `${set}(${id})` } : {}),
        };

      case "UpsertMultiple": {
        const named = value["@odata.id"];
        let item: Item;
        let row: string;
        if (named === undefined) {
          if (!id) {
            throw invalid(
              `record ${String(index)} names no row: set its primary key ("${primaryIdAttribute}", a GUID) or "@odata.id" (e.g. "${set}(<key>=<value>)" for an alternate key). Set table.primaryIdAttribute if the table's primary key has another name.`
            );
          }
          item = { target: value, body: changes, id, path: `${set}(${id})` };
          row = id.toLowerCase();
        } else {
          const segment = typeof named === "string" ? rowSegment(set, named) : undefined;
          if (segment === undefined) {
            throw invalid(
              `record ${String(index)} has "@odata.id" ${JSON.stringify(named)}, which isn't a row of ${set}: write it as "${set}(<id>)" or "${set}(<key>=<value>)".`
            );
          }
          const { "@odata.id": _named, ...rest } = value;
          const keyId = guidOf(segment.key);
          item = { target: value, body: rest, path: segment.path, ...idOf(id ?? keyId) };
          row = keyId ? keyId.toLowerCase() : segment.key;
        }
        const earlier = rows.get(row);
        if (earlier !== undefined) {
          throw invalid(
            `records ${String(earlier)} and ${String(index)} name the same row; Dataverse rejects an UpsertMultiple that names a row twice.`
          );
        }
        rows.set(row, index);
        return item;
      }

      case "DeleteMultiple": {
        if (!id) throw noKey(index, "delete");
        const partition = value.partitionid;
        if (partition !== undefined && typeof partition !== "string") {
          throw invalid(`record ${String(index)} has a "partitionid" that isn't a string.`);
        }
        const path =
          partition === undefined
            ? `${set}(${id})`
            : `${set}(${primaryIdAttribute}=${id},partitionid='${encodeUnsafe(partition.replace(/'/g, "''"))}')`;
        return { target: value, id, path };
      }
    }
  });

  return {
    client,
    message,
    table: { ...table, primaryIdAttribute },
    items,
    requested: strategy,
    options,
  };
}

/**
 * The row an `@odata.id` names in `set`: its URL relative to the Web API root (characters that
 * can't go into a request line percent-encoded) and the text of its key. An absolute URL, or
 * one with a leading `/`, is accepted when it ends with `<set>(<key>)`.
 */
function rowSegment(set: string, odataId: string): { path: string; key: string } | undefined {
  const match = new RegExp(`(?:^|/)(${set}\\((.+)\\))$`).exec(odataId);
  if (!match || /[\r\n\0]/.test(odataId)) return undefined;
  return { path: encodeUnsafe(match[1]), key: match[2] };
}

/** Percent-encodes what can't go into a `$batch` request line as it is (spaces, non-ASCII). */
function encodeUnsafe(text: string): string {
  return text.replace(/[^\x21-\x7e]/gu, (c) => encodeURIComponent(c));
}

/** The value when it is a GUID. */
function guidOf(value: unknown): string | undefined {
  return typeof value === "string" && GUID.test(value) ? value : undefined;
}

/** The record's own id, when it has one. */
function primaryKeyOf(plan: Plan, index: number): string | undefined {
  return plan.items[index].id;
}

/** `{ id }` when there is one, so results don't carry `id: undefined`. */
function idOf(id: string | undefined): { id?: string } {
  return id === undefined ? {} : { id };
}

function summarize(
  strategy: BulkStrategy,
  results: BulkRecordResult[],
  requests: number,
  stoppedEarly: boolean
): BulkOperationResult {
  let succeeded = 0;
  let failed = 0;
  let skipped = 0;
  for (const r of results) {
    if (r.status === "succeeded") succeeded++;
    else if (r.status === "failed") failed++;
    else skipped++;
  }
  return {
    strategy,
    results,
    success: failed === 0 && skipped === 0,
    succeeded,
    failed,
    skipped,
    requests,
    stoppedEarly,
  };
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}
