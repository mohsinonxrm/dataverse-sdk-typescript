import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetRelatedOpportunitiesForOpptyResearch request message
 *
 * Web API Action: msdyn_GetRelatedOpportunitiesForOpptyResearch
 */
export class msdyn_GetRelatedOpportunitiesForOpptyResearchRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetRelatedOpportunitiesForOpptyResearchResponse>
{
  constructor(
    public msdyn_TopCount: number,
    public msdyn_OpportunityId: string
  ) {
    super("msdyn_GetRelatedOpportunitiesForOpptyResearch");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRelatedOpportunitiesForOpptyResearch`;

    const body: Record<string, unknown> = {
      msdyn_TopCount: this.msdyn_TopCount,
      msdyn_OpportunityId: this.msdyn_OpportunityId,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_GetRelatedOpportunitiesForOpptyResearchResponse> {
    const data = await response.json();
    return msdyn_GetRelatedOpportunitiesForOpptyResearchResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_TopCount: this.msdyn_TopCount,
      msdyn_OpportunityId: this.msdyn_OpportunityId,
    };
  }
}

/**
 * msdyn_GetRelatedOpportunitiesForOpptyResearch response message
 */
export class msdyn_GetRelatedOpportunitiesForOpptyResearchResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetRelatedOpportunitiesForOpptyResearchResponse) {
    super("msdyn_GetRelatedOpportunitiesForOpptyResearch");
  }

  static fromResponse(data: unknown): msdyn_GetRelatedOpportunitiesForOpptyResearchResponse {
    return new msdyn_GetRelatedOpportunitiesForOpptyResearchResponse((data as any).value);
  }
}
