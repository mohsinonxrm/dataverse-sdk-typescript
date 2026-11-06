import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_dmsrequest entity type
 */
export interface msdyn_dmsrequest {
  msdyn_dataverseentityinformation?: string;
  solutionid?: string;
  iscustomizable?: BooleanManagedProperty;
  msdyn_datalakefoldername?: string;
  modifiedon?: string;
  msdyn_modeljsonpath?: string;
  msdyn_additionalproperties?: string;
  overriddencreatedon?: string;
  statuscode?: number;
  overwritetime?: string;
  _modifiedonbehalfby_value?: string;
  msdyn_correlationid?: string;
  _owningbusinessunit_value?: string;
  createdon?: string;
  msdyn_cdmtodataverseentitymapping?: string;
  _ownerid_value?: string;
  msdyn_requesttype?: string;
  msdyn_requestparameters?: string;
  componentstate?: number;
  timezoneruleversionnumber?: number;
  componentidunique?: string;
  _modifiedby_value?: string;
  _createdby_value?: string;
  _owningteam_value?: string;
  msdyn_userobjectid?: string;
  msdyn_usertenantid?: string;
  _createdonbehalfby_value?: string;
  _owninguser_value?: string;
  importsequencenumber?: number;
  versionnumber?: number;
  ismanaged?: boolean;
  msdyn_requestuniquename?: string;
  utcconversiontimezonecode?: number;
  msdyn_cdmentityinformation?: string;
  msdyn_dmsrequestid?: string;
  statecode?: number;
}
