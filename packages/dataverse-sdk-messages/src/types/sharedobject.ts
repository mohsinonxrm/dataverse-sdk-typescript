/**
 * sharedobject entity type
 */
export interface sharedobject {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _sharedworkspaceid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  objectid?: string;
  objectname?: string;
  objecttype?: number;
  overriddencreatedon?: string;
  sharedobjectid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
