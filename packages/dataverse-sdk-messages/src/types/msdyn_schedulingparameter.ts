/**
 * msdyn_schedulingparameter entity type
 */
export interface msdyn_schedulingparameter {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_advancedsettings?: string;
  msdyn_autoupdatebookingtravel?: number;
  msdyn_backgroundjobsconfiguration?: string;
  msdyn_connecttomaps?: boolean;
  msdyn_customgeolatitudefield?: string;
  msdyn_customgeolocationentity?: string;
  msdyn_customgeolongitudefield?: string;
  msdyn_customgeoresourcefield?: string;
  msdyn_customgeotimestampfield?: string;
  msdyn_defaultradiusunit?: number;
  msdyn_defaultradiusvalue?: number;
  msdyn_disablesanitizinghtmltemplates?: boolean;
  msdyn_enableappointments?: number;
  msdyn_enablecustomgeolocation?: boolean;
  msdyn_enableoptimizer?: boolean;
  msdyn_enableoutlookschedules?: number;
  msdyn_enablesuggestschedule?: string;
  msdyn_geolocationexpiresafterxminutes?: number;
  msdyn_geolocationrefreshintervalseconds?: number;
  msdyn_internalflag?: string;
  msdyn_mapapikey?: string;
  msdyn_name?: string;
  msdyn_saautofilterserviceterritory?: boolean;
  msdyn_scheduleboardrefreshintervalseconds?: number;
  msdyn_schedulingparameterid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
