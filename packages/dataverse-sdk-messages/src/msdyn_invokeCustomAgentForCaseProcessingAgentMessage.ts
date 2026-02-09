import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_invokeCustomAgentForCaseProcessingAgent request message
 *
 * Web API Action: msdyn_invokeCustomAgentForCaseProcessingAgent
 */
export class msdyn_invokeCustomAgentForCaseProcessingAgentRequest
  extends OrganizationRequest
  implements Executable<msdyn_invokeCustomAgentForCaseProcessingAgentResponse>
{
  constructor(
    public msdyn_caseProcessingAgentDetails: string,
    public msdyn_customAgentDetails: string
  ) {
    super("msdyn_invokeCustomAgentForCaseProcessingAgent");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_invokeCustomAgentForCaseProcessingAgent`;

    const body: Record<string, unknown> = {
      msdyn_caseProcessingAgentDetails: this.msdyn_caseProcessingAgentDetails,
      msdyn_customAgentDetails: this.msdyn_customAgentDetails,
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
  ): Promise<msdyn_invokeCustomAgentForCaseProcessingAgentResponse> {
    // No return value (204 No Content)
    return new msdyn_invokeCustomAgentForCaseProcessingAgentResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_caseProcessingAgentDetails: this.msdyn_caseProcessingAgentDetails,
      msdyn_customAgentDetails: this.msdyn_customAgentDetails,
    };
  }
}

/**
 * msdyn_invokeCustomAgentForCaseProcessingAgent response message
 */
export class msdyn_invokeCustomAgentForCaseProcessingAgentResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_invokeCustomAgentForCaseProcessingAgent");
  }

  static fromResponse(_data: unknown): msdyn_invokeCustomAgentForCaseProcessingAgentResponse {
    return new msdyn_invokeCustomAgentForCaseProcessingAgentResponse();
  }
}
