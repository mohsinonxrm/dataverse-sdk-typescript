import type { BooleanManagedProperty } from './BooleanManagedProperty.js';

/**
 * webresource entity type
 */
export interface webresource {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  canbedeleted?: BooleanManagedProperty;
  componentstate?: number;
  content?: string;
  content_binary?: string;
  contentfileref?: string;
  contentfileref_name?: string;
  contenthash?: string;
  contentjson?: string;
  contentjsonfileref?: string;
  contentjsonfileref_name?: string;
  contentjsonhash?: string;
  createdon?: string;
  dependencyxml?: string;
  description?: string;
  displayname?: string;
  introducedversion?: string;
  isavailableformobileoffline?: boolean;
  iscustomizable?: BooleanManagedProperty;
  isenabledformobileclient?: boolean;
  ishidden?: BooleanManagedProperty;
  ismanaged?: boolean;
  languagecode?: number;
  modifiedon?: string;
  name?: string;
  overwritetime?: string;
  silverlightversion?: string;
  solutionid?: string;
  versionnumber?: number;
  webresourceid?: string;
  webresourceidunique?: string;
  webresourcetype?: number;
}
