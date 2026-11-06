import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SalesAgents_ProcessSalesProfilerAgentResponse action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_ProcessSalesProfilerAgentResponseResponse {
  "@odata.context"?: string;
  msdyn_IsSuccess: boolean;
}

/**
 * Parameters of the msdyn_SalesAgents_ProcessSalesProfilerAgentResponse action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_ProcessSalesProfilerAgentResponseActionParameters {
  msdyn_CompanyWebsite?: string;
  msdyn_SalesAgentRun: string;
  msdyn_CompanyName?: string;
  msdyn_SalesAgentRunId?: string;
}

/**
 * msdyn_SalesAgents_ProcessSalesProfilerAgentResponse action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_ProcessSalesProfilerAgentResponseAction implements Executable<msdyn_SalesAgents_ProcessSalesProfilerAgentResponseResponse> {
  constructor(
    public readonly parameters: msdyn_SalesAgents_ProcessSalesProfilerAgentResponseActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ProcessSalesProfilerAgentResponse`;

    const body = requestBody({
      msdyn_CompanyWebsite: this.parameters.msdyn_CompanyWebsite,
      msdyn_SalesAgentRun: this.parameters.msdyn_SalesAgentRun,
      msdyn_CompanyName: this.parameters.msdyn_CompanyName,
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
  ): Promise<msdyn_SalesAgents_ProcessSalesProfilerAgentResponseResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SalesAgents_ProcessSalesProfilerAgentResponseResponse;
  }
}
