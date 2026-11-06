import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_conversationtopicsetting entity type
 */
export interface msdyn_conversationtopicsetting {
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
  msdyn_conversationtopicsettingid?: string;
  msdyn_enabled?: boolean;
  msdyn_ignorelist?: string;
  msdyn_name?: string;
  msdyn_topicautomationenabled?: boolean;
  msdyn_topictraininglanguage?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
