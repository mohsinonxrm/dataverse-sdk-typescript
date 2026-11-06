/**
 * msdyn_simulationtracker entity type
 */
export interface msdyn_simulationtracker {
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
  msdyn_endtime?: string;
  msdyn_jobid?: string;
  msdyn_name?: string;
  msdyn_simulationtrackerid?: string;
  msdyn_sourceworkstreamid?: string;
  msdyn_starttime?: string;
  msdyn_status?: number;
  msdyn_targetphonenumber?: string;
  msdyn_targetworkstreamid?: string;
  overriddencreatedon?: string;
  partitionid?: string;
  ttlinseconds?: number;
  versionnumber?: number;
}
