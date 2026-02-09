import type { EntityRecordCountCollection } from "./EntityRecordCountCollection.js";

/**
 * BulkRetainResponse
 */
export interface BulkRetainResponse {
  PagingCookie?: string;
  HasMoreRecords?: boolean;
  FailedRecords?: number;
  EntityCountCollection?: EntityRecordCountCollection;
}
