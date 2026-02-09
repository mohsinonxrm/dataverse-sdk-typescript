import type { ArtifactIdType } from "./ArtifactIdType.js";

/**
 * AppEntityInfo
 */
export interface AppEntityInfo {
  EntityId?: string;
  ChartIds?: string[];
  Forms?: ArtifactIdType[];
  Views?: ArtifactIdType[];
  EntityDashboards?: ArtifactIdType[];
}
