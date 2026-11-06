/**
 * msdyn_ocliveworkitemsentiment entity type
 */
export interface msdyn_ocliveworkitemsentiment {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_ocliveworkitemid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_name?: string;
  msdyn_ocliveworkitemsentimentid?: string;
  msdyn_predictedlanguage?: string;
  msdyn_sentimentmodelversion?: string;
  msdyn_sentimentpulse?: number;
  msdyn_sentimenttransition?: number;
  msdyn_sentimentzone?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
