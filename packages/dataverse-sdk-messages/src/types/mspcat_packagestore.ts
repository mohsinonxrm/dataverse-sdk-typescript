/**
 * mspcat_packagestore entity type
 */
export interface mspcat_packagestore {
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
  mspcat_asyncoperationid?: string;
  mspcat_intendeddeploymenttype?: number;
  mspcat_name?: string;
  mspcat_operation?: number;
  mspcat_packagefile?: string;
  mspcat_packagefile_name?: string;
  mspcat_packagestoreid?: string;
  mspcat_processingmessage?: string;
  mspcat_solutionuniquename?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
