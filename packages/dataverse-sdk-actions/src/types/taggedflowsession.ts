import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * taggedflowsession entity type
 */
export interface taggedflowsession {
  utcconversiontimezonecode: number;
  componentstate: number;
  taggedflowsessionid: string;
  versionnumber: number;
  modifiedon: string;
  _createdby_value: string;
  _ownerid_value: string;
  _owningbusinessunit_value: string;
  _tag_value: string;
  statecode: number;
  importsequencenumber: number;
  componentidunique: string;
  overwritetime: string;
  statuscode: number;
  iscustomizable: BooleanManagedProperty;
  createdon: string;
  ismanaged: boolean;
  overriddencreatedon: string;
  _createdonbehalfby_value: string;
  solutionid: string;
  _flowsession_value: string;
  _modifiedby_value: string;
  _owninguser_value: string;
  _modifiedonbehalfby_value: string;
  _owningteam_value: string;
  timezoneruleversionnumber: number;
  name: string;
}
