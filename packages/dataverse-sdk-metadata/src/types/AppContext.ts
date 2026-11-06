import type { AppElementInfo } from "./AppElementInfo.js";
import type { AppEntityInfo } from "./AppEntityInfo.js";
import type { AppInfo } from "./AppInfo.js";
import type { CanvasAppsInfo } from "./CanvasAppsInfo.js";

/**
 * AppContext
 */
export interface AppContext {
  CanvasApps?: CanvasAppsInfo[];
  SitemapId?: string;
  appElements?: AppElementInfo[];
  appEntityInfo?: AppEntityInfo[];
  appInfo?: AppInfo;
  bpfIds?: string[];
  dashboardIds?: string[];
}
