/**
 * msdyn_caseaiprediction entity type
 */
export interface msdyn_caseaiprediction {
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
  msdyn_caseaipredictionid?: string;
  msdyn_channel?: number;
  msdyn_fieldspredictedbyai?: string;
  msdyn_fieldspredictionsbyapiversions?: string;
  msdyn_sourceid?: string;
  msdyn_targetid?: string;
  msdyn_targetlogicalname?: string;
  name?: string;
  overriddencreatedon?: string;
  partitionid?: string;
  ttlinseconds?: number;
  versionnumber?: number;
}
