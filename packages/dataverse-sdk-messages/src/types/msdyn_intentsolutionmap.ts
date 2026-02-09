import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_intentsolutionmap entity type
 */
export interface msdyn_intentsolutionmap {
  modifiedon: string;
  statuscode: number;
  _createdonbehalfby_value: string;
  _owningbusinessunit_value: string;
  msdyn_solutiontype: string;
  _owninguser_value: string;
  _modifiedonbehalfby_value: string;
  msdyn_source: number;
  _msdyn_rootknowledgearticleid_value: string;
  msdyn_reviewstate: number;
  overwritetime: string;
  overriddencreatedon: string;
  componentstate: number;
  _msdyn_solutionmapid_value: string;
  timezoneruleversionnumber: number;
  msdyn_name: string;
  versionnumber: number;
  _msdyn_intentfamilyid_value: string;
  _msdyn_intentid_value: string;
  _msdyn_agentgroupid_value: string;
  solutionid: string;
  utcconversiontimezonecode: number;
  createdon: string;
  _msdyn_intentgroupconditionid_value: string;
  _createdby_value: string;
  _owningteam_value: string;
  statecode: number;
  _modifiedby_value: string;
  ismanaged: boolean;
  msdyn_order: number;
  importsequencenumber: number;
  iscustomizable: BooleanManagedProperty;
  componentidunique: string;
  msdyn_solutionmetadata: string;
  _msdyn_queueid_value: string;
  _ownerid_value: string;
  msdyn_intentsolutionmapid: string;
}
