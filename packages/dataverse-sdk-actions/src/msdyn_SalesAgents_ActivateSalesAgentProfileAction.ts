import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesAgents_ActivateSalesAgentProfile action
 */
export interface msdyn_SalesAgents_ActivateSalesAgentProfileResponse {
  ResponseJson: string;
}

/**
 * Parameters of the msdyn_SalesAgents_ActivateSalesAgentProfile action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_ActivateSalesAgentProfileActionParameters {
  RequestJson: string;
}

/**
 * msdyn_SalesAgents_ActivateSalesAgentProfile action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_ActivateSalesAgentProfileAction implements Executable<msdyn_SalesAgents_ActivateSalesAgentProfileResponse> {
  constructor(
    public readonly parameters: msdyn_SalesAgents_ActivateSalesAgentProfileActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ActivateSalesAgentProfile`;

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
  ): Promise<msdyn_SalesAgents_ActivateSalesAgentProfileResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_SalesAgents_ActivateSalesAgentProfileResponse;
    return (await response.json()) as msdyn_SalesAgents_ActivateSalesAgentProfileResponse;
  }
}
