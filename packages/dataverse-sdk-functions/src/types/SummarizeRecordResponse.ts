import type { EntityReference } from '@mohsinonxrm/dataverse-sdk-entities-runtime';
import type { AnyEntityPayload } from './EntityPayload.js';

/**
 * SummarizeRecordResponse complex type
 */
export interface SummarizeRecordResponse {
  SummarizedText?: string;
  AdditionalInformation: EntityReference | AnyEntityPayload;
}
