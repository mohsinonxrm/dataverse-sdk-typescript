import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_autonomouscasecreationrule entity type
 */
export interface msdyn_autonomouscasecreationrule {
  msdyn_regarding: string;
  msdyn_conditionsxml: string;
  versionnumber: number;
  componentidunique: string;
  overwritetime: string;
  ismanaged: boolean;
  _owningbusinessunit_value: string;
  _modifiedby_value: string;
  componentstate: number;
  msdyn_useCustomApi: boolean;
  msdyn_order: number;
  msdyn_predictorfields: string;
  msdyn_customapiname: string;
  createdon: string;
  importsequencenumber: number;
  modifiedon: string;
  msdyn_rulename: string;
  statecode: number;
  _owningteam_value: string;
  utcconversiontimezonecode: number;
  msdyn_autonomouscasecreationruleid: string;
  statuscode: number;
  solutionid: string;
  _createdby_value: string;
  _modifiedonbehalfby_value: string;
  msdyn_uniquename: string;
  _ownerid_value: string;
  overriddencreatedon: string;
  _owninguser_value: string;
  timezoneruleversionnumber: number;
  iscustomizable: BooleanManagedProperty;
  _createdonbehalfby_value: string;
}
