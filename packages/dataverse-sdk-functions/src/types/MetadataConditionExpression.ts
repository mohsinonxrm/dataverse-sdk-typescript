import type { MetadataConditionOperator } from "./MetadataConditionOperator.js";
import type { Object } from "./Object.js";

/**
 * MetadataConditionExpression complex type
 */
export interface MetadataConditionExpression {
  PropertyName?: string;
  ConditionOperator?: MetadataConditionOperator;
  Value?: Object;
}
