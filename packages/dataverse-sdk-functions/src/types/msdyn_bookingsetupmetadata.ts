/**
 * msdyn_bookingsetupmetadata entity type
 */
export interface msdyn_bookingsetupmetadata {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_cloneentityquery_value?: string;
  _msdyn_defaultbookingcanceledstatus_value?: string;
  _msdyn_defaultbookingcommittedstatus_value?: string;
  _msdyn_defaultrequirementactivestatus_value?: string;
  _msdyn_defaultrequirementcanceledstatus_value?: string;
  _msdyn_defaultrequirementcompletedstatus_value?: string;
  _msdyn_retrieveconstraintsquery_value?: string;
  _msdyn_retrieveresourcesquery_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_availabledurationminimumpercentage?: number;
  msdyn_bookingrelationshiplogicalname?: string;
  msdyn_bookingsetupmetadataid?: string;
  msdyn_bookingstatusfieldlogicalname?: string;
  msdyn_cancelbookingswhenmoving?: boolean;
  msdyn_defaultbookingduration?: number;
  msdyn_defaultbookingmethodsa?: number;
  msdyn_defaultbookingmethodsb?: number;
  msdyn_disablerequirementautocreation?: boolean;
  msdyn_enablequickbook?: boolean;
  msdyn_entitylogicalname?: string;
  msdyn_ignoretimezoneinscheduleassistant?: boolean;
  msdyn_requirementrelationshiplogicalname?: string;
  msdyn_resourceavailabilityretrievallimit?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
