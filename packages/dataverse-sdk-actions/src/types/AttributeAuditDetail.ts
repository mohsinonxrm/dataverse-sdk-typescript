import type { Collection_Int32_String } from "./Collection_Int32_String.js";

/**
 * AttributeAuditDetail complex type
 */
export interface AttributeAuditDetail {
  InvalidNewValueAttributes: string[];
  DeletedAttributes: Collection_Int32_String;
  LocLabelLanguageCode: number;
}
