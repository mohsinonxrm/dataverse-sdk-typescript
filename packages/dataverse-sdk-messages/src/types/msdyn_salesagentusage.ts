import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_salesagentusage entity type
 */
export interface msdyn_salesagentusage {
  statecode: number;
  componentidunique: string;
  _createdonbehalfby_value: string;
  _createdby_value: string;
  iscustomizable: BooleanManagedProperty;
  msdyn_salesagentusageid: string;
  _owninguser_value: string;
  msdyn_userid: string;
  msdyn_eventjson: string;
  componentstate: number;
  importsequencenumber: number;
  versionnumber: number;
  msdyn_eventid: string;
  statuscode: number;
  overwritetime: string;
  createdon: string;
  _modifiedby_value: string;
  solutionid: string;
  msdyn_agentname: string;
  modifiedon: string;
  _owningteam_value: string;
  _modifiedonbehalfby_value: string;
  overriddencreatedon: string;
  utcconversiontimezonecode: number;
  ismanaged: boolean;
  timezoneruleversionnumber: number;
  _ownerid_value: string;
  _owningbusinessunit_value: string;
  msdyn_eventdate: string;
}
