import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetKeyOpportunityInsightsResponse as msdyn_GetKeyOpportunityInsightsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetKeyOpportunityInsights message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetKeyOpportunityInsightsRequestParameters {
  msdyn_OpportunityId: string;
}

/**
 * msdyn_GetKeyOpportunityInsights request message
 *
 * Web API Action: msdyn_GetKeyOpportunityInsights
 */
export class msdyn_GetKeyOpportunityInsightsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetKeyOpportunityInsightsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetKeyOpportunityInsightsRequestParameters>;

  constructor(parameters: msdyn_GetKeyOpportunityInsightsRequestParameters) {
    super("msdyn_GetKeyOpportunityInsights", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetKeyOpportunityInsights`;

    const body = requestBody({
      msdyn_OpportunityId: this.Parameters.msdyn_OpportunityId,
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

  async parseResponse(response: Response): Promise<msdyn_GetKeyOpportunityInsightsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetKeyOpportunityInsightsResponse.fromResponse({});
    return msdyn_GetKeyOpportunityInsightsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetKeyOpportunityInsights response message
 */
export class msdyn_GetKeyOpportunityInsightsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetKeyOpportunityInsightsResponseData) {
    super("msdyn_GetKeyOpportunityInsights");
  }

  static fromResponse(data: unknown): msdyn_GetKeyOpportunityInsightsResponse {
    return new msdyn_GetKeyOpportunityInsightsResponse(
      responseObject<msdyn_GetKeyOpportunityInsightsResponseData>(data)
    );
  }
}
