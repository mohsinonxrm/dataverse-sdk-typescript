import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * retentionconfig entity type
 */
export interface retentionconfig {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  asyncoperationid?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  criteria?: string;
  entitylogicalname?: string;
  fnotablename?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  jobcriteriakey?: string;
  modifiedon?: string;
  name?: string;
  nextrun?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  provisioningmode?: number;
  recurrence?: string;
  referenceconfigid?: string;
  retentionconfigid?: string;
  solutionid?: string;
  starttime?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  type?: number;
  uniquename?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
  viewid?: string;
}
