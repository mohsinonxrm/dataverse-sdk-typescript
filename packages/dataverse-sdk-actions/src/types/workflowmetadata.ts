import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * workflowmetadata entity type
 */
export interface workflowmetadata {
  _owningteam_value?: string;
  _modifiedby_value?: string;
  solutionid?: string;
  filevalue_name?: string;
  _workflowid_value?: string;
  type?: string;
  _modifiedonbehalfby_value?: string;
  _owninguser_value?: string;
  overwritetime?: string;
  timezoneruleversionnumber?: number;
  statuscode?: number;
  statecode?: number;
  _createdonbehalfby_value?: string;
  modifiedon?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
  componentstate?: number;
  value?: string;
  propertykey?: string;
  _owningbusinessunit_value?: string;
  createdon?: string;
  componentidunique?: string;
  name?: string;
  ismanaged?: boolean;
  workflowmetadataid?: string;
  importsequencenumber?: number;
  _ownerid_value?: string;
  _createdby_value?: string;
  iscustomizable?: BooleanManagedProperty;
  valuetype?: number;
  overriddencreatedon?: string;
  filevalue?: string;
}
