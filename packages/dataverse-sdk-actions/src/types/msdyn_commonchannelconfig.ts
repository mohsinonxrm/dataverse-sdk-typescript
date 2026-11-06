import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_commonchannelconfig entity type
 */
export interface msdyn_commonchannelconfig {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _defaultconversationprofileid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_botid_value?: string;
  _msdyn_defaultengagementprofileid_value?: string;
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
  msdyn_commonchannelconfigid?: string;
  msdyn_name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
