import type { EntityRecordCountCollection } from "./EntityRecordCountCollection.js";

/**
 * BulkRetainResponse complex type
 */
export interface BulkRetainResponse {
  PagingCookie?: string;
  HasMoreRecords?: boolean;
  FailedRecords?: number;
  EntityCountCollection?: EntityRecordCountCollection;
}
