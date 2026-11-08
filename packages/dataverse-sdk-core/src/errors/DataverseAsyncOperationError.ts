import { DataverseError } from "./DataverseError.js";
import type { AsyncOperation } from "../asyncoperation/waitForAsyncOperation.js";

/** Why `waitForAsyncOperation()` gave up on a system job. */
export type AsyncOperationErrorReason = "failed" | "canceled" | "timeout";

/**
 * A system job (`asyncoperation`) that `waitForAsyncOperation()` waited for ended without
 * succeeding, or did not end in time.
 *
 * - `reason: "failed"` (name `AsyncOperationFailed`): the job completed with status Failed (31).
 * - `reason: "canceled"` (name `AsyncOperationCanceled`): the job completed with status
 *   Canceled (32).
 * - `reason: "timeout"` (name `AsyncOperationTimeout`): `timeoutMs` passed first. The job keeps
 *   running in Dataverse; `operation` is the last state read, if any.
 *
 * `message` is the job's `friendlymessage`, else its `message`, else a generic text. `code` is the
 * job's `errorcode` as a hex string such as `"0x80040265"`, when it has one.
 */
export class DataverseAsyncOperationError extends DataverseError {
  /** The id of the system job. */
  readonly asyncOperationId: string;
  readonly reason: AsyncOperationErrorReason;
  /** The job as last read. `undefined` only for a timeout that came before the first read. */
  readonly operation?: AsyncOperation;

  constructor(
    message: string,
    init: {
      asyncOperationId: string;
      reason: AsyncOperationErrorReason;
      operation?: AsyncOperation;
      code?: string;
    }
  ) {
    super(message, { code: init.code });
    Object.setPrototypeOf(this, DataverseAsyncOperationError.prototype);
    this.name =
      init.reason === "failed"
        ? "AsyncOperationFailed"
        : init.reason === "canceled"
          ? "AsyncOperationCanceled"
          : "AsyncOperationTimeout";
    this.asyncOperationId = init.asyncOperationId;
    this.reason = init.reason;
    this.operation = init.operation;
  }
}
