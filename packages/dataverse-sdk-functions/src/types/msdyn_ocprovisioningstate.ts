/**
 * msdyn_ocprovisioningstate entity type
 */
export interface msdyn_ocprovisioningstate {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_communicationprovidersettingid_value?: string;
  _msdyn_ocfbapplicationid_value?: string;
  _msdyn_ocfbpageid_value?: string;
  _msdyn_oclinechannelconfigid_value?: string;
  _msdyn_ocm365copilotchannelconfigid_value?: string;
  _msdyn_octeamschannelconfigid_value?: string;
  _msdyn_ocwhatsappchannelaccountid_value?: string;
  _msdyn_phonenumberid_value?: string;
  _msdyn_voicechannelsettingid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_automatedcallingstatus?: number;
  msdyn_errormessage?: string;
  msdyn_exceptiondetails?: string;
  msdyn_gatekeeperstatus?: number;
  msdyn_gatekeeperstatusreason?: number;
  msdyn_name?: string;
  msdyn_ocprovisioningstateid?: string;
  msdyn_provisioningresponse?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
