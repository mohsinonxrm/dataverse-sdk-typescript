/**
 * MetadataConditionOperator enum
 */
export const MetadataConditionOperator = {
  Equals: 0,
  NotEquals: 1,
  In: 2,
  NotIn: 3,
  GreaterThan: 4,
  LessThan: 5,
} as const;

export type MetadataConditionOperator =
  (typeof MetadataConditionOperator)[keyof typeof MetadataConditionOperator];
