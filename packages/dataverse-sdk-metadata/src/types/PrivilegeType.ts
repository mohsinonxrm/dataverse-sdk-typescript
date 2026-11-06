/**
 * PrivilegeType
 *
 * The Web API reads and writes enum members by name (`"None"`), never by number,
 * so this is a string union. `PrivilegeType.None` is the name; each member's comment
 * gives its numeric value.
 */
export const PrivilegeType = {
  /** 0 */
  None: "None",
  /** 1 */
  Create: "Create",
  /** 2 */
  Read: "Read",
  /** 3 */
  Write: "Write",
  /** 4 */
  Delete: "Delete",
  /** 5 */
  Assign: "Assign",
  /** 6 */
  Share: "Share",
  /** 7 */
  Append: "Append",
  /** 8 */
  AppendTo: "AppendTo",
} as const;

export type PrivilegeType = (typeof PrivilegeType)[keyof typeof PrivilegeType];
