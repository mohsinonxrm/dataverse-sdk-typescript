import type { EntityRecordCountCollection } from "./EntityRecordCountCollection.js";

/**
 * PurgeRetainedContentResponse complex type
 */
export interface PurgeRetainedContentResponse {
  HasMoreRecords?: boolean;
  EntityCountCollection?: EntityRecordCountCollection;
}
