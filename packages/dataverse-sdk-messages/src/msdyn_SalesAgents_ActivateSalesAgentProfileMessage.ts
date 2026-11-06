import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesAgents_ActivateSalesAgentProfileResponse as msdyn_SalesAgents_ActivateSalesAgentProfileResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesAgents_ActivateSalesAgentProfile message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_ActivateSalesAgentProfileRequestParameters {
  RequestJson: string;
}

/**
 * msdyn_SalesAgents_ActivateSalesAgentProfile request message
 *
 * Web API Action: msdyn_SalesAgents_ActivateSalesAgentProfile
 */
export class msdyn_SalesAgents_ActivateSalesAgentProfileRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_ActivateSalesAgentProfileResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_ActivateSalesAgentProfileRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_ActivateSalesAgentProfileRequestParameters) {
    super("msdyn_SalesAgents_ActivateSalesAgentProfile", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ActivateSalesAgentProfile`;

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
  ): Promise<msdyn_SalesAgents_ActivateSalesAgentProfileResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_SalesAgents_ActivateSalesAgentProfileResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
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
