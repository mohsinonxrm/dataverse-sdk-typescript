import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetSuggestedActionsForLead action
 */
export interface msdyn_GetSuggestedActionsForLeadResponse {
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetSuggestedActionsForLeadResponse;
  }
}
