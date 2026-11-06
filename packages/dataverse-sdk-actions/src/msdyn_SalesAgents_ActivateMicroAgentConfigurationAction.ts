import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesAgents_ActivateMicroAgentConfiguration action
 */
export interface msdyn_SalesAgents_ActivateMicroAgentConfigurationResponse {
  ResponseJson: string;
}

/**
 * Parameters of the msdyn_SalesAgents_ActivateMicroAgentConfiguration action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_ActivateMicroAgentConfigurationActionParameters {
  RequestJson: string;
}

/**
 * msdyn_SalesAgents_ActivateMicroAgentConfiguration action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_ActivateMicroAgentConfigurationAction implements Executable<msdyn_SalesAgents_ActivateMicroAgentConfigurationResponse> {
  constructor(
    public readonly parameters: msdyn_SalesAgents_ActivateMicroAgentConfigurationActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ActivateMicroAgentConfiguration`;

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
  ): Promise<msdyn_SalesAgents_ActivateMicroAgentConfigurationResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (
      text ? JSON.parse(text) : {}
    ) as msdyn_SalesAgents_ActivateMicroAgentConfigurationResponse;
  }
}
