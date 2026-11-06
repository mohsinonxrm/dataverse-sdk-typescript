import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_pmbusinessruleautomationconfig entity type
 */
export interface msdyn_pmbusinessruleautomationconfig {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _customapiid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_pminferredtaskid_value?: string;
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
  msdyn_businessruleid?: string;
  msdyn_isenabled?: boolean;
  msdyn_name?: string;
  msdyn_pmbusinessruleautomationconfigid?: string;
  msdyn_selectedcustomattributes?: string;
  msdyn_shouldincludeallemitsinnextrun?: boolean;
  msdyn_uniquename?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
