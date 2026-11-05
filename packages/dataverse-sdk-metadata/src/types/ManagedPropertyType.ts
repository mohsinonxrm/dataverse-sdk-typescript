/**
 * ManagedPropertyType
 *
 * The Web API reads and writes enum members by name (`"Operation"`), never by number,
 * so this is a string union. `ManagedPropertyType.Operation` is the name; each member's comment
 * gives its numeric value.
 */
export const ManagedPropertyType = {
  /** 0 */
  Operation: "Operation",
  /** 1 */
  Attribute: "Attribute",
  /** 2 */
  CustomEvaluator: "CustomEvaluator",
  /** 3 */
  Custom: "Custom",
} as const;

export type ManagedPropertyType = (typeof ManagedPropertyType)[keyof typeof ManagedPropertyType];
