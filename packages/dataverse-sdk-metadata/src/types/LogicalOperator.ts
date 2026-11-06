/**
 * LogicalOperator
 *
 * The Web API reads and writes enum members by name (`"And"`), never by number,
 * so this is a string union. `LogicalOperator.And` is the name; each member's comment
 * gives its numeric value.
 */
export const LogicalOperator = {
  /** 0 */
  And: "And",
  /** 1 */
  Or: "Or",
} as const;

export type LogicalOperator = (typeof LogicalOperator)[keyof typeof LogicalOperator];
