import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_intentfamily entity type
 */
export interface msdyn_intentfamily {
  componentidunique: string;
  overriddencreatedon: string;
  msdyn_intentfamilyid: string;
  createdon: string;
  msdyn_description: string;
  msdyn_CPAAutomationLevel: number;
  msdyn_isenabled: boolean;
  versionnumber: number;
  _owningbusinessunit_value: string;
  msdyn_iscaseintentfromactivityenabled: boolean;
  statecode: number;
  modifiedon: string;
  _ownerid_value: string;
  solutionid: string;
  timezoneruleversionnumber: number;
  _modifiedby_value: string;
  ismanaged: boolean;
  msdyn_name: string;
  _owningteam_value: string;
  msdyn_isdefault: boolean;
  overwritetime: string;
  statuscode: number;
  _createdonbehalfby_value: string;
  componentstate: number;
  utcconversiontimezonecode: number;
  _createdby_value: string;
  _modifiedonbehalfby_value: string;
  importsequencenumber: number;
  msdyn_intentbasedroutingenabled: boolean;
  _owninguser_value: string;
  iscustomizable: BooleanManagedProperty;
  _msdyn_defaultusergroup_value: string;
}
