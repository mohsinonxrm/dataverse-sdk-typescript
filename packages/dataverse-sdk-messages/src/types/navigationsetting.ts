/**
 * navigationsetting entity type
 */
export interface navigationsetting {
  _appconfigid_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  advancedsettingorder?: number;
  appconfigidunique?: string;
  componentstate?: number;
  createdon?: string;
  description?: string;
  groupname?: string;
  iconresourceid?: string;
  importsequencenumber?: number;
  introducedversion?: string;
  ismanaged?: boolean;
  modifiedon?: string;
  name?: string;
  navigationsettingid?: string;
  navigationsettingidunique?: string;
  objecttypecode?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  pageurl?: string;
  parentnavigationsettingid?: string;
  privileges?: number;
  progressstate?: boolean;
  quicksettingorder?: number;
  resourceid?: string;
  settingtype?: number;
  solutionid?: string;
}
