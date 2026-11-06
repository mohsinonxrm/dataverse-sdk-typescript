/**
 * AssociatedMenuGroup
 *
 * The Web API reads and writes enum members by name (`"Details"`), never by number,
 * so this is a string union. `AssociatedMenuGroup.Details` is the name; each member's comment
 * gives its numeric value.
 */
export const AssociatedMenuGroup = {
  /** 0 */
  Details: "Details",
  /** 1 */
  Sales: "Sales",
  /** 2 */
  Service: "Service",
  /** 3 */
  Marketing: "Marketing",
} as const;

export type AssociatedMenuGroup = (typeof AssociatedMenuGroup)[keyof typeof AssociatedMenuGroup];
