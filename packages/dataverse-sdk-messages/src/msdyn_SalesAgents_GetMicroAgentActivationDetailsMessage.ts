import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SalesAgents_GetMicroAgentActivationDetailsResponse as msdyn_SalesAgents_GetMicroAgentActivationDetailsResponseData } from "./types/index.js";

/**
 * msdyn_SalesAgents_GetMicroAgentActivationDetails request message
 *
 * Web API Action: msdyn_SalesAgents_GetMicroAgentActivationDetails
 */
export class msdyn_SalesAgents_GetMicroAgentActivationDetailsRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_GetMicroAgentActivationDetailsResponse>
{
  constructor(public requestJson: string) {
    super("msdyn_SalesAgents_GetMicroAgentActivationDetails");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_GetMicroAgentActivationDetails`;

    const body: Record<string, unknown> = {
      RequestJson: this.requestJson,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesAgents_GetMicroAgentActivationDetailsResponse> {
    const data = await response.json();
    return msdyn_SalesAgents_GetMicroAgentActivationDetailsResponse.fromResponse(data);
  }
}

/**
 * msdyn_SalesAgents_GetMicroAgentActivationDetails response message
 */
export class msdyn_SalesAgents_GetMicroAgentActivationDetailsResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_GetMicroAgentActivationDetailsResponseData) {
    super("msdyn_SalesAgents_GetMicroAgentActivationDetails");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_GetMicroAgentActivationDetailsResponse {
    return new msdyn_SalesAgents_GetMicroAgentActivationDetailsResponse(
      responseObject<msdyn_SalesAgents_GetMicroAgentActivationDetailsResponseData>(data)
    );
  }
}
