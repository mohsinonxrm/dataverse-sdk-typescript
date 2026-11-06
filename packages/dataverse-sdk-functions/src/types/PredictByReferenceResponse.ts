import type { EntityReference } from '@mohsinonxrm/dataverse-sdk-entities-runtime';
import type { AnyEntityPayload } from './EntityPayload.js';

/**
 * PredictByReferenceResponse complex type
 */
export interface PredictByReferenceResponse {
  response?: string;
  responsev2: EntityReference | AnyEntityPayload;
}
