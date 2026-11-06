/**
 * msdyn_icebreakersconfig entity type
 */
export interface msdyn_icebreakersconfig {
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
  msdyn_aretermsaccepted?: boolean;
  msdyn_icebreakersconfigid?: string;
  msdyn_isadminsettingenabled?: boolean;
  msdyn_isentertainmentcategoryenabled?: boolean;
  msdyn_isfamilycategoryenabled?: boolean;
  msdyn_ishealthcategoryenabled?: boolean;
  msdyn_issportscategoryenabled?: boolean;
  msdyn_name?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
