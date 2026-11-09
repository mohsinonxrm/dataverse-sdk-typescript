/**
 * queueitem entity type
 */
export interface queueitem {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_liveworkstreamid_value?: string;
  _objectid_value?: string;
  _organizationid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owninguser_value?: string;
  _queueid_value?: string;
  _transactioncurrencyid_value?: string;
  _workerid_value?: string;
  createdon?: string;
  enteredon?: string;
  exchangerate?: number;
  importsequencenumber?: number;
  inheritedparentclustermode?: number;
  modifiedon?: string;
  msdyn_skipursync?: boolean;
  objecttypecode?: number;
  overriddencreatedon?: string;
  queueitemid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  title?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
  workeridmodifiedon?: string;
}
