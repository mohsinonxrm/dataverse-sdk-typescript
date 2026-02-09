import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_authenticationsettings entity type
 */
export interface msdyn_authenticationsettings {
  _modifiedby_value: string;
  _owningbusinessunit_value: string;
  iscustomizable: BooleanManagedProperty;
  overriddencreatedon: string;
  msdyn_decryptedtokenurl: string;
  timezoneruleversionnumber: number;
  _ownerid_value: string;
  statuscode: number;
  _createdonbehalfby_value: string;
  importsequencenumber: number;
  modifiedon: string;
  solutionid: string;
  msdyn_name: string;
  utcconversiontimezonecode: number;
  createdon: string;
  msdyn_additionalparams: string;
  statecode: number;
  _createdby_value: string;
  msdyn_redirecturi: string;
  msdyn_accesstokenurl: string;
  msdyn_publickeyurl: string;
  _modifiedonbehalfby_value: string;
  msdyn_authenticationscopes: string;
  msdyn_authenticationclientsecret: string;
  msdyn_javascriptclientfunction: string;
  msdyn_authenticationtype: number;
  componentstate: number;
  msdyn_endpointregion: number;
  msdyn_actionname: string;
  _owninguser_value: string;
  msdyn_authenticationclientid: string;
  msdyn_ocauthchanneltype: number;
  msdyn_authenticationsettingsid: string;
  versionnumber: number;
  msdyn_useauthcodeflow: boolean;
  _owningteam_value: string;
  componentidunique: string;
  ismanaged: boolean;
  overwritetime: string;
}
