import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SalesAgents_GetAgentStatusAndGenAIConsentResponse as msdyn_SalesAgents_GetAgentStatusAndGenAIConsentResponseData } from "./types/index.js";

/**
 * msdyn_SalesAgents_GetAgentStatusAndGenAIConsent request message
 *
 * Web API Action: msdyn_SalesAgents_GetAgentStatusAndGenAIConsent
 */
export class msdyn_SalesAgents_GetAgentStatusAndGenAIConsentRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_GetAgentStatusAndGenAIConsentResponse>
{
  constructor(public requestJson: string) {
    super("msdyn_SalesAgents_GetAgentStatusAndGenAIConsent");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_GetAgentStatusAndGenAIConsent`;

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
  ): Promise<msdyn_SalesAgents_GetAgentStatusAndGenAIConsentResponse> {
    const data = await response.json();
    return msdyn_SalesAgents_GetAgentStatusAndGenAIConsentResponse.fromResponse(data);
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
