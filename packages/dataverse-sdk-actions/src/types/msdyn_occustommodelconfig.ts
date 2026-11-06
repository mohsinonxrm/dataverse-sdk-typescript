import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_occustommodelconfig entity type
 */
export interface msdyn_occustommodelconfig {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
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
  msdyn_additionalheaders?: string;
  msdyn_authenticationkey?: string;
  msdyn_clientid?: string;
  msdyn_model?: number;
  msdyn_modelendpoint?: string;
  msdyn_modelprovider?: number;
  msdyn_name?: string;
  msdyn_occustommodelconfigid?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
