/**
 * msdyn_forecastinsight entity type
 */
export interface msdyn_forecastinsight {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_forecastconfigurationid_value?: string;
  _msdyn_forecastrecurrenceid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_forecastinsightid?: string;
  msdyn_forecastrecurrenceidpid?: string;
  msdyn_hierarchyrecordid?: string;
  msdyn_insights?: string;
  msdyn_isrollup?: boolean;
  msdyn_version?: string;
  overriddencreatedon?: string;
  partitionid?: string;
  ttlinseconds?: number;
  versionnumber?: number;
}
