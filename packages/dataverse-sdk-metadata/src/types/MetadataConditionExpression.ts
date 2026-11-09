import type { MetadataConditionOperator } from "./MetadataConditionOperator.js";
import type { Object } from "./Object.js";

/**
 * MetadataConditionExpression
 */
export interface MetadataConditionExpression {
  ConditionOperator?: MetadataConditionOperator;
  PropertyName?: string;
  Value?: Object;
}
