import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_agentconfiguration entity type
 */
export interface msdyn_agentconfiguration {
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
  msdyn_agentconfigurationid?: string;
  msdyn_agentconfigurationname?: string;
  msdyn_agenttype?: number;
  msdyn_configurationentity?: string;
  msdyn_configurationpagename?: string;
  msdyn_configurationpagetype?: string;
  msdyn_iconpath?: string;
  msdyn_isenabled?: boolean;
  msdyn_order?: number;
  msdyn_prerequisitecheck?: boolean;
  msdyn_prerequisitelink?: string;
  msdyn_tooltip?: string;
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
