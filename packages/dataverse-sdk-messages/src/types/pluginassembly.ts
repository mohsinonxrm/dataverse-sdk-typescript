import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * pluginassembly entity type
 */
export interface pluginassembly {
  ishidden: BooleanManagedProperty;
  authtype: number;
  ispasswordset: boolean;
  password: string;
  sourcetype: number;
  _organizationid_value: string;
  sourcehash: string;
  username: string;
  introducedversion: string;
  name: string;
  publickeytoken: string;
  _createdby_value: string;
  customizationlevel: number;
  createdon: string;
  _createdonbehalfby_value: string;
  version: string;
  description: string;
  solutionid: string;
  url: string;
  ismanaged: boolean;
  culture: string;
  pluginassemblyidunique: string;
  versionnumber: number;
  _packageid_value: string;
  overwritetime: string;
  _modifiedonbehalfby_value: string;
  pluginassemblyid: string;
  _modifiedby_value: string;
  major: number;
  componentstate: number;
  iscustomizable: BooleanManagedProperty;
  path: string;
  modifiedon: string;
  minor: number;
  content: string;
  content_binary: string;
  _managedidentityid_value: string;
  isolationmode: number;
}
