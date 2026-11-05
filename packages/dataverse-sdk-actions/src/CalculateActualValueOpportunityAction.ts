import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CalculateActualValueOpportunity action
 */
export interface CalculateActualValueOpportunityResponse {
  Value: number;
}

/**
 * CalculateActualValueOpportunity action
 *
 * Bound action
 * Binding parameter: entity (mscrm.opportunity)
 */
export class CalculateActualValueOpportunityAction implements Executable<CalculateActualValueOpportunityResponse> {
  constructor(public readonly opportunityId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/opportunities(${this.opportunityId})/Microsoft.Dynamics.CRM.CalculateActualValueOpportunity`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<CalculateActualValueOpportunityResponse> {
    const data = await response.json();
    return data as CalculateActualValueOpportunityResponse;
  }
}
