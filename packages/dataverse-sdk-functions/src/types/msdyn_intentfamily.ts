import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_intentfamily entity type
 */
export interface msdyn_intentfamily {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_defaultusergroup_value?: string;
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
  msdyn_CPAAutomationLevel?: number;
  msdyn_customentity_config?: string;
  msdyn_description?: string;
  msdyn_intentbasedroutingenabled?: boolean;
  msdyn_intentfamily_description?: string;
  msdyn_intentfamilyid?: string;
  msdyn_iscaseintentfromactivityenabled?: boolean;
  msdyn_isdefault?: boolean;
  msdyn_isenabled?: boolean;
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
