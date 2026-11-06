/**
 * metric entity type
 */
export interface metric {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  amountdatatype?: number;
  createdon?: string;
  description?: string;
  importsequencenumber?: number;
  isamount?: boolean;
  isstretchtracked?: boolean;
  metricid?: string;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
