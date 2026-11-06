/**
 * msdyn_transformationtranscript entity type
 */
export interface msdyn_transformationtranscript {
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
  msdyn_name?: string;
  msdyn_ocliveworkitemid?: string;
  msdyn_status?: number;
  msdyn_transcriptfile?: string;
  msdyn_transcriptfile_name?: string;
  msdyn_transformationjobid?: string;
  msdyn_transformationtranscriptid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
