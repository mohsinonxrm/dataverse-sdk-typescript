import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetFormattedOpportunityData action
 */
export interface msdyn_GetFormattedOpportunityDataResponse {
  FormattedMonetaryValue: string;
  CreatedOn: string;
  FormattedCloseDate: string;
}

/**
 * msdyn_GetFormattedOpportunityData action
 *
 * Unbound action
 */
export class msdyn_GetFormattedOpportunityDataAction implements Executable<msdyn_GetFormattedOpportunityDataResponse> {
  constructor(public readonly opportunityId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetFormattedOpportunityData`;

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

  async parseResponse(response: Response): Promise<msdyn_GetFormattedOpportunityDataResponse> {
    const data = await response.json();
    return data as msdyn_GetFormattedOpportunityDataResponse;
  }
}
