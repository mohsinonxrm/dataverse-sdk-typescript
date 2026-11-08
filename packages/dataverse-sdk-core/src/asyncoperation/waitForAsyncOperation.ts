import type { DataverseClient } from "../client/DataverseClient.js";
import type { RequestOptions } from "../abstractions/options.js";
import { DataverseError } from "../errors/DataverseError.js";
import { DataverseAsyncOperationError } from "../errors/DataverseAsyncOperationError.js";
import {
  DataverseAbortError,
  DataverseInvalidRequestError,
  DataverseNetworkError,
} from "../errors/NamedErrors.js";
import { isTimeoutError, startDeadline } from "../utils/signals.js";
import { sleep } from "../utils/sleep.js";

/** `statecode` of a system job (`asyncoperation`). */
export const AsyncOperationStateCode = {
  Ready: 0,
  Suspended: 1,
  Locked: 2,
  Completed: 3,
} as const;

/** `statuscode` of a system job (`asyncoperation`). The last three come with `Completed`. */
export const AsyncOperationStatusCode = {
  WaitingForResources: 0,
  Waiting: 10,
  InProgress: 20,
  Pausing: 21,
  Canceling: 22,
  Succeeded: 30,
  Failed: 31,
  Canceled: 32,
} as const;

/**
 * A system job (`asyncoperation`) as `waitForAsyncOperation()` reads it: the columns below, plus
 * any extra ones asked for with `select`.
 */
export interface AsyncOperation {
  asyncoperationid: string;
  /** Name of the job, e.g. the bulk delete's `JobName`. */
  name?: string | null;
  /** Type of the job, e.g. `13` for bulk delete or `10` for a workflow. */
  operationtype?: number | null;
  /** See `AsyncOperationStateCode`. */
  statecode: number;
  /** See `AsyncOperationStatusCode`. */
  statuscode: number;
  /** The job's message: details of what went wrong, for a failed job. */
  message?: string | null;
  /** The job's message for people. */
  friendlymessage?: string | null;
  /** Error code of a failed or canceled job, as a signed integer (e.g. `-2147220891`). */
  errorcode?: number | null;
  /** When the job started (ISO 8601, UTC). */
  startedon?: string | null;
  /** When the job completed (ISO 8601, UTC). */
  completedon?: string | null;
  [column: string]: unknown;
}

/**
 * Something that names a system job: the result of an action that starts one. `asyncoperationid`
 * is the job record that `ExecuteWorkflow`, `ImportRecordsImport` and similar actions return;
 * `AsyncOperationId` is in the response of the `…Async` actions (`ImportSolutionAsync`,
 * `ExportSolutionAsync`, …); `JobId` is in the response of `BulkDelete` and
 * `BulkDetectDuplicates`. The first one present is used.
 */
export interface AsyncOperationIdSource {
  asyncoperationid?: string | null;
  AsyncOperationId?: string | null;
  JobId?: string | null;
}

/** The system job to wait for: its id, or a response that carries it. */
export type AsyncOperationRef = string | AsyncOperationIdSource;

/** Options for `waitForAsyncOperation()`. */
export interface WaitForAsyncOperationOptions {
  /** Wait before the second read, in ms (the first read is immediate). @default 2000 */
  intervalMs?: number;
  /** Each wait is the previous one times this; `1` polls at a fixed interval. @default 1.5 */
  backoff?: number;
  /** Longest wait between two reads, in ms. @default 30000 */
  maxIntervalMs?: number;
  /**
   * Give up after this long, in ms, and reject with `DataverseAsyncOperationError`
   * (`reason: "timeout"`). The job itself keeps running. @default no limit
   */
  timeoutMs?: number;
  /** Stop waiting when it aborts: the wait rejects with `DataverseAbortError`. The job keeps running. */
  signal?: AbortSignal;
  /**
   * Called after every read, the last one included, with the job as read. Use it to show
   * progress. It must not throw; an error it throws is ignored.
   */
  onProgress?: (operation: AsyncOperation) => void;
  /** More columns to read, e.g. `["data", "executiontimespan"]`; they appear on the result. */
  select?: readonly string[];
  /**
   * Options for each read, such as `headers` or `middlewareOptions`. The wait's `signal` and
   * `timeoutMs` above cover every read; a `timeoutMs` here limits one read.
   */
  requestOptions?: Omit<RequestOptions, "signal">;
}

