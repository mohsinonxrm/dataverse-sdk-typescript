import type { EntityRecordCountCollection } from "./EntityRecordCountCollection.js";

/**
 * BulkRetainResponse
 */
export interface BulkRetainResponse {
  EntityCountCollection?: EntityRecordCountCollection;
  FailedRecords?: number;
  HasMoreRecords?: boolean;
  MaxMarkedVersion?: number;
  PagingCookie?: string;
}
