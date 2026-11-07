import type { activitypointer } from "./activitypointer.js";

/**
 * adx_inviteredemption entity type
 */
export interface adx_inviteredemption extends activitypointer {
  _serviceid_value?: string;
  adx_ipaddress?: string;
  importsequencenumber?: number;
  overriddencreatedon?: string;
}