const COLUMNS = [
  "asyncoperationid",
  "name",
  "operationtype",
  "statecode",
  "statuscode",
  "message",
  "friendlymessage",
  "errorcode",
  "startedon",
  "completedon",
];

const GUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Wait for a system job (`asyncoperation`) to finish: bulk delete, `ExecuteWorkflow`, an async
 * solution import or export, a data import, and so on. It reads `asyncoperations(<id>)` until the
 * job completes: at once, then after `intervalMs`, with each wait `backoff` times longer, up to
 * `maxIntervalMs`. The reads go through the client, so its retry, concurrency, auth and logging
 * apply to each one.
 *
 * - Resolves with the job when it succeeds (`statuscode` 30).
 * - Rejects with `DataverseAsyncOperationError` when it fails (`reason: "failed"`) or is canceled
 *   (`reason: "canceled"`), with the job's `friendlymessage` (else `message`) as the error message,
 *   or when `timeoutMs` passes first (`reason: "timeout"`).
 * - Rejects with `DataverseAbortError` when `signal` aborts, and with the read's error when a read
 *   fails (for example `DataverseODataError` with status 404 when the job doesn't exist, or was
 *   deleted on success, as a workflow set to delete its completed jobs does).
 *
 * A suspended job (`statecode` 1, waiting to be retried or postponed) is waited for like any
 * other; use `timeoutMs` or `signal` to bound the wait.
 *
 * @param client - The client to read the job with.
 * @param asyncOperation - The job's id, or the response of the action that started it (see
 *   `AsyncOperationIdSource`). `null` or `undefined` (an action that answered 204) is refused.
 *
 * @example
 * ```typescript
 * const { JobId } = await client.api("BulkDelete").post<{ JobId: string }>({
 *   QuerySet: [{ EntityName: "account", Criteria: { FilterOperator: "And", Conditions: [] } }],
 *   JobName: "Delete accounts",
 *   SendEmailNotification: false,
 *   ToRecipients: [],
 *   CCRecipients: [],
 *   RecurrencePattern: "",
 *   StartDateTime: new Date().toISOString(),
 * });
 * try {
 *   const job = await waitForAsyncOperation(client, JobId, {
 *     timeoutMs: 10 * 60_000,
 *     onProgress: (op) => console.log(`statuscode ${op.statuscode}`),
 *   });
 *   console.log(`Done at ${job.completedon}`);
 * } catch (err) {
 *   if (err instanceof DataverseAsyncOperationError) console.error(err.reason, err.message);
 *   throw err;
 * }
 * ```
 */
export async function waitForAsyncOperation(
  client: DataverseClient,
  asyncOperation: AsyncOperationRef | null | undefined,
  options: WaitForAsyncOperationOptions = {}
): Promise<AsyncOperation> {
  const id = asyncOperationId(asyncOperation);
  const intervalMs = positive("intervalMs", options.intervalMs, 2000);
  const maxIntervalMs = positive("maxIntervalMs", options.maxIntervalMs, 30_000);
  const backoff = options.backoff ?? 1.5;
  if (!(Number.isFinite(backoff) && backoff >= 1)) {
    throw DataverseInvalidRequestError.invalidParameter(
      "backoff",
      `must be a number of at least 1 (got ${String(backoff)})`
    );
  }
  if (options.timeoutMs !== undefined) positive("timeoutMs", options.timeoutMs, 0);

  const deadline =
    options.timeoutMs !== undefined ? startDeadline(options.timeoutMs, options.signal) : undefined;
  const signal = deadline?.signal ?? options.signal;
  const columns = [...new Set([...COLUMNS, ...(options.select ?? [])])];
  let last: AsyncOperation | undefined;
  let wait = Math.min(intervalMs, maxIntervalMs);
  try {
    for (;;) {
      last = await client
        .api(`asyncoperations(${id})`)
        .select(...columns)
        .get<AsyncOperation>({ ...options.requestOptions, signal });
      try {
        options.onProgress?.(last);
      } catch {
        // A progress callback must not end the wait.
      }
      const outcome = outcomeOf(last);
      if (outcome === "succeeded") return last;
      if (outcome) throw jobError(id, outcome, last);
      await sleep(wait, signal);
      wait = Math.min(maxIntervalMs, wait * backoff);
    }
  } catch (err) {
    if (err instanceof DataverseAsyncOperationError) throw err;
    if (deadline?.expired && !options.signal?.aborted) {
      throw new DataverseAsyncOperationError(
        `System job ${id} did not complete within ${String(options.timeoutMs)}ms`,
        { asyncOperationId: id, reason: "timeout", operation: last }
      );
    }
    throw fromAbort(err);
  } finally {
    deadline?.dispose();
  }
}

