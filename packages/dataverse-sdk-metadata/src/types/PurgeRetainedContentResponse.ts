import type { EntityRecordCountCollection } from "./EntityRecordCountCollection.js";

/**
 * PurgeRetainedContentResponse
 */
export interface PurgeRetainedContentResponse {
  HasMoreRecords?: boolean;
  EntityCountCollection?: EntityRecordCountCollection;
}
