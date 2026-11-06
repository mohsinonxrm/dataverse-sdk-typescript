import type { EntityReference } from '@mohsinonxrm/dataverse-sdk-entities-runtime';
import type { AnyEntityPayload } from './EntityPayload.js';

/**
 * AISummarizeRecordResponse complex type
 */
export interface AISummarizeRecordResponse {
  SummarizedText?: string;
  AdditionalInformation: EntityReference | AnyEntityPayload;
}
