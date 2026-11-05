import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * approvalprocess entity type
 */
export interface approvalprocess {
  name?: string;
  _owningteam_value?: string;
  ismanaged?: boolean;
  versionnumber?: number;
  _modifiedonbehalfby_value?: string;
  inputs_name?: string;
  _createdby_value?: string;
  uniquename?: string;
  stages?: string;
  _ownerid_value?: string;
  inputs?: string;
  introducedversion?: string;
  modifiedon?: string;
  statecode?: number;
  _owninguser_value?: string;
  createdon?: string;
  iscustomizable?: BooleanManagedProperty;
  overriddencreatedon?: string;
  _createdonbehalfby_value?: string;
  componentidunique?: string;
  _modifiedby_value?: string;
  utcconversiontimezonecode?: number;
  componentstate?: number;
  timezoneruleversionnumber?: number;
  approvalprocessid?: string;
  overwritetime?: string;
  statuscode?: number;
  solutionid?: string;
  importsequencenumber?: number;
  stages_name?: string;
  _owningbusinessunit_value?: string;
  metadataversion?: number;
}
