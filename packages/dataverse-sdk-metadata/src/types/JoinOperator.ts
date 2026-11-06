/**
 * JoinOperator
 *
 * The Web API reads and writes enum members by name (`"Inner"`), never by number,
 * so this is a string union. `JoinOperator.Inner` is the name; each member's comment
 * gives its numeric value.
 */
export const JoinOperator = {
  /** 0 */
  Inner: "Inner",
  /** 1 */
  LeftOuter: "LeftOuter",
  /** 2 */
  Natural: "Natural",
  /** 3 */
  MatchFirstRowUsingCrossApply: "MatchFirstRowUsingCrossApply",
  /** 4 */
  In: "In",
  /** 5 */
  Exists: "Exists",
  /** 6 */
  Any: "Any",
  /** 7 */
  NotAny: "NotAny",
  /** 8 */
  All: "All",
  /** 9 */
  NotAll: "NotAll",
} as const;

export type JoinOperator = (typeof JoinOperator)[keyof typeof JoinOperator];
