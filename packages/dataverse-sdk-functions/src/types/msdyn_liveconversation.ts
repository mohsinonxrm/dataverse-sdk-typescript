/**
 * msdyn_liveconversation entity type
 */
export interface msdyn_liveconversation {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_activeagentid_value?: string;
  _msdyn_cdsqueueid_value?: string;
  _msdyn_customer_value?: string;
  _msdyn_liveworkstreamid_value?: string;
  _msdyn_queueid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_activeagentassignedon?: string;
  msdyn_channel?: string;
  msdyn_closedon?: string;
  msdyn_createdon?: string;
  msdyn_customersentimentlabel?: number;
  msdyn_escalationcount?: number;
  msdyn_initiatedon?: string;
  msdyn_liveconversationid?: string;
  msdyn_modifiedon?: string;
  msdyn_oclastsessionid?: string;
  msdyn_startedon?: string;
  msdyn_statecode?: number;
  msdyn_statuscode?: number;
  msdyn_statusupdatedon?: string;
  msdyn_subject?: string;
  msdyn_title?: string;
  msdyn_transfercount?: number;
  msdyn_workstreamworkdistributionmode?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
