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
 *
 * The first argument is the id of the opportunity record to call it on.
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as CalculateActualValueOpportunityResponse;
  }
}
