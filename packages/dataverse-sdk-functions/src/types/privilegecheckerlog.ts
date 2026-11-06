/**
 * privilegecheckerlog entity type
 */
export interface privilegecheckerlog {
  _checkedprivilege_value?: string;
  _checkeduser_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _impersonatinguser_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _privilegecheckerrunid_value?: string;
  _supportingcaller_value?: string;
  checktype?: number;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  privilegecheckerlogid?: string;
  privilegedepth?: number;
  request?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
