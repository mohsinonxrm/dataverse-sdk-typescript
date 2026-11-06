/**
 * SecurityTypes
 *
 * The Web API reads and writes enum members by name (`"None"`), never by number,
 * so this is a string union. `SecurityTypes.None` is the name; each member's comment
 * gives its numeric value.
 */
export const SecurityTypes = {
  /** 0 */
  None: "None",
  /** 1 */
  Append: "Append",
  /** 2 */
  ParentChild: "ParentChild",
  /** 4 */
  Pointer: "Pointer",
  /** 8 */
  Inheritance: "Inheritance",
} as const;

export type SecurityTypes = (typeof SecurityTypes)[keyof typeof SecurityTypes];
