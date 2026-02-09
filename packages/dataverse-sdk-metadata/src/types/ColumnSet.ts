import type { XrmAttributeExpression } from "./XrmAttributeExpression.js";

/**
 * ColumnSet
 */
export interface ColumnSet {
  AllColumns?: boolean;
  Columns?: string[];
  AttributeExpressions?: XrmAttributeExpression[];
}
