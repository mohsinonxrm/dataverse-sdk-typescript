import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_evaluationcriteria entity type
 */
export interface msdyn_evaluationcriteria {
  msdyn_languagecode?: string;
  _msdyn_parentevaluationcriteria_value?: string;
  overriddencreatedon?: string;
  msdyn_numberofassociatedplans?: number;
  _owningteam_value?: string;
  _modifiedby_value?: string;
  componentstate?: number;
  msdyn_numberofquestions?: number;
  _createdonbehalfby_value?: string;
  _msdyn_activeversion_value?: string;
  versionnumber?: number;
  timezoneruleversionnumber?: number;
  _owningbusinessunit_value?: string;
  msdyn_name?: string;
  msdyn_description?: string;
  statecode?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  msdyn_evaluationcriteriaid?: string;
  _owninguser_value?: string;
  msdyn_criteriajson?: string;
  statuscode?: number;
  modifiedon?: string;
  overwritetime?: string;
  _createdby_value?: string;
  solutionid?: string;
  importsequencenumber?: number;
  _ownerid_value?: string;
  _modifiedonbehalfby_value?: string;
  createdon?: string;
  utcconversiontimezonecode?: number;
  componentidunique?: string;
}
