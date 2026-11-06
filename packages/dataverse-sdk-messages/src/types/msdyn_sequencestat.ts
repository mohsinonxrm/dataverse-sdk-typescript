/**
 * msdyn_sequencestat entity type
 */
export interface msdyn_sequencestat {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_sequence_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_avgtimefortargetcompletion?: number;
  msdyn_name?: string;
  msdyn_range?: number;
  msdyn_sequencestatid?: string;
  msdyn_successrate?: number;
  msdyn_targetscompleted?: number;
  msdyn_targetscreated?: number;
  msdyn_targetsdisconnected?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
