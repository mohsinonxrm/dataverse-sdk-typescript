import type { AppSettingDetails } from "./AppSettingDetails.js";

/**
 * AppModuleInfo
 */
export interface AppModuleInfo {
  AppDisplayName?: string;
  AppId?: string;
  AppSettingDetails?: AppSettingDetails[];
  AppUniqueName?: string;
  AppUri?: string;
  AppVersion?: string;
  ClientType?: number;
  CreatedBy?: string;
  CreatedOn?: string;
  Description?: string;
  IsDefault?: boolean;
  ModifiedBy?: string;
  ModifiedOn?: string;
  NavigationType?: number;
  OptimizedFor?: string;
  PublishedOn?: string;
  PublisherName?: string;
  WebResourceUri?: string;
  WelcomePageUri?: string;
}
