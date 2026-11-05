import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_agentsetting entity type
 */
export interface msdyn_agentsetting {
  componentidunique?: string;
  importsequencenumber?: number;
  _owningbusinessunit_value?: string;
  _createdonbehalfby_value?: string;
  utcconversiontimezonecode?: number;
  msdyn_kbfilter?: string;
  msdyn_scenario?: number;
  timezoneruleversionnumber?: number;
  statecode?: number;
  _createdby_value?: string;
  modifiedon?: string;
  msdyn_isd365knowledgesourceenabled?: boolean;
  iscustomizable?: BooleanManagedProperty;
  solutionid?: string;
  ismanaged?: boolean;
  overriddencreatedon?: string;
  statuscode?: number;
  msdyn_name?: string;
  componentstate?: number;
  _owningteam_value?: string;
  _modifiedonbehalfby_value?: string;
  _modifiedby_value?: string;
  _ownerid_value?: string;
  msdyn_agentsettingid?: string;
  createdon?: string;
  msdyn_iscopilotstudioknowledgeenabled?: boolean;
  overwritetime?: string;
  versionnumber?: number;
  _owninguser_value?: string;
}
