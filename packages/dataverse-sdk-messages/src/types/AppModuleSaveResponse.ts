import type { AppElementInfo } from "./AppElementInfo.js";
import type { EntityReference } from "../EntityReference.js";
import type { AnyEntityPayload } from "./EntityPayload.js";

/**
 * AppModuleSaveResponse complex type
 */
export interface AppModuleSaveResponse {
  AppElements?: AppElementInfo[];
  AppModule: EntityReference | AnyEntityPayload;
  UnifiedApp: EntityReference | AnyEntityPayload;
}
