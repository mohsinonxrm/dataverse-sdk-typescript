import type { AppElementInfo } from "./AppElementInfo.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import type { AnyEntityPayload } from "./EntityPayload.js";

/**
 * AppModuleSaveResponse complex type
 */
export interface AppModuleSaveResponse {
  AppElements?: AppElementInfo[];
  AppModule: EntityReference | AnyEntityPayload;
  UnifiedApp: EntityReference | AnyEntityPayload;
}
