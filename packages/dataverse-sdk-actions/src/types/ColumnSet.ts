import type { XrmAttributeExpression } from "./XrmAttributeExpression.js";

/**
 * ColumnSet complex type
 */
export interface ColumnSet {
  AllColumns?: boolean;
  AttributeExpressions?: XrmAttributeExpression[];
  Columns?: string[];
}
