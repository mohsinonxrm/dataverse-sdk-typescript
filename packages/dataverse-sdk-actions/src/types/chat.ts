import type { activitypointer } from "./activitypointer.js";

/**
 * chat entity type
 */
export interface chat extends activitypointer {
  _linkedby_value?: string;
  importsequencenumber?: number;
  teamschatid?: string;
  _unlinkedby_value?: string;
  overriddencreatedon?: string;
  modifiedinteamson?: string;
  lastsyncerror?: number;
  modifiedinteamsbyactivitypartyid?: string;
  unlinkedon?: string;
  linkedon?: string;
  eventssummary?: string;
  syncstatus?: number;
}
