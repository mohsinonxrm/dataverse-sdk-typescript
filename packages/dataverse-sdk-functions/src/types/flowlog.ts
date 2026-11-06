/**
 * flowlog entity type
 */
export interface flowlog {
  _cloudflowid_value?: string;
  _cloudflowrunid_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _desktopflowid_value?: string;
  _flowmachinegroupid_value?: string;
  _flowmachineid_value?: string;
  _flowsessionid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _parentobjectid_value?: string;
  _workqueueid_value?: string;
  _workqueueitemid_value?: string;
  cloudflowrunidpid?: string;
  createdon?: string;
  data?: string;
  duration?: number;
  flowlogid?: string;
  importsequencenumber?: number;
  inputslocalizednames?: string;
  level?: number;
  logindex?: number;
  modifiedon?: string;
  name?: string;
  outputslocalizednames?: string;
  overriddencreatedon?: string;
  partitionid?: string;
  ttlinseconds?: number;
  type?: number;
  versionnumber?: number;
}
