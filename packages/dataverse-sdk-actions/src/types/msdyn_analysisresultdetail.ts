/**
 * msdyn_analysisresultdetail entity type
 */
export interface msdyn_analysisresultdetail {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_analysisresult_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_analysisresultdetailid?: string;
  msdyn_canopenentityrecord?: boolean;
  msdyn_entityname?: string;
  msdyn_message?: string;
  msdyn_name?: string;
  msdyn_resultentityid?: string;
  msdyn_resultentitylogicalname?: string;
  msdyn_resultentityprimarykey?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
