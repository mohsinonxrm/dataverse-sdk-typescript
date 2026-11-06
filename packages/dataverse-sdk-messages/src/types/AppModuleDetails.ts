import type { AppSettingDetails } from "./AppSettingDetails.js";
import type { CanvasAppsDetails } from "./CanvasAppsDetails.js";
import type { LocalizedLabelDetails } from "./LocalizedLabelDetails.js";
import type { UserDetails } from "./UserDetails.js";
import type { WebResourceDetails } from "./WebResourceDetails.js";

/**
 * AppModuleDetails complex type
 */
export interface AppModuleDetails {
  AppDisplayName?: LocalizedLabelDetails;
  AppModuleId?: string;
  AppSettingDetails?: AppSettingDetails[];
  AppUniqueName?: string;
  AppUri?: string;
  AppVersion?: string;
  CanvasApps?: CanvasAppsDetails[];
  ClientType?: number;
  CreatedBy?: UserDetails;
  CreatedOn?: string;
  Description?: LocalizedLabelDetails;
  IconWebResource?: WebResourceDetails;
  IsDefault?: boolean;
  IsFirstPartyApplication?: boolean;
  MetadataVersionNumber?: number;
  ModifiedBy?: UserDetails;
  ModifiedOn?: string;
  NavigationType?: number;
  OptimizedFor?: string;
  PublishedOn?: string;
  PublisherName?: string;
  PublisherUniqueName?: string;
  StateCode?: number;
  WelcomePageWebResource?: WebResourceDetails;
}
