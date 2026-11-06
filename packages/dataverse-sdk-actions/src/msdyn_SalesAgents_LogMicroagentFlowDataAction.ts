import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SalesAgents_LogMicroagentFlowData action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_LogMicroagentFlowDataResponse {
  "@odata.context"?: string;
  errorMessage: string;
  isSuccess: boolean;
}

/**
 * Parameters of the msdyn_SalesAgents_LogMicroagentFlowData action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_LogMicroagentFlowDataActionParameters {
  msdyn_agenttype: number;
  msdyn_salesagenttype?: number;
  msdyn_salesagentrunid: string;
  continueOnError?: boolean;
  data: string;
  trackingId?: string;
}

/**
 * msdyn_SalesAgents_LogMicroagentFlowData action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_LogMicroagentFlowDataAction implements Executable<msdyn_SalesAgents_LogMicroagentFlowDataResponse> {
  constructor(
    public readonly parameters: msdyn_SalesAgents_LogMicroagentFlowDataActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_LogMicroagentFlowData`;

    const body = requestBody({
      msdyn_agenttype: this.parameters.msdyn_agenttype,
      msdyn_salesagenttype: this.parameters.msdyn_salesagenttype,
      msdyn_salesagentrunid: this.parameters.msdyn_salesagentrunid,
      continueOnError: this.parameters.continueOnError,
      data: this.parameters.data,
      trackingId: this.parameters.trackingId,
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
  ): Promise<msdyn_SalesAgents_LogMicroagentFlowDataResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SalesAgents_LogMicroagentFlowDataResponse;
  }
}
