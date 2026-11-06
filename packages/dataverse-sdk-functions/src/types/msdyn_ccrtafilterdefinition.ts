import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_ccrtafilterdefinition entity type
 */
export interface msdyn_ccrtafilterdefinition {
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
  msdyn_bindings?: string;
  msdyn_ccrtafilterdefinitionid?: string;
  msdyn_enabled?: boolean;
  msdyn_metadatafile?: string;
  msdyn_metadatafile_name?: string;
  msdyn_name?: string;
  msdyn_schemaversion?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
