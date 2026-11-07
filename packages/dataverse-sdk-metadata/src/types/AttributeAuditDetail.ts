import type { AuditDetail } from "./AuditDetail.js";
import type { Collection_Int32_String } from "./Collection_Int32_String.js";

/**
 * AttributeAuditDetail
 * Extends: AuditDetail
 */
export interface AttributeAuditDetail extends AuditDetail {
  DeletedAttributes?: Collection_Int32_String;
  InvalidNewValueAttributes?: string[];
  LocLabelLanguageCode?: number;
}
