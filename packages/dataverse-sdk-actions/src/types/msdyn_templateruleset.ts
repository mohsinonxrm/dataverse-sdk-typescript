import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_templateruleset entity type
 */
export interface msdyn_templateruleset {
  _owningteam_value: string;
  versionnumber: number;
  _owningbusinessunit_value: string;
  modifiedon: string;
  _modifiedonbehalfby_value: string;
  overriddencreatedon: string;
  _owninguser_value: string;
  iscustomizable: BooleanManagedProperty;
  msdyn_name: string;
  msdyn_uniquename: string;
  componentstate: number;
  componentidunique: string;
  statuscode: number;
  _createdby_value: string;
  msdyn_channeltype: number;
  statecode: number;
  utcconversiontimezonecode: number;
  msdyn_channel: number;
  overwritetime: string;
  _createdonbehalfby_value: string;
  msdyn_publishedon: string;
  _modifiedby_value: string;
  createdon: string;
  importsequencenumber: number;
  timezoneruleversionnumber: number;
  msdyn_type: number;
  msdyn_templaterulesetid: string;
  _msdyn_publishedruleset_value: string;
  msdyn_description: string;
  _ownerid_value: string;
  msdyn_bulkoperationrunid: string;
  _msdyn_draftruleset_value: string;
  solutionid: string;
  ismanaged: boolean;
}
