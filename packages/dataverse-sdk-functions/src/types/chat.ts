import type { activitypointer } from './activitypointer.js';

/**
 * chat entity type
 */
export interface chat extends activitypointer {
  _linkedby_value?: string;
  _unlinkedby_value?: string;
  eventssummary?: string;
  importsequencenumber?: number;
  lastsyncerror?: number;
  linkedon?: string;
  modifiedinteamsbyactivitypartyid?: string;
  modifiedinteamson?: string;
  overriddencreatedon?: string;
  syncstatus?: number;
  teamschatid?: string;
  unlinkedon?: string;
}
