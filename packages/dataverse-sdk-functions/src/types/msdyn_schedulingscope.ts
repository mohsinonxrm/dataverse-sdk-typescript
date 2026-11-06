/**
 * msdyn_schedulingscope entity type
 */
export interface msdyn_schedulingscope {
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
  msdyn_bookingsquery?: string;
  msdyn_includebookingsfromallresources?: boolean;
  msdyn_name?: string;
  msdyn_requirementsquery?: string;
  msdyn_resourcesquery?: string;
  msdyn_schedulingscopeid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
