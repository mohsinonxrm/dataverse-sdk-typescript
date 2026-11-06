import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_applicationextension entity type
 */
export interface msdyn_applicationextension {
  msdyn_uniquename?: string;
  statecode?: number;
  msdyn_relationship_cardinality?: number;
  _owningteam_value?: string;
  importsequencenumber?: number;
  componentstate?: number;
  modifiedon?: string;
  _modifiedonbehalfby_value?: string;
  msdyn_name?: string;
  _ownerid_value?: string;
  msdyn_type?: number;
  overwritetime?: string;
  overriddencreatedon?: string;
  ismanaged?: boolean;
  _createdby_value?: string;
  _owninguser_value?: string;
  solutionid?: string;
  _owningbusinessunit_value?: string;
  iscustomizable?: BooleanManagedProperty;
  msdyn_webresource_url?: string;
  statuscode?: number;
  componentidunique?: string;
  _modifiedby_value?: string;
  msdyn_appconfig_relationshipname?: string;
  timezoneruleversionnumber?: number;
  msdyn_applicationextensionid?: string;
  utcconversiontimezonecode?: number;
  _createdonbehalfby_value?: string;
  createdon?: string;
  versionnumber?: number;
}
