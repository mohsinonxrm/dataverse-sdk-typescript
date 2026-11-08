/**
 * @fileoverview Bulk helpers (#310): `createMultiple()` and `updateMultiple()` split a list of
 * records into chunks, send each chunk as one `CreateMultiple` / `UpdateMultiple` request (or as
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
 * - `"bulk"`: one `CreateMultiple` / `UpdateMultiple` request per chunk. On a standard table a
 *   chunk succeeds or fails as a whole (Dataverse rolls it back); on an elastic table records
 *   fail one by one.
 * - `"batch"`: one `$batch` per chunk, with one create (`POST`) or update (`PATCH`) per record and
 *   `Prefer: odata.continue-on-error`, so every record succeeds or fails on its own. For tables
 *   that don't support the bulk messages.
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

/** Options for {@link createMultiple} and {@link updateMultiple}. */
export interface BulkOperationOptions {
  /**
   * How the records are sent: `"bulk"` (the `CreateMultiple` / `UpdateMultiple` messages),
   * `"batch"` (`$batch`, for tables without bulk support), or `"auto"`: `"bulk"` when the table
   * supports the message, otherwise `"batch"`, as `getBulkOperationSupport()` tells (looked up
   * once per client and table, then cached). See {@link BulkStrategy}.
   * @default "bulk"
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
 * - `"succeeded"`: Dataverse created or updated it.
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
   * For an update: the record's primary key. Absent when neither is known.
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

/** Result of {@link createMultiple} or {@link updateMultiple}. */
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

  /** Requests sent: `CreateMultiple` / `UpdateMultiple` calls, or `$batch` requests (retries not counted). */
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
 * Thrown by {@link createMultiple} and {@link updateMultiple} when `signal` aborts or `timeoutMs`
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

// ─────────────────────────────── implementation ───────────────────────────────

/** The messages the helpers send. */
type BulkMessage = "CreateMultiple" | "UpdateMultiple";

/** The outcome of one record of a chunk (no `index`: the chunk knows it). */
interface Outcome {
  status: "succeeded" | "failed";
  id?: string;
  error?: Error;
}

/** Everything a chunk needs to be sent. */
interface Plan {
  client: DataverseClient;
  message: BulkMessage;
  table: Required<BulkTable>;
  records: Array<Record<string, unknown>>;
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
  records: readonly object[],
  options: BulkOperationOptions
): Promise<BulkOperationResult> {
  const { requested, ...checked } = validate(client, message, table, records, options);
  const batchSize = options.batchSize ?? DEFAULT_BATCH_SIZE;
  const results: BulkRecordResult[] = checked.records.map((_, index) => ({
    index,
    status: "skipped",
  }));

  const chunks: number[][] = [];
  for (let start = 0; start < checked.records.length; start += batchSize) {
    chunks.push(
      Array.from(
        { length: Math.min(batchSize, checked.records.length - start) },
        (_, i) => start + i
      )
    );
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
 * Nothing is looked up for an empty list.
 */
async function resolveStrategy(
  plan: Omit<Plan, "strategy">,
  requested: BulkStrategy | "auto",
  execution: ExecutionSignal
): Promise<BulkStrategy> {
  if (requested !== "auto") return requested;
  if (plan.records.length === 0) return "bulk";
  let support: BulkOperationSupport;
  try {
    support = await getBulkOperationSupport(plan.client, plan.table.logicalName, {
      ...(execution.signal ? { signal: execution.signal } : {}),
    });
  } catch (caught) {
    throw fromStop(caught, execution, plan.options.timeoutMs);
  }
  const supported =
    plan.message === "CreateMultiple" ? support.createMultiple : support.updateMultiple;
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
            ? await sendBulk(plan, chunk, execution.signal)
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

/** Sends one chunk as a `CreateMultiple` / `UpdateMultiple` request. */
async function sendBulk(
  plan: Plan,
  chunk: number[],
  signal: AbortSignal | undefined
): Promise<Outcome[]> {
  const { client, table, options } = plan;
  const targets = chunk.map((index) => ({
    "@odata.type": `Microsoft.Dynamics.CRM.${table.logicalName}`,
    ...plan.records[index],
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
    ...(signal ? { signal } : {}),
    ...(options.attemptTimeoutMs !== undefined
      ? { attemptTimeoutMs: options.attemptTimeoutMs }
      : {}),
    ...(options.correlationId ? { correlationId: options.correlationId } : {}),
  });

  if (!response.ok) return failedChunk(plan, chunk, await parseODataError(response));

  // CreateMultiple returns the ids in the order of Targets; UpdateMultiple returns 204.
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
    const record = plan.records[index];
    if (plan.message === "CreateMultiple") {
      batch.addRequest(`r${String(index)}`, "POST", table.entitySetName, undefined, record);
    } else {
      const { [key]: id, ...changes } = record;
      // If-Match: * makes it an update only: a missing row fails instead of being created.
      batch.addRequest(
        `r${String(index)}`,
        "PATCH",
        `${table.entitySetName}(${String(id)})`,
        { "if-match": "*" },
        changes
      );
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
      };
    }
    let id = primaryKeyOf(plan, index);
    if (plan.message === "CreateMultiple") {
      try {
        id = entityIdFromBatchResponse(step, { primaryIdAttribute: key });
      } catch {
        // No id in the response: keep the record's own primary key, if it set one.
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
  records: readonly object[],
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

  const list = records.map((record, index) => {
    if (typeof record !== "object" || record === null || Array.isArray(record)) {
      throw invalid(`record ${String(index)} is not an object.`);
    }
    const value = record as Record<string, unknown>;
    // "auto" may pick $batch, which needs the key for the URL.
    if (message === "UpdateMultiple" && strategy !== "bulk") {
      const id = value[primaryIdAttribute];
      if (typeof id !== "string" || !GUID.test(id)) {
        throw invalid(
          `record ${String(index)} has no GUID in "${primaryIdAttribute}", the primary key that names the row to update. Set table.primaryIdAttribute if the table's primary key has another name.`
        );
      }
    }
    return value;
  });

  return {
    client,
    message,
    table: { ...table, primaryIdAttribute },
    records: list,
    requested: strategy,
    options,
  };
}

/** The record's own primary key, when it sets one. */
function primaryKeyOf(plan: Plan, index: number): string | undefined {
  const id = plan.records[index][plan.table.primaryIdAttribute];
  return typeof id === "string" && GUID.test(id) ? id : undefined;
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
