/**
 * JoinOperator enum
 */
export const JoinOperator = {
  Inner: 0,
  LeftOuter: 1,
  Natural: 2,
  MatchFirstRowUsingCrossApply: 3,
  In: 4,
  Exists: 5,
  Any: 6,
  NotAny: 7,
  All: 8,
  NotAll: 9,
} as const;

export type JoinOperator = (typeof JoinOperator)[keyof typeof JoinOperator];
