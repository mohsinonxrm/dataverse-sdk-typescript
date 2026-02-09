import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetOpportunityResearchResultResponse> {
    const data = await response.json();
    return msdyn_GetOpportunityResearchResultResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      OpportunityId: this.opportunityId,
    };
  }
}

/**
 * msdyn_GetOpportunityResearchResult response message
 */
export class msdyn_GetOpportunityResearchResultResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetOpportunityResearchResultResponse) {
    super("msdyn_GetOpportunityResearchResult");
  }

  static fromResponse(data: unknown): msdyn_GetOpportunityResearchResultResponse {
    return new msdyn_GetOpportunityResearchResultResponse((data as any).value);
  }
}
