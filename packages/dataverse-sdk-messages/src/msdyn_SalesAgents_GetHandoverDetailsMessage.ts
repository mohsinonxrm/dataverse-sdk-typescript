import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesAgents_GetHandoverDetailsResponse as msdyn_SalesAgents_GetHandoverDetailsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesAgents_GetHandoverDetails message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_GetHandoverDetailsRequestParameters {
  msdyn_SalesAgentRun: string;
  msdyn_TrackingId?: string;
}

/**
 * msdyn_SalesAgents_GetHandoverDetails request message
 *
 * Web API Action: msdyn_SalesAgents_GetHandoverDetails
 */
export class msdyn_SalesAgents_GetHandoverDetailsRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_GetHandoverDetailsResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_GetHandoverDetailsRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_GetHandoverDetailsRequestParameters) {
    super("msdyn_SalesAgents_GetHandoverDetails", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_GetHandoverDetails`;

    const body = requestBody({
      msdyn_SalesAgentRun: this.Parameters.msdyn_SalesAgentRun,
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_GetHandoverDetailsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesAgents_GetHandoverDetailsResponse.fromResponse({});
    return msdyn_SalesAgents_GetHandoverDetailsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_SalesAgents_GetHandoverDetails response message
 */
export class msdyn_SalesAgents_GetHandoverDetailsResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_GetHandoverDetailsResponseData) {
    super("msdyn_SalesAgents_GetHandoverDetails");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_GetHandoverDetailsResponse {
    return new msdyn_SalesAgents_GetHandoverDetailsResponse(
      responseObject<msdyn_SalesAgents_GetHandoverDetailsResponseData>(data)
    );
  }
}
