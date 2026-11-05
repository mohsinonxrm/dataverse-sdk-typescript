import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SaveOpportunityResearchResultResponse as msdyn_SaveOpportunityResearchResultResponseData } from "./types/index.js";

/**
 * msdyn_SaveOpportunityResearchResult request message
 *
 * Web API Action: msdyn_SaveOpportunityResearchResult
 */
export class msdyn_SaveOpportunityResearchResultRequest
  extends OrganizationRequest
  implements Executable<msdyn_SaveOpportunityResearchResultResponse>
{
  constructor(public opportunityResearchResultPayload: string) {
    super("msdyn_SaveOpportunityResearchResult");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SaveOpportunityResearchResult`;

    const body: Record<string, unknown> = {
      OpportunityResearchResultPayload: this.opportunityResearchResultPayload,
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

  async parseResponse(response: Response): Promise<msdyn_SaveOpportunityResearchResultResponse> {
    const data = await response.json();
    return msdyn_SaveOpportunityResearchResultResponse.fromResponse(data);
  }
}

/**
 * msdyn_SaveOpportunityResearchResult response message
 */
export class msdyn_SaveOpportunityResearchResultResponse extends OrganizationResponse {
  constructor(public result: msdyn_SaveOpportunityResearchResultResponseData) {
    super("msdyn_SaveOpportunityResearchResult");
  }

  static fromResponse(data: unknown): msdyn_SaveOpportunityResearchResultResponse {
    return new msdyn_SaveOpportunityResearchResultResponse(
      responseObject<msdyn_SaveOpportunityResearchResultResponseData>(data)
    );
  }
}
