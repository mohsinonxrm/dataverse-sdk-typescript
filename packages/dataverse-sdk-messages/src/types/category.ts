/**
 * category entity type
 */
export interface category {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _parentcategoryid_value?: string;
  _transactioncurrencyid_value?: string;
  categoryid?: string;
  categorynumber?: string;
  createdon?: string;
  description?: string;
  exchangerate?: number;
  importsequencenumber?: number;
  modifiedon?: string;
  overriddencreatedon?: string;
  sequencenumber?: number;
  title?: string;
  versionnumber?: number;
}
