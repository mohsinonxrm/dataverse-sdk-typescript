import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_pmprocessextendedmetadataversion entity type
 */
export interface msdyn_pmprocessextendedmetadataversion {
  _createdby_value?: string;
  msdyn_pmprocessextendedmetadataversionid?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  statecode?: number;
  createdon?: string;
  msdyn_name?: string;
  versionnumber?: number;
  overriddencreatedon?: string;
  timezoneruleversionnumber?: number;
  _owningteam_value?: string;
  solutionid?: string;
  _msdyn_pmprocessversionid_value?: string;
  componentidunique?: string;
  _owninguser_value?: string;
  statuscode?: number;
  componentstate?: number;
  iscustomizable?: BooleanManagedProperty;
  utcconversiontimezonecode?: number;
  msdyn_version?: number;
  importsequencenumber?: number;
  ismanaged?: boolean;
  msdyn_configuration?: string;
  modifiedon?: string;
  _createdonbehalfby_value?: string;
  overwritetime?: string;
}
