import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_conversationtopicsummary entity type
 */
export interface msdyn_conversationtopicsummary {
  solutionid?: string;
  overriddencreatedon?: string;
  msdyn_topictraininglanguage?: number;
  statuscode?: number;
  _createdonbehalfby_value?: string;
  _createdby_value?: string;
  utcconversiontimezonecode?: number;
  msdyn_conversationtopicsummaryid?: string;
  _modifiedonbehalfby_value?: string;
  msdyn_conversationcount?: number;
  overwritetime?: string;
  createdon?: string;
  _organizationid_value?: string;
  statecode?: number;
  msdyn_refreshtime?: string;
  msdyn_conversationcoveragepercentage?: number;
  ismanaged?: boolean;
  componentidunique?: string;
  modifiedon?: string;
  msdyn_name?: string;
  versionnumber?: number;
  iscustomizable?: BooleanManagedProperty;
  importsequencenumber?: number;
  componentstate?: number;
  _modifiedby_value?: string;
  msdyn_topiccount?: number;
  timezoneruleversionnumber?: number;
}
