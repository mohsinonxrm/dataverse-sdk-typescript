import type { ArtifactIdType } from "./ArtifactIdType.js";

/**
 * AppEntityInfo
 */
export interface AppEntityInfo {
  ChartIds?: string[];
  EntityDashboards?: ArtifactIdType[];
  EntityId?: string;
  Forms?: ArtifactIdType[];
  Views?: ArtifactIdType[];
}
