/**
 * msdyn_recommendedactionderivedinsight entity type
 */
export interface msdyn_recommendedactionderivedinsight {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_regardingobjectid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_conversationid?: string;
  msdyn_derivedinsightsource?: number;
  msdyn_derivedinsightvalue?: string;
  msdyn_entitytype?: string;
  msdyn_name?: string;
  msdyn_recommendedactionderivedinsightid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
