import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * appaction_appactionrule_classicrules entity type
 */
export interface appaction_appactionrule_classicrules {
  appaction_appactionrule_classicrulesid?: string;
  appactionid?: string;
  appactionruleid?: string;
  componentidunique?: string;
  componentstate?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  overwritetime?: string;
  solutionid?: string;
  versionnumber?: number;
}
