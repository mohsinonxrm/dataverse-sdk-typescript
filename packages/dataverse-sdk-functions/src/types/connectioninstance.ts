import type { BooleanManagedProperty } from './BooleanManagedProperty.js';

/**
 * connectioninstance entity type
 */
export interface connectioninstance {
  _connectionreferenceid_value?: string;
  _connectorid_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _credentialid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  accountname?: string;
  allowsharing?: boolean;
  componentidunique?: string;
  componentstate?: number;
  connectioninstancedisplayname?: string;
  connectioninstanceid?: string;
  connectioninstancelogicalname?: string;
  connectioninternalid?: string;
  connectionmetadata?: string;
  connectionparametersconfig?: string;
  connectionparametersetconfig?: string;
  connectionstatus?: string;
  connectionversion?: string;
  connectorinternalid?: string;
  createdon?: string;
  iconuri?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  testconnectionlinks?: string;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
