import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_surveyconfig entity type
 */
export interface msdyn_surveyconfig {
  _owningbusinessunit_value: string;
  _msdyn_agentsurveyid_value: string;
  overriddencreatedon: string;
  msdyn_surveyconfigname: string;
  timezoneruleversionnumber: number;
  statuscode: number;
  msdyn_surveyconfigid: string;
  _msdyn_targetchannelid_value: string;
  _ownerid_value: string;
  _owninguser_value: string;
  _modifiedonbehalfby_value: string;
  versionnumber: number;
  overwritetime: string;
  _createdby_value: string;
  _modifiedby_value: string;
  utcconversiontimezonecode: number;
  importsequencenumber: number;
  _owningteam_value: string;
  _msdyn_botsurveyid_value: string;
  componentidunique: string;
  ismanaged: boolean;
  statecode: number;
  msdyn_targetchannellogicalname: string;
  modifiedon: string;
  solutionid: string;
  createdon: string;
  iscustomizable: BooleanManagedProperty;
  componentstate: number;
  _createdonbehalfby_value: string;
}
