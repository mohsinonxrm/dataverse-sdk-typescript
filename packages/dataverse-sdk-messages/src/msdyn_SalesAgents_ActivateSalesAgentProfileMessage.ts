import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SalesAgents_ActivateSalesAgentProfileResponse as msdyn_SalesAgents_ActivateSalesAgentProfileResponseData } from "./types/index.js";

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
        "content-type": "application/json",
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
}

/**
 * msdyn_SalesAgents_ActivateSalesAgentProfile response message
 */
export class msdyn_SalesAgents_ActivateSalesAgentProfileResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_ActivateSalesAgentProfileResponseData) {
    super("msdyn_SalesAgents_ActivateSalesAgentProfile");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_ActivateSalesAgentProfileResponse {
    return new msdyn_SalesAgents_ActivateSalesAgentProfileResponse(
      responseObject<msdyn_SalesAgents_ActivateSalesAgentProfileResponseData>(data)
    );
  }
}
