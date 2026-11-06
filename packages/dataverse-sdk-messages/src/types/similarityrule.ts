/**
 * similarityrule entity type
 */
export interface similarityrule {
  _createdonbehalfby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _transactioncurrencyid_value?: string;
  activerulefetchxml?: string;
  baseentityname?: string;
  baseentitytypecode?: number;
  componentstate?: number;
  createdon?: string;
  description?: string;
  exchangerate?: number;
  excludeinactiverecords?: boolean;
  fetchxmllist?: string;
  importsequencenumber?: number;
  introducedversion?: string;
  ismanaged?: boolean;
  matchingentityname?: string;
  matchingentitytypecode?: number;
  maxkeywords?: number;
  modifiedon?: string;
  name?: string;
  ngramsize?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  ruleconditionxml?: string;
  similarityruleid?: string;
  similarityruleidunique?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
