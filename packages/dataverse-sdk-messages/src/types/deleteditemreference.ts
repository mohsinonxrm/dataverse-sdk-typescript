/**
 * deleteditemreference entity type
 */
export interface deleteditemreference {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _deletedobject_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _regardingobjectid_value?: string;
  createdon?: string;
  deleteditemreferenceid?: string;
  deletedlogicalnames?: string;
  deletedlogicalnames_name?: string;
  deletedrecords?: string;
  deletedrecords_name?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  processedrecords?: number;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  totalrecords?: number;
  utcconversiontimezonecode?: number;
  validforrestore?: boolean;
  versionnumber?: number;
}
