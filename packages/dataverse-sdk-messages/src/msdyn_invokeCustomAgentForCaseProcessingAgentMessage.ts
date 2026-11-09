import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_invokeCustomAgentForCaseProcessingAgent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_invokeCustomAgentForCaseProcessingAgentRequestParameters {
  msdyn_customAgentDetails: string;
  msdyn_caseProcessingAgentDetails: string;
  RunId?: string;
}

/**
 * msdyn_invokeCustomAgentForCaseProcessingAgent request message
 *
 * Web API Action: msdyn_invokeCustomAgentForCaseProcessingAgent
 */
export class msdyn_invokeCustomAgentForCaseProcessingAgentRequest
  extends OrganizationRequest
  implements Executable<msdyn_invokeCustomAgentForCaseProcessingAgentResponse>
{
  declare readonly Parameters: Readonly<msdyn_invokeCustomAgentForCaseProcessingAgentRequestParameters>;

  constructor(parameters: msdyn_invokeCustomAgentForCaseProcessingAgentRequestParameters) {
    super("msdyn_invokeCustomAgentForCaseProcessingAgent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_invokeCustomAgentForCaseProcessingAgent`;

    const body = requestBody({
      msdyn_customAgentDetails: this.Parameters.msdyn_customAgentDetails,
      msdyn_caseProcessingAgentDetails: this.Parameters.msdyn_caseProcessingAgentDetails,
      RunId: this.Parameters.RunId,
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

  parseResponse(
    _response: Response
  ): Promise<msdyn_invokeCustomAgentForCaseProcessingAgentResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_invokeCustomAgentForCaseProcessingAgentResponse());
  }
}

/**
 * msdyn_invokeCustomAgentForCaseProcessingAgent response message
 */
export class msdyn_invokeCustomAgentForCaseProcessingAgentResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_invokeCustomAgentForCaseProcessingAgent");
  }

  static fromResponse(_data?: unknown): msdyn_invokeCustomAgentForCaseProcessingAgentResponse {
    return new msdyn_invokeCustomAgentForCaseProcessingAgentResponse();
  }
}
