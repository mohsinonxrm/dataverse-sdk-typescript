/**
 * asyncoperation entity type
 */
export interface asyncoperation {
  callerorigin?: string;
  _createdby_value?: string;
  _modifiedonbehalfby_value?: string;
  primaryentitytype?: string;
  requestid?: string;
  _regardingobjectid_value?: string;
  _modifiedby_value?: string;
  _workflowactivationid_value?: string;
  modifiedon?: string;
  startedon?: string;
  errorcode?: number;
  statecode?: number;
  datablobid?: string;
  recurrencestarttime?: string;
  recurrencepattern?: string;
  createdon?: string;
  _owningbusinessunit_value?: string;
  friendlymessage?: string;
  correlationupdatedtime?: string;
  message?: string;
  _owningextensionid_value?: string;
  postponeuntil?: string;
  depth?: number;
  workflowstagename?: string;
  name?: string;
  correlationid?: string;
  _owningteam_value?: string;
  retainjobhistory?: boolean;
  hostid?: string;
  utcconversiontimezonecode?: number;
  expanderstarttime?: string;
  completedon?: string;
  sequence?: number;
  timezoneruleversionnumber?: number;
  subtype?: number;
  datablobid_name?: string;
  data?: string;
  _owninguser_value?: string;
  messagename?: string;
  _ownerid_value?: string;
  breadcrumbid?: string;
  statuscode?: number;
  rootexecutioncontext?: string;
  operationtype?: number;
  retrycount?: number;
  dependencytoken?: string;
  parentpluginexecutionid?: string;
  asyncoperationid?: string;
  _createdonbehalfby_value?: string;
  executiontimespan?: number;
  iswaitingforevent?: boolean;
  workload?: string;
}
