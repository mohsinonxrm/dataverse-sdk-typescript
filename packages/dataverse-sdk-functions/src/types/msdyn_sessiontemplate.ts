import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_sessiontemplate entity type
 */
export interface msdyn_sessiontemplate {
  statecode: number;
  componentidunique: string;
  msdyn_description: string;
  utcconversiontimezonecode: number;
  msdyn_uniquename: string;
  msdyn_entity: string;
  msdyn_sessiontemplateid: string;
  componentstate: number;
  msdyn_panelstate: number;
  iscustomizable: BooleanManagedProperty;
  timezoneruleversionnumber: number;
  msdyn_enabletitlesync: boolean;
  _msdyn_anchortab_value: string;
  _msdyn_sessionicon_value: string;
  versionnumber: number;
  createdon: string;
  _modifiedby_value: string;
  ismanaged: boolean;
  _owninguser_value: string;
  msdyn_enablebuildexpression: boolean;
  statuscode: number;
  modifiedon: string;
  msdyn_type: boolean;
  solutionid: string;
  msdyn_expressiondata: string;
  _createdonbehalfby_value: string;
  msdyn_sessiontype: number;
  _owningbusinessunit_value: string;
  _ownerid_value: string;
  overriddencreatedon: string;
  _modifiedonbehalfby_value: string;
  _owningteam_value: string;
  msdyn_title: string;
  importsequencenumber: number;
  msdyn_name: string;
  overwritetime: string;
  _createdby_value: string;
}
