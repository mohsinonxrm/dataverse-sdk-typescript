import type { AccessRights } from './AccessRights.js';
import type { EntityReference } from '@mohsinonxrm/dataverse-sdk-entities-runtime';
import type { AnyEntityPayload } from './EntityPayload.js';

/**
 * PrincipalAccess complex type
 */
export interface PrincipalAccess {
  AccessMask?: AccessRights;
  Principal: EntityReference | AnyEntityPayload;
}
