import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./EntityPayload.js";

/**
 * PredictionSchemaResponse complex type
 */
export interface PredictionSchemaResponse {
  response?: string;
  responsev2: EntityReference | AnyEntityPayload;
}
