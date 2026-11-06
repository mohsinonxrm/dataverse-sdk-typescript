import type { ShareAccessRights } from './ShareAccessRights.js';
import type { EntityReference } from '@mohsinonxrm/dataverse-sdk-entities-runtime';
import type { AnyEntityPayload } from './EntityPayload.js';

/**
 * ComponentPrincipalAccess complex type
 */
export interface ComponentPrincipalAccess {
  RequestType?: number;
  ShareAccessMask?: ShareAccessRights;
  SharePrincipal: EntityReference | AnyEntityPayload;
}
