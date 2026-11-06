import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesAgents_GetAgentStatusAndGenAIConsentResponse as msdyn_SalesAgents_GetAgentStatusAndGenAIConsentResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesAgents_GetAgentStatusAndGenAIConsent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_GetAgentStatusAndGenAIConsentRequestParameters {
  RequestJson: string;
}

/**
 * msdyn_SalesAgents_GetAgentStatusAndGenAIConsent request message
 *
 * Web API Action: msdyn_SalesAgents_GetAgentStatusAndGenAIConsent
 */
export class msdyn_SalesAgents_GetAgentStatusAndGenAIConsentRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_GetAgentStatusAndGenAIConsentResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_GetAgentStatusAndGenAIConsentRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_GetAgentStatusAndGenAIConsentRequestParameters) {
    super("msdyn_SalesAgents_GetAgentStatusAndGenAIConsent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_GetAgentStatusAndGenAIConsent`;

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

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesAgents_GetAgentStatusAndGenAIConsentResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_SalesAgents_GetAgentStatusAndGenAIConsentResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_SalesAgents_GetAgentStatusAndGenAIConsent response message
 */
export class msdyn_SalesAgents_GetAgentStatusAndGenAIConsentResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_GetAgentStatusAndGenAIConsentResponseData) {
    super("msdyn_SalesAgents_GetAgentStatusAndGenAIConsent");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_GetAgentStatusAndGenAIConsentResponse {
    return new msdyn_SalesAgents_GetAgentStatusAndGenAIConsentResponse(
      responseObject<msdyn_SalesAgents_GetAgentStatusAndGenAIConsentResponseData>(data)
    );
  }
}
