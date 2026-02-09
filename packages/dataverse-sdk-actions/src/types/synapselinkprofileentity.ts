import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * synapselinkprofileentity entity type
 */
export interface synapselinkprofileentity {
  versionnumber: number;
  timezoneruleversionnumber: number;
  synapselinkprofileentityid: string;
  componentidunique: string;
  solutionid: string;
  _createdby_value: string;
  _createdonbehalfby_value: string;
  appendonlymode: boolean;
  recordcountperblock: number;
  statuscode: number;
  entityname: string;
  utcconversiontimezonecode: number;
  overwritetime: string;
  entitytype: number;
  importsequencenumber: number;
  enabled: boolean;
  _modifiedby_value: string;
  overriddencreatedon: string;
  iscustomizable: BooleanManagedProperty;
  modifiedon: string;
  name: string;
  createdon: string;
  ismanaged: boolean;
  entitysource: number;
  _modifiedonbehalfby_value: string;
  extendedproperties: string;
  _organizationid_value: string;
  partitionstrategy: number;
  _profile_value: string;
  statecode: number;
  generateparquet: boolean;
  componentstate: number;
  uniquename: string;
}
