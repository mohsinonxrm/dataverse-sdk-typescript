import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_qinotificationconfigitem entity type
 */
export interface msdyn_qinotificationconfigitem {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_nudgetemplate_value?: string;
  _msdyn_qinotificationconfig_value?: string;
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
  msdyn_csrnudgeenabled?: boolean;
  msdyn_maxthreshold?: number;
  msdyn_minthreshold?: number;
  msdyn_name?: string;
  msdyn_qinotificationconfigitemid?: string;
  msdyn_recipientsjson?: string;
  msdyn_severity?: number;
  msdyn_supervisornotificationenabled?: boolean;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
