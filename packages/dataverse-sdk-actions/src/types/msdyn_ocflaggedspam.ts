/**
 * msdyn_ocflaggedspam entity type
 */
export interface msdyn_ocflaggedspam {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_ruleid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_flaggedby?: string;
  msdyn_flaggedstatus?: number;
  msdyn_name?: string;
  msdyn_ocflaggedspamid?: string;
  msdyn_spamtype?: number;
  msdyn_spamvalue?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
