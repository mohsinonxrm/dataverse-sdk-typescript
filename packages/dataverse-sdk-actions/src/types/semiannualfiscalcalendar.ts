/**
 * semiannualfiscalcalendar entity type
 */
export interface semiannualfiscalcalendar {
  _businessunitid_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _salespersonid_value?: string;
  _transactioncurrencyid_value?: string;
  createdon?: string;
  effectiveon?: string;
  exchangerate?: number;
  firsthalf?: number;
  firsthalf_base?: number;
  fiscalperiodtype?: number;
  importsequencenumber?: number;
  modifiedon?: string;
  secondhalf?: number;
  secondhalf_base?: number;
  timezoneruleversionnumber?: number;
  userfiscalcalendarid?: string;
  utcconversiontimezonecode?: number;
}
