import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetOpportunityPainPointsAndNeedsResponse as msdyn_GetOpportunityPainPointsAndNeedsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetOpportunityPainPointsAndNeeds message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetOpportunityPainPointsAndNeedsRequestParameters {
  msdyn_OpportunityId: string;
}

/**
 * msdyn_GetOpportunityPainPointsAndNeeds request message
 *
 * Web API Action: msdyn_GetOpportunityPainPointsAndNeeds
 */
export class msdyn_GetOpportunityPainPointsAndNeedsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetOpportunityPainPointsAndNeedsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetOpportunityPainPointsAndNeedsRequestParameters>;

  constructor(parameters: msdyn_GetOpportunityPainPointsAndNeedsRequestParameters) {
    super("msdyn_GetOpportunityPainPointsAndNeeds", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetOpportunityPainPointsAndNeeds`;

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

  async parseResponse(response: Response): Promise<msdyn_GetOpportunityPainPointsAndNeedsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_GetOpportunityPainPointsAndNeedsResponse.fromResponse({});
    return msdyn_GetOpportunityPainPointsAndNeedsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetOpportunityPainPointsAndNeeds response message
 */
export class msdyn_GetOpportunityPainPointsAndNeedsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetOpportunityPainPointsAndNeedsResponseData) {
    super("msdyn_GetOpportunityPainPointsAndNeeds");
  }

  static fromResponse(data: unknown): msdyn_GetOpportunityPainPointsAndNeedsResponse {
    return new msdyn_GetOpportunityPainPointsAndNeedsResponse(
      responseObject<msdyn_GetOpportunityPainPointsAndNeedsResponseData>(data)
    );
  }
}
