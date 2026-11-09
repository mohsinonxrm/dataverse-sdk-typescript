/**
 * sitemap entity type
 */
export interface sitemap {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  componentstate?: number;
  createdon?: string;
  enablecollapsiblegroups?: boolean;
  isappaware?: boolean;
  ismanaged?: boolean;
  modifiedon?: string;
  overwritetime?: string;
  showhome?: boolean;
  showpinned?: boolean;
  showrecents?: boolean;
  sitemapid?: string;
  sitemapidunique?: string;
  sitemapname?: string;
  sitemapnameunique?: string;
  sitemapxml?: string;
  sitemapxmlmanaged?: string;
  solutionid?: string;
  versionnumber?: number;
}
