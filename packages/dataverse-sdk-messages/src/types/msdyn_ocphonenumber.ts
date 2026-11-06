import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_ocphonenumber entity type
 */
export interface msdyn_ocphonenumber {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_carrierid_value?: string;
  _msdyn_occommunicationprovidersettingid_value?: string;
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
  msdyn_appmodule?: string;
  msdyn_countryisocode?: string;
  msdyn_name?: string;
  msdyn_objective?: number;
  msdyn_ocphonenumberid?: string;
  msdyn_ocphonenumbersource?: number;
  msdyn_phoneinboundenabled?: boolean;
  msdyn_phonenumber?: string;
  msdyn_phonenumbertype?: number;
  msdyn_phoneoutboundenabled?: boolean;
  msdyn_smsinboundenabled?: boolean;
  msdyn_smsoutboundenabled?: boolean;
  msdyn_teamsresourceaccount?: string;
  msdyn_type?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
