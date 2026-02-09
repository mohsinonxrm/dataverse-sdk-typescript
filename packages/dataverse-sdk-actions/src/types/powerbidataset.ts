import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * powerbidataset entity type
 */
export interface powerbidataset {
  workspaceobjectid: string;
  componentstate: number;
  _createdby_value: string;
  versionnumber: number;
  modifiedon: string;
  package_name: string;
  ismanaged: boolean;
  _modifiedby_value: string;
  etag: string;
  solutionid: string;
  _modifiedonbehalfby_value: string;
  name: string;
  datasetoriginalobjectid: string;
  _owninguser_value: string;
  statuscode: number;
  importpowerbicomponentsequencenumber: string;
  timezoneruleversionnumber: number;
  iscustomizable: BooleanManagedProperty;
  overwritetime: string;
  utcconversiontimezonecode: number;
  package: string;
  _owningteam_value: string;
  _ownerid_value: string;
  _createdonbehalfby_value: string;
  importsequencenumber: number;
  statecode: number;
  powerbidatasetid: string;
  componentidunique: string;
  uniquename: string;
  datasetobjectid: string;
  dataverseconnectionupdateenabled: boolean;
  _owningbusinessunit_value: string;
  overriddencreatedon: string;
  createdon: string;
}
