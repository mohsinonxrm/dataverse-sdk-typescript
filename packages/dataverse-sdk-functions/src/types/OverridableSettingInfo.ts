import type { AppOverridableSettingInfo } from "./AppOverridableSettingInfo.js";
import type { OrgOverridableSettingInfo } from "./OrgOverridableSettingInfo.js";

/**
 * OverridableSettingInfo complex type
 */
export interface OverridableSettingInfo {
  UniqueName?: string;
  DisplayName?: string;
  Description?: string;
  ReleaseLevel?: number;
  DefaultValue?: string;
  SettingDefinitionId?: string;
  DataType?: number;
  OverridableLevel?: number;
  IsCustomizable?: boolean;
  IsHidden?: boolean;
  IsOverridable?: boolean;
  PresentInSolution?: boolean;
  IsManaged?: boolean;
  IsPlatform?: boolean;
  InformationUrl?: string;
  HasActiveCustomizations?: boolean;
  OrgOverridableSettingInfo?: OrgOverridableSettingInfo;
  AppOverridableSettingInfo?: AppOverridableSettingInfo[];
}
