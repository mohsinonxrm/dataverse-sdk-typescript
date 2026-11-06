/**
 * msdyn_contactkpiitem entity type
 */
export interface msdyn_contactkpiitem {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_contactid_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_acilastupdatetimestamp?: string;
  msdyn_averagefirstresponsetimebytheminhrs?: number;
  msdyn_averagefirstresponsetimebyusinhrs?: number;
  msdyn_computationaccuracy?: number;
  msdyn_contactkpiitemid?: string;
  msdyn_date?: string;
  msdyn_emailattachmentopens?: number;
  msdyn_emaillinksclicked?: number;
  msdyn_emailsreceived?: number;
  msdyn_emailssent?: number;
  msdyn_facetimewithcustomer?: number;
  msdyn_liemailssent?: number;
  msdyn_meetingsreceived?: number;
  msdyn_meetingssent?: number;
  msdyn_name?: string;
  msdyn_numberofopportunities?: number;
  msdyn_openedemails?: number;
  msdyn_phonecallsmade?: number;
  msdyn_phonecallsreceived?: number;
  msdyn_relationshiphealthscorestate?: number;
  msdyn_relationshiphealthscorevalue?: number;
  msdyn_relationshiphealthtrend?: number;
  msdyn_responseratebythem?: number;
  msdyn_responseratebyus?: number;
  msdyn_timespentbycustomer?: number;
  msdyn_timespentbycustomer_calculated?: number;
  msdyn_timespentbyteam?: number;
  msdyn_timespentbyteam_calculated?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
