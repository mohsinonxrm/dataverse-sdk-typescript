import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_copilottool entity type
 */
export interface msdyn_copilottool {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_parentskillid_value?: string;
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
  msdyn_copilottoolid?: string;
  msdyn_name?: string;
  msdyn_shortdescription?: string;
  msdyn_signature?: string;
  msdyn_toolmetadata?: string;
  msdyn_type?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
