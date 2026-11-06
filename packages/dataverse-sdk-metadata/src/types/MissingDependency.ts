import type { MissingPackage } from "./MissingPackage.js";

/**
 * MissingDependency
 */
export interface MissingDependency {
  CanResolveMissingDependency?: boolean;
  DependentComponentDisplayName?: string;
  DependentComponentId?: string;
  DependentComponentParentDisplayName?: string;
  DependentComponentParentSchemaName?: string;
  DependentComponentSchemaName?: string;
  DependentComponentType?: string;
  MissingPackages?: MissingPackage[];
  RequiredComponentDisplayName?: string;
  RequiredComponentId?: string;
  RequiredComponentParentDisplayName?: string;
  RequiredComponentParentSchemaName?: string;
  RequiredComponentSchemaName?: string;
  RequiredComponentType?: string;
  RequiredSolutionName?: string;
}
