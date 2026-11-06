/**
 * quarterlyfiscalcalendar entity type
 */
export interface quarterlyfiscalcalendar {
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
  fiscalperiodtype?: number;
  modifiedon?: string;
  quarter1?: number;
  quarter1_base?: number;
  quarter2?: number;
  quarter2_base?: number;
  quarter3?: number;
  quarter3_base?: number;
  quarter4?: number;
  quarter4_base?: number;
  timezoneruleversionnumber?: number;
  userfiscalcalendarid?: string;
  utcconversiontimezonecode?: number;
}
