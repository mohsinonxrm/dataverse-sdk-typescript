import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_governanceagent_status entity type
 */
export interface msdyn_governanceagent_status {
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
  msdyn_governanceagent_statusid?: string;
  msdyn_isenabled?: boolean;
  msdyn_name?: string;
  msdyn_platformcopilotsettings?: string;
  msdyn_settings?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
