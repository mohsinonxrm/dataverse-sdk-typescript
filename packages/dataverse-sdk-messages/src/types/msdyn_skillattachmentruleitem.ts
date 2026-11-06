/**
 * msdyn_skillattachmentruleitem entity type
 */
export interface msdyn_skillattachmentruleitem {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_liveworkstream_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_condition?: string;
  msdyn_description?: string;
  msdyn_expression?: string;
  msdyn_name?: string;
  msdyn_rulejson?: string;
  msdyn_skillattachmentruleitemid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
