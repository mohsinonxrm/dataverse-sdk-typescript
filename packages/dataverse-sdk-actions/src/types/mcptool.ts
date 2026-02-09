import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * mcptool entity type
 */
export interface mcptool {
  title: string;
  httpmethod: number;
  overwritetime: string;
  annotations: string;
  timezoneruleversionnumber: number;
  _mcpserverid_value: string;
  _createdonbehalfby_value: string;
  statecode: number;
  description: string;
  _owningteam_value: string;
  _sdkmessagepairid_value: string;
  overriddencreatedon: string;
  backendtooltype: number;
  connectorid: string;
  _customapiid_value: string;
  solutionid: string;
  createdon: string;
  componentidunique: string;
  componentstate: number;
  utcconversiontimezonecode: number;
  _ownerid_value: string;
  iscustomizable: BooleanManagedProperty;
  _owningbusinessunit_value: string;
  name: string;
  inputschema: string;
  importsequencenumber: number;
  _createdby_value: string;
  statuscode: number;
  ismanaged: boolean;
  _owninguser_value: string;
  mcptoolid: string;
  relativepath: string;
  modifiedon: string;
  _modifiedonbehalfby_value: string;
  versionnumber: number;
  _modifiedby_value: string;
  operationid: string;
}
