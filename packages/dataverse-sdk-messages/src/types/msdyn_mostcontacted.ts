/**
 * msdyn_mostcontacted entity type
 */
export interface msdyn_mostcontacted {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_account_regardingobjectid_value?: string;
  _msdyn_contact_regardingobjectid_value?: string;
  _msdyn_lead_regardingobjectid_value?: string;
  _msdyn_opportunity_regardingobjectid_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_computationaccuracy?: number;
  msdyn_entityid?: string;
  msdyn_entityimage_url?: string;
  msdyn_entityname?: string;
  msdyn_kpidatajson?: string;
  msdyn_lastcontactedby?: string;
  msdyn_lastcontactedon?: string;
  msdyn_mostcontactedid?: string;
  msdyn_name?: string;
  msdyn_numberofemails?: number;
  msdyn_numberofinmails?: number;
  msdyn_numberofmeetings?: number;
  msdyn_numberofphonecalls?: number;
  msdyn_primaryname?: string;
  msdyn_regardingentityid?: string;
  msdyn_regardingentityname?: string;
  msdyn_relationshiphealthscorecolor?: string;
  msdyn_relationshiphealthscorevalue?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
