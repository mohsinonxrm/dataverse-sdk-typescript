/**
 * msdyn_intententity_backfillstatus entity type
 */
export interface msdyn_intententity_backfillstatus {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_intententity_backfillstatusid?: string;
  msdyn_intentfamilyid?: string;
  msdyn_jobstatus?: number;
  msdyn_lastjob_completedon?: string;
  msdyn_name?: string;
  msdyn_target_entity_name?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
