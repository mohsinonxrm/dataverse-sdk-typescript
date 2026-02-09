import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdynmkt_featureconfiguration entity type
 */
export interface msdynmkt_featureconfiguration {
  _ownerid_value: string;
  _owninguser_value: string;
  ismanaged: boolean;
  _owningteam_value: string;
  statuscode: number;
  utcconversiontimezonecode: number;
  modifiedon: string;
  _modifiedonbehalfby_value: string;
  overwritetime: string;
  _owningbusinessunit_value: string;
  overriddencreatedon: string;
  _createdby_value: string;
  msdynmkt_featureconfigurationid: string;
  importsequencenumber: number;
  createdon: string;
  componentidunique: string;
  versionnumber: number;
  msdynmkt_originurl: string;
  componentstate: number;
  timezoneruleversionnumber: number;
  iscustomizable: BooleanManagedProperty;
  msdynmkt_name: string;
  _createdonbehalfby_value: string;
  msdynmkt_featurestate: number;
  solutionid: string;
  msdynmkt_uniquename: string;
  _modifiedby_value: string;
  statecode: number;
}
