import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * pluginassembly entity type
 */
export interface pluginassembly {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _managedidentityid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _packageid_value?: string;
  authtype?: number;
  componentstate?: number;
  content?: string;
  content_binary?: string;
  createdon?: string;
  culture?: string;
  customizationlevel?: number;
  description?: string;
  introducedversion?: string;
  iscustomizable?: BooleanManagedProperty;
  ishidden?: BooleanManagedProperty;
  ismanaged?: boolean;
  isolationmode?: number;
  ispasswordset?: boolean;
  major?: number;
  minor?: number;
  modifiedon?: string;
  name?: string;
  overwritetime?: string;
  password?: string;
  path?: string;
  pluginassemblyid?: string;
  pluginassemblyidunique?: string;
  publickeytoken?: string;
  solutionid?: string;
  sourcehash?: string;
  sourcetype?: number;
  url?: string;
  username?: string;
  version?: string;
  versionnumber?: number;
}
