import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_evaluationplan entity type
 */
export interface msdyn_evaluationplan {
  componentstate: number;
  overriddencreatedon: string;
  versionnumber: number;
  _createdonbehalfby_value: string;
  msdyn_planenddate: string;
  importsequencenumber: number;
  msdyn_occurrence: number;
  utcconversiontimezonecode: number;
  msdyn_planname: string;
  msdyn_description: string;
  statuscode: number;
  modifiedon: string;
  msdyn_evaluationplanid: string;
  msdyn_evaluationmethod: number;
  _owningteam_value: string;
  msdyn_frequency: number;
  _createdby_value: string;
  msdyn_duedate: string;
  statecode: number;
  overwritetime: string;
  ismanaged: boolean;
  solutionid: string;
  iscustomizable: BooleanManagedProperty;
  _owninguser_value: string;
  _msdyn_evaluationcriteria_value: string;
  timezoneruleversionnumber: number;
  _modifiedby_value: string;
  msdyn_planstartdate: string;
  msdyn_recordtype: number;
  createdon: string;
  msdyn_uniquename: string;
  _ownerid_value: string;
  _msdyn_assignedto_value: string;
  msdyn_evaluationfilterrulesxml: string;
  componentidunique: string;
  msdyn_event: number;
  _modifiedonbehalfby_value: string;
  _owningbusinessunit_value: string;
}
