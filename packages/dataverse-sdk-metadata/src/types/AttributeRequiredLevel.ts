/**
 * AttributeRequiredLevel
 *
 * The Web API reads and writes enum members by name (`"None"`), never by number,
 * so this is a string union. `AttributeRequiredLevel.None` is the name; each member's comment
 * gives its numeric value.
 */
export const AttributeRequiredLevel = {
  /** 0 */
  None: "None",
  /** 1 */
  SystemRequired: "SystemRequired",
  /** 2 */
  ApplicationRequired: "ApplicationRequired",
  /** 3 */
  Recommended: "Recommended",
} as const;

export type AttributeRequiredLevel =
  (typeof AttributeRequiredLevel)[keyof typeof AttributeRequiredLevel];
