import type { OrderType } from "./OrderType.js";

/**
 * OrderExpression
 */
export interface OrderExpression {
  Alias?: string;
  AttributeName?: string;
  EntityName?: string;
  OrderType?: OrderType;
}
