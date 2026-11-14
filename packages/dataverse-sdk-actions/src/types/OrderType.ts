/**
 * OrderType enum
 */
export const OrderType = {
  Ascending: 0,
  Descending: 1,
} as const;

export type OrderType = (typeof OrderType)[keyof typeof OrderType];
