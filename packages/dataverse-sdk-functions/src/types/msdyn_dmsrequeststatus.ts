import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_dmsrequeststatus entity type
 */
export interface msdyn_dmsrequeststatus {
  msdyn_uploadstarttime?: string;
  _createdonbehalfby_value?: string;
  _msdyn_lookupfield_uploadrequest_value?: string;
  overwritetime?: string;
  iscustomizable?: BooleanManagedProperty;
  timezoneruleversionnumber?: number;
  modifiedon?: string;
  msdyn_uploadendtime?: string;
  solutionid?: string;
  _ownerid_value?: string;
  statecode?: number;
  createdon?: string;
  overriddencreatedon?: string;
  msdyn_uploadstatusdetails?: string;
  utcconversiontimezonecode?: number;
  importsequencenumber?: number;
  msdyn_dataflowid?: string;
  statuscode?: number;
  msdyn_uploadstatus?: string;
  _owninguser_value?: string;
  msdyn_dataflowjobid?: string;
  componentidunique?: string;
  _modifiedonbehalfby_value?: string;
  _createdby_value?: string;
  _owningteam_value?: string;
  msdyn_dmsrequeststatusid?: string;
  ismanaged?: boolean;
  msdyn_jobuniquename?: string;
  _modifiedby_value?: string;
  msdyn_errordetails?: string;
  _owningbusinessunit_value?: string;
  versionnumber?: number;
  componentstate?: number;
}
