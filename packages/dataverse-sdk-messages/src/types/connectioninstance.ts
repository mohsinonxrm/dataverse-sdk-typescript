import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * connectioninstance entity type
 */
export interface connectioninstance {
  iconuri: string;
  solutionid: string;
  modifiedon: string;
  _connectionreferenceid_value: string;
  componentstate: number;
  testconnectionlinks: string;
  _owningbusinessunit_value: string;
  iscustomizable: BooleanManagedProperty;
  createdon: string;
  componentidunique: string;
  connectionversion: string;
  _createdonbehalfby_value: string;
  allowsharing: boolean;
  connectioninstancedisplayname: string;
  _createdby_value: string;
  _owningteam_value: string;
  connectorinternalid: string;
  _modifiedonbehalfby_value: string;
  connectionparametersconfig: string;
  timezoneruleversionnumber: number;
  overriddencreatedon: string;
  statecode: number;
  connectioninstancelogicalname: string;
  _credentialid_value: string;
  overwritetime: string;
  connectioninstanceid: string;
  connectioninternalid: string;
  _modifiedby_value: string;
  statuscode: number;
  connectionmetadata: string;
  connectionparametersetconfig: string;
  connectionstatus: string;
  ismanaged: boolean;
  accountname: string;
  versionnumber: number;
  utcconversiontimezonecode: number;
  importsequencenumber: number;
  _connectorid_value: string;
  _owninguser_value: string;
  _ownerid_value: string;
}
