import type { ShareAccessRights } from "./ShareAccessRights.js";
import type { EntityReference } from "../EntityReference.js";
import type { AnyEntityPayload } from "./EntityPayload.js";

/**
 * ComponentPrincipalAccess complex type
 */
export interface ComponentPrincipalAccess {
  RequestType?: number;
  ShareAccessMask?: ShareAccessRights;
  SharePrincipal: EntityReference | AnyEntityPayload;
}
