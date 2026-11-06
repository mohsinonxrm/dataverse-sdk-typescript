import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_evaluationcriteriaversion entity type
 */
export interface msdyn_evaluationcriteriaversion {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
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
  msdyn_criteriainstructions?: string;
  msdyn_criteriajson?: string;
  msdyn_evaluationcriteriaversionid?: string;
  msdyn_knowledgearticleids?: string;
  msdyn_knowledgeenabled?: boolean;
  msdyn_name?: string;
  msdyn_questionweightsenabled?: boolean;
  msdyn_scoringenabled?: boolean;
  msdyn_useparentcriteriainstruction?: boolean;
  msdyn_versionnumber?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
