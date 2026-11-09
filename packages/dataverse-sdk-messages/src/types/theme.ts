/**
 * theme entity type
 */
export interface theme {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _logoid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _transactioncurrencyid_value?: string;
  accentcolor?: string;
  backgroundcolor?: string;
  controlborder?: string;
  controlshade?: string;
  createdon?: string;
  defaultcustomentitycolor?: string;
  defaultentitycolor?: string;
  exchangerate?: number;
  globallinkcolor?: string;
  headercolor?: string;
  hoverlinkeffect?: string;
  importsequencenumber?: number;
  isdefaulttheme?: boolean;
  logotooltip?: string;
  maincolor?: string;
  modifiedon?: string;
  name?: string;
  navbarbackgroundcolor?: string;
  navbarshelfcolor?: string;
  overriddencreatedon?: string;
  pageheaderbackgroundcolor?: string;
  panelheaderbackgroundcolor?: string;
  processcontrolcolor?: string;
  selectedlinkeffect?: string;
  statecode?: number;
  statuscode?: number;
  themeid?: string;
  timezoneruleversionnumber?: number;
  type?: boolean;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
