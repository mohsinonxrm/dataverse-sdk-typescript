import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_customapirulesetconfiguration entity type
 */
export interface msdyn_customapirulesetconfiguration {
  msdyn_persistoutputdata?: boolean;
  _owningteam_value?: string;
  versionnumber?: number;
  _modifiedonbehalfby_value?: string;
  iscustomizable?: BooleanManagedProperty;
  statecode?: number;
  overriddencreatedon?: string;
  _msdyn_customapiresponseproperty_value?: string;
  _ownerid_value?: string;
  _modifiedby_value?: string;
  msdyn_uniquename?: string;
  ismanaged?: boolean;
  _createdonbehalfby_value?: string;
  utcconversiontimezonecode?: number;
  modifiedon?: string;
  timezoneruleversionnumber?: number;
  _owninguser_value?: string;
  _owningbusinessunit_value?: string;
  _msdyn_customapirequestparameter_value?: string;
  componentstate?: number;
  componentidunique?: string;
  _msdyn_customapi_value?: string;
  overwritetime?: string;
  msdyn_customapirulesetconfigurationid?: string;
  importsequencenumber?: number;
  _createdby_value?: string;
  solutionid?: string;
  msdyn_refreshinputdata?: boolean;
  createdon?: string;
  statuscode?: number;
  msdyn_name?: string;
}
