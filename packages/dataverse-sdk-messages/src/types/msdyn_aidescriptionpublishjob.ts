import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_aidescriptionpublishjob entity type
 */
export interface msdyn_aidescriptionpublishjob {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_aidescriptionrunid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_aidescriptionpublishjobid?: string;
  msdyn_correlationid?: string;
  msdyn_entitylogicalname?: string;
  msdyn_errordetails?: string;
  msdyn_failedcount?: number;
  msdyn_fieldlogicalname?: string;
  msdyn_name?: string;
  msdyn_publishedcount?: number;
  msdyn_publishedon?: string;
  msdyn_status?: number;
  msdyn_targetattributename?: string;
  msdyn_targetcount?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
