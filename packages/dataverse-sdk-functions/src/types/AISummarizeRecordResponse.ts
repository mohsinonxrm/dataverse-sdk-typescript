import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./EntityPayload.js";

/**
 * AISummarizeRecordResponse complex type
 */
export interface AISummarizeRecordResponse {
  SummarizedText?: string;
  AdditionalInformation: EntityReference | AnyEntityPayload;
}
