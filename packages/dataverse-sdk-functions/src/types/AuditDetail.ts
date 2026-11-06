import type { ApplicationBasedAccessControlAuditDetail } from './ApplicationBasedAccessControlAuditDetail.js';
import type { AttributeAuditDetail } from './AttributeAuditDetail.js';
import type { IPFirewallAccessAuditDetail } from './IPFirewallAccessAuditDetail.js';
import type { RelationshipAuditDetail } from './RelationshipAuditDetail.js';
import type { RolePrivilegeAuditDetail } from './RolePrivilegeAuditDetail.js';
import type { ShareAuditDetail } from './ShareAuditDetail.js';
import type { UserAccessAuditDetail } from './UserAccessAuditDetail.js';
import type { EntityReference } from '@mohsinonxrm/dataverse-sdk-entities-runtime';
import type { AnyEntityPayload } from './EntityPayload.js';

/**
 * AuditDetail complex type
 */
export interface AuditDetail {
  AuditRecord: EntityReference | AnyEntityPayload;
}

/**
 * A AuditDetail value: one of the concrete types below, with the `@odata.type` that tells
 * Dataverse which one it is.
 */
export type TypedAuditDetail =
  | (ApplicationBasedAccessControlAuditDetail & { "@odata.type": "Microsoft.Dynamics.CRM.ApplicationBasedAccessControlAuditDetail" })
  | (AttributeAuditDetail & { "@odata.type": "Microsoft.Dynamics.CRM.AttributeAuditDetail" })
  | (IPFirewallAccessAuditDetail & { "@odata.type": "Microsoft.Dynamics.CRM.IPFirewallAccessAuditDetail" })
  | (RelationshipAuditDetail & { "@odata.type": "Microsoft.Dynamics.CRM.RelationshipAuditDetail" })
  | (RolePrivilegeAuditDetail & { "@odata.type": "Microsoft.Dynamics.CRM.RolePrivilegeAuditDetail" })
  | (ShareAuditDetail & { "@odata.type": "Microsoft.Dynamics.CRM.ShareAuditDetail" })
  | (UserAccessAuditDetail & { "@odata.type": "Microsoft.Dynamics.CRM.UserAccessAuditDetail" })
;
