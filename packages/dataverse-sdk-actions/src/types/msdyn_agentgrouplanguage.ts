import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_agentgrouplanguage entity type
 */
export interface msdyn_agentgrouplanguage {
  _msdyn_agentgroupid_value?: string;
  _msdyn_languageid_value?: string;
  versionnumber?: number;
  _modifiedby_value?: string;
  iscustomizable?: BooleanManagedProperty;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _createdby_value?: string;
  _modifiedonbehalfby_value?: string;
  _createdonbehalfby_value?: string;
  utcconversiontimezonecode?: number;
  componentstate?: number;
  _owningteam_value?: string;
  msdyn_agentgrouplanguageid?: string;
  componentidunique?: string;
  _owninguser_value?: string;
  importsequencenumber?: number;
  statecode?: number;
  createdon?: string;
  statuscode?: number;
  msdyn_name?: string;
  timezoneruleversionnumber?: number;
  modifiedon?: string;
  overwritetime?: string;
  solutionid?: string;
  ismanaged?: boolean;
  overriddencreatedon?: string;
}
