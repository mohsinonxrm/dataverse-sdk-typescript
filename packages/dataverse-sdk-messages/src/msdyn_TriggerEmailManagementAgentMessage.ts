import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_TriggerEmailManagementAgent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TriggerEmailManagementAgentRequestParameters {
  emailId: string;
  additionalParams?: string;
}

/**
 * msdyn_TriggerEmailManagementAgent request message
 *
 * Web API Action: msdyn_TriggerEmailManagementAgent
 */
export class msdyn_TriggerEmailManagementAgentRequest
  extends OrganizationRequest
  implements Executable<msdyn_TriggerEmailManagementAgentResponse>
{
  declare readonly Parameters: Readonly<msdyn_TriggerEmailManagementAgentRequestParameters>;

  constructor(parameters: msdyn_TriggerEmailManagementAgentRequestParameters) {
    super("msdyn_TriggerEmailManagementAgent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TriggerEmailManagementAgent`;

    const body = requestBody({
      emailId: this.Parameters.emailId,
      additionalParams: this.Parameters.additionalParams,
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

  async parseResponse(response: Response): Promise<msdyn_TriggerEmailManagementAgentResponse> {
    // No return value (204 No Content)
    return new msdyn_TriggerEmailManagementAgentResponse();
  }
}

/**
 * msdyn_TriggerEmailManagementAgent response message
 */
export class msdyn_TriggerEmailManagementAgentResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_TriggerEmailManagementAgent");
  }

  static fromResponse(_data: unknown): msdyn_TriggerEmailManagementAgentResponse {
    return new msdyn_TriggerEmailManagementAgentResponse();
  }
}
