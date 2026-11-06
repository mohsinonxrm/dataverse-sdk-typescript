/**
 * userform entity type
 */
export interface userform {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  description?: string;
  formjson?: string;
  formxml?: string;
  istabletenabled?: boolean;
  modifiedon?: string;
  name?: string;
  objecttypecode?: string;
  type?: number;
  userformid?: string;
  versionnumber?: number;
}
