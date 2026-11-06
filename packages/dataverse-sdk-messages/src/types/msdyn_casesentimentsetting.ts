import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_casesentimentsetting entity type
 */
export interface msdyn_casesentimentsetting {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  channelweightage?: number;
  chatweightage?: number;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  emailweightage?: number;
  enablechat?: boolean;
  enableemail?: boolean;
  enablevoice?: boolean;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_casesentimentmode?: number;
  msdyn_casesentimentsettingid?: string;
  msdyn_name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
  voiceweightage?: number;
}
