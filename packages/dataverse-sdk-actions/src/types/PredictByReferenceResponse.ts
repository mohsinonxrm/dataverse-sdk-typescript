import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./EntityPayload.js";

/**
 * PredictByReferenceResponse complex type
 */
export interface PredictByReferenceResponse {
  response?: string;
  responsev2: EntityReference | AnyEntityPayload;
}
