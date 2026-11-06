/**
 * msdyn_salesassignmentsetting entity type
 */
export interface msdyn_salesassignmentsetting {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_customownerfield?: string;
  msdyn_defaultcapacity?: number;
  msdyn_enabledtime?: string;
  msdyn_name?: string;
  msdyn_opportunityroutingenabled?: boolean;
  msdyn_reassignmentbatchcount?: number;
  msdyn_reassignmentbatchsize?: number;
  msdyn_roundrobinscope?: number;
  msdyn_ruleinfoenabled?: boolean;
  msdyn_salesassignmentsettingid?: string;
  msdyn_verboselogging?: boolean;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
