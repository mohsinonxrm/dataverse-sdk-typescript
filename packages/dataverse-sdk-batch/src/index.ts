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
