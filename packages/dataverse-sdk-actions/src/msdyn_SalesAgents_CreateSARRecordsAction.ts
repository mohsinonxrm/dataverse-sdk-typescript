import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_SalesAgents_CreateSARRecords action
 */
export interface msdyn_SalesAgents_CreateSARRecordsResponse {
  value: EntityReference[];
}

/**
 * msdyn_SalesAgents_CreateSARRecords action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_CreateSARRecordsAction implements Executable<msdyn_SalesAgents_CreateSARRecordsResponse> {
  constructor(
    public readonly msdyn_InputPayload: string,
    public readonly msdyn_TrackingId?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_CreateSARRecords`;

    const body: Record<string, unknown> = {
      msdyn_InputPayload: this.msdyn_InputPayload,
      msdyn_TrackingId: this.msdyn_TrackingId,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_CreateSARRecordsResponse> {
    const data = await response.json();
    return data as msdyn_SalesAgents_CreateSARRecordsResponse;
  }
}
