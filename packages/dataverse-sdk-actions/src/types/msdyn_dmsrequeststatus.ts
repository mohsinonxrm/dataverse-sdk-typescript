import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_dmsrequeststatus entity type
 */
export interface msdyn_dmsrequeststatus {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_lookupfield_uploadrequest_value?: string;
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
  msdyn_dataflowid?: string;
  msdyn_dataflowjobid?: string;
  msdyn_dmsrequeststatusid?: string;
  msdyn_errordetails?: string;
  msdyn_jobuniquename?: string;
  msdyn_uploadendtime?: string;
  msdyn_uploadstarttime?: string;
  msdyn_uploadstatus?: string;
  msdyn_uploadstatusdetails?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
