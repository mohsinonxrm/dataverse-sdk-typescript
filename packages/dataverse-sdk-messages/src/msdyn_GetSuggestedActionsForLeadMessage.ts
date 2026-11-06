import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetSuggestedActionsForLeadResponse as msdyn_GetSuggestedActionsForLeadResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetSuggestedActionsForLeadResponse.fromResponse({});
    return msdyn_GetSuggestedActionsForLeadResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetSuggestedActionsForLead response message
 */
export class msdyn_GetSuggestedActionsForLeadResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSuggestedActionsForLeadResponseData) {
    super("msdyn_GetSuggestedActionsForLead");
  }

  static fromResponse(data: unknown): msdyn_GetSuggestedActionsForLeadResponse {
    return new msdyn_GetSuggestedActionsForLeadResponse(
      responseObject<msdyn_GetSuggestedActionsForLeadResponseData>(data)
    );
  }
}
