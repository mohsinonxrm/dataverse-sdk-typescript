import type { ChannelAccessProfilePrivilegeDepth } from "./ChannelAccessProfilePrivilegeDepth.js";

/**
 * ChannelAccessProfilePrivilege
 */
export interface ChannelAccessProfilePrivilege {
  ChannelAccessProfilePrivilegeId?: string;
  PrivilegeDepth?: ChannelAccessProfilePrivilegeDepth;
  PrivilegeName?: string;
}
