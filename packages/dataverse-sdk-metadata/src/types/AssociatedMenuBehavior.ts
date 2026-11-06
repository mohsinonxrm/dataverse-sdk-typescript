/**
 * AssociatedMenuBehavior
 *
 * The Web API reads and writes enum members by name (`"UseCollectionName"`), never by number,
 * so this is a string union. `AssociatedMenuBehavior.UseCollectionName` is the name; each member's comment
 * gives its numeric value.
 */
export const AssociatedMenuBehavior = {
  /** 0 */
  UseCollectionName: "UseCollectionName",
  /** 1 */
  UseLabel: "UseLabel",
  /** 2 */
  DoNotDisplay: "DoNotDisplay",
} as const;

export type AssociatedMenuBehavior =
  (typeof AssociatedMenuBehavior)[keyof typeof AssociatedMenuBehavior];
