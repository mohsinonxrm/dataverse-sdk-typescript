import type { AuditDetail } from "./AuditDetail.js";
import type { Collection_Int32_String } from "./Collection_Int32_String.js";

/**
 * AttributeAuditDetail
 * Extends: AuditDetail
 */
export interface AttributeAuditDetail extends AuditDetail {
  InvalidNewValueAttributes?: string[];
  DeletedAttributes?: Collection_Int32_String;
  LocLabelLanguageCode?: number;
}
