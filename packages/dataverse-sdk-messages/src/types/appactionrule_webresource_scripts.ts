import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * appactionrule_webresource_scripts entity type
 */
export interface appactionrule_webresource_scripts {
  appactionrule_webresource_scriptsid?: string;
  appactionruleid?: string;
  componentidunique?: string;
  componentstate?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  overwritetime?: string;
  solutionid?: string;
  versionnumber?: number;
  webresourceid?: string;
}
