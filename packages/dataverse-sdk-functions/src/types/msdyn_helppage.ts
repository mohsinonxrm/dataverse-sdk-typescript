import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_helppage entity type
 */
export interface msdyn_helppage {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_content?: string;
  msdyn_contenttype?: string;
  msdyn_displayname?: string;
  msdyn_helppageid?: string;
  msdyn_locale?: number;
  msdyn_path?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
