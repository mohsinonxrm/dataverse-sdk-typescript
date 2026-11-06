/**
 * sdkmessagefilter entity type
 */
export interface sdkmessagefilter {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _sdkmessageid_value?: string;
  availability?: number;
  componentstate?: number;
  createdon?: string;
  customizationlevel?: number;
  introducedversion?: string;
  iscustomprocessingstepallowed?: boolean;
  ismanaged?: boolean;
  isvisible?: boolean;
  modifiedon?: string;
  name?: string;
  overwritetime?: string;
  primaryobjecttypecode?: string;
  restrictionlevel?: number;
  sdkmessagefilterid?: string;
  sdkmessagefilteridunique?: string;
  secondaryobjecttypecode?: string;
  solutionid?: string;
  versionnumber?: number;
  workflowsdkstepenabled?: boolean;
}
