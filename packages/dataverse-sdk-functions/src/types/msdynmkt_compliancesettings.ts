/**
 * msdynmkt_compliancesettings entity type
 */
export interface msdynmkt_compliancesettings {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdynmkt_compliancesettingsid?: string;
  msdynmkt_consentlink?: string;
  msdynmkt_consentlinktype?: number;
  msdynmkt_consentmodel?: number;
  msdynmkt_defaulttracking?: boolean;
  msdynmkt_gettrackingconsents?: boolean;
  msdynmkt_jurisdiction?: number;
  msdynmkt_legaladdress?: string;
  msdynmkt_marketinglogconsentchangesswitch?: boolean;
  msdynmkt_marketingrespectconsentswitch?: boolean;
  msdynmkt_name?: string;
  msdynmkt_ssc_allowemaildescription?: string;
  msdynmkt_ssc_allowsmsdescription?: string;
  msdynmkt_ssc_allowtrackingdescription?: string;
  msdynmkt_ssc_consentchangereason?: string;
  msdynmkt_ssc_description?: string;
  msdynmkt_ssc_emaildescription?: string;
  msdynmkt_ssc_emailtitle?: string;
  msdynmkt_ssc_errorpagetext?: string;
  msdynmkt_ssc_legaltext?: string;
  msdynmkt_ssc_smsdescription?: string;
  msdynmkt_ssc_smstitle?: string;
  msdynmkt_ssc_submitbuttonlabel?: string;
  msdynmkt_ssc_thankyoupagetext?: string;
  msdynmkt_ssc_title?: string;
  msdynmkt_ssc_trackingdescription?: string;
  msdynmkt_ssc_trackingtitle?: string;
  msdynmkt_subscriptioncenter?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
