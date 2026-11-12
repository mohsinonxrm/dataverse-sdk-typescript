/**
 * XrmAggregateType enum
 */
export const XrmAggregateType = {
  None: 0,
  Count: 1,
  CountColumn: 2,
  Sum: 3,
  Avg: 4,
  Min: 5,
  Max: 6,
} as const;

export type XrmAggregateType = (typeof XrmAggregateType)[keyof typeof XrmAggregateType];
