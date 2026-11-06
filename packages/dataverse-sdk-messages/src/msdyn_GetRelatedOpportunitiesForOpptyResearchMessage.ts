import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetRelatedOpportunitiesForOpptyResearchResponse as msdyn_GetRelatedOpportunitiesForOpptyResearchResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetRelatedOpportunitiesForOpptyResearch message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetRelatedOpportunitiesForOpptyResearchRequestParameters {
  msdyn_TopCount: number;
  msdyn_OpportunityId: string;
}

/**
 * msdyn_GetRelatedOpportunitiesForOpptyResearch request message
 *
 * Web API Action: msdyn_GetRelatedOpportunitiesForOpptyResearch
 */
export class msdyn_GetRelatedOpportunitiesForOpptyResearchRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetRelatedOpportunitiesForOpptyResearchResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetRelatedOpportunitiesForOpptyResearchRequestParameters>;

  constructor(parameters: msdyn_GetRelatedOpportunitiesForOpptyResearchRequestParameters) {
    super("msdyn_GetRelatedOpportunitiesForOpptyResearch", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRelatedOpportunitiesForOpptyResearch`;

    const body = requestBody({
      msdyn_TopCount: this.Parameters.msdyn_TopCount,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_GetRelatedOpportunitiesForOpptyResearchResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_GetRelatedOpportunitiesForOpptyResearchResponse.fromResponse({});
    return msdyn_GetRelatedOpportunitiesForOpptyResearchResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_GetRelatedOpportunitiesForOpptyResearch response message
 */
export class msdyn_GetRelatedOpportunitiesForOpptyResearchResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetRelatedOpportunitiesForOpptyResearchResponseData) {
    super("msdyn_GetRelatedOpportunitiesForOpptyResearch");
  }

  static fromResponse(data: unknown): msdyn_GetRelatedOpportunitiesForOpptyResearchResponse {
    return new msdyn_GetRelatedOpportunitiesForOpptyResearchResponse(
      responseObject<msdyn_GetRelatedOpportunitiesForOpptyResearchResponseData>(data)
    );
  }
}
