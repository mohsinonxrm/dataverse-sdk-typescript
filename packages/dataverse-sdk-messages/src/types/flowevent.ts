/**
 * flowevent entity type
 */
export interface flowevent {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _parentobjectid_value?: string;
  completedon?: string;
  createdon?: string;
  eventcode?: string;
  eventcontent?: string;
  eventduration?: number;
  eventtype?: string;
  expirydate?: string;
  floweventid?: string;
  importsequencenumber?: number;
  level?: string;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  parentobjectlogicalname?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
