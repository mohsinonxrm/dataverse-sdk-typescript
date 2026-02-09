import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_invokeCaseProcessingAgent request message
 *
 * Web API Action: msdyn_invokeCaseProcessingAgent
 */
export class msdyn_invokeCaseProcessingAgentRequest
  extends OrganizationRequest
  implements Executable<msdyn_invokeCaseProcessingAgentResponse>
{
  constructor(
    public msdyn_incidentId: string,
    public msdyn_actions: string
  ) {
    super("msdyn_invokeCaseProcessingAgent");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_invokeCaseProcessingAgent`;

    const body: Record<string, unknown> = {
      msdyn_incidentId: this.msdyn_incidentId,
      msdyn_actions: this.msdyn_actions,
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

  async parseResponse(response: Response): Promise<msdyn_invokeCaseProcessingAgentResponse> {
    // No return value (204 No Content)
    return new msdyn_invokeCaseProcessingAgentResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_incidentId: this.msdyn_incidentId,
      msdyn_actions: this.msdyn_actions,
    };
  }
}

/**
 * msdyn_invokeCaseProcessingAgent response message
 */
export class msdyn_invokeCaseProcessingAgentResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_invokeCaseProcessingAgent");
  }

  static fromResponse(_data: unknown): msdyn_invokeCaseProcessingAgentResponse {
    return new msdyn_invokeCaseProcessingAgentResponse();
  }
}
