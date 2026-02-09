import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_ocphonenumber entity type
 */
export interface msdyn_ocphonenumber {
  iscustomizable: BooleanManagedProperty;
  _owninguser_value: string;
  msdyn_smsoutboundenabled: boolean;
  msdyn_phoneinboundenabled: boolean;
  msdyn_appmodule: string;
  modifiedon: string;
  _msdyn_carrierid_value: string;
  timezoneruleversionnumber: number;
  versionnumber: number;
  msdyn_phonenumber: string;
  _createdby_value: string;
  msdyn_name: string;
  msdyn_teamsresourceaccount: string;
  solutionid: string;
  msdyn_countryisocode: string;
  _modifiedonbehalfby_value: string;
  componentidunique: string;
  _createdonbehalfby_value: string;
  _owningteam_value: string;
  _owningbusinessunit_value: string;
  _modifiedby_value: string;
  statecode: number;
  _ownerid_value: string;
  msdyn_ocphonenumbersource: number;
  msdyn_objective: number;
  msdyn_type: number;
  overwritetime: string;
  importsequencenumber: number;
  msdyn_phonenumbertype: number;
  componentstate: number;
  msdyn_phoneoutboundenabled: boolean;
  overriddencreatedon: string;
  msdyn_smsinboundenabled: boolean;
  statuscode: number;
  _msdyn_occommunicationprovidersettingid_value: string;
  msdyn_ocphonenumberid: string;
  utcconversiontimezonecode: number;
  ismanaged: boolean;
  createdon: string;
}
