import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_invokeCustomAgentForCaseProcessingAgent action
 */
export interface msdyn_invokeCustomAgentForCaseProcessingAgentResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_invokeCustomAgentForCaseProcessingAgent action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_invokeCustomAgentForCaseProcessingAgentActionParameters {
  msdyn_caseProcessingAgentDetails: string;
  msdyn_customAgentDetails: string;
}

/**
 * msdyn_invokeCustomAgentForCaseProcessingAgent action
 *
 * Unbound action
 */
export class msdyn_invokeCustomAgentForCaseProcessingAgentAction implements Executable<msdyn_invokeCustomAgentForCaseProcessingAgentResponse> {
  constructor(
    public readonly parameters: msdyn_invokeCustomAgentForCaseProcessingAgentActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_invokeCustomAgentForCaseProcessingAgent`;

    const body = requestBody({
      msdyn_caseProcessingAgentDetails: this.parameters.msdyn_caseProcessingAgentDetails,
      msdyn_customAgentDetails: this.parameters.msdyn_customAgentDetails,
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
  ): Promise<msdyn_invokeCustomAgentForCaseProcessingAgentResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_invokeCustomAgentForCaseProcessingAgentResponse;
    return (await response.json()) as msdyn_invokeCustomAgentForCaseProcessingAgentResponse;
  }
}
