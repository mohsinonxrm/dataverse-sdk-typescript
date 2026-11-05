import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_pmprocessversion entity type
 */
export interface msdyn_pmprocessversion {
  componentidunique?: string;
  createdon?: string;
  msdyn_configuration?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  overriddencreatedon?: string;
  statuscode?: number;
  iscustomizable?: BooleanManagedProperty;
  overwritetime?: string;
  importsequencenumber?: number;
  _createdby_value?: string;
  msdyn_pmprocessversionid?: string;
  _msdyn_pminferredtaskid_value?: string;
  versionnumber?: number;
  _ownerid_value?: string;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_inputbookmark?: string;
  _owninguser_value?: string;
  msdyn_version?: number;
  componentstate?: number;
  _modifiedonbehalfby_value?: string;
  _owningbusinessunit_value?: string;
  msdyn_name?: string;
  _owningteam_value?: string;
  statecode?: number;
  timezoneruleversionnumber?: number;
  solutionid?: string;
  utcconversiontimezonecode?: number;
}
