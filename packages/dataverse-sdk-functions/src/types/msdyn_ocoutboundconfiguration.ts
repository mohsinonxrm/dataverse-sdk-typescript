/**
 * msdyn_ocoutboundconfiguration entity type
 */
export interface msdyn_ocoutboundconfiguration {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_defaultlocale_value?: string;
  _msdyn_liveworkstreamid_value?: string;
  _msdyn_messagetemplate_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_channel?: number;
  msdyn_channeldisplayname?: string;
  msdyn_channelid?: string;
  msdyn_displayoutboundconfigurationid?: string;
  msdyn_enablemessagelogging?: boolean;
  msdyn_name?: string;
  msdyn_ocoutboundconfigurationid?: string;
  msdyn_ocscope?: number;
  msdyn_secondarychanneldisplayname?: string;
  msdyn_secondarychannelid?: string;
  msdyn_showinactivities?: boolean;
  msdyn_type?: number;
  msdyn_usecustomerpreference?: boolean;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
