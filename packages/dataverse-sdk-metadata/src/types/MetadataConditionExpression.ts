import type { MetadataConditionOperator } from "./MetadataConditionOperator.js";
import type { Object } from "./Object.js";

/**
 * MetadataConditionExpression
 */
export interface MetadataConditionExpression {
  PropertyName?: string;
  ConditionOperator?: MetadataConditionOperator;
  Value?: Object;
}
