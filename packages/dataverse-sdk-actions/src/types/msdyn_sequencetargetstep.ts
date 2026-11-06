/**
 * msdyn_sequencetargetstep entity type
 */
export interface msdyn_sequencetargetstep {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_advancedfromstep_value?: string;
  _msdyn_sequencetarget_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_advancedfromwaitstate?: number;
  msdyn_completedon?: string;
  msdyn_convertedtomanualfrom?: number;
  msdyn_description?: string;
  msdyn_duetime?: string;
  msdyn_errorstate?: number;
  msdyn_linkedactivityid?: string;
  msdyn_name?: string;
  msdyn_operationparameter?: string;
  msdyn_sequenceduetime?: string;
  msdyn_sequencestepid?: string;
  msdyn_sequencetargetstepid?: string;
  msdyn_snoozecount?: number;
  msdyn_subtype?: number;
  msdyn_triggeroutcome?: string;
  msdyn_type?: number;
  msdyn_waitskippedon?: string;
  msdyn_waitstate?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
