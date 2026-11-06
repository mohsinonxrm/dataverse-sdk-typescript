import type { EntityReference } from '@mohsinonxrm/dataverse-sdk-entities-runtime';
import type { AnyEntityPayload } from './EntityPayload.js';

/**
 * EntitySetting complex type
 */
export interface EntitySetting {
  ChildSettings?: EntitySetting[];
  Name?: string;
  Value: EntityReference | AnyEntityPayload;
}
