import type { LogicalOperator } from "./LogicalOperator.js";
import type { MetadataConditionExpression } from "./MetadataConditionExpression.js";

/**
 * MetadataFilterExpression
 */
export interface MetadataFilterExpression {
  Conditions?: MetadataConditionExpression[];
  FilterOperator?: LogicalOperator;
  Filters?: MetadataFilterExpression[];
}
