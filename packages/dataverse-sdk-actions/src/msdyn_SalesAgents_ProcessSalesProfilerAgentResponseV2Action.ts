import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesAgents_ProcessSalesProfilerAgentResponseV2 action
 */
export interface msdyn_SalesAgents_ProcessSalesProfilerAgentResponseV2Response {
  msdyn_IsSuccess: boolean;
}

/**
 * Parameters of the msdyn_SalesAgents_ProcessSalesProfilerAgentResponseV2 action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_ProcessSalesProfilerAgentResponseV2ActionParameters {
  msdyn_SalesAgentRun: string;
  msdyn_CompanyName?: string;
  msdyn_CompanyWebsite?: string;
  msdyn_SalesAgentRunId?: string;
}

/**
 * msdyn_SalesAgents_ProcessSalesProfilerAgentResponseV2 action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_ProcessSalesProfilerAgentResponseV2Action implements Executable<msdyn_SalesAgents_ProcessSalesProfilerAgentResponseV2Response> {
  constructor(
    public readonly parameters: msdyn_SalesAgents_ProcessSalesProfilerAgentResponseV2ActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ProcessSalesProfilerAgentResponseV2`;

    const body = requestBody({
      msdyn_SalesAgentRun: this.parameters.msdyn_SalesAgentRun,
      msdyn_CompanyName: this.parameters.msdyn_CompanyName,
      msdyn_CompanyWebsite: this.parameters.msdyn_CompanyWebsite,
      msdyn_SalesAgentRunId: this.parameters.msdyn_SalesAgentRunId,
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
  ): Promise<msdyn_SalesAgents_ProcessSalesProfilerAgentResponseV2Response> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_SalesAgents_ProcessSalesProfilerAgentResponseV2Response;
    return (await response.json()) as msdyn_SalesAgents_ProcessSalesProfilerAgentResponseV2Response;
  }
}
