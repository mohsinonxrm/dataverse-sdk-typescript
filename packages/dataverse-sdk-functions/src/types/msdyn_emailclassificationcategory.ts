import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_emailclassificationcategory entity type
 */
export interface msdyn_emailclassificationcategory {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_activeversion_value?: string;
  _msdyn_parentcategoryid_value?: string;
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
  msdyn_automationlevel?: number;
  msdyn_categorystatus?: number;
  msdyn_deploymentstatus?: number;
  msdyn_emailclassificationcategoryid?: string;
  msdyn_finalautomationlevel?: number;
  msdyn_name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
