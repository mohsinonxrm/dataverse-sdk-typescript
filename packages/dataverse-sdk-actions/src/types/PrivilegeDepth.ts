/**
 * PrivilegeDepth enum
 */
export const PrivilegeDepth = {
  Basic: 0,
  Local: 1,
  Deep: 2,
  Global: 3,
  RecordFilter: 4,
} as const;

export type PrivilegeDepth = (typeof PrivilegeDepth)[keyof typeof PrivilegeDepth];
