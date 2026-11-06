import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_indicatorquestion entity type
 */
export interface msdyn_indicatorquestion {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_qualityindicatorversion_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_airesponseenabled?: boolean;
  msdyn_indicatorquestionid?: string;
  msdyn_indicatorquestionname?: string;
  msdyn_optionjson?: string;
  msdyn_questioninstruction?: string;
  msdyn_questiontext?: string;
  msdyn_questiontype?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
