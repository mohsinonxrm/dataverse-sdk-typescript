import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_questionsequence entity type
 */
export interface msdyn_questionsequence {
  componentidunique: string;
  msdyn_questionrequired: boolean;
  msdyn_chatquestionnairetype: number;
  msdyn_questionsequenceid: string;
  _modifiedby_value: string;
  utcconversiontimezonecode: number;
  modifiedon: string;
  sequencenumber: number;
  _createdonbehalfby_value: string;
  _owningbusinessunit_value: string;
  msdyn_name: string;
  _createdby_value: string;
  _owninguser_value: string;
  solutionid: string;
  statuscode: number;
  statecode: number;
  _msdyn_surveyquestion_value: string;
  importsequencenumber: number;
  createdon: string;
  componentstate: number;
  overriddencreatedon: string;
  _msdyn_chatengagementtochatsequenceid_value: string;
  iscustomizable: BooleanManagedProperty;
  _owningteam_value: string;
  _modifiedonbehalfby_value: string;
  ismanaged: boolean;
  overwritetime: string;
  _ownerid_value: string;
  versionnumber: number;
  timezoneruleversionnumber: number;
}
