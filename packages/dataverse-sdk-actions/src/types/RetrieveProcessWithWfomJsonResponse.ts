import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./EntityPayload.js";

/**
 * RetrieveProcessWithWfomJsonResponse complex type
 */
export interface RetrieveProcessWithWfomJsonResponse {
  WfomJson?: string;
  Entity: EntityReference | AnyEntityPayload;
}
