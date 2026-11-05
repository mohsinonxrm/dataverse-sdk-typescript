import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_knowledgeassetconfiguration entity type
 */
export interface msdyn_knowledgeassetconfiguration {
  uniquename?: string;
  overwritetime?: string;
  msdyn_knowledgeassetconfigurationid?: string;
  _owningbusinessunit_value?: string;
  ismanaged?: boolean;
  componentstate?: number;
  msdyn_providerspecificconfiguration?: string;
  name?: string;
  modifiedon?: string;
  overriddencreatedon?: string;
  _msdyn_aipluginoperationid_value?: string;
  utcconversiontimezonecode?: number;
  componentidunique?: string;
  _createdonbehalfby_value?: string;
  _modifiedonbehalfby_value?: string;
  _owninguser_value?: string;
  statuscode?: number;
  solutionid?: string;
  _modifiedby_value?: string;
  createdon?: string;
  _ownerid_value?: string;
  timezoneruleversionnumber?: number;
  iscustomizable?: BooleanManagedProperty;
  _msdyn_customapiid_value?: string;
  importsequencenumber?: number;
  statecode?: number;
  versionnumber?: number;
  _owningteam_value?: string;
  msdyn_providertype?: string;
  _createdby_value?: string;
}
