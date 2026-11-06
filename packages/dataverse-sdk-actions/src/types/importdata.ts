/**
 * importdata entity type
 */
export interface importdata {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _importfileid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  data?: string;
  errortype?: number;
  haserror?: boolean;
  importdataid?: string;
  linenumber?: number;
  modifiedon?: string;
  recordid?: string;
  statecode?: number;
  statuscode?: number;
}
