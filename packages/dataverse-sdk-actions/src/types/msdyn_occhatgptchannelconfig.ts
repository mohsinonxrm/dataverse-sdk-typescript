import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_occhatgptchannelconfig entity type
 */
export interface msdyn_occhatgptchannelconfig {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_authenticationsettingsid_value?: string;
  _msdyn_liveworkstreamid_value?: string;
  _msdyn_ocphonenumberid_value?: string;
  _msdyn_ocwidgetlanguage_value?: string;
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
  msdyn_occhatgptchannelconfigid?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
