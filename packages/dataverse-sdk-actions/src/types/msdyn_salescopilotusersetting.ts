/**
 * msdyn_salescopilotusersetting entity type
 */
export interface msdyn_salescopilotusersetting {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_connectionname?: string;
  msdyn_dataenrichmentautorunstatus?: number;
  msdyn_dataenrichmentlastautoenrollattempt?: string;
  msdyn_enrichmentskillconfig?: string;
  msdyn_enrichmentskillconsentgiven?: number;
  msdyn_exchangeconsentgiven?: number;
  msdyn_graphdataconsentgiven?: number;
  msdyn_m365infradetails?: string;
  msdyn_m365skillconsentgiven?: number;
  msdyn_m365skillinfrastatus?: number;
  msdyn_m365skillinfrastatuslastverifiedon?: string;
  msdyn_nbaskillconsentgiven?: number;
  msdyn_nbaskillinfradetails?: string;
  msdyn_nbaskillinfrastatus?: number;
  msdyn_nbaskillinfrastatuslastverifiedon?: string;
  msdyn_salescopilotusersettingid?: string;
  msdyn_userid?: string;
  msdyn_userpreferences?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
