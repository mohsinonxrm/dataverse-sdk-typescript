import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_ocliveworkstreamcontextvariable entity type
 */
export interface msdyn_ocliveworkstreamcontextvariable {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_liveworkstreamid_value?: string;
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
  msdyn_datatype?: number;
  msdyn_displayname?: string;
  msdyn_entitylogicalname?: string;
  msdyn_isdisplayable?: boolean;
  msdyn_islist?: boolean;
  msdyn_ismodifiable?: boolean;
  msdyn_issystemdefined?: boolean;
  msdyn_name?: string;
  msdyn_ocliveworkstreamcontextvariableid?: string;
  msdyn_relationshipname?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
