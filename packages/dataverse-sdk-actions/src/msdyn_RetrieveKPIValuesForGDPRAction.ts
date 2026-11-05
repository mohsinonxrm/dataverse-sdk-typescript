import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_RetrieveKPIValuesForGDPR action
 */
export interface msdyn_RetrieveKPIValuesForGDPRResponse {
  Response: string;
}

/**
 * msdyn_RetrieveKPIValuesForGDPR action
 *
 * Unbound action
 */
export class msdyn_RetrieveKPIValuesForGDPRAction implements Executable<msdyn_RetrieveKPIValuesForGDPRResponse> {
  constructor(public readonly cRMRecord: EntityReference) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveKPIValuesForGDPR`;

    const body: Record<string, unknown> = {
      CRMRecord: this.cRMRecord,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveKPIValuesForGDPRResponse> {
    const data = await response.json();
    return data as msdyn_RetrieveKPIValuesForGDPRResponse;
  }
}
