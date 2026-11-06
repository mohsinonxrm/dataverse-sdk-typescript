import type { EntityReference } from "../EntityReference.js";
import type { AnyEntityPayload } from "./EntityPayload.js";

/**
 * QuickTestResponse complex type
 */
export interface QuickTestResponse {
  response?: string;
  overrideHttpStatusCode?: string;
  overrideLocation?: string;
  overrideRetryAfter?: string;
  responsev2: EntityReference | AnyEntityPayload;
}
