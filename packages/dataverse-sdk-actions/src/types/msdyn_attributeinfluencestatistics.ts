/**
 * msdyn_attributeinfluencestatistics entity type
 */
export interface msdyn_attributeinfluencestatistics {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_attributeinfluencestatisticsid?: string;
  msdyn_attributename?: string;
  msdyn_entityname?: string;
  msdyn_ignoreifblank?: boolean;
  msdyn_importance?: number;
  msdyn_iscrmattribute?: boolean;
  msdyn_isrecommended?: boolean;
  msdyn_isvalid?: boolean;
  msdyn_modelid?: string;
  msdyn_name?: string;
  msdyn_notselectedreason?: number;
  msdyn_predictionid?: string;
  msdyn_statistics?: string;
  msdyn_submodelid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
