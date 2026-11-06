/**
 * msdyn_rawinsight entity type
 */
export interface msdyn_rawinsight {
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
  msdyn_audienceaccess?: string;
  msdyn_dataformatversion?: string;
  msdyn_externalcrmorgid?: string;
  msdyn_insightlocale?: string;
  msdyn_insightsdata?: string;
  msdyn_isInsightInOriginalLocale?: boolean;
  msdyn_metadata?: string;
  msdyn_name?: string;
  msdyn_rawinsightid?: string;
  msdyn_rowsize?: number;
  msdyn_sourceeventgroup?: string;
  msdyn_sourceeventtype?: string;
  msdyn_sourcegroupid?: string;
  msdyn_sourceid?: string;
  msdyn_sourcetimestamp?: string;
  msdyn_targets?: string;
  overriddencreatedon?: string;
  partitionid?: string;
  ttlinseconds?: number;
  versionnumber?: number;
}
