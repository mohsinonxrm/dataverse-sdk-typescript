/**
 * msdyn_consoleapplicationtemplate entity type
 */
export interface msdyn_consoleapplicationtemplate {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_pagetype_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_consoleapplicationtemplateid?: string;
  msdyn_description?: string;
  msdyn_icon?: string;
  msdyn_isstale?: boolean;
  msdyn_name?: string;
  msdyn_pinned?: boolean;
  msdyn_templateparameters?: string;
  msdyn_title?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
