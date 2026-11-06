import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_dataflowtemplate entity type
 */
export interface msdyn_dataflowtemplate {
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
  msdyn_category?: string;
  msdyn_configuration?: string;
  msdyn_dataflowtemplateid?: string;
  msdyn_description?: string;
  msdyn_helplink?: string;
  msdyn_isdisabled?: boolean;
  msdyn_mashupdocument?: string;
  msdyn_templateicon?: string;
  msdyn_templateicon_timestamp?: number;
  msdyn_templateicon_url?: string;
  msdyn_templateiconid?: string;
  msdyn_templatename?: string;
  msdyn_templatestate?: number;
  msdyn_templateversion?: string;
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
