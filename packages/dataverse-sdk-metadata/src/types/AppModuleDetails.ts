import type { AppSettingDetails } from "./AppSettingDetails.js";
import type { CanvasAppsDetails } from "./CanvasAppsDetails.js";
import type { LocalizedLabelDetails } from "./LocalizedLabelDetails.js";
import type { UserDetails } from "./UserDetails.js";
import type { WebResourceDetails } from "./WebResourceDetails.js";

/**
 * AppModuleDetails
 */
export interface AppModuleDetails {
  AppModuleId?: string;
  AppDisplayName?: LocalizedLabelDetails;
  AppUniqueName?: string;
  AppVersion?: string;
  Description?: LocalizedLabelDetails;
  IconWebResource?: WebResourceDetails;
  WelcomePageWebResource?: WebResourceDetails;
  CreatedBy?: UserDetails;
  CreatedOn?: string;
  ModifiedBy?: UserDetails;
  ModifiedOn?: string;
  AppUri?: string;
  IsDefault?: boolean;
  ClientType?: number;
  NavigationType?: number;
  OptimizedFor?: string;
  PublisherUniqueName?: string;
  PublisherName?: string;
  PublishedOn?: string;
  MetadataVersionNumber?: number;
  IsFirstPartyApplication?: boolean;
  CanvasApps?: CanvasAppsDetails[];
  StateCode?: number;
  AppSettingDetails?: AppSettingDetails[];
}
