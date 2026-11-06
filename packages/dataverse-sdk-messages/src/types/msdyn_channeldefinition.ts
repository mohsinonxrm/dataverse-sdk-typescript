import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_channeldefinition entity type
 */
export interface msdyn_channeldefinition {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
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
  msdyn_channeldefinitionaccountexternalentity?: string;
  msdyn_channeldefinitionaccountexternalformid?: string;
  msdyn_channeldefinitionexternalentity?: string;
  msdyn_channeldefinitionexternalformid?: string;
  msdyn_channeldefinitionid?: string;
  msdyn_channeltype?: string;
  msdyn_description?: string;
  msdyn_displayname?: string;
  msdyn_hasdeliveryreceipt?: boolean;
  msdyn_hasinbound?: boolean;
  msdyn_instanceregistrationendpointurltemplate?: string;
  msdyn_messageformid?: string;
  msdyn_name?: string;
  msdyn_outboundbatchendpointurltemplate?: string;
  msdyn_outboundendpointurltemplate?: string;
  msdyn_specialconsentlabel?: string;
  msdyn_specialconsentrequired?: boolean;
  msdyn_supportsaccount?: boolean;
  msdyn_supportsattachment?: boolean;
  msdyn_supportsbinary?: boolean;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
