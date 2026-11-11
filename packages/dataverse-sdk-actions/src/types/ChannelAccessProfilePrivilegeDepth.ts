/**
 * ChannelAccessProfilePrivilegeDepth enum
 */
export const ChannelAccessProfilePrivilegeDepth = {
  None: 0,
  EntityReference: 1,
  ParentEntityReference: 2,
  Global: 8,
} as const;

export type ChannelAccessProfilePrivilegeDepth =
  (typeof ChannelAccessProfilePrivilegeDepth)[keyof typeof ChannelAccessProfilePrivilegeDepth];
