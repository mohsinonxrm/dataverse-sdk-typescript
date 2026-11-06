import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_invokeCaseProcessingAgent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_invokeCaseProcessingAgentRequestParameters {
  msdyn_actions: string;
  msdyn_targetEntityContext?: string;
  msdyn_extraParams?: string;
  msdyn_incidentId: string;
}

/**
 * msdyn_invokeCaseProcessingAgent request message
 *
 * Web API Action: msdyn_invokeCaseProcessingAgent
 */
export class msdyn_invokeCaseProcessingAgentRequest
  extends OrganizationRequest
  implements Executable<msdyn_invokeCaseProcessingAgentResponse>
{
  declare readonly Parameters: Readonly<msdyn_invokeCaseProcessingAgentRequestParameters>;

  constructor(parameters: msdyn_invokeCaseProcessingAgentRequestParameters) {
    super("msdyn_invokeCaseProcessingAgent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_invokeCaseProcessingAgent`;

    const body = requestBody({
      msdyn_actions: this.Parameters.msdyn_actions,
      msdyn_targetEntityContext: this.Parameters.msdyn_targetEntityContext,
      msdyn_extraParams: this.Parameters.msdyn_extraParams,
      msdyn_incidentId: this.Parameters.msdyn_incidentId,
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

  async parseResponse(response: Response): Promise<msdyn_invokeCaseProcessingAgentResponse> {
    // No return value (204 No Content)
    return new msdyn_invokeCaseProcessingAgentResponse();
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
