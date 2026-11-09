/**
 * asyncoperation entity type
 */
export interface asyncoperation {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningextensionid_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _regardingobjectid_value?: string;
  _workflowactivationid_value?: string;
  asyncoperationid?: string;
  breadcrumbid?: string;
  callerorigin?: string;
  completedon?: string;
  correlationid?: string;
  correlationupdatedtime?: string;
  createdon?: string;
  data?: string;
  datablobid?: string;
  datablobid_name?: string;
  dependencytoken?: string;
  depth?: number;
  errorcode?: number;
  executiontimespan?: number;
  expanderstarttime?: string;
  friendlymessage?: string;
  hostid?: string;
  iswaitingforevent?: boolean;
  message?: string;
  messagename?: string;
  modifiedon?: string;
  name?: string;
  operationtype?: number;
  parentpluginexecutionid?: string;
  postponeuntil?: string;
  primaryentitytype?: string;
  recurrencepattern?: string;
  recurrencestarttime?: string;
  requestid?: string;
  retainjobhistory?: boolean;
  retrycount?: number;
  rootexecutioncontext?: string;
  sequence?: number;
  startedon?: string;
  statecode?: number;
  statuscode?: number;
  subtype?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  workflowstagename?: string;
  workload?: string;
}
