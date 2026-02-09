import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * tag entity type
 */
export interface tag {
  _modifiedonbehalfby_value: string;
  _owningbusinessunit_value: string;
  _owningteam_value: string;
  iscustomizable: BooleanManagedProperty;
  overwritetime: string;
  _createdonbehalfby_value: string;
  importsequencenumber: number;
  _modifiedby_value: string;
  _createdby_value: string;
  modifiedon: string;
  _ownerid_value: string;
  createdon: string;
  name: string;
  statuscode: number;
  versionnumber: number;
  solutionid: string;
  overriddencreatedon: string;
  statecode: number;
  description: string;
  _owninguser_value: string;
  componentstate: number;
  tagid: string;
  componentidunique: string;
  utcconversiontimezonecode: number;
  ismanaged: boolean;
  timezoneruleversionnumber: number;
}
