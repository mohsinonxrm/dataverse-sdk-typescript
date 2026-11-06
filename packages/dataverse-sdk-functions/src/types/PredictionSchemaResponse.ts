import type { EntityReference } from '@mohsinonxrm/dataverse-sdk-entities-runtime';
import type { AnyEntityPayload } from './EntityPayload.js';

/**
 * PredictionSchemaResponse complex type
 */
export interface PredictionSchemaResponse {
  response?: string;
  responsev2: EntityReference | AnyEntityPayload;
}
