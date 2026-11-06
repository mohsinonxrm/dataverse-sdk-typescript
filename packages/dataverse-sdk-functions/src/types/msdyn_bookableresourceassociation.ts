/**
 * msdyn_bookableresourceassociation entity type
 */
export interface msdyn_bookableresourceassociation {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_resource1_value?: string;
  _msdyn_resource2_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_bookableresourceassociationid?: string;
  msdyn_fromdate?: string;
  msdyn_name?: string;
  msdyn_todate?: string;
  msdyn_type?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
