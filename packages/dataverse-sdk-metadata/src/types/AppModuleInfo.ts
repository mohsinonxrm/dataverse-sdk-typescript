import type { AppSettingDetails } from "./AppSettingDetails.js";

/**
 * AppModuleInfo
 */
export interface AppModuleInfo {
  AppId?: string;
  AppDisplayName?: string;
  PublisherName?: string;
  PublishedOn?: string;
  AppUniqueName?: string;
  AppVersion?: string;
  Description?: string;
  WebResourceUri?: string;
  WelcomePageUri?: string;
  CreatedOn?: string;
  CreatedBy?: string;
  ModifiedOn?: string;
  ModifiedBy?: string;
  AppUri?: string;
  IsDefault?: boolean;
  ClientType?: number;
  NavigationType?: number;
  OptimizedFor?: string;
  AppSettingDetails?: AppSettingDetails[];
}
