/**
 * msdyn_salesroutingdiagnostic entity type
 */
export interface msdyn_salesroutingdiagnostic {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_target_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_connectsequencehistory?: string;
  msdyn_latestconnectsequence?: string;
  msdyn_latestrouting?: string;
  msdyn_latestsegmentation?: string;
  msdyn_name?: string;
  msdyn_objecttype?: string;
  msdyn_recordid?: string;
  msdyn_routinghistory?: string;
  msdyn_salesroutingdiagnosticid?: string;
  msdyn_segmentationhistory?: string;
  msdyn_segmentmoved?: boolean;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
