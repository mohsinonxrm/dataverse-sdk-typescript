import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesAgents_ActivateMicroAgentConfiguration action
 */
export interface msdyn_SalesAgents_ActivateMicroAgentConfigurationResponse {
  ResponseJson: string;
}

/**
 * msdyn_SalesAgents_ActivateMicroAgentConfiguration action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_ActivateMicroAgentConfigurationAction implements Executable<msdyn_SalesAgents_ActivateMicroAgentConfigurationResponse> {
  constructor(public readonly requestJson: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ActivateMicroAgentConfiguration`;

    const body: Record<string, unknown> = {
      RequestJson: this.requestJson,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesAgents_ActivateMicroAgentConfigurationResponse> {
    const data = await response.json();
    return data as msdyn_SalesAgents_ActivateMicroAgentConfigurationResponse;
  }
}
