import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * mainfewshot entity type
 */
export interface mainfewshot {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  category?: string;
  comment?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  entitytype?: number;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  mainfewshotid?: string;
  modifiedon?: string;
  objectpartitionid?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  query?: string;
  rephrase?: string;
  savedqueryversionnumber?: number;
  savedqueryviewid?: string;
  solutionid?: string;
  standardsql?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  uniquename?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
