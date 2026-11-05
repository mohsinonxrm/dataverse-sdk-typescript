import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_agentlanguage entity type
 */
export interface msdyn_agentlanguage {
  _msdyn_systemuserid_value?: string;
  modifiedon?: string;
  versionnumber?: number;
  importsequencenumber?: number;
  utcconversiontimezonecode?: number;
  _owningteam_value?: string;
  componentstate?: number;
  solutionid?: string;
  overwritetime?: string;
  _createdonbehalfby_value?: string;
  componentidunique?: string;
  createdon?: string;
  _ownerid_value?: string;
  timezoneruleversionnumber?: number;
  _createdby_value?: string;
  _owningbusinessunit_value?: string;
  _modifiedonbehalfby_value?: string;
  msdyn_name?: string;
  _owninguser_value?: string;
  ismanaged?: boolean;
  msdyn_agentlanguageid?: string;
  overriddencreatedon?: string;
  iscustomizable?: BooleanManagedProperty;
  _msdyn_languageid_value?: string;
  _modifiedby_value?: string;
  statecode?: number;
  statuscode?: number;
}
