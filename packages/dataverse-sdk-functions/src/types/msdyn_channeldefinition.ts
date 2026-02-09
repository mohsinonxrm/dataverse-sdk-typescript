import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_channeldefinition entity type
 */
export interface msdyn_channeldefinition {
  _ownerid_value: string;
  msdyn_hasdeliveryreceipt: boolean;
  _modifiedby_value: string;
  msdyn_channeltype: string;
  solutionid: string;
  msdyn_channeldefinitionaccountexternalentity: string;
  msdyn_displayname: string;
  statuscode: number;
  msdyn_channeldefinitionaccountexternalformid: string;
  _owninguser_value: string;
  iscustomizable: BooleanManagedProperty;
  statecode: number;
  msdyn_outboundbatchendpointurltemplate: string;
  msdyn_supportsbinary: boolean;
  msdyn_messageformid: string;
  msdyn_supportsaccount: boolean;
  ismanaged: boolean;
  utcconversiontimezonecode: number;
  _createdby_value: string;
  _owningbusinessunit_value: string;
  msdyn_channeldefinitionid: string;
  _createdonbehalfby_value: string;
  componentstate: number;
  componentidunique: string;
  msdyn_specialconsentlabel: string;
  msdyn_name: string;
  msdyn_channeldefinitionexternalformid: string;
  msdyn_channeldefinitionexternalentity: string;
  msdyn_supportsattachment: boolean;
  _owningteam_value: string;
  msdyn_hasinbound: boolean;
  msdyn_description: string;
  overwritetime: string;
  importsequencenumber: number;
  msdyn_instanceregistrationendpointurltemplate: string;
  overriddencreatedon: string;
  msdyn_outboundendpointurltemplate: string;
  _modifiedonbehalfby_value: string;
  versionnumber: number;
  modifiedon: string;
  msdyn_specialconsentrequired: boolean;
  timezoneruleversionnumber: number;
  createdon: string;
}
