import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesAgents_GetMicroAgentsConfiguration action
 */
export interface msdyn_SalesAgents_GetMicroAgentsConfigurationResponse {
  ResponseJson: string;
}

/**
 * msdyn_SalesAgents_GetMicroAgentsConfiguration action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_GetMicroAgentsConfigurationAction implements Executable<msdyn_SalesAgents_GetMicroAgentsConfigurationResponse> {
  constructor(public readonly requestJson: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_GetMicroAgentsConfiguration`;

    const body: Record<string, unknown> = {
      RequestJson: this.requestJson,
    };

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
  ): Promise<msdyn_SalesAgents_GetMicroAgentsConfigurationResponse> {
    const data = await response.json();
    return data as msdyn_SalesAgents_GetMicroAgentsConfigurationResponse;
  }
}
