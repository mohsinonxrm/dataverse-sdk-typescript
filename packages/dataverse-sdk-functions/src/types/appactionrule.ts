import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * appactionrule entity type
 */
export interface appactionrule {
  _contextentity_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  appactionruleid?: string;
  componentidunique?: string;
  componentstate?: number;
  context?: number;
  contextvalue?: string;
  createdon?: string;
  definition?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  type?: number;
  uniquename?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
