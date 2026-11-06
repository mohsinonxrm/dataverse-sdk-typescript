/**
 * msdyn_forecast entity type
 */
export interface msdyn_forecast {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_forecastconfigurationid_value?: string;
  _msdyn_forecastrecurrenceid_value?: string;
  _msdyn_ownerid_value?: string;
  _msdyn_parentinstanceid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_aggregatedcolumns?: string;
  msdyn_forecastid?: string;
  msdyn_forecastrecurrenceidpid?: string;
  msdyn_hierarchyentityrecord?: string;
  msdyn_name?: string;
  msdyn_parentinstanceidpid?: string;
  msdyn_rolledupcolumns?: string;
  overriddencreatedon?: string;
  partitionid?: string;
  ttlinseconds?: number;
  versionnumber?: number;
}
