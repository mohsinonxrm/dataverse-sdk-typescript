/**
 * msfp_satisfactionmetricaggregate entity type
 */
export interface msfp_satisfactionmetricaggregate {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msfp_satisfactionmetricsurveymappingid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msfp_absolutevalue?: number;
  msfp_aggregationtype?: number;
  msfp_aggregationunit?: number;
  msfp_aggregationyear?: number;
  msfp_name?: string;
  msfp_negativecount?: number;
  msfp_neutralcount?: number;
  msfp_positivecount?: number;
  msfp_responsecount?: number;
  msfp_satisfactionmetricaggregateid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
