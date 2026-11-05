import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_pmanalysishistory entity type
 */
export interface msdyn_pmanalysishistory {
  ismanaged?: boolean;
  statuscode?: number;
  versionnumber?: number;
  msdyn_iterationid?: string;
  importsequencenumber?: number;
  msdyn_name?: string;
  _createdby_value?: string;
  _owningbusinessunit_value?: string;
  msdyn_analysistype?: number;
  msdyn_pmanalysishistoryid?: string;
  actionableinsightslastpublishedon?: string;
  solutionid?: string;
  componentstate?: number;
  _ownerid_value?: string;
  statecode?: number;
  _createdonbehalfby_value?: string;
  overwritetime?: string;
  actionableinsightsgenerationstatus?: string;
  _owningteam_value?: string;
  createdon?: string;
  msdyn_starttime?: string;
  componentidunique?: string;
  overriddencreatedon?: string;
  modifiedon?: string;
  utcconversiontimezonecode?: number;
  iscustomizable?: BooleanManagedProperty;
  _modifiedby_value?: string;
  msdyn_lasterrors?: string;
  _msdyn_parenttask_value?: string;
  timezoneruleversionnumber?: number;
  _modifiedonbehalfby_value?: string;
  msdyn_analysisresult?: number;
  _owninguser_value?: string;
}
