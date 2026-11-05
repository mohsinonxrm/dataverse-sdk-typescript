/**
 * ChannelAccessProfilePrivilegeDepth
 *
 * The Web API reads and writes enum members by name (`"None"`), never by number,
 * so this is a string union. `ChannelAccessProfilePrivilegeDepth.None` is the name; each member's comment
 * gives its numeric value.
 */
export const ChannelAccessProfilePrivilegeDepth = {
  /** 0 */
  None: "None",
  /** 1 */
  EntityReference: "EntityReference",
  /** 2 */
  ParentEntityReference: "ParentEntityReference",
  /** 8 */
  Global: "Global",
} as const;

export type ChannelAccessProfilePrivilegeDepth =
  (typeof ChannelAccessProfilePrivilegeDepth)[keyof typeof ChannelAccessProfilePrivilegeDepth];
