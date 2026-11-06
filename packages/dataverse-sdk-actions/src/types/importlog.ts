/**
 * importlog entity type
 */
export interface importlog {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _importdataid_value?: string;
  _importfileid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  additionalinfo?: string;
  columnvalue?: string;
  createdon?: string;
  errordescription?: string;
  errornumber?: number;
  headercolumn?: string;
  importlogid?: string;
  linenumber?: number;
  logphasecode?: number;
  modifiedon?: string;
  sequencenumber?: number;
  statecode?: number;
  statuscode?: number;
}
