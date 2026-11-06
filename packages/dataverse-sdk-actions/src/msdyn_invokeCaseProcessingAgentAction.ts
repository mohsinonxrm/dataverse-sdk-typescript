import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_invokeCaseProcessingAgent action
 */
export interface msdyn_invokeCaseProcessingAgentResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_invokeCaseProcessingAgent action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_invokeCaseProcessingAgentActionParameters {
  msdyn_actions: string;
  msdyn_targetEntityContext?: string;
  msdyn_extraParams?: string;
  msdyn_incidentId: string;
}

/**
 * msdyn_invokeCaseProcessingAgent action
 *
 * Unbound action
 */
export class msdyn_invokeCaseProcessingAgentAction implements Executable<msdyn_invokeCaseProcessingAgentResponse> {
  constructor(public readonly parameters: msdyn_invokeCaseProcessingAgentActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_invokeCaseProcessingAgent`;

    const body = requestBody({
      msdyn_actions: this.parameters.msdyn_actions,
      msdyn_targetEntityContext: this.parameters.msdyn_targetEntityContext,
      msdyn_extraParams: this.parameters.msdyn_extraParams,
      msdyn_incidentId: this.parameters.msdyn_incidentId,
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

  async parseResponse(response: Response): Promise<msdyn_invokeCaseProcessingAgentResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_invokeCaseProcessingAgentResponse;
    return (await response.json()) as msdyn_invokeCaseProcessingAgentResponse;
  }
}
