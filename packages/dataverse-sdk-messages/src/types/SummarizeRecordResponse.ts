import type { EntityReference } from "../EntityReference.js";
import type { AnyEntityPayload } from "./EntityPayload.js";

/**
 * SummarizeRecordResponse complex type
 */
export interface SummarizeRecordResponse {
  SummarizedText?: string;
  AdditionalInformation: EntityReference | AnyEntityPayload;
}
