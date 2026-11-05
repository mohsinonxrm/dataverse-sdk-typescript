import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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

  toRequestBody(): Record<string, unknown> {
    return {
      RequestJson: this.requestJson,
    };
  }
}

/**
 * msdyn_SalesAgents_GetAgentStatusAndGenAIConsent response message
 */
export class msdyn_SalesAgents_GetAgentStatusAndGenAIConsentResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_GetAgentStatusAndGenAIConsentResponse) {
    super("msdyn_SalesAgents_GetAgentStatusAndGenAIConsent");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_GetAgentStatusAndGenAIConsentResponse {
    return new msdyn_SalesAgents_GetAgentStatusAndGenAIConsentResponse((data as any).value);
  }
}
