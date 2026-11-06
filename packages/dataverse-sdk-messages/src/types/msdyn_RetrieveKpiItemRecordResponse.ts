import type { EntityReference } from "../EntityReference.js";
import type { AnyEntityPayload } from "./EntityPayload.js";

/**
 * msdyn_RetrieveKpiItemRecordResponse complex type
 */
export interface msdyn_RetrieveKpiItemRecordResponse {
  LastModifiedOn?: string;
  KpiItemRecord: EntityReference | AnyEntityPayload;
}
