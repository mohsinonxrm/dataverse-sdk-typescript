/**
 * msdyn_salesaccelerationsettings entity type
 */
export interface msdyn_salesaccelerationsettings {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_calendartype?: number;
  msdyn_disablewqautorefreshonmarkcomplete?: boolean;
  msdyn_entityconfiguration?: string;
  msdyn_isautocreatephonecallenabled?: boolean;
  msdyn_isdefaultsetting?: boolean;
  msdyn_isfccenabled?: boolean;
  msdyn_issignalrnotificationenabled?: boolean;
  msdyn_iswaittimecomputationenabled?: boolean;
  msdyn_isworkscheduleenabled?: boolean;
  msdyn_linkingconfiguration?: string;
  msdyn_linksequencesteptoactivity?: boolean;
  msdyn_migrationstatus?: string;
  msdyn_name?: string;
  msdyn_recommendationsecurityroles?: string;
  msdyn_salesaccelerationsettingsid?: string;
  msdyn_securityroles?: string;
  msdyn_securityrolesassignmentrules?: string;
  msdyn_securityrolesnew?: string;
  msdyn_sequenceconfiguration?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
