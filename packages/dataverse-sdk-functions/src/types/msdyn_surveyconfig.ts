import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_surveyconfig entity type
 */
export interface msdyn_surveyconfig {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_agentsurveyid_value?: string;
  _msdyn_botsurveyid_value?: string;
  _msdyn_targetchannelid_value?: string;
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
  msdyn_surveyconfigid?: string;
  msdyn_surveyconfigname?: string;
  msdyn_targetchannellogicalname?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
