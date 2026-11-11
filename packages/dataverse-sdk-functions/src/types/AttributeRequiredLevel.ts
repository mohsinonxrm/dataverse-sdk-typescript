/**
 * AttributeRequiredLevel enum
 */
export const AttributeRequiredLevel = {
  None: 0,
  SystemRequired: 1,
  ApplicationRequired: 2,
  Recommended: 3,
} as const;

export type AttributeRequiredLevel =
  (typeof AttributeRequiredLevel)[keyof typeof AttributeRequiredLevel];
