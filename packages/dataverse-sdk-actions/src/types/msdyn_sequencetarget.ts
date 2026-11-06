/**
 * msdyn_sequencetarget entity type
 */
export interface msdyn_sequencetarget {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_advancedfromstep_value?: string;
  _msdyn_appliedsequenceinstance_value?: string;
  _msdyn_parentsequence_value?: string;
  _msdyn_segment_value?: string;
  _msdyn_target_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_currentstepcount?: number;
  msdyn_currentstepdefinitionid?: string;
  msdyn_currentstepname?: string;
  msdyn_currentstepsubtype?: number;
  msdyn_currentsteptype?: number;
  msdyn_deactivatereason?: number;
  msdyn_disconnectedafterstepdefinitionid?: string;
  msdyn_msflowrunid?: string;
  msdyn_name?: string;
  msdyn_parentsequenceversion?: number;
  msdyn_regarding?: string;
  msdyn_sequencetargetid?: string;
  msdyn_sequencetargetuniquekey?: string;
  msdyn_totalstepcount?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
