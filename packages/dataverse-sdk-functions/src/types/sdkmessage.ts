/**
 * sdkmessage entity type
 */
export interface sdkmessage {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  autotransact?: boolean;
  availability?: number;
  categoryname?: string;
  componentstate?: number;
  createdon?: string;
  customizationlevel?: number;
  executeprivilegename?: string;
  expand?: boolean;
  introducedversion?: string;
  isactive?: boolean;
  ismanaged?: boolean;
  isprivate?: boolean;
  isreadonly?: boolean;
  isvalidforexecuteasync?: boolean;
  modifiedon?: string;
  name?: string;
  overwritetime?: string;
  sdkmessageid?: string;
  sdkmessageidunique?: string;
  solutionid?: string;
  template?: boolean;
  throttlesettings?: string;
  versionnumber?: number;
  workflowsdkstepenabled?: boolean;
}
