import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * bot entity type
 */
export interface bot {
  statuscode?: number;
  solutionid?: string;
  accesscontrolpolicy?: number;
  componentidunique?: string;
  schemaname?: string;
  _ownerid_value?: string;
  authenticationtrigger?: number;
  _modifiedonbehalfby_value?: string;
  language?: number;
  configuration?: string;
  overriddencreatedon?: string;
  _createdby_value?: string;
  _modifiedby_value?: string;
  botid?: string;
  _providerconnectionreferenceid_value?: string;
  iscustomizable?: BooleanManagedProperty;
  origin?: string;
  _owningbusinessunit_value?: string;
  supportedlanguages?: string;
  overwritetime?: string;
  authenticationmode?: number;
  _publishedby_value?: string;
  runtimeprovider?: number;
  ismanaged?: boolean;
  _createdonbehalfby_value?: string;
  _owninguser_value?: string;
  iconbase64?: string;
  createdon?: string;
  utcconversiontimezonecode?: number;
  importsequencenumber?: number;
  timezoneruleversionnumber?: number;
  _owningteam_value?: string;
  versionnumber?: number;
  publishedon?: string;
  applicationmanifestinformation?: string;
  componentstate?: number;
  statecode?: number;
  name?: string;
  authorizedsecuritygroupids?: string;
  modifiedon?: string;
  authenticationconfiguration?: string;
  synchronizationstatus?: string;
  template?: string;
}
