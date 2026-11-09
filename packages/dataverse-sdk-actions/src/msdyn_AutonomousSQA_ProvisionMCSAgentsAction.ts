import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_AutonomousSQA_ProvisionMCSAgents action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_AutonomousSQA_ProvisionMCSAgentsResponse = void;

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

  parseResponse(_response: Response): Promise<msdyn_AutonomousSQA_ProvisionMCSAgentsResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
