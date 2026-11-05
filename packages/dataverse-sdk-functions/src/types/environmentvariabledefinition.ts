import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * environmentvariabledefinition entity type
 */
export interface environmentvariabledefinition {
  _owningteam_value?: string;
  timezoneruleversionnumber?: number;
  environmentvariabledefinitionidunique?: string;
  _modifiedby_value?: string;
  componentstate?: number;
  secretstore?: number;
  modifiedon?: string;
  isrequired?: boolean;
  description?: string;
  apiid?: string;
  versionnumber?: number;
  valueschema?: string;
  displayname?: string;
  defaultvalue?: string;
  statuscode?: number;
  schemaname?: string;
  type?: number;
  solutionid?: string;
  _parentdefinitionid_value?: string;
  _createdonbehalfby_value?: string;
  overriddencreatedon?: string;
  createdon?: string;
  parameterkey?: string;
  learnmoreurl?: string;
  _createdby_value?: string;
  _connectionreferenceid_value?: string;
  importsequencenumber?: number;
  environmentvariabledefinitionid?: string;
  inputcontrolconfig?: string;
  _owningbusinessunit_value?: string;
  _owninguser_value?: string;
  hint?: string;
  _ownerid_value?: string;
  iscustomizable?: BooleanManagedProperty;
  introducedversion?: string;
  overwritetime?: string;
  ismanaged?: boolean;
  utcconversiontimezonecode?: number;
  _modifiedonbehalfby_value?: string;
  statecode?: number;
}
