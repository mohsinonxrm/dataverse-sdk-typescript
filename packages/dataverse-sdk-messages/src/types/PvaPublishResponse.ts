import type { EntityReference } from "../EntityReference.js";
import type { AnyEntityPayload } from "./EntityPayload.js";

/**
 * PvaPublishResponse complex type
 */
export interface PvaPublishResponse {
  PublishedBotContentId?: string;
  PublishBotJobResponse: EntityReference | AnyEntityPayload;
}
