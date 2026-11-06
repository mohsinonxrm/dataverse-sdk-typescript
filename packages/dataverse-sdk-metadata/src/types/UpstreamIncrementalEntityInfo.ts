import type { UpstreamIncrementalEntityTimestampInfo } from "./UpstreamIncrementalEntityTimestampInfo.js";
import type { UpstreamIncrementalEntityVersionInfo } from "./UpstreamIncrementalEntityVersionInfo.js";

/**
 * UpstreamIncrementalEntityInfo
 */
export interface UpstreamIncrementalEntityInfo {
  DatasourceName?: string;
  EntityName?: string;
  TimestampInfo?: UpstreamIncrementalEntityTimestampInfo;
  VersionInfo?: UpstreamIncrementalEntityVersionInfo;
}
