import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_channelprovider entity type
 */
export interface msdyn_channelprovider {
  modifiedon: string;
  componentidunique: string;
  statuscode: number;
  msdyn_trusteddomain: string;
  msdyn_uniquename: string;
  msdyn_label: string;
  _modifiedonbehalfby_value: string;
  msdyn_channelproviderid: string;
  _owninguser_value: string;
  versionnumber: number;
  msdyn_sortorder: number;
  _owningteam_value: string;
  importsequencenumber: number;
  msdyn_apiversion: number;
  msdyn_sandboxconfiguration: string;
  solutionid: string;
  createdon: string;
  msdyn_enableanalytics: boolean;
  _ownerid_value: string;
  statecode: number;
  utcconversiontimezonecode: number;
  ismanaged: boolean;
  msdyn_channelurl: string;
  _createdby_value: string;
  iscustomizable: BooleanManagedProperty;
  componentstate: number;
  msdyn_customparams: string;
  timezoneruleversionnumber: number;
  _modifiedby_value: string;
  msdyn_name: string;
  _owningbusinessunit_value: string;
  overriddencreatedon: string;
  msdyn_enableoutbound: boolean;
  overwritetime: string;
  _createdonbehalfby_value: string;
}
