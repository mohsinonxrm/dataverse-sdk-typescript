import type { WebResourceInfo } from "./WebResourceInfo.js";

/**
 * AppInfo complex type
 */
export interface AppInfo {
  AiAppDescription?: string;
  AppId?: string;
  AppUrl?: string;
  ClientType?: number;
  DefaultAgentEnvVarSchemaName?: string;
  Description?: string;
  IsDefault?: boolean;
  IsManaged?: boolean;
  LastModifiedOn?: string;
  MobileOfflineProfileIds?: string[];
  Status?: number;
  Title?: string;
  UniqueName?: string;
  webResourceInfo?: WebResourceInfo;
  welcomePageInfo?: WebResourceInfo;
}
