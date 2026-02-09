import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * appactionrule_webresource_scripts entity type
 */
export interface appactionrule_webresource_scripts {
  componentstate: number;
  overwritetime: string;
  ismanaged: boolean;
  appactionrule_webresource_scriptsid: string;
  iscustomizable: BooleanManagedProperty;
  webresourceid: string;
  appactionruleid: string;
  solutionid: string;
  componentidunique: string;
  versionnumber: number;
}
