import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * connector entity type
 */
export interface connector {
  connectionparametersets: string;
  _owninguser_value: string;
  _owningbusinessunit_value: string;
  createdon: string;
  description: string;
  iconbrandcolor: string;
  connectorinternalid: string;
  _extensionassemblyid_value: string;
  overwritetime: string;
  scriptoperations: string;
  overriddencreatedon: string;
  capabilities: string;
  modifiedon: string;
  iscustomizable: BooleanManagedProperty;
  versionnumber: number;
  connectortype: number;
  iconblob_url: string;
  ismanaged: boolean;
  _modifiedonbehalfby_value: string;
  policytemplateinstances: string;
  iconblob_timestamp: number;
  openapidefinition: string;
  _createdonbehalfby_value: string;
  iconblob: string;
  displayname: string;
  name: string;
  connectoridunique: string;
  statuscode: number;
  connectorid: string;
  _ownerid_value: string;
  statecode: number;
  customcodeblobcontent: string;
  connectionparameters: string;
  solutionid: string;
  introducedversion: string;
  iconblobid: string;
  utcconversiontimezonecode: number;
  componentstate: number;
  _modifiedby_value: string;
  timezoneruleversionnumber: number;
  _owningteam_value: string;
  interfaces: string;
  importsequencenumber: number;
  _createdby_value: string;
}
