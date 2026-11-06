/**
 * msdyn_aitestrun entity type
 */
export interface msdyn_aitestrun {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_aitestcaseid_value?: string;
  _msdyn_aitestrunbatchid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_accuracyscore?: number;
  msdyn_actualoutput?: string;
  msdyn_additionalresponsemetadata?: string;
  msdyn_aitestrunid?: string;
  msdyn_comment?: string;
  msdyn_completedon?: string;
  msdyn_configurationid?: string;
  msdyn_errormessage?: string;
  msdyn_expectedoutput?: string;
  msdyn_name?: string;
  msdyn_runduration?: number;
  msdyn_startedon?: string;
  msdyn_testrunsetting?: string;
  msdyn_testrunstatus?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
