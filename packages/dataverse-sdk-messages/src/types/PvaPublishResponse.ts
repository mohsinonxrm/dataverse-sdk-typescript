import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import type { AnyEntityPayload } from "./EntityPayload.js";

/**
 * PvaPublishResponse complex type
 */
export interface PvaPublishResponse {
  PublishedBotContentId?: string;
  PublishBotJobResponse: EntityReference | AnyEntityPayload;
}
