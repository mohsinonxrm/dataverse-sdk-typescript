import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_intent entity type
 */
export interface msdyn_intent {
  createdon: string;
  _createdonbehalfby_value: string;
  _msdyn_intentfamilyid_value: string;
  _createdby_value: string;
  _owninguser_value: string;
  msdyn_reviewstate: number;
  importsequencenumber: number;
  msdyn_description: string;
  msdyn_harvestingsource: number;
  msdyn_occurrencecount_last12months: number;
  msdyn_name: string;
  overriddencreatedon: string;
  _msdyn_parentgroupid_value: string;
  versionnumber: number;
  componentstate: number;
  msdyn_is_selfserve_enabled: boolean;
  componentidunique: string;
  overwritetime: string;
  _ownerid_value: string;
  msdyn_occurrencecount: number;
  iscustomizable: BooleanManagedProperty;
  modifiedon: string;
  statuscode: number;
  solutionid: string;
  _modifiedonbehalfby_value: string;
  msdyn_occurrencecount_last30days: number;
  ismanaged: boolean;
  utcconversiontimezonecode: number;
  timezoneruleversionnumber: number;
  msdyn_intentid: string;
  msdyn_reviewstatesource: number;
  _owningbusinessunit_value: string;
  msdyn_intentvolume: number;
  _owningteam_value: string;
  msdyn_intentsolutionrate: number;
  msdyn_isgroup: boolean;
  statecode: number;
  _modifiedby_value: string;
  msdyn_intentstring: string;
  _msdyn_intentharvesting_batchjobstatusid_value: string;
}
