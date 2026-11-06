/**
 * OrderType
 *
 * The Web API reads and writes enum members by name (`"Ascending"`), never by number,
 * so this is a string union. `OrderType.Ascending` is the name; each member's comment
 * gives its numeric value.
 */
export const OrderType = {
  /** 0 */
  Ascending: "Ascending",
  /** 1 */
  Descending: "Descending",
} as const;

export type OrderType = (typeof OrderType)[keyof typeof OrderType];
