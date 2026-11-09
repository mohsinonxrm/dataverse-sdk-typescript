import type { ConditionOperator } from "./ConditionOperator.js";
import type { Object } from "./Object.js";

/**
 * ConditionExpression complex type
 */
export interface ConditionExpression {
  AttributeName?: string;
  CompareColumns?: boolean;
  EntityName?: string;
  Operator?: ConditionOperator;
  Values?: Object[];
}
