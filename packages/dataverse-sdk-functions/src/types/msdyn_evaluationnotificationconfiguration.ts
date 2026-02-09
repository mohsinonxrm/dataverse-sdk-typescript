/**
 * msdyn_evaluationnotificationconfiguration entity type
 */
export interface msdyn_evaluationnotificationconfiguration {
  msdyn_name: string;
  statecode: number;
  _msdyn_evaluationplanid_value: string;
  versionnumber: number;
  msdyn_criterianotificationenabled: boolean;
  msdyn_notificationenabled: boolean;
  msdyn_sectionnotificationenabled: boolean;
  createdon: string;
  _modifiedby_value: string;
  msdyn_evaluationnotificationconfigurationid: string;
  _ownerid_value: string;
  _createdby_value: string;
  modifiedon: string;
  importsequencenumber: number;
  _owninguser_value: string;
  _modifiedonbehalfby_value: string;
  timezoneruleversionnumber: number;
  utcconversiontimezonecode: number;
  _createdonbehalfby_value: string;
  statuscode: number;
  overriddencreatedon: string;
  msdyn_criteriathresholds: string;
  _owningteam_value: string;
  msdyn_sectionthresholds: string;
  _owningbusinessunit_value: string;
}
