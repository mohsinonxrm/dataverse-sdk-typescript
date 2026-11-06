/**
 * bulkoperationlog entity type
 */
export interface bulkoperationlog {
  _bulkoperationid_value?: string;
  _campaignactivityid_value?: string;
  _createdobjectid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _regardingobjectid_value?: string;
  additionalinfo?: string;
  bulkoperationlogid?: string;
  errordescriptionformatted?: string;
  errornumber?: number;
  errornumberformatted?: string;
  importsequencenumber?: number;
  name?: string;
  overriddencreatedon?: string;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
