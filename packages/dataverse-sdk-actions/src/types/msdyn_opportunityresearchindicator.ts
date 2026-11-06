/**
 * msdyn_opportunityresearchindicator entity type
 */
export interface msdyn_opportunityresearchindicator {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_opportunity_value?: string;
  _msdyn_salesagentprofile_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_dealimportance?: number;
  msdyn_dealrisk?: number;
  msdyn_opportunityid?: string;
  msdyn_opportunityresearchindicatorid?: string;
  msdyn_risktype?: string;
  msdyn_totalnumberofactiverisks?: number;
  msdyn_totalnumberofrisks?: number;
  overriddencreatedon?: string;
  owneridtype?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
