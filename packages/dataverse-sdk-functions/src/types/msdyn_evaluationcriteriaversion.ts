import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_evaluationcriteriaversion entity type
 */
export interface msdyn_evaluationcriteriaversion {
  _ownerid_value?: string;
  msdyn_name?: string;
  msdyn_scoringenabled?: boolean;
  _modifiedby_value?: string;
  msdyn_criteriajson?: string;
  componentstate?: number;
  createdon?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_evaluationcriteria_value?: string;
  msdyn_versionnumber?: number;
  _owninguser_value?: string;
  msdyn_criteriainstructions?: string;
  statecode?: number;
  modifiedon?: string;
  overwritetime?: string;
  _createdonbehalfby_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  iscustomizable?: BooleanManagedProperty;
  versionnumber?: number;
  msdyn_useparentcriteriainstruction?: boolean;
  solutionid?: string;
  _createdby_value?: string;
  msdyn_evaluationcriteriaversionid?: string;
  ismanaged?: boolean;
  utcconversiontimezonecode?: number;
  timezoneruleversionnumber?: number;
  overriddencreatedon?: string;
  statuscode?: number;
  importsequencenumber?: number;
  componentidunique?: string;
}
