import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./EntityPayload.js";

/**
 * PredictResponse complex type
 */
export interface PredictResponse {
  response?: string;
  overrideHttpStatusCode?: string;
  overrideLocation?: string;
  overrideRetryAfter?: string;
  responsev2: EntityReference | AnyEntityPayload;
}
