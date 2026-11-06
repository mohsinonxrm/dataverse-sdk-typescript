import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_azurenotificationhub entity type
 */
export interface msdyn_azurenotificationhub {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_connectionstringid_value?: string;
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
  msdyn_azurenotificationhubid?: string;
  msdyn_azurenotificationhubname?: string;
  msdyn_defaultnotificationbody?: string;
  msdyn_notificationtitle?: string;
  msdyn_showmessagepreview?: boolean;
  msdyn_shownotificationtitle?: boolean;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
