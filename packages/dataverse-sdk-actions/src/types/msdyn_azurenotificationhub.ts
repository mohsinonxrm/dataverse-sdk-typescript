import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_azurenotificationhub entity type
 */
export interface msdyn_azurenotificationhub {
  msdyn_notificationtitle?: string;
  msdyn_azurenotificationhubname?: string;
  ismanaged?: boolean;
  solutionid?: string;
  utcconversiontimezonecode?: number;
  _msdyn_connectionstringid_value?: string;
  overwritetime?: string;
  _createdonbehalfby_value?: string;
  msdyn_showmessagepreview?: boolean;
  statuscode?: number;
  _ownerid_value?: string;
  _owninguser_value?: string;
  _owningteam_value?: string;
  msdyn_defaultnotificationbody?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  _modifiedby_value?: string;
  componentidunique?: string;
  _modifiedonbehalfby_value?: string;
  timezoneruleversionnumber?: number;
  statecode?: number;
  _owningbusinessunit_value?: string;
  componentstate?: number;
  msdyn_azurenotificationhubid?: string;
  versionnumber?: number;
  _createdby_value?: string;
  createdon?: string;
  msdyn_shownotificationtitle?: boolean;
  overriddencreatedon?: string;
  iscustomizable?: BooleanManagedProperty;
}