/** The job's id from what the caller passed; refuses anything that isn't a GUID. */
function asyncOperationId(ref: AsyncOperationRef | null | undefined): string {
  const raw =
    typeof ref === "string"
      ? ref
      : (ref?.asyncoperationid ?? ref?.AsyncOperationId ?? ref?.JobId ?? undefined);
  if (raw === undefined || raw === "") {
    throw DataverseInvalidRequestError.missingParameter(
      "asyncOperation (a system job id, or a response with asyncoperationid, AsyncOperationId or JobId)"
    );
  }
  const id = raw.replace(/^\{(.*)\}$/, "$1");
  if (!GUID.test(id)) {
    throw DataverseInvalidRequestError.invalidParameter(
      "asyncOperation",
      `must be a GUID (got "${raw}")`
    );
  }
  return id.toLowerCase();
}

function positive(name: string, value: number | undefined, fallback: number): number {
  if (value === undefined) return fallback;
  if (!(Number.isFinite(value) && value > 0)) {
    throw DataverseInvalidRequestError.invalidParameter(
      name,
      `must be a positive number of ms (got ${String(value)})`
    );
  }
  return value;
}

/** `undefined` while the job is still going. */
function outcomeOf(op: AsyncOperation): "succeeded" | "failed" | "canceled" | undefined {
  const { Succeeded, Failed, Canceled } = AsyncOperationStatusCode;
  const completed =
    op.statecode === AsyncOperationStateCode.Completed ||
    op.statuscode === Succeeded ||
    op.statuscode === Failed ||
    op.statuscode === Canceled;
  if (!completed) return undefined;
  if (op.statuscode === Succeeded) return "succeeded";
  if (op.statuscode === Canceled) return "canceled";
  // Failed, or a completed status this SDK doesn't know: not a success.
  return "failed";
}

function jobError(
  id: string,
  reason: "failed" | "canceled",
  op: AsyncOperation
): DataverseAsyncOperationError {
  const text = nonEmpty(op.friendlymessage) ?? nonEmpty(op.message) ?? `System job ${id} ${reason}`;
  const code =
    typeof op.errorcode === "number" && op.errorcode !== 0
      ? `0x${(op.errorcode >>> 0).toString(16).padStart(8, "0")}`
      : undefined;
  return new DataverseAsyncOperationError(text, {
    asyncOperationId: id,
    reason,
    operation: op,
    code,
  });
}

function nonEmpty(value: string | null | undefined): string | undefined {
  if (!value) return undefined;
  return value;
}

/**
 * The wait between reads rejects with the `DOMException` of the aborted signal; report it as the
 * client reports an aborted request. Errors from the reads are SDK errors already.
 */
function fromAbort(err: unknown): unknown {
  if (err instanceof DataverseError || !(err instanceof Error)) return err;
  if (isTimeoutError(err)) return DataverseNetworkError.timeout(undefined, err);
  if (err.name === "AbortError") return new DataverseAbortError(err.message || undefined, err);
  return err;
}
