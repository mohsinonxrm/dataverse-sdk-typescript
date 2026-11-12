/**
 * @module @mohsinonxrm/dataverse-sdk-batch
 * @description Batch operations for Dataverse SDK
 */

export { BatchRequestBuilder } from "./BatchRequestBuilder.js";
export {
  DataverseBatchError,
  type DataverseBatchErrorInit,
  type DataverseBatchErrorConstructor,
} from "./errors.js";
export type {
  BatchRequestStep,
  BatchChangeset,
  BatchItem,
  BatchResponsePart,
  BatchResponseStep,
  BatchExecutionOptions,
  BatchExecutionResult,
} from "./types.js";
export {
  encodeBatchRequest,
  generateBoundary,
  generateChangesetBoundary,
  JSON_PART_CONTENT_TYPE,
  type EncodeBatchOptions,
} from "./encoding.js";
export { decodeBatchResponse, extractBoundary } from "./decoding.js";
export { createBindManyExecutor } from "./bindManyExecutor.js";
export { entityIdFromBatchResponse, type EntityIdFromBatchResponseOptions } from "./entityId.js";
export {
  createMultiple,
  updateMultiple,
  upsertMultiple,
  deleteMultiple,
  DataverseBulkOperationError,
  type BulkTable,
  type BulkStrategy,
  type BulkOperationOptions,
  type BulkOperationResult,
  type BulkRecordResult,
  type BulkRecordStatus,
  type DataverseBulkOperationErrorInit,
} from "./bulk.js";
export {
  getBulkOperationSupport,
  type BulkOperationSupport,
  type BulkOperationSupportOptions,
} from "./bulkSupport.js";
