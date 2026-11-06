import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * environmentvariabledefinition entity type
 */
export interface environmentvariabledefinition {
  _connectionreferenceid_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _parentdefinitionid_value?: string;
  apiid?: string;
  componentstate?: number;
  createdon?: string;
  defaultvalue?: string;
  description?: string;
  displayname?: string;
  environmentvariabledefinitionid?: string;
  environmentvariabledefinitionidunique?: string;
  hint?: string;
  importsequencenumber?: number;
  inputcontrolconfig?: string;
  introducedversion?: string;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  isrequired?: boolean;
  learnmoreurl?: string;
  modifiedon?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  parameterkey?: string;
  schemaname?: string;
  secretstore?: number;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  type?: number;
  utcconversiontimezonecode?: number;
  valueschema?: string;
  versionnumber?: number;
}
