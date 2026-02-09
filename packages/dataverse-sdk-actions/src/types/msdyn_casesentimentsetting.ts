import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_casesentimentsetting entity type
 */
export interface msdyn_casesentimentsetting {
  emailweightage: number;
  enablevoice: boolean;
  _owningbusinessunit_value: string;
  componentidunique: string;
  ismanaged: boolean;
  channelweightage: number;
  versionnumber: number;
  modifiedon: string;
  chatweightage: number;
  iscustomizable: BooleanManagedProperty;
  enableemail: boolean;
  createdon: string;
  _owninguser_value: string;
  overwritetime: string;
  solutionid: string;
  _modifiedonbehalfby_value: string;
  statecode: number;
  msdyn_name: string;
  utcconversiontimezonecode: number;
  importsequencenumber: number;
  overriddencreatedon: string;
  enablechat: boolean;
  _ownerid_value: string;
  msdyn_casesentimentsettingid: string;
  _owningteam_value: string;
  statuscode: number;
  timezoneruleversionnumber: number;
  _createdonbehalfby_value: string;
  _createdby_value: string;
  _modifiedby_value: string;
  componentstate: number;
  voiceweightage: number;
}
