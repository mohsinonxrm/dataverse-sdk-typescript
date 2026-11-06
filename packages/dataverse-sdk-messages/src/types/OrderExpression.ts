import type { OrderType } from "./OrderType.js";

/**
 * OrderExpression complex type
 */
export interface OrderExpression {
  AttributeName?: string;
  OrderType?: OrderType;
  Alias?: string;
  EntityName?: string;
}
