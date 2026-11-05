import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetRelatedOpportunitiesForOpptyResearch action
 */
export interface msdyn_GetRelatedOpportunitiesForOpptyResearchResponse {}

/**
 * msdyn_GetRelatedOpportunitiesForOpptyResearch action
 *
 * Unbound action
 */
export class msdyn_GetRelatedOpportunitiesForOpptyResearchAction implements Executable<msdyn_GetRelatedOpportunitiesForOpptyResearchResponse> {
  constructor(
    public readonly msdyn_TopCount: number,
    public readonly msdyn_OpportunityId: string
  ) {}

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
    return data as msdyn_GetRelatedOpportunitiesForOpptyResearchResponse;
  }
}
