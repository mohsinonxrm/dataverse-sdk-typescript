import type { ArtifactIdType } from "./ArtifactIdType.js";

/**
 * AppEntityInfo complex type
 */
export interface AppEntityInfo {
  ChartIds?: string[];
  EntityDashboards?: ArtifactIdType[];
  EntityId?: string;
  Forms?: ArtifactIdType[];
  Views?: ArtifactIdType[];
}
