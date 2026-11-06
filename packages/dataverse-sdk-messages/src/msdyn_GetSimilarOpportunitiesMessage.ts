import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetSimilarOpportunitiesResponse as msdyn_GetSimilarOpportunitiesResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetSimilarOpportunities message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSimilarOpportunitiesRequestParameters {
  OpportunityId: string;
}

/**
 * msdyn_GetSimilarOpportunities request message
 *
 * Web API Action: msdyn_GetSimilarOpportunities
 */
export class msdyn_GetSimilarOpportunitiesRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSimilarOpportunitiesResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetSimilarOpportunitiesRequestParameters>;

  constructor(parameters: msdyn_GetSimilarOpportunitiesRequestParameters) {
    super("msdyn_GetSimilarOpportunities", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSimilarOpportunities`;

    const body = requestBody({
      OpportunityId: this.Parameters.OpportunityId,
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

  async parseResponse(response: Response): Promise<msdyn_GetSimilarOpportunitiesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetSimilarOpportunitiesResponse.fromResponse({});
    return msdyn_GetSimilarOpportunitiesResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetSimilarOpportunities response message
 */
export class msdyn_GetSimilarOpportunitiesResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSimilarOpportunitiesResponseData) {
    super("msdyn_GetSimilarOpportunities");
  }

  static fromResponse(data: unknown): msdyn_GetSimilarOpportunitiesResponse {
    return new msdyn_GetSimilarOpportunitiesResponse(
      responseObject<msdyn_GetSimilarOpportunitiesResponseData>(data)
    );
  }
}
