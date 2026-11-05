import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_evaluationcategory entity type
 */
export interface msdyn_evaluationcategory {
  _createdonbehalfby_value?: string;
  componentidunique?: string;
  iscustomizable?: BooleanManagedProperty;
  msdyn_name?: string;
  componentstate?: number;
  createdon?: string;
  overwritetime?: string;
  _owningteam_value?: string;
  importsequencenumber?: number;
  utcconversiontimezonecode?: number;
  statecode?: number;
  _modifiedby_value?: string;
  ismanaged?: boolean;
  _owningbusinessunit_value?: string;
  _modifiedonbehalfby_value?: string;
  versionnumber?: number;
  _ownerid_value?: string;
  _createdby_value?: string;
  statuscode?: number;
  overriddencreatedon?: string;
  modifiedon?: string;
  msdyn_evaluationcategoryid?: string;
  timezoneruleversionnumber?: number;
  solutionid?: string;
  _owninguser_value?: string;
  _msdyn_evaluationcriteria_value?: string;
  msdyn_descriptionmetadataid?: string;
  msdyn_description?: string;
  msdyn_namemetadataid?: string;
}
