/**
 * msdyn_actioncardactionstat entity type
 */
export interface msdyn_actioncardactionstat {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_cardtypeid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_actioncardactionstatid?: string;
  msdyn_actioncardid?: string;
  msdyn_cardtype?: number;
  msdyn_datapoint?: string;
  msdyn_name?: string;
  msdyn_regardingobjectid?: string;
  msdyn_regardingobjectlogicalname?: string;
  msdyn_regardingobjecttypecode?: number;
  msdyn_userid?: string;
  msdyn_value?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
