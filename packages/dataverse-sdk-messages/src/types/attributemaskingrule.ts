import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * attributemaskingrule entity type
 */
export interface attributemaskingrule {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _maskingruleid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  attributelogicalname?: string;
  attributemaskingruleid?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  entityname?: string;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  overwritetime?: string;
  solutionid?: string;
  timezoneruleversionnumber?: number;
  uniquename?: string;
  utcconversiontimezonecode?: number;
}
