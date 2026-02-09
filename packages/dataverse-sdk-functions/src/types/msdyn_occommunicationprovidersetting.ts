import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_occommunicationprovidersetting entity type
 */
export interface msdyn_occommunicationprovidersetting {
  timezoneruleversionnumber: number;
  solutionid: string;
  msdyn_occommunicationprovider: number;
  statuscode: number;
  msdyn_accountsid: string;
  importsequencenumber: number;
  msdyn_occommunicationproviderimmutableid: string;
  msdyn_secret: string;
  statecode: number;
  _ownerid_value: string;
  _createdby_value: string;
  modifiedon: string;
  _modifiedby_value: string;
  _createdonbehalfby_value: string;
  componentidunique: string;
  msdyn_securesecret: string;
  versionnumber: number;
  ismanaged: boolean;
  overriddencreatedon: string;
  msdyn_name: string;
  msdyn_istrial: boolean;
  msdyn_occommunicationproviderdatalocation: string;
  createdon: string;
  _owninguser_value: string;
  componentstate: number;
  msdyn_occommunicationprovidersettingid: string;
  _modifiedonbehalfby_value: string;
  _owningteam_value: string;
  utcconversiontimezonecode: number;
  iscustomizable: BooleanManagedProperty;
  overwritetime: string;
  msdyn_appmodule: string;
  _owningbusinessunit_value: string;
}
