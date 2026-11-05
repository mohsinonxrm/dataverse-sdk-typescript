import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * mainfewshot entity type
 */
export interface mainfewshot {
  solutionid?: string;
  uniquename?: string;
  objectpartitionid?: string;
  standardsql?: string;
  _organizationid_value?: string;
  _modifiedby_value?: string;
  componentidunique?: string;
  componentstate?: number;
  rephrase?: string;
  overriddencreatedon?: string;
  iscustomizable?: BooleanManagedProperty;
  statuscode?: number;
  query?: string;
  ismanaged?: boolean;
  importsequencenumber?: number;
  statecode?: number;
  versionnumber?: number;
  _createdonbehalfby_value?: string;
  overwritetime?: string;
  mainfewshotid?: string;
  savedqueryversionnumber?: number;
  utcconversiontimezonecode?: number;
  comment?: string;
  savedqueryviewid?: string;
  category?: string;
  _modifiedonbehalfby_value?: string;
  timezoneruleversionnumber?: number;
  createdon?: string;
  modifiedon?: string;
  _createdby_value?: string;
  entitytype?: number;
}
