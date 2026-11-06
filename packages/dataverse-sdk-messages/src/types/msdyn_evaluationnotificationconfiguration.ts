/**
 * msdyn_evaluationnotificationconfiguration entity type
 */
export interface msdyn_evaluationnotificationconfiguration {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_evaluationplanid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_criterianotificationenabled?: boolean;
  msdyn_criteriathresholds?: string;
  msdyn_evaluationnotificationconfigurationid?: string;
  msdyn_name?: string;
  msdyn_notificationenabled?: boolean;
  msdyn_sectionnotificationenabled?: boolean;
  msdyn_sectionthresholds?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
