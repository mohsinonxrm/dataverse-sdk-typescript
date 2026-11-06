/**
 * OrgOverridableSettingInfo
 */
export interface OrgOverridableSettingInfo {
  IsCustomizable?: boolean;
  IsManaged?: boolean;
  OrganizationSettingId?: string;
  OverriddenValue?: string;
  PresentInSolution?: boolean;
}
