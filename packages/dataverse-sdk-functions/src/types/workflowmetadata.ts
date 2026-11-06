import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * workflowmetadata entity type
 */
export interface workflowmetadata {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _workflowid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  filevalue?: string;
  filevalue_name?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  propertykey?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  type?: string;
  utcconversiontimezonecode?: number;
  value?: string;
  valuetype?: number;
  versionnumber?: number;
  workflowmetadataid?: string;
}
