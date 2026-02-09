import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_swarmtemplate entity type
 */
export interface msdyn_swarmtemplate {
  statuscode: number;
  importsequencenumber: number;
  statecode: number;
  msdyn_uniquename: string;
  msdyn_numberofexpertsperskill: number;
  _createdonbehalfby_value: string;
  iscustomizable: BooleanManagedProperty;
  msdyn_isdefault: boolean;
  msdyn_swarmguide: string;
  timezoneruleversionnumber: number;
  _owningbusinessunit_value: string;
  _owninguser_value: string;
  utcconversiontimezonecode: number;
  _owningteam_value: string;
  createdon: string;
  versionnumber: number;
  msdyn_swarmtemplateid: string;
  _ownerid_value: string;
  ismanaged: boolean;
  solutionid: string;
  overwritetime: string;
  _modifiedby_value: string;
  componentstate: number;
  _msdyn_entitytypeid_value: string;
  _modifiedonbehalfby_value: string;
  modifiedon: string;
  _msdyn_skillattachmentrulesetid_value: string;
  _createdby_value: string;
  msdyn_name: string;
  componentidunique: string;
  overriddencreatedon: string;
}
