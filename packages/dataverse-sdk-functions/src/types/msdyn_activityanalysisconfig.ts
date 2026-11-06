/**
 * msdyn_activityanalysisconfig entity type
 */
export interface msdyn_activityanalysisconfig {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_activityanalysisconfigid?: string;
  msdyn_communicationfrequency?: number;
  msdyn_currentstatus?: number;
  msdyn_datasource?: number;
  msdyn_emailweight?: number;
  msdyn_exchangemarsstatus?: number;
  msdyn_healthfeaturestatus?: number;
  msdyn_ignoreexchangeoptincheck?: boolean;
  msdyn_inmailweight?: number;
  msdyn_isaprilpreviewenabled?: boolean;
  msdyn_islinkedinenabled?: boolean;
  msdyn_isorgsettingenable?: boolean;
  msdyn_linkedinstatus?: number;
  msdyn_meetingweight?: number;
  msdyn_name?: string;
  msdyn_oneclickactivityanalysisprovisioning?: boolean;
  msdyn_orgtypesuffix?: string;
  msdyn_otheractivites?: string;
  msdyn_overflowentitylist?: string;
  msdyn_phonecallweight?: number;
  msdyn_taskweight?: number;
  msdyn_timelineactivites?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
