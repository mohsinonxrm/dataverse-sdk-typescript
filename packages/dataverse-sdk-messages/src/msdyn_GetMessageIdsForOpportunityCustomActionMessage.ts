import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetMessageIdsForOpportunityCustomAction request message
 *
 * Web API Action: msdyn_GetMessageIdsForOpportunityCustomAction
 */
export class msdyn_GetMessageIdsForOpportunityCustomActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetMessageIdsForOpportunityCustomActionResponse>
{
  constructor(public opportunityId: string) {
    super("msdyn_GetMessageIdsForOpportunityCustomAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetMessageIdsForOpportunityCustomAction`;

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

  async parseResponse(
    response: Response
  ): Promise<msdyn_GetMessageIdsForOpportunityCustomActionResponse> {
    const data = await response.json();
    return msdyn_GetMessageIdsForOpportunityCustomActionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      OpportunityId: this.opportunityId,
    };
  }
}

/**
 * msdyn_GetMessageIdsForOpportunityCustomAction response message
 */
export class msdyn_GetMessageIdsForOpportunityCustomActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetMessageIdsForOpportunityCustomActionResponse) {
    super("msdyn_GetMessageIdsForOpportunityCustomAction");
  }

  static fromResponse(data: unknown): msdyn_GetMessageIdsForOpportunityCustomActionResponse {
    return new msdyn_GetMessageIdsForOpportunityCustomActionResponse((data as any).value);
  }
}
