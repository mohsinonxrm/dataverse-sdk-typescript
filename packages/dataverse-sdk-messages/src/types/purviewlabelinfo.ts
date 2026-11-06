/**
 * purviewlabelinfo entity type
 */
export interface purviewlabelinfo {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _parentlabelid_value?: string;
  applicableto?: string;
  applicationmode?: string;
  color?: string;
  contentformats?: string;
  createdon?: string;
  defaultsublabelid?: string;
  description?: string;
  hasprotection?: boolean;
  importsequencenumber?: number;
  isactive?: boolean;
  isapplicable?: boolean;
  isdataverseprotected?: boolean;
  isdefault?: boolean;
  isenabled?: boolean;
  isendpointprotectionenabled?: boolean;
  isparent?: boolean;
  issmimeencryptenabled?: boolean;
  issmimesignenabled?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  priority?: number;
  purviewlabelinfoid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  tooltip?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
