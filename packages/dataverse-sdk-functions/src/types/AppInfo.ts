import type { WebResourceInfo } from "./WebResourceInfo.js";

/**
 * AppInfo complex type
 */
export interface AppInfo {
  AppId?: string;
  Title?: string;
  UniqueName?: string;
  IsDefault?: boolean;
  Description?: string;
  webResourceInfo?: WebResourceInfo;
  welcomePageInfo?: WebResourceInfo;
  Status?: number;
  LastModifiedOn?: string;
  AppUrl?: string;
  ClientType?: number;
  MobileOfflineProfileIds?: string[];
  AiAppDescription?: string;
  IsManaged?: boolean;
}
