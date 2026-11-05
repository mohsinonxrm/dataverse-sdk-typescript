import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetSuggestedActionsForLead request message
 *
 * Web API Action: msdyn_GetSuggestedActionsForLead
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
    const data = await response.json();
    return msdyn_GetSuggestedActionsForLeadResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.leadId,
    };
  }
}

/**
 * msdyn_GetSuggestedActionsForLead response message
 */
export class msdyn_GetSuggestedActionsForLeadResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSuggestedActionsForLeadResponse) {
    super("msdyn_GetSuggestedActionsForLead");
  }

  static fromResponse(data: unknown): msdyn_GetSuggestedActionsForLeadResponse {
    return new msdyn_GetSuggestedActionsForLeadResponse((data as any).value);
  }
}
