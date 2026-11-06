import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetRelatedOpportunitiesForOpptyResearch action
 */
export interface msdyn_GetRelatedOpportunitiesForOpptyResearchResponse {}

/**
 * Parameters of the msdyn_GetRelatedOpportunitiesForOpptyResearch action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetRelatedOpportunitiesForOpptyResearchActionParameters {
  msdyn_OpportunityId: string;
  msdyn_TopCount: number;
}

/**
 * msdyn_GetRelatedOpportunitiesForOpptyResearch action
 *
 * Unbound action
 */
export class msdyn_GetRelatedOpportunitiesForOpptyResearchAction implements Executable<msdyn_GetRelatedOpportunitiesForOpptyResearchResponse> {
  constructor(
    public readonly parameters: msdyn_GetRelatedOpportunitiesForOpptyResearchActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRelatedOpportunitiesForOpptyResearch`;

    const body = requestBody({
      msdyn_OpportunityId: this.parameters.msdyn_OpportunityId,
      msdyn_TopCount: this.parameters.msdyn_TopCount,
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
    if (response.status === 204) return {} as msdyn_GetRelatedOpportunitiesForOpptyResearchResponse;
    return (await response.json()) as msdyn_GetRelatedOpportunitiesForOpptyResearchResponse;
  }
}
