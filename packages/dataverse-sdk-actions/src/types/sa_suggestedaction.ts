/**
 * sa_suggestedaction entity type
 */
export interface sa_suggestedaction {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _sa_completedby_value?: string;
  _sa_criteriaid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  overriddencreatedon?: string;
  sa_actionexecutionsteps?: string;
  sa_actiontitle?: string;
  sa_appid?: string;
  sa_completedon?: string;
  sa_generatortag?: string;
  sa_makeractionname?: string;
  sa_rationale?: string;
  sa_rowid?: string;
  sa_suggestedactionid?: string;
  sa_tableid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
