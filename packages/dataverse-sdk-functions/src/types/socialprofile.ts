/**
 * socialprofile entity type
 */
export interface socialprofile {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _customerid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_octwitterhandleid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _transactioncurrencyid_value?: string;
  blocked?: boolean;
  community?: number;
  createdon?: string;
  exchangerate?: number;
  importsequencenumber?: number;
  influencescore?: number;
  modifiedon?: string;
  msdyn_customeroptout?: boolean;
  msdyn_ocfollowercount?: number;
  msdyn_ocfollowingcount?: number;
  msdyn_ocfriendcount?: number;
  msdyn_phonenumber?: string;
  msdyn_profileimagelink?: string;
  msdyn_sourceid?: string;
  msdyn_wechatopenid?: string;
  msdyn_whatsappbsuid?: string;
  overriddencreatedon?: string;
  profilefullname?: string;
  profilelink?: string;
  profilename?: string;
  socialprofileid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  uniqueprofileid?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
