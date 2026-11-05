import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * retentionconfig entity type
 */
export interface retentionconfig {
  _owninguser_value?: string;
  utcconversiontimezonecode?: number;
  timezoneruleversionnumber?: number;
  criteria?: string;
  statecode?: number;
  overriddencreatedon?: string;
  name?: string;
  iscustomizable?: BooleanManagedProperty;
  nextrun?: string;
  ismanaged?: boolean;
  recurrence?: string;
  _modifiedby_value?: string;
  modifiedon?: string;
  asyncoperationid?: string;
  _owningbusinessunit_value?: string;
  _createdonbehalfby_value?: string;
  solutionid?: string;
  statuscode?: number;
  _owningteam_value?: string;
  _ownerid_value?: string;
  starttime?: string;
  componentidunique?: string;
  versionnumber?: number;
  componentstate?: number;
  _modifiedonbehalfby_value?: string;
  entitylogicalname?: string;
  createdon?: string;
  retentionconfigid?: string;
  _createdby_value?: string;
  uniquename?: string;
  importsequencenumber?: number;
  viewid?: string;
  overwritetime?: string;
  referenceconfigid?: string;
}
