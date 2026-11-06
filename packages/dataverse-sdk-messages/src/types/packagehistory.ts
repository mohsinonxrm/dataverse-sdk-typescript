/**
 * packagehistory entity type
 */
export interface packagehistory {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  applicationid?: string;
  applicationname?: string;
  catalogid?: string;
  correlationid?: string;
  createdon?: string;
  deployasuserid?: string;
  deploymentlog?: string;
  deploymentlog_name?: string;
  deploymentmessageid?: string;
  executionname?: string;
  importsequencenumber?: number;
  isclusteroperation?: boolean;
  modifiedon?: string;
  operationid?: string;
  overriddencreatedon?: string;
  packagefile?: string;
  packagefile_name?: string;
  packagehistoryid?: string;
  packageid?: string;
  packageinstanceid?: string;
  packagetype?: number;
  priority?: number;
  publisherid?: string;
  publishername?: string;
  settings?: string;
  stagevalue?: number;
  statecode?: number;
  statuscode?: number;
  statusmessage?: string;
  timezoneruleversionnumber?: number;
  uniquename?: string;
  utcconversiontimezonecode?: number;
  version?: string;
  versionnumber?: number;
}
