/**
 * msdyn_intentharvesting_proposedintent entity type
 */
export interface msdyn_intentharvesting_proposedintent {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_intentfamilyid_value?: string;
  _msdyn_intentharvesting_batchjobstatusid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_confidencescore?: number;
  msdyn_confidencescoredetails?: string;
  msdyn_description?: string;
  msdyn_harvestingsource?: number;
  msdyn_intentattributes?: string;
  msdyn_intententities?: string;
  msdyn_intentharvesting_proposedintentid?: string;
  msdyn_intentid?: string;
  msdyn_intentstring?: string;
  msdyn_isgroup?: boolean;
  msdyn_locale_code?: string;
  msdyn_miningdetails?: string;
  msdyn_name?: string;
  msdyn_occurrencecount?: number;
  msdyn_occurrencecount_last12months?: number;
  msdyn_occurrencecount_last30days?: number;
  msdyn_parentgroupintentid?: string;
  msdyn_reviewstate?: number;
  msdyn_statecode?: number;
  overriddencreatedon?: string;
  partitionid?: string;
  ttlinseconds?: number;
  versionnumber?: number;
}
