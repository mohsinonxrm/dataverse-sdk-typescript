import type { ShareAccessRights } from "./ShareAccessRights.js";
import type { EntityReference } from "../EntityReference.js";
import type { AnyEntityPayload } from "./EntityPayload.js";

/**
 * ComponentPrincipalAccess complex type
 */
export interface ComponentPrincipalAccess {
  ShareAccessMask?: ShareAccessRights;
  RequestType?: number;
  SharePrincipal: EntityReference | AnyEntityPayload;
}
