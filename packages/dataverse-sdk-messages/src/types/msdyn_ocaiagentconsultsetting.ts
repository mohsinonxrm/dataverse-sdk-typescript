import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_ocaiagentconsultsetting entity type
 */
export interface msdyn_ocaiagentconsultsetting {
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
  msdyn_botid?: string;
  msdyn_botname?: string;
  msdyn_keeponhold?: boolean;
  msdyn_ocaiagentconsultsettingid?: string;
  msdyn_pauserecordingandtranscript?: boolean;
  msdyn_systemuserid?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
