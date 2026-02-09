import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * reportparameter entity type
 */
export interface reportparameter {
  _owninguser_value: string;
  _createdby_value: string;
  statuscode: number;
  utcconversiontimezonecode: number;
  versionnumber: number;
  name: string;
  modifiedon: string;
  _owningteam_value: string;
  solutionid: string;
  componentidunique: string;
  _createdonbehalfby_value: string;
  _environmentvariabledefinitionid_value: string;
  _reportid_value: string;
  componentstate: number;
  _owningbusinessunit_value: string;
  _ownerid_value: string;
  overwritetime: string;
  importsequencenumber: number;
  _modifiedby_value: string;
  timezoneruleversionnumber: number;
  _modifiedonbehalfby_value: string;
  reportparameterid: string;
  overriddencreatedon: string;
  iscustomizable: BooleanManagedProperty;
  owneridtype: string;
  createdon: string;
  statecode: number;
  uniquename: string;
  ismanaged: boolean;
}
