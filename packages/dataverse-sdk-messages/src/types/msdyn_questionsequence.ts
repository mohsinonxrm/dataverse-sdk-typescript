import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_questionsequence entity type
 */
export interface msdyn_questionsequence {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_chatengagementtochatsequenceid_value?: string;
  _msdyn_surveyquestion_value?: string;
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
  msdyn_chatquestionnairetype?: number;
  msdyn_name?: string;
  msdyn_questionrequired?: boolean;
  msdyn_questionsequenceid?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  sequencenumber?: number;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
