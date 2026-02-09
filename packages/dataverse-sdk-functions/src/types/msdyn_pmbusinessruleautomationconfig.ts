import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_pmbusinessruleautomationconfig entity type
 */
export interface msdyn_pmbusinessruleautomationconfig {
  utcconversiontimezonecode: number;
  msdyn_businessruleid: string;
  _ownerid_value: string;
  ismanaged: boolean;
  msdyn_name: string;
  msdyn_isenabled: boolean;
  msdyn_uniquename: string;
  _customapiid_value: string;
  _owningbusinessunit_value: string;
  _modifiedonbehalfby_value: string;
  _createdonbehalfby_value: string;
  solutionid: string;
  importsequencenumber: number;
  _owningteam_value: string;
  componentidunique: string;
  statecode: number;
  statuscode: number;
  _owninguser_value: string;
  versionnumber: number;
  createdon: string;
  iscustomizable: BooleanManagedProperty;
  overwritetime: string;
  msdyn_shouldincludeallemitsinnextrun: boolean;
  _modifiedby_value: string;
  componentstate: number;
  overriddencreatedon: string;
  _msdyn_pminferredtaskid_value: string;
  msdyn_selectedcustomattributes: string;
  _createdby_value: string;
  msdyn_pmbusinessruleautomationconfigid: string;
  modifiedon: string;
  timezoneruleversionnumber: number;
}
