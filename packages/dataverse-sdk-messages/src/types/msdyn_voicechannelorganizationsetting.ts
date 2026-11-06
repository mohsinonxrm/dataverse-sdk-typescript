import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_voicechannelorganizationsetting entity type
 */
export interface msdyn_voicechannelorganizationsetting {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
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
  msdyn_agentendofcallsurveyenddate?: string;
  msdyn_agentendofcallsurveyfrequency?: number;
  msdyn_agentendofcallsurveystartdate?: string;
  msdyn_enableagentendofcallsurvey?: boolean;
  msdyn_enableagentendofcallsurveyduration?: boolean;
  msdyn_enableautomaticremovalofonhold?: boolean;
  msdyn_enablebroadcastdtmf?: boolean;
  msdyn_enablecitrixintegration?: boolean;
  msdyn_enabledevicepreheat?: boolean;
  msdyn_enableshowpostcallsurveyresult?: boolean;
  msdyn_hidedefaultoutboundprofile?: boolean;
  msdyn_voicechannelorganizationsettingid?: string;
  msdyn_voicechannelorganizationsettingname?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
