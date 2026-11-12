/**
 * ManagedPropertyType enum
 */
export const ManagedPropertyType = {
  Operation: 0,
  Attribute: 1,
  CustomEvaluator: 2,
  Custom: 3,
} as const;

export type ManagedPropertyType = (typeof ManagedPropertyType)[keyof typeof ManagedPropertyType];
