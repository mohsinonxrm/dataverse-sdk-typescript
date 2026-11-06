import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_dmsrequest entity type
 */
export interface msdyn_dmsrequest {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
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
  msdyn_additionalproperties?: string;
  msdyn_cdmentityinformation?: string;
  msdyn_cdmtodataverseentitymapping?: string;
  msdyn_correlationid?: string;
  msdyn_datalakefoldername?: string;
  msdyn_dataverseentityinformation?: string;
  msdyn_dmsrequestid?: string;
  msdyn_modeljsonpath?: string;
  msdyn_requestparameters?: string;
  msdyn_requesttype?: string;
  msdyn_requestuniquename?: string;
  msdyn_userobjectid?: string;
  msdyn_usertenantid?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
