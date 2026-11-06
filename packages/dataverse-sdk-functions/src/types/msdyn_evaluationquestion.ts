import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_evaluationquestion entity type
 */
export interface msdyn_evaluationquestion {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_evaluationcategory_value?: string;
  _msdyn_evaluationcriteria_value?: string;
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
  msdyn_criteriaversionid?: string;
  msdyn_description?: string;
  msdyn_descriptionmetadataid?: string;
  msdyn_evaluationquestionid?: string;
  msdyn_isairesponseenabled?: boolean;
  msdyn_iscriticalquestion?: boolean;
  msdyn_isknowledgeenabled?: boolean;
  msdyn_knowledgearticleid?: string;
  msdyn_optionsjson?: string;
  msdyn_parentquestionid?: string;
  msdyn_questioninstructions?: string;
  msdyn_questiontype?: number;
  msdyn_required?: boolean;
  msdyn_rootquestionid?: string;
  msdyn_text?: string;
  msdyn_textmetadataid?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
