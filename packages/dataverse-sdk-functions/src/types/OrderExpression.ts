import type { OrderType } from "./OrderType.js";

/**
 * OrderExpression complex type
 */
export interface OrderExpression {
  Alias?: string;
  AttributeName?: string;
  EntityName?: string;
  OrderType?: OrderType;
}
