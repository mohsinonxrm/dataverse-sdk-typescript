/**
 * AppOverridableSettingInfo complex type
 */
export interface AppOverridableSettingInfo {
  AppUniqueName?: string;
  AppDisplayName?: string;
  AppId?: string;
  OverriddenValue?: string;
  OverriddenPublishedValue?: string;
  AppSettingId?: string;
  IsCustomizable?: boolean;
  IsManaged?: boolean;
  IsPublished?: boolean;
}
