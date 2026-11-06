import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_AutonomousSQA_ProvisionMCSAgents message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AutonomousSQA_ProvisionMCSAgentsRequestParameters {
  RequestJson?: string;
}

/**
 * msdyn_AutonomousSQA_ProvisionMCSAgents request message
 *
 * Web API Action: msdyn_AutonomousSQA_ProvisionMCSAgents
 */
export class msdyn_AutonomousSQA_ProvisionMCSAgentsRequest
  extends OrganizationRequest
  implements Executable<msdyn_AutonomousSQA_ProvisionMCSAgentsResponse>
{
  declare readonly Parameters: Readonly<msdyn_AutonomousSQA_ProvisionMCSAgentsRequestParameters>;

  constructor(parameters: msdyn_AutonomousSQA_ProvisionMCSAgentsRequestParameters = {}) {
    super("msdyn_AutonomousSQA_ProvisionMCSAgents", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AutonomousSQA_ProvisionMCSAgents`;

    const body = requestBody({
      RequestJson: this.Parameters.RequestJson,
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
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_AutonomousSQA_ProvisionMCSAgentsResponse());
  }
}

/**
 * msdyn_AutonomousSQA_ProvisionMCSAgents response message
 */
export class msdyn_AutonomousSQA_ProvisionMCSAgentsResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_AutonomousSQA_ProvisionMCSAgents");
  }

  static fromResponse(_data?: unknown): msdyn_AutonomousSQA_ProvisionMCSAgentsResponse {
    return new msdyn_AutonomousSQA_ProvisionMCSAgentsResponse();
  }
}
