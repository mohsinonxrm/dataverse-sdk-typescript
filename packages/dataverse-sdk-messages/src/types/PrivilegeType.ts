/**
 * PrivilegeType enum
 */
export const PrivilegeType = {
  None: 0,
  Create: 1,
  Read: 2,
  Write: 3,
  Delete: 4,
  Assign: 5,
  Share: 6,
  Append: 7,
  AppendTo: 8,
} as const;

export type PrivilegeType = (typeof PrivilegeType)[keyof typeof PrivilegeType];
