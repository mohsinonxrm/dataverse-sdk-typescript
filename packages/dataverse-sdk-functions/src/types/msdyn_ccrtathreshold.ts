import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_ccrtathreshold entity type
 */
export interface msdyn_ccrtathreshold {
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
  msdyn_ccrtathresholdid?: string;
  msdyn_kpiid?: string;
  msdyn_metadata?: string;
  msdyn_name?: string;
  msdyn_schemaversion?: number;
  msdyn_scope?: string;
  msdyn_scopeid?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
