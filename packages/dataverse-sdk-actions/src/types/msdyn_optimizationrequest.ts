/**
 * msdyn_optimizationrequest entity type
 */
export interface msdyn_optimizationrequest {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_goalid_value?: string;
  _msdyn_schedulingoptimizationplan_value?: string;
  _msdyn_scopeid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_applyoperationid?: string;
  msdyn_bookingsquery?: string;
  msdyn_expireson?: string;
  msdyn_goalobjectives?: string;
  msdyn_goaloptions?: string;
  msdyn_includebookingsfromallresources?: boolean;
  msdyn_isautomaticapply?: boolean;
  msdyn_isgoaloptionsoverridden?: boolean;
  msdyn_name?: string;
  msdyn_optimizationerrors?: string;
  msdyn_optimizationrequestid?: string;
  msdyn_optimizationrequestname?: string;
  msdyn_optimizationstatus?: number;
  msdyn_optimizationtype?: number;
  msdyn_rangeendtime?: string;
  msdyn_rangestarttime?: string;
  msdyn_requestversion?: string;
  msdyn_requirementsquery?: string;
  msdyn_resourcesquery?: string;
  msdyn_snapshot?: string;
  msdyn_statusreason?: string;
  msdyn_suggestedschedule?: string;
  msdyn_ussoptimizationid?: string;
  msdyn_usspayloadsnapshot?: string;
  msdyn_usssnapshot?: string;
  overriddencreatedon?: string;
  partitionid?: string;
  ttlinseconds?: number;
  versionnumber?: number;
}
