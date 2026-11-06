import type { XrmAttributeExpression } from "./XrmAttributeExpression.js";

/**
 * ColumnSet
 */
export interface ColumnSet {
  AllColumns?: boolean;
  AttributeExpressions?: XrmAttributeExpression[];
  Columns?: string[];
}
