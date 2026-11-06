/**
 * msdyn_contactprofilerdetail entity type
 */
export interface msdyn_contactprofilerdetail {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_contactid_value?: string;
  _msdyn_contactprofilerresultid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_additionalinfo?: string;
  msdyn_citation?: string;
  msdyn_contactprofilerdetailid?: string;
  msdyn_emailaddress?: string;
  msdyn_firstname?: string;
  msdyn_iscontactaddedtocrm?: boolean;
  msdyn_ismarkedirrelevant?: boolean;
  msdyn_jobtitle?: string;
  msdyn_lastname?: string;
  msdyn_name?: string;
  msdyn_phonenumber?: string;
  msdyn_profileurl?: string;
  msdyn_rank?: number;
  msdyn_reasoning?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
