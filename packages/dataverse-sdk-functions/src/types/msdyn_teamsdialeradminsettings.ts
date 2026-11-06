/**
 * msdyn_teamsdialeradminsettings entity type
 */
export interface msdyn_teamsdialeradminsettings {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_addparticipantenabled?: string;
  msdyn_answerexternalincomingcalls?: boolean;
  msdyn_appmodules?: string;
  msdyn_cicallpaneentrypoints?: string;
  msdyn_ignoreinternalincomingcalls?: boolean;
  msdyn_layoutschema?: string;
  msdyn_name?: string;
  msdyn_recordingsecurityroles?: string;
  msdyn_securityroles?: string;
  msdyn_securityrolesallselected?: string;
  msdyn_teamsdialeradminsettingsid?: string;
  msdyn_transfercallsenabled?: string;
  msdyn_valuesjson?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
