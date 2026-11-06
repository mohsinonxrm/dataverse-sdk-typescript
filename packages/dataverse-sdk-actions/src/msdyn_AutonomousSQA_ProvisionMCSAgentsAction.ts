import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_AutonomousSQA_ProvisionMCSAgents action
 */
export interface msdyn_AutonomousSQA_ProvisionMCSAgentsResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_AutonomousSQA_ProvisionMCSAgents action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AutonomousSQA_ProvisionMCSAgentsActionParameters {
  RequestJson?: string;
}

/**
 * msdyn_AutonomousSQA_ProvisionMCSAgents action
 *
 * Unbound action
 */
export class msdyn_AutonomousSQA_ProvisionMCSAgentsAction implements Executable<msdyn_AutonomousSQA_ProvisionMCSAgentsResponse> {
  constructor(
    public readonly parameters: msdyn_AutonomousSQA_ProvisionMCSAgentsActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AutonomousSQA_ProvisionMCSAgents`;

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

  async parseResponse(response: Response): Promise<msdyn_AutonomousSQA_ProvisionMCSAgentsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_AutonomousSQA_ProvisionMCSAgentsResponse;
    return (await response.json()) as msdyn_AutonomousSQA_ProvisionMCSAgentsResponse;
  }
}
