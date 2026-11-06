import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_notificationtemplate entity type
 */
export interface msdyn_notificationtemplate {
  msdyn_acceptbuttontext?: string;
  msdyn_notificationtemplateid?: string;
  componentidunique?: string;
  _owningteam_value?: string;
  timezoneruleversionnumber?: number;
  versionnumber?: number;
  msdyn_autopopupsession?: boolean;
  msdyn_icon?: string;
  _owninguser_value?: string;
  msdyn_description?: string;
  componentstate?: number;
  _createdby_value?: string;
  overwritetime?: string;
  createdon?: string;
  msdyn_showtimeout?: boolean;
  _owningbusinessunit_value?: string;
  iscustomizable?: BooleanManagedProperty;
  statecode?: number;
  solutionid?: string;
  importsequencenumber?: number;
  overriddencreatedon?: string;
  msdyn_autoacceptnotification?: boolean;
  msdyn_timeout?: number;
  _modifiedby_value?: string;
  utcconversiontimezonecode?: number;
  msdyn_theme?: number;
  msdyn_rejectbuttontext?: string;
  modifiedon?: string;
  msdyn_name?: string;
  _ownerid_value?: string;
  msdyn_title?: string;
  msdyn_desktopnotificationmode?: number;
  _createdonbehalfby_value?: string;
  msdyn_uniquename?: string;
  ismanaged?: boolean;
  statuscode?: number;
  msdyn_showrejectbutton?: boolean;
  _modifiedonbehalfby_value?: string;
}
