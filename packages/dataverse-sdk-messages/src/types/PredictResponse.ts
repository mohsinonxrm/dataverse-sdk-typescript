import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import type { AnyEntityPayload } from "./EntityPayload.js";

/**
 * PredictResponse complex type
 */
export interface PredictResponse {
  overrideHttpStatusCode?: string;
  overrideLocation?: string;
  overrideRetryAfter?: string;
  response?: string;
  responsev2: EntityReference | AnyEntityPayload;
}
