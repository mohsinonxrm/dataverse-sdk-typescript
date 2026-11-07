import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import type { AnyEntityPayload } from "./EntityPayload.js";

/**
 * RetrieveProcessWithWfomJsonResponse complex type
 */
export interface RetrieveProcessWithWfomJsonResponse {
  WfomJson?: string;
  Entity: EntityReference | AnyEntityPayload;
}
