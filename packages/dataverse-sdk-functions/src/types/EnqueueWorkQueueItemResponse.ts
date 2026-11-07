import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import type { AnyEntityPayload } from "./EntityPayload.js";

/**
 * EnqueueWorkQueueItemResponse complex type
 */
export interface EnqueueWorkQueueItemResponse {
  workQueueItemId?: string;
  workQueueItemRecord: EntityReference | AnyEntityPayload;
}
