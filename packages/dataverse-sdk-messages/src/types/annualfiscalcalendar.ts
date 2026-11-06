/**
 * annualfiscalcalendar entity type
 */
export interface annualfiscalcalendar {
  _businessunitid_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _salespersonid_value?: string;
  _transactioncurrencyid_value?: string;
  annual?: number;
  annual_base?: number;
  createdon?: string;
  effectiveon?: string;
  exchangerate?: number;
  fiscalperiodtype?: number;
  modifiedon?: string;
  timezoneruleversionnumber?: number;
  userfiscalcalendarid?: string;
  utcconversiontimezonecode?: number;
}
