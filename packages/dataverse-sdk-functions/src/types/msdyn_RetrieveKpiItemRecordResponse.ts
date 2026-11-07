import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import type { AnyEntityPayload } from "./EntityPayload.js";

/**
 * msdyn_RetrieveKpiItemRecordResponse complex type
 */
export interface msdyn_RetrieveKpiItemRecordResponse {
  LastModifiedOn?: string;
  KpiItemRecord: EntityReference | AnyEntityPayload;
}
