/**
 * MetadataConditionOperator
 *
 * The Web API reads and writes enum members by name (`"Equals"`), never by number,
 * so this is a string union. `MetadataConditionOperator.Equals` is the name; each member's comment
 * gives its numeric value.
 */
export const MetadataConditionOperator = {
  /** 0 */
  Equals: "Equals",
  /** 1 */
  NotEquals: "NotEquals",
  /** 2 */
  In: "In",
  /** 3 */
  NotIn: "NotIn",
  /** 4 */
  GreaterThan: "GreaterThan",
  /** 5 */
  LessThan: "LessThan",
} as const;

export type MetadataConditionOperator =
  (typeof MetadataConditionOperator)[keyof typeof MetadataConditionOperator];
