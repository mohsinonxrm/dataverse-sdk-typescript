import type { OrderType } from "./OrderType.js";

/**
 * OrderExpression
 */
export interface OrderExpression {
  AttributeName?: string;
  OrderType?: OrderType;
  Alias?: string;
  EntityName?: string;
}
