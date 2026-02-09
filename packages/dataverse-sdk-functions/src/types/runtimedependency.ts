import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * runtimedependency entity type
 */
export interface runtimedependency {
  requiredcomponenttype: number;
  dependentcomponenttype: number;
  requiredcomponentnodeid: string;
  dependentcomponentnodeid: string;
  requiredcomponentmodifiedtime: string;
  ispublished: BooleanManagedProperty;
  createdtime: string;
  dependencyid: string;
}
