import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecords action
 */
export interface msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecordsResponse {
  msdyn_ProfilerSARs: string;
}

/**
 * Parameters of the msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecords action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecordsActionParameters {
  msdyn_TrackingId?: string;
}

/**
 * msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecords action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecordsAction implements Executable<msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecordsResponse> {
  constructor(
    public readonly parameters: msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecordsActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecords`;

    const body = requestBody({
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecordsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecordsResponse;
    return (await response.json()) as msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecordsResponse;
  }
}
