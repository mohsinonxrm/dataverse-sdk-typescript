/**
 * msdyn_dataclassification entity type
 */
export interface msdyn_dataclassification {
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
  msdyn_batchid?: string;
  msdyn_classificationtype?: number;
  msdyn_dataclassificationid?: string;
  msdyn_industrytype?: string;
  msdyn_name?: string;
  msdyn_recordid?: string;
  msdyn_sourceentity?: number;
  msdyn_timestamp?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
