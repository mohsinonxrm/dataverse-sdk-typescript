/**
 * AssociatedMenuGroup enum
 */
export const AssociatedMenuGroup = {
  Details: 0,
  Sales: 1,
  Service: 2,
  Marketing: 3,
} as const;

export type AssociatedMenuGroup = (typeof AssociatedMenuGroup)[keyof typeof AssociatedMenuGroup];
