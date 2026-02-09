import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * connectionreference entity type
 */
export interface connectionreference {
  statuscode: number;
  promptingbehavior: number;
  _createdonbehalfby_value: string;
  solutionid: string;
  iscustomizable: BooleanManagedProperty;
  versionnumber: number;
  _modifiedby_value: string;
  connectorid: string;
  _ownerid_value: string;
  _owninguser_value: string;
  _createdby_value: string;
  _owningteam_value: string;
  importsequencenumber: number;
  connectionreferenceid: string;
  connectionreferencedisplayname: string;
  createdon: string;
  connectionid: string;
  componentidunique: string;
  connectionparametersconfig: string;
  timezoneruleversionnumber: number;
  ismanaged: boolean;
  statecode: number;
  _modifiedonbehalfby_value: string;
  description: string;
  connectionreferencelogicalname: string;
  connectionparametersetconfig: string;
  _owningbusinessunit_value: string;
  modifiedon: string;
  overriddencreatedon: string;
  componentstate: number;
  utcconversiontimezonecode: number;
  _customconnectorid_value: string;
  overwritetime: string;
}
