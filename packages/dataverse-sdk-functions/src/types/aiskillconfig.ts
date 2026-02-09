import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * aiskillconfig entity type
 */
export interface aiskillconfig {
  overwritetime: string;
  aiskillconfigid: string;
  _sdkmessageid_value: string;
  statuscode: number;
  _owningbusinessunit_value: string;
  versionnumber: number;
  _attribute_value: string;
  utcconversiontimezonecode: number;
  _ownerid_value: string;
  statecode: number;
  _owningteam_value: string;
  importsequencenumber: number;
  _aimodel_value: string;
  iscustomizable: BooleanManagedProperty;
  _createdonbehalfby_value: string;
  componentidunique: string;
  ismanaged: boolean;
  aiskill: string;
  uniquename: string;
  _createdby_value: string;
  description: string;
  _owninguser_value: string;
  createdon: string;
  overriddencreatedon: string;
  componentstate: number;
  config: string;
  _entity_value: string;
  _modifiedby_value: string;
  solutionid: string;
  modifiedon: string;
  scope: number;
  _modifiedonbehalfby_value: string;
  timezoneruleversionnumber: number;
}
