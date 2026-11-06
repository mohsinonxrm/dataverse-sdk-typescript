import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_transformationjobdefinition entity type
 */
export interface msdyn_transformationjobdefinition {
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
  msdyn_createapi?: string;
  msdyn_issync?: boolean;
  msdyn_maxautomaticretrycount?: number;
  msdyn_name?: string;
  msdyn_operation?: number;
  msdyn_retryapi?: string;
  msdyn_setupapi?: string;
  msdyn_shouldprogresstonextstage?: boolean;
  msdyn_stage?: number;
  msdyn_statusapi?: string;
  msdyn_transformationjobdefinitionid?: string;
  msdyn_transformationtype?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
