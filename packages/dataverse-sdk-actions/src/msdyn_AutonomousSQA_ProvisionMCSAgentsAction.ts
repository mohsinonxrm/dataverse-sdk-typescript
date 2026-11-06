import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_AutonomousSQA_ProvisionMCSAgents action
 */
export interface msdyn_AutonomousSQA_ProvisionMCSAgentsResponse {
  // No content returned
}

/**
 * msdyn_AutonomousSQA_ProvisionMCSAgents action
 *
 * Unbound action
 */
export class msdyn_AutonomousSQA_ProvisionMCSAgentsAction implements Executable<msdyn_AutonomousSQA_ProvisionMCSAgentsResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AutonomousSQA_ProvisionMCSAgents`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_AutonomousSQA_ProvisionMCSAgentsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_AutonomousSQA_ProvisionMCSAgentsResponse;
    return (await response.json()) as msdyn_AutonomousSQA_ProvisionMCSAgentsResponse;
  }
}
