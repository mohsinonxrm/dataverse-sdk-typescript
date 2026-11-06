import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_ocvoicechannellanguagesetting entity type
 */
export interface msdyn_ocvoicechannellanguagesetting {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_holdmusicid_value?: string;
  _msdyn_languageid_value?: string;
  _msdyn_ocvoicechannelsettingid_value?: string;
  _msdyn_ocvoiceid_value?: string;
  _msdyn_surveybotsystemuserid_value?: string;
  _msdyn_waitmusicid_value?: string;
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
  msdyn_isprimary?: boolean;
  msdyn_name?: string;
  msdyn_ocvoicechannellanguagesettingid?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
