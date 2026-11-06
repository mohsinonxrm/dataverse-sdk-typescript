import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesAgents_GetAgentStatusAndGenAIConsent action
 */
export interface msdyn_SalesAgents_GetAgentStatusAndGenAIConsentResponse {
  ResponseJson: string;
}

/**
 * Parameters of the msdyn_SalesAgents_GetAgentStatusAndGenAIConsent action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_GetAgentStatusAndGenAIConsentActionParameters {
  RequestJson: string;
}

/**
 * msdyn_SalesAgents_GetAgentStatusAndGenAIConsent action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_GetAgentStatusAndGenAIConsentAction implements Executable<msdyn_SalesAgents_GetAgentStatusAndGenAIConsentResponse> {
  constructor(
    public readonly parameters: msdyn_SalesAgents_GetAgentStatusAndGenAIConsentActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_GetAgentStatusAndGenAIConsent`;

    const body = requestBody({
      RequestJson: this.parameters.RequestJson,
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
  ): Promise<msdyn_SalesAgents_GetAgentStatusAndGenAIConsentResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_SalesAgents_GetAgentStatusAndGenAIConsentResponse;
    return (await response.json()) as msdyn_SalesAgents_GetAgentStatusAndGenAIConsentResponse;
  }
}
