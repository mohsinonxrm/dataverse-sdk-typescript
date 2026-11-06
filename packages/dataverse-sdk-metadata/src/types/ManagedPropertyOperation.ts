/**
 * ManagedPropertyOperation
 *
 * The Web API reads and writes enum members by name (`"None"`), never by number,
 * so this is a string union. `ManagedPropertyOperation.None` is the name; each member's comment
 * gives its numeric value.
 */
export const ManagedPropertyOperation = {
  /** 0 */
  None: "None",
  /** 1 */
  Create: "Create",
  /** 2 */
  Update: "Update",
  /** 3 */
  CreateUpdate: "CreateUpdate",
  /** 4 */
  Delete: "Delete",
  /** 6 */
  UpdateDelete: "UpdateDelete",
  /** 7 */
  All: "All",
} as const;

export type ManagedPropertyOperation =
  (typeof ManagedPropertyOperation)[keyof typeof ManagedPropertyOperation];
