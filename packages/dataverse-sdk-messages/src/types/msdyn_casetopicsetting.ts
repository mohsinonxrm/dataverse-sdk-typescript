import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_casetopicsetting entity type
 */
export interface msdyn_casetopicsetting {
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
  msdyn_attributeinuse?: string;
  msdyn_casetopicsettingid?: string;
  msdyn_delimiters?: string;
  msdyn_enabled?: boolean;
  msdyn_ignorelist?: string;
  msdyn_name?: string;
  msdyn_selectionlocation?: number;
  msdyn_topicautomationenabled?: boolean;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
