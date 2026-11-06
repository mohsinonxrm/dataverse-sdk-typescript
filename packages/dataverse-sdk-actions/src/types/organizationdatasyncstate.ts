/**
 * organizationdatasyncstate entity type
 */
export interface organizationdatasyncstate {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _entityname_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationdatasyncsubscriptionid_value?: string;
  _organizationid_value?: string;
  continuefromlastdeltasync?: boolean;
  createdon?: string;
  currentfullsyncfetchxml?: string;
  currentfullsyncstate?: number;
  fullsynconly?: boolean;
  fullsyncpagesdata?: string;
  implicitlastdataversion?: string;
  importsequencenumber?: number;
  lastdataversion?: string;
  lastmetadataversion?: string;
  lockexpiretimestamp?: string;
  lockowner?: string;
  minactiverowversion?: string;
  modifiedon?: string;
  name?: string;
  nullstatedate?: string;
  organizationdatasyncstateid?: string;
  overriddencreatedon?: string;
  pagenumber?: number;
  paginationcookie?: string;
  pagingcookie?: string;
  partitionid?: string;
  partitionssyncstatedata?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  usepagingcookiemax?: boolean;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
