/**
 * AssociatedMenuBehavior enum
 */
export const AssociatedMenuBehavior = {
  UseCollectionName: 0,
  UseLabel: 1,
  DoNotDisplay: 2,
} as const;

export type AssociatedMenuBehavior =
  (typeof AssociatedMenuBehavior)[keyof typeof AssociatedMenuBehavior];
