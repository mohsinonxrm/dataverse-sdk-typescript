import type { ConditionOperator } from "./ConditionOperator.js";
import type { Object } from "./Object.js";

/**
 * ConditionExpression complex type
 */
export interface ConditionExpression {
  EntityName: string;
  CompareColumns: boolean;
  AttributeName: string;
  Operator: ConditionOperator;
  Values: Object[];
}
