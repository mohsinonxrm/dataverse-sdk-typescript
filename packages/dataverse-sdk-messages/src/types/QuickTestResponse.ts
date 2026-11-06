import type { EntityReference } from "../EntityReference.js";
import type { AnyEntityPayload } from "./EntityPayload.js";

/**
 * QuickTestResponse complex type
 */
export interface QuickTestResponse {
  overrideHttpStatusCode?: string;
  overrideLocation?: string;
  overrideRetryAfter?: string;
  response?: string;
  responsev2: EntityReference | AnyEntityPayload;
}
