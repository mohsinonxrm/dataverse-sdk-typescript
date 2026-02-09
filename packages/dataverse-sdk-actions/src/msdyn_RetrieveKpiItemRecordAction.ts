import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_RetrieveKpiItemRecord action
 */
export interface msdyn_RetrieveKpiItemRecordResponse {
  LastModifiedOn: string;
}

/**
 * msdyn_RetrieveKpiItemRecord action
 *
 * Unbound action
 */
export class msdyn_RetrieveKpiItemRecordAction implements Executable<msdyn_RetrieveKpiItemRecordResponse> {
  constructor(public readonly crmRecord: EntityReference) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveKpiItemRecord`;

    const body: Record<string, unknown> = {
      CrmRecord: this.crmRecord,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_RetrieveKpiItemRecordResponse> {
    const data = await response.json();
    return data as msdyn_RetrieveKpiItemRecordResponse;
  }
}
