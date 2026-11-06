/**
 * flowaggregation entity type
 */
export interface flowaggregation {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _workflowid_value?: string;
  aggregationtype?: string;
  aggregationvalue?: number;
  createdon?: string;
  errorcode?: string;
  flowaggregationid?: string;
  importsequencenumber?: number;
  istoplevelrun?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  partitionid?: string;
  status?: string;
  timeend?: string;
  timestart?: string;
  triggertype?: string;
  ttlinseconds?: number;
  value?: number;
  versionnumber?: number;
  workflowcategory?: number;
}
