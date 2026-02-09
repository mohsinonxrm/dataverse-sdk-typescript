import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * webresource entity type
 */
export interface webresource {
  contentjsonfileref_name: string;
  versionnumber: number;
  _organizationid_value: string;
  modifiedon: string;
  contentfileref_name: string;
  _createdby_value: string;
  contentjson: string;
  contentjsonfileref: string;
  isenabledformobileclient: boolean;
  isavailableformobileoffline: boolean;
  ismanaged: boolean;
  name: string;
  overwritetime: string;
  ishidden: BooleanManagedProperty;
  canbedeleted: BooleanManagedProperty;
  webresourceidunique: string;
  description: string;
  languagecode: number;
  dependencyxml: string;
  createdon: string;
  iscustomizable: BooleanManagedProperty;
  _modifiedby_value: string;
  contentfileref: string;
  webresourcetype: number;
  introducedversion: string;
  componentstate: number;
  webresourceid: string;
  displayname: string;
  content: string;
  content_binary: string;
  _modifiedonbehalfby_value: string;
  _createdonbehalfby_value: string;
  solutionid: string;
  silverlightversion: string;
}
