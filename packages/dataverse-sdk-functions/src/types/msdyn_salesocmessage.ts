/**
 * msdyn_salesocmessage entity type
 */
export interface msdyn_salesocmessage {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_conversationid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_channeltype?: string;
  msdyn_clientactivityid?: string;
  msdyn_content?: string;
  msdyn_entityid?: string;
  msdyn_entityname?: string;
  msdyn_from?: string;
  msdyn_isinbound?: boolean;
  msdyn_messagedetails?: string;
  msdyn_name?: string;
  msdyn_ownerviewstate?: number;
  msdyn_salesocmessageid?: string;
  msdyn_statusdetails?: string;
  msdyn_to?: string;
  msdyn_version?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
