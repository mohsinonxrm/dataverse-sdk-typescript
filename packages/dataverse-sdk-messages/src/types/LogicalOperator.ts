/**
 * LogicalOperator enum
 */
export const LogicalOperator = {
  And: 0,
  Or: 1,
} as const;

export type LogicalOperator = (typeof LogicalOperator)[keyof typeof LogicalOperator];
