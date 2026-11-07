import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * aipluginoperationparameter entity type
 */
export interface aipluginoperationparameter {
  _aipluginoperation_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  aipluginoperationparameterid?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  description?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  path?: string;
  propertydetails?: string;
  propertyname?: string;
  propertyvalue?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  type?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
