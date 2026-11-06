/**
 * @fileoverview The batch error class. It lives in core (`@mohsinonxrm/dataverse-sdk-core`) so
 * there is one class; this package re-exports it with `result` typed as `BatchExecutionResult`.
 */

import {
  DataverseBatchError as CoreDataverseBatchError,
  type DataverseBatchErrorInit as CoreDataverseBatchErrorInit,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { BatchExecutionResult, BatchResponseStep } from "./types.js";

/** Extra details for {@link DataverseBatchError}. */
export type DataverseBatchErrorInit = CoreDataverseBatchErrorInit<BatchExecutionResult>;

/** The batch error, with `result` and `requestErrors` typed for this package. */
export type DataverseBatchError = CoreDataverseBatchError<BatchExecutionResult, BatchResponseStep>;

/** Constructor of {@link DataverseBatchError}, so `instanceof` narrows to the typed error. */
export interface DataverseBatchErrorConstructor {
  new (message: string, init?: DataverseBatchErrorInit): DataverseBatchError;
  new (
    message: string,
    requestErrors: Map<string, BatchResponseStep>,
    totalRequests: number,
    successfulRequests: number,
    failedRequests: number,
    init?: DataverseBatchErrorInit
  ): DataverseBatchError;
  readonly prototype: DataverseBatchError;
}

/**
 * Error thrown when a batch fails. The same class as core's `DataverseBatchError`, so
 * `instanceof` works whichever package you import it from.
 */
export const DataverseBatchError: DataverseBatchErrorConstructor = CoreDataverseBatchError;
