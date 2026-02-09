import type { MissingPackage } from "./MissingPackage.js";

/**
 * MissingDependency complex type
 */
export interface MissingDependency {
  RequiredComponentSchemaName: string;
  RequiredComponentDisplayName: string;
  RequiredComponentParentSchemaName: string;
  RequiredComponentParentDisplayName: string;
  RequiredComponentId: string;
  RequiredSolutionName: string;
  RequiredComponentType: string;
  DependentComponentSchemaName: string;
  DependentComponentDisplayName: string;
  DependentComponentParentSchemaName: string;
  DependentComponentParentDisplayName: string;
  DependentComponentType: string;
  DependentComponentId: string;
  MissingPackages: MissingPackage[];
  CanResolveMissingDependency: boolean;
}
