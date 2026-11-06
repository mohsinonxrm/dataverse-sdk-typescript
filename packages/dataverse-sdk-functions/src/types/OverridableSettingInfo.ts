import type { AppOverridableSettingInfo } from "./AppOverridableSettingInfo.js";
import type { OrgOverridableSettingInfo } from "./OrgOverridableSettingInfo.js";

/**
 * OverridableSettingInfo complex type
 */
export interface OverridableSettingInfo {
  AppOverridableSettingInfo?: AppOverridableSettingInfo[];
  DataType?: number;
  DefaultValue?: string;
  Description?: string;
  DisplayName?: string;
  HasActiveCustomizations?: boolean;
  InformationUrl?: string;
  IsCustomizable?: boolean;
  IsHidden?: boolean;
  IsManaged?: boolean;
  IsOverridable?: boolean;
  IsPlatform?: boolean;
  OrgOverridableSettingInfo?: OrgOverridableSettingInfo;
  OverridableLevel?: number;
  PresentInSolution?: boolean;
  ReleaseLevel?: number;
  SettingDefinitionId?: string;
  UniqueName?: string;
}
