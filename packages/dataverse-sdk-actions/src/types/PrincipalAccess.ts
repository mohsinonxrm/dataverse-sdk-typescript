import type { AccessRights } from "./AccessRights.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./EntityPayload.js";

/**
 * PrincipalAccess complex type
 */
export interface PrincipalAccess {
  AccessMask?: AccessRights;
  Principal: EntityReference | AnyEntityPayload;
}
