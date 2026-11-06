import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_pmanalysishistory entity type
 */
export interface msdyn_pmanalysishistory {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_parenttask_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  actionableinsightsgenerationstatus?: string;
  actionableinsightslastpublishedon?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_analysisresult?: number;
  msdyn_analysistype?: number;
  msdyn_iterationid?: string;
  msdyn_lasterrors?: string;
  msdyn_name?: string;
  msdyn_pmanalysishistoryid?: string;
  msdyn_starttime?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
