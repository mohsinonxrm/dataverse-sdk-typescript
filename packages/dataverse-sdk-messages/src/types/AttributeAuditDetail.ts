import type { AuditDetail } from "./AuditDetail.js";
import type { Collection_Int32_String } from "./Collection_Int32_String.js";
import type { EntityReference } from "../EntityReference.js";
import type { AnyEntityPayload } from "./EntityPayload.js";

/**
 * AttributeAuditDetail complex type
 */
export interface AttributeAuditDetail extends AuditDetail {
  DeletedAttributes?: Collection_Int32_String;
  InvalidNewValueAttributes?: string[];
  LocLabelLanguageCode?: number;
  NewValue: EntityReference | AnyEntityPayload;
  OldValue: EntityReference | AnyEntityPayload;
}
