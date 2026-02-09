import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SalesAgents_ActivateSalesAgentProfile request message
 *
 * Web API Action: msdyn_SalesAgents_ActivateSalesAgentProfile
 */
export class msdyn_SalesAgents_ActivateSalesAgentProfileRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_ActivateSalesAgentProfileResponse>
{
  constructor(public requestJson: string) {
    super("msdyn_SalesAgents_ActivateSalesAgentProfile");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ActivateSalesAgentProfile`;

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
  ): Promise<msdyn_SalesAgents_ActivateSalesAgentProfileResponse> {
    const data = await response.json();
    return msdyn_SalesAgents_ActivateSalesAgentProfileResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      RequestJson: this.requestJson,
    };
  }
}

/**
 * msdyn_SalesAgents_ActivateSalesAgentProfile response message
 */
export class msdyn_SalesAgents_ActivateSalesAgentProfileResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_ActivateSalesAgentProfileResponse) {
    super("msdyn_SalesAgents_ActivateSalesAgentProfile");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_ActivateSalesAgentProfileResponse {
    return new msdyn_SalesAgents_ActivateSalesAgentProfileResponse((data as any).value);
  }
}
