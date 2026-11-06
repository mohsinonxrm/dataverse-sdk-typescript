/**
 * msdyn_consoleapplicationnotificationtemplate entity type
 */
export interface msdyn_consoleapplicationnotificationtemplate {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_acceptbuttontext?: string;
  msdyn_actionbuttons?: string;
  msdyn_autoacceptnotification?: boolean;
  msdyn_consoleapplicationnotificationtemplateid?: string;
  msdyn_desktopnotificationsettings?: number;
  msdyn_icon?: string;
  msdyn_name?: string;
  msdyn_notificationbuttons?: string;
  msdyn_notificationfieldsplaceholder?: string;
  msdyn_rejectbuttonautoaccept?: boolean;
  msdyn_rejectbuttontext?: string;
  msdyn_renderingorder?: number;
  msdyn_showtimeout?: number;
  msdyn_theme?: number;
  msdyn_timeout?: number;
  msdyn_title?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
