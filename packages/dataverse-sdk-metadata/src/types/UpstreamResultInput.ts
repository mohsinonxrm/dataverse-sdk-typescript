import type { ResultCode } from "./ResultCode.js";
import type { UpstreamEntityInputVersionInfo } from "./UpstreamEntityInputVersionInfo.js";
import type { UpstreamIncrementalEntityInfo } from "./UpstreamIncrementalEntityInfo.js";

/**
 * UpstreamResultInput
 */
export interface UpstreamResultInput {
  VersionedEntityReferences?: UpstreamEntityInputVersionInfo[];
  ResultCode?: ResultCode;
  IncrementalEntityInfos?: UpstreamIncrementalEntityInfo[];
}
