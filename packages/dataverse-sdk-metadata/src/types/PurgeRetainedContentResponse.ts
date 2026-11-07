import type { EntityRecordCountCollection } from "./EntityRecordCountCollection.js";

/**
 * PurgeRetainedContentResponse
 */
export interface PurgeRetainedContentResponse {
  EntityCountCollection?: EntityRecordCountCollection;
  HasMoreRecords?: boolean;
}
