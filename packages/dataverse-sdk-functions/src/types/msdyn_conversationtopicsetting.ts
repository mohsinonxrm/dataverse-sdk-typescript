import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_conversationtopicsetting entity type
 */
export interface msdyn_conversationtopicsetting {
  utcconversiontimezonecode?: number;
  statuscode?: number;
  componentstate?: number;
  msdyn_ignorelist?: string;
  _createdonbehalfby_value?: string;
  iscustomizable?: BooleanManagedProperty;
  importsequencenumber?: number;
  _organizationid_value?: string;
  msdyn_topicautomationenabled?: boolean;
  msdyn_topictraininglanguage?: number;
  _modifiedby_value?: string;
  msdyn_name?: string;
  timezoneruleversionnumber?: number;
  _modifiedonbehalfby_value?: string;
  modifiedon?: string;
  _createdby_value?: string;
  ismanaged?: boolean;
  createdon?: string;
  overriddencreatedon?: string;
  versionnumber?: number;
  statecode?: number;
  msdyn_enabled?: boolean;
  msdyn_conversationtopicsettingid?: string;
  solutionid?: string;
  overwritetime?: string;
  componentidunique?: string;
}
