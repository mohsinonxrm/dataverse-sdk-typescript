/**
 * msdyn_forecastpredictiondata entity type
 */
export interface msdyn_forecastpredictiondata {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_forecastconfigurationid_value?: string;
  _msdyn_forecastid_value?: string;
  _msdyn_forecastrecurrenceid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_childgranularpredictions?: string;
  msdyn_forecastidpid?: string;
  msdyn_forecastpredictiondataid?: string;
  msdyn_forecastrecurrenceidpid?: string;
  msdyn_hierarchyrecordid?: string;
  msdyn_parentgranularpredictions?: string;
  msdyn_predictionon?: string;
  overriddencreatedon?: string;
  partitionid?: string;
  ttlinseconds?: number;
  versionnumber?: number;
}
