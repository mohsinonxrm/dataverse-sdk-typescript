import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetOpportunityResearchResultResponse as msdyn_GetOpportunityResearchResultResponseData } from "./types/index.js";

/**
 * msdyn_GetOpportunityResearchResult request message
 *
 * Web API Action: msdyn_GetOpportunityResearchResult
 */
export class msdyn_GetOpportunityResearchResultRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetOpportunityResearchResultResponse>
{
  constructor(public opportunityId: string) {
    super("msdyn_GetOpportunityResearchResult");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetOpportunityResearchResult`;

    const body: Record<string, unknown> = {
      OpportunityId: this.opportunityId,
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

  async parseResponse(response: Response): Promise<msdyn_GetOpportunityResearchResultResponse> {
    const data = await response.json();
    return msdyn_GetOpportunityResearchResultResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetOpportunityResearchResult response message
 */
export class msdyn_GetOpportunityResearchResultResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetOpportunityResearchResultResponseData) {
    super("msdyn_GetOpportunityResearchResult");
  }

  static fromResponse(data: unknown): msdyn_GetOpportunityResearchResultResponse {
    return new msdyn_GetOpportunityResearchResultResponse(
      responseObject<msdyn_GetOpportunityResearchResultResponseData>(data)
    );
  }
}
