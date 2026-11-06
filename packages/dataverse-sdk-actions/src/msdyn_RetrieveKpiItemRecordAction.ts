import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

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
  constructor(public readonly crmRecord: EntityReference | AnyEntityPayload) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveKpiItemRecord`;

    const body: Record<string, unknown> = {
      CrmRecord: this.crmRecord,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_RetrieveKpiItemRecordResponse> {
    const data = await response.json();
    return data as msdyn_RetrieveKpiItemRecordResponse;
  }
}
