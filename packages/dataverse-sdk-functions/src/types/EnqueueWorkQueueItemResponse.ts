import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./EntityPayload.js";

/**
 * EnqueueWorkQueueItemResponse complex type
 */
export interface EnqueueWorkQueueItemResponse {
  workQueueItemId?: string;
  workQueueItemRecord: EntityReference | AnyEntityPayload;
}
