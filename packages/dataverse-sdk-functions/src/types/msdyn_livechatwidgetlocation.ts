import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_livechatwidgetlocation entity type
 */
export interface msdyn_livechatwidgetlocation {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_livechatconfigid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_domainvalue?: string;
  msdyn_livechatwidgetlocationid?: string;
  msdyn_locationurlwildcard?: string;
  msdyn_name?: string;
  msdyn_ruletype?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
