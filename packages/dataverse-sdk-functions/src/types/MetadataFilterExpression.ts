import type { LogicalOperator } from "./LogicalOperator.js";
import type { MetadataConditionExpression } from "./MetadataConditionExpression.js";

/**
 * MetadataFilterExpression complex type
 */
export interface MetadataFilterExpression {
  Conditions?: MetadataConditionExpression[];
  FilterOperator?: LogicalOperator;
  Filters?: MetadataFilterExpression[];
}
