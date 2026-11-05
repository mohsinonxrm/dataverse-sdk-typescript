import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_productivityagentscriptstep entity type
 */
export interface msdyn_productivityagentscriptstep {
  msdyn_uniquename?: string;
  componentstate?: number;
  msdyn_productivityagentscriptstepid?: string;
  statecode?: number;
  _createdby_value?: string;
  _msdyn_agentscriptid_value?: string;
  versionnumber?: number;
  msdyn_textinstruction?: string;
  modifiedon?: string;
  _msdyn_macroactionid_value?: string;
  _owningbusinessunit_value?: string;
  _ownerid_value?: string;
  _modifiedby_value?: string;
  ismanaged?: boolean;
  _createdonbehalfby_value?: string;
  overwritetime?: string;
  createdon?: string;
  msdyn_name?: string;
  utcconversiontimezonecode?: number;
  _msdyn_routeactionid_value?: string;
  overriddencreatedon?: string;
  msdyn_actiontype?: number;
  msdyn_order?: number;
  _owningteam_value?: string;
  iscustomizable?: BooleanManagedProperty;
  statuscode?: number;
  solutionid?: string;
  msdyn_description?: string;
  _owninguser_value?: string;
  _modifiedonbehalfby_value?: string;
  timezoneruleversionnumber?: number;
  componentidunique?: string;
  importsequencenumber?: number;
}
