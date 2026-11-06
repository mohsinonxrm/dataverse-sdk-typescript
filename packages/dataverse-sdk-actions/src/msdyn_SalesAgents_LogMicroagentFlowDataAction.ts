import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesAgents_LogMicroagentFlowData action
 */
export interface msdyn_SalesAgents_LogMicroagentFlowDataResponse {
  isSuccess: boolean;
  errorMessage: string;
}

/**
 * Parameters of the msdyn_SalesAgents_LogMicroagentFlowData action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_LogMicroagentFlowDataActionParameters {
  msdyn_salesagentrunid: string;
  msdyn_agenttype: number;
  msdyn_salesagenttype?: number;
  trackingId?: string;
  continueOnError?: boolean;
  data: string;
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
      msdyn_salesagentrunid: this.parameters.msdyn_salesagentrunid,
      msdyn_agenttype: this.parameters.msdyn_agenttype,
      msdyn_salesagenttype: this.parameters.msdyn_salesagenttype,
      trackingId: this.parameters.trackingId,
      continueOnError: this.parameters.continueOnError,
      data: this.parameters.data,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_SalesAgents_LogMicroagentFlowDataResponse;
  }
}
