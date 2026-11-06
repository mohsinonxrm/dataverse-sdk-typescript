import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_occommunicationprovidersetting entity type
 */
export interface msdyn_occommunicationprovidersetting {
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
  msdyn_accountsid?: string;
  msdyn_apibaseurl?: string;
  msdyn_appmodule?: string;
  msdyn_istrial?: boolean;
  msdyn_name?: string;
  msdyn_occommunicationprovider?: number;
  msdyn_occommunicationproviderdatalocation?: string;
  msdyn_occommunicationproviderimmutableid?: string;
  msdyn_occommunicationprovidersettingid?: string;
  msdyn_secret?: string;
  msdyn_securesecret?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
