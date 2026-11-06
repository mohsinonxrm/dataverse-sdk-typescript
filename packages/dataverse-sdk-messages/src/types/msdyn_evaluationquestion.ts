import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_evaluationquestion entity type
 */
export interface msdyn_evaluationquestion {
  solutionid?: string;
  utcconversiontimezonecode?: number;
  msdyn_required?: boolean;
  _modifiedby_value?: string;
  statecode?: number;
  _msdyn_evaluationcategory_value?: string;
  importsequencenumber?: number;
  versionnumber?: number;
  msdyn_evaluationquestionid?: string;
  msdyn_questiontype?: number;
  iscustomizable?: BooleanManagedProperty;
  componentidunique?: string;
  msdyn_optionsjson?: string;
  msdyn_isairesponseenabled?: boolean;
  msdyn_text?: string;
  ismanaged?: boolean;
  timezoneruleversionnumber?: number;
  msdyn_descriptionmetadataid?: string;
  _owninguser_value?: string;
  createdon?: string;
  msdyn_questioninstructions?: string;
  statuscode?: number;
  _ownerid_value?: string;
  componentstate?: number;
  modifiedon?: string;
  _msdyn_evaluationcriteria_value?: string;
  _createdonbehalfby_value?: string;
  _createdby_value?: string;
  _owningteam_value?: string;
  overriddencreatedon?: string;
  _owningbusinessunit_value?: string;
  overwritetime?: string;
  msdyn_textmetadataid?: string;
  _modifiedonbehalfby_value?: string;
  msdyn_description?: string;
}
