import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_GetSuggestedActionsForLead action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetSuggestedActionsForLeadResponse {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_GetSuggestedActionsForLead action
 *
 * Bound action
 * Binding parameter: entity (mscrm.lead)
 *
 * The first argument is the id of the lead record to call it on.
 */
export class msdyn_GetSuggestedActionsForLeadAction implements Executable<msdyn_GetSuggestedActionsForLeadResponse> {
  constructor(public readonly leadId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/leads(${this.leadId})/Microsoft.Dynamics.CRM.msdyn_GetSuggestedActionsForLead`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetSuggestedActionsForLeadResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetSuggestedActionsForLeadResponse;
  }
}
