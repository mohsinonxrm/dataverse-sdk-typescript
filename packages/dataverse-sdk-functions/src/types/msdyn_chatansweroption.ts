import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_chatansweroption entity type
 */
export interface msdyn_chatansweroption {
  componentstate: number;
  solutionid: string;
  _createdby_value: string;
  createdon: string;
  _owninguser_value: string;
  statuscode: number;
  msdyn_chatansweroptionid: string;
  ismanaged: boolean;
  _msdyn_answeroptionsid_value: string;
  importsequencenumber: number;
  versionnumber: number;
  _ownerid_value: string;
  _modifiedonbehalfby_value: string;
  overwritetime: string;
  _modifiedby_value: string;
  utcconversiontimezonecode: number;
  msdyn_name: string;
  timezoneruleversionnumber: number;
  overriddencreatedon: string;
  statecode: number;
  modifiedon: string;
  componentidunique: string;
  _owningbusinessunit_value: string;
  iscustomizable: BooleanManagedProperty;
  _createdonbehalfby_value: string;
  _owningteam_value: string;
}
