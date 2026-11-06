/**
 * msdyn_duplicatedetectionpluginrun entity type
 */
export interface msdyn_duplicatedetectionpluginrun {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_baserecordid_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_duplicatedetectionpluginrunid?: string;
  msdyn_entityname?: string;
  msdyn_failurereason?: string;
  msdyn_iscompleted?: boolean;
  msdyn_messagename?: string;
  msdyn_name?: string;
  msdyn_reruncompleted?: boolean;
  msdyn_retrycount?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
