import type { AccessRights } from "./AccessRights.js";
import type { AuditDetail } from "./AuditDetail.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./EntityPayload.js";

/**
 * ShareAuditDetail complex type
 */
export interface ShareAuditDetail extends AuditDetail {
  OldPrivileges?: AccessRights;
  NewPrivileges?: AccessRights;
  Principal: EntityReference | AnyEntityPayload;
}
