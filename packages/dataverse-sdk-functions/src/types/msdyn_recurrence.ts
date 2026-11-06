/**
 * msdyn_recurrence entity type
 */
export interface msdyn_recurrence {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_forecastconfigurationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_forecastrecurrencename?: string;
  msdyn_lastcomputedon?: string;
  msdyn_recomputationstarttime?: string;
  msdyn_recomputeexecutorid?: string;
  msdyn_recomputepriority?: number;
  msdyn_recomputestatus?: number;
  msdyn_recomputestatuschangedon?: string;
  msdyn_recurrencefailureinfo?: string;
  msdyn_recurrenceid?: string;
  msdyn_recurrenceindex?: number;
  msdyn_recurrencestate?: number;
  msdyn_validfrom?: string;
  msdyn_validto?: string;
  overriddencreatedon?: string;
  partitionid?: string;
  ttlinseconds?: number;
  versionnumber?: number;
}
