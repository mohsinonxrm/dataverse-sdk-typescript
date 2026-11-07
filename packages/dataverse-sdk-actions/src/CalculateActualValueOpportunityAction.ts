import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the CalculateActualValueOpportunity action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CalculateActualValueOpportunityResponse {
  "@odata.context"?: string;
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
    const url = `${baseUrl}/opportunities(${odataLiteral.guid(this.opportunityId)})/Microsoft.Dynamics.CRM.CalculateActualValueOpportunity`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<CalculateActualValueOpportunityResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CalculateActualValueOpportunityResponse;
  }
}
