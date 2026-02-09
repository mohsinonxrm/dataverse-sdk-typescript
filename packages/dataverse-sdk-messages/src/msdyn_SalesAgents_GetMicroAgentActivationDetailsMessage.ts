import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
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

  toRequestBody(): Record<string, unknown> {
    return {
      RequestJson: this.requestJson,
    };
  }
}

/**
 * msdyn_SalesAgents_GetMicroAgentActivationDetails response message
 */
export class msdyn_SalesAgents_GetMicroAgentActivationDetailsResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_GetMicroAgentActivationDetailsResponse) {
    super("msdyn_SalesAgents_GetMicroAgentActivationDetails");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_GetMicroAgentActivationDetailsResponse {
    return new msdyn_SalesAgents_GetMicroAgentActivationDetailsResponse((data as any).value);
  }
}
