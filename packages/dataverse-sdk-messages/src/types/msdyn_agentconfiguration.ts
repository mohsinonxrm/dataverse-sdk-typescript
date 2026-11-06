import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_agentconfiguration entity type
 */
export interface msdyn_agentconfiguration {
  msdyn_isenabled?: boolean;
  _owningteam_value?: string;
  _modifiedby_value?: string;
  msdyn_uniquename?: string;
  overwritetime?: string;
  msdyn_prerequisitelink?: string;
  msdyn_tooltip?: string;
  msdyn_configurationentity?: string;
  _createdonbehalfby_value?: string;
  msdyn_agentconfigurationid?: string;
  componentidunique?: string;
  iscustomizable?: BooleanManagedProperty;
  statuscode?: number;
  msdyn_configurationpagename?: string;
  utcconversiontimezonecode?: number;
  _owningbusinessunit_value?: string;
  modifiedon?: string;
  ismanaged?: boolean;
  _modifiedonbehalfby_value?: string;
  msdyn_prerequisitecheck?: boolean;
  msdyn_configurationpagetype?: string;
  _ownerid_value?: string;
  createdon?: string;
  solutionid?: string;
  msdyn_iconpath?: string;
  versionnumber?: number;
  msdyn_agentconfigurationname?: string;
  msdyn_agenttype?: number;
  componentstate?: number;
  msdyn_order?: number;
  timezoneruleversionnumber?: number;
  importsequencenumber?: number;
  _createdby_value?: string;
  _owninguser_value?: string;
  statecode?: number;
  overriddencreatedon?: string;
}
