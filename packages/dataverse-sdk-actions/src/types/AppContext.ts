import type { AppElementInfo } from "./AppElementInfo.js";
import type { AppEntityInfo } from "./AppEntityInfo.js";
import type { AppInfo } from "./AppInfo.js";
import type { CanvasAppsInfo } from "./CanvasAppsInfo.js";

/**
 * AppContext complex type
 */
export interface AppContext {
  appInfo: AppInfo;
  SitemapId: string;
  bpfIds: string[];
  dashboardIds: string[];
  appEntityInfo: AppEntityInfo[];
  CanvasApps: CanvasAppsInfo[];
  appElements: AppElementInfo[];
}
