/**
 * ImeMode
 *
 * The Web API reads and writes enum members by name (`"Auto"`), never by number,
 * so this is a string union. `ImeMode.Auto` is the name; each member's comment
 * gives its numeric value.
 */
export const ImeMode = {
  /** 0 */
  Auto: "Auto",
  /** 1 */
  Inactive: "Inactive",
  /** 2 */
  Active: "Active",
  /** 3 */
  Disabled: "Disabled",
} as const;

export type ImeMode = (typeof ImeMode)[keyof typeof ImeMode];
