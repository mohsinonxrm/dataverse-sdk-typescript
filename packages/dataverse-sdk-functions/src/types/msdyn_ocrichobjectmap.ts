import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_ocrichobjectmap entity type
 */
export interface msdyn_ocrichobjectmap {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_authsettingsmapid_value?: string;
  _msdyn_ocapplepayid_value?: string;
  _msdyn_ocmappedrichobjid_value?: string;
  _msdyn_ocpaymentprofileid_value?: string;
  _msdyn_ocrichobjid_value?: string;
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
  msdyn_name?: string;
  msdyn_ocrichobjectmapid?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
