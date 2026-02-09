/**
 * similarityrule entity type
 */
export interface similarityrule {
  statuscode: number;
  similarityruleid: string;
  similarityruleidunique: string;
  ngramsize: number;
  baseentitytypecode: number;
  maxkeywords: number;
  solutionid: string;
  versionnumber: number;
  excludeinactiverecords: boolean;
  ruleconditionxml: string;
  activerulefetchxml: string;
  _createdonbehalfby_value: string;
  overwritetime: string;
  name: string;
  componentstate: number;
  statecode: number;
  baseentityname: string;
  _modifiedonbehalfby_value: string;
  exchangerate: number;
  introducedversion: string;
  utcconversiontimezonecode: number;
  importsequencenumber: number;
  fetchxmllist: string;
  _transactioncurrencyid_value: string;
  createdon: string;
  description: string;
  modifiedon: string;
  _organizationid_value: string;
  ismanaged: boolean;
  timezoneruleversionnumber: number;
  overriddencreatedon: string;
  matchingentityname: string;
  matchingentitytypecode: number;
}
