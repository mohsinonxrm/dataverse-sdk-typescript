import type { BooleanManagedProperty } from './BooleanManagedProperty.js';

/**
 * bot entity type
 */
export interface bot {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _providerconnectionreferenceid_value?: string;
  _publishedby_value?: string;
  accesscontrolpolicy?: number;
  agentlifecycle?: number;
  agentsoftdeletedon?: string;
  applicationmanifestinformation?: string;
  authenticationconfiguration?: string;
  authenticationmode?: number;
  authenticationtrigger?: number;
  authorizedsecuritygroupids?: string;
  botid?: string;
  componentidunique?: string;
  componentstate?: number;
  configuration?: string;
  createdon?: string;
  iconbase64?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  language?: number;
  modifiedon?: string;
  name?: string;
  origin?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  publishedon?: string;
  runtimeprovider?: number;
  schemaname?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  supportedlanguages?: string;
  synchronizationstatus?: string;
  template?: string;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
