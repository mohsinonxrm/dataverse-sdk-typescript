import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_productivitymacroactiontemplate entity type
 */
export interface msdyn_productivitymacroactiontemplate {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_macroconnector_value?: string;
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
  msdyn_actiondescription?: string;
  msdyn_brandcolor?: string;
  msdyn_displayname?: string;
  msdyn_icon?: string;
  msdyn_inputparameters?: string;
  msdyn_kind?: string;
  msdyn_name?: string;
  msdyn_outputparameters?: string;
  msdyn_productivitymacroactiontemplateid?: string;
  msdyn_runtimeapi?: string;
  msdyn_subtitle?: string;
  msdyn_summary?: string;
  msdyn_title?: string;
  msdyn_uniquename?: string;
  msdyn_visibility?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
