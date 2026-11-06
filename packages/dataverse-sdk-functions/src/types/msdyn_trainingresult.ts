/**
 * msdyn_trainingresult entity type
 */
export interface msdyn_trainingresult {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_modelaccuracymetrics?: string;
  msdyn_modelid?: string;
  msdyn_name?: string;
  msdyn_predictiondistribution?: string;
  msdyn_predictionguid?: string;
  msdyn_predictionname?: string;
  msdyn_trainingresultid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
