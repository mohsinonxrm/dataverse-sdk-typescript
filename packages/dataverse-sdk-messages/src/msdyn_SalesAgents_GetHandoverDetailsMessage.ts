import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SalesAgents_GetHandoverDetailsResponse as msdyn_SalesAgents_GetHandoverDetailsResponseData } from "./types/index.js";

/**
 * msdyn_SalesAgents_GetHandoverDetails request message
 *
 * Web API Action: msdyn_SalesAgents_GetHandoverDetails
 */
export class msdyn_SalesAgents_GetHandoverDetailsRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_GetHandoverDetailsResponse>
{
  constructor(
    public msdyn_SalesAgentRun: string,
    public msdyn_TrackingId?: string
  ) {
    super("msdyn_SalesAgents_GetHandoverDetails");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_GetHandoverDetails`;

    const body: Record<string, unknown> = {
      msdyn_SalesAgentRun: this.msdyn_SalesAgentRun,
      msdyn_TrackingId: this.msdyn_TrackingId,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_GetHandoverDetailsResponse> {
    const data = await response.json();
    return msdyn_SalesAgents_GetHandoverDetailsResponse.fromResponse(data);
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
