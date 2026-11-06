/**
 * AppOverridableSettingInfo complex type
 */
export interface AppOverridableSettingInfo {
  AppDisplayName?: string;
  AppId?: string;
  AppSettingId?: string;
  AppUniqueName?: string;
  IsCustomizable?: boolean;
  IsManaged?: boolean;
  IsPublished?: boolean;
  OverriddenPublishedValue?: string;
  OverriddenValue?: string;
}
