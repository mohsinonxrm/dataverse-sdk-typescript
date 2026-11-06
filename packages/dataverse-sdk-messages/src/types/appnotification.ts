/**
 * appnotification entity type
 */
export interface appnotification {
  _appmoduleid_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  appnotificationid?: string;
  body?: string;
  createdon?: string;
  data?: string;
  icontype?: number;
  importsequencenumber?: number;
  modifiedon?: string;
  overriddencreatedon?: string;
  partitionid?: string;
  priority?: number;
  timezoneruleversionnumber?: number;
  title?: string;
  toasttype?: number;
  ttlinseconds?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
