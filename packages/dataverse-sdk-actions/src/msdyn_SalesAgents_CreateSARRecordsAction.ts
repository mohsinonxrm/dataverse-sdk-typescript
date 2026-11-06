import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesAgents_CreateSARRecords action
 */
export interface msdyn_SalesAgents_CreateSARRecordsResponse {
  value: EntityReference[];
}

/**
 * Parameters of the msdyn_SalesAgents_CreateSARRecords action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_CreateSARRecordsActionParameters {
  msdyn_InputPayload: string;
  msdyn_TrackingId?: string;
}

/**
 * msdyn_SalesAgents_CreateSARRecords action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_CreateSARRecordsAction implements Executable<msdyn_SalesAgents_CreateSARRecordsResponse> {
  constructor(public readonly parameters: msdyn_SalesAgents_CreateSARRecordsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_CreateSARRecords`;

    const body = requestBody({
      msdyn_InputPayload: this.parameters.msdyn_InputPayload,
      msdyn_TrackingId: this.parameters.msdyn_TrackingId,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_CreateSARRecordsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_SalesAgents_CreateSARRecordsResponse;
    return (await response.json()) as msdyn_SalesAgents_CreateSARRecordsResponse;
  }
}
