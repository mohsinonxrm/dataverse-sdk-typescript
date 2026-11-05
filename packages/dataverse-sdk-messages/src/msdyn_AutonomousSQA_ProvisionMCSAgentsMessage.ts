import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_AutonomousSQA_ProvisionMCSAgents request message
 *
 * Web API Action: msdyn_AutonomousSQA_ProvisionMCSAgents
 */
export class msdyn_AutonomousSQA_ProvisionMCSAgentsRequest
  extends OrganizationRequest
  implements Executable<msdyn_AutonomousSQA_ProvisionMCSAgentsResponse>
{
  constructor() {
    super("msdyn_AutonomousSQA_ProvisionMCSAgents");
  }

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
    // No return value (204 No Content)
    return new msdyn_AutonomousSQA_ProvisionMCSAgentsResponse();
  }
}

/**
 * msdyn_AutonomousSQA_ProvisionMCSAgents response message
 */
export class msdyn_AutonomousSQA_ProvisionMCSAgentsResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_AutonomousSQA_ProvisionMCSAgents");
  }

  static fromResponse(_data: unknown): msdyn_AutonomousSQA_ProvisionMCSAgentsResponse {
    return new msdyn_AutonomousSQA_ProvisionMCSAgentsResponse();
  }
}
