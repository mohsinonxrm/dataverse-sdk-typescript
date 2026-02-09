import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * appaction_appactionrule_classicrules entity type
 */
export interface appaction_appactionrule_classicrules {
  appactionruleid: string;
  componentidunique: string;
  solutionid: string;
  overwritetime: string;
  appaction_appactionrule_classicrulesid: string;
  componentstate: number;
  versionnumber: number;
  appactionid: string;
  iscustomizable: BooleanManagedProperty;
  ismanaged: boolean;
}
