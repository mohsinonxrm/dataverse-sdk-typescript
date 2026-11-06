/**
 * athenareconciliationinfo entity type
 */
export interface athenareconciliationinfo {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  athenareconciliationinfoid?: string;
  completedtime?: string;
  createdon?: string;
  entityname?: string;
  fromrecid?: string;
  importsequencenumber?: number;
  jobstatus?: number;
  mefrunid?: string;
  message?: string;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  profileid?: string;
  reconstatus?: number;
  starttime?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  torecid?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
