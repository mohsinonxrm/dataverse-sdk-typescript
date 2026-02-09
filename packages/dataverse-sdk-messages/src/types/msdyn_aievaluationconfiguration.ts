import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_aievaluationconfiguration entity type
 */
export interface msdyn_aievaluationconfiguration {
  overriddencreatedon: string;
  msdyn_aievaluationconfigurationid: string;
  createdon: string;
  iscustomizable: BooleanManagedProperty;
  msdyn_aiobjectid: string;
  timezoneruleversionnumber: number;
  _ownerid_value: string;
  msdyn_evaluationcriteria: string;
  _owningbusinessunit_value: string;
  _modifiedby_value: string;
  overwritetime: string;
  msdyn_aiobjecttype: string;
  utcconversiontimezonecode: number;
  modifiedon: string;
  importsequencenumber: number;
  versionnumber: number;
  componentstate: number;
  _owninguser_value: string;
  ismanaged: boolean;
  statuscode: number;
  msdyn_name: string;
  _createdonbehalfby_value: string;
  componentidunique: string;
  _createdby_value: string;
  _modifiedonbehalfby_value: string;
  solutionid: string;
  msdyn_configurationstate: number;
  _owningteam_value: string;
  msdyn_description: string;
  statecode: number;
}
