import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetSuggestedActionsForLead request message
 *
 * Web API Action: msdyn_GetSuggestedActionsForLead
 *
 * The first argument is the id of the lead record to call it on.
 */
export class msdyn_GetSuggestedActionsForLeadRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSuggestedActionsForLeadResponse>
{
  constructor(public leadId: string) {
    super("msdyn_GetSuggestedActionsForLead");
  }

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
    return msdyn_GetSuggestedActionsForLeadResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetSuggestedActionsForLead action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetSuggestedActionsForLeadResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_GetSuggestedActionsForLead response message
 *
 * `result` is the value the msdyn_GetSuggestedActionsForLead action returns (see {@link msdyn_GetSuggestedActionsForLeadResult}).
 */
export class msdyn_GetSuggestedActionsForLeadResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSuggestedActionsForLeadResult) {
    super("msdyn_GetSuggestedActionsForLead");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetSuggestedActionsForLeadResponse {
    return new msdyn_GetSuggestedActionsForLeadResponse(
      data as msdyn_GetSuggestedActionsForLeadResult
    );
  }
}
