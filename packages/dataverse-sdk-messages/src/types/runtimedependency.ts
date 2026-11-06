import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * runtimedependency entity type
 */
export interface runtimedependency {
  createdtime?: string;
  dependencyid?: string;
  dependentcomponentnodeid?: string;
  dependentcomponenttype?: number;
  ispublished?: BooleanManagedProperty;
  requiredcomponentmodifiedtime?: string;
  requiredcomponentnodeid?: string;
  requiredcomponenttype?: number;
}
