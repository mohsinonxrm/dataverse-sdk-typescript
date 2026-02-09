import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * aipluginexternalschema entity type
 */
export interface aipluginexternalschema {
  createdon: string;
  _createdonbehalfby_value: string;
  _owninguser_value: string;
  aipluginexternalschemaid: string;
  statuscode: number;
  ismanaged: boolean;
  statecode: number;
  name: string;
  overriddencreatedon: string;
  importsequencenumber: number;
  _owningbusinessunit_value: string;
  _modifiedby_value: string;
  _modifiedonbehalfby_value: string;
  _ownerid_value: string;
  versionnumber: number;
  timezoneruleversionnumber: number;
  solutionid: string;
  componentidunique: string;
  overwritetime: string;
  iscustomizable: BooleanManagedProperty;
  modifiedon: string;
  _createdby_value: string;
  utcconversiontimezonecode: number;
  _owningteam_value: string;
  componentstate: number;
}
