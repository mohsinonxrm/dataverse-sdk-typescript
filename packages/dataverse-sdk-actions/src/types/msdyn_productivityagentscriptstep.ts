import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_productivityagentscriptstep entity type
 */
export interface msdyn_productivityagentscriptstep {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_agentscriptid_value?: string;
  _msdyn_macroactionid_value?: string;
  _msdyn_routeactionid_value?: string;
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
  msdyn_actiontype?: number;
  msdyn_description?: string;
  msdyn_name?: string;
  msdyn_order?: number;
  msdyn_productivityagentscriptstepid?: string;
  msdyn_textinstruction?: string;
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
