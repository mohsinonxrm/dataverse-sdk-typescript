/**
 * stagedmetadataasyncoperation entity type
 */
export interface stagedmetadataasyncoperation {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  asyncjobstatus?: number;
  asyncoperationid?: string;
  componenttype?: number;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  name?: string;
  objectid?: string;
  overriddencreatedon?: string;
  stagedmetadataasyncoperationid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  unprocesseddependencies?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
