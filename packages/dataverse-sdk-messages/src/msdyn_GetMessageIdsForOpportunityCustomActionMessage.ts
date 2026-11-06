import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetMessageIdsForOpportunityCustomActionResponse as msdyn_GetMessageIdsForOpportunityCustomActionResponseData } from "./types/index.js";

/**
 * msdyn_GetMessageIdsForOpportunityCustomAction request message
 *
 * Web API Action: msdyn_GetMessageIdsForOpportunityCustomAction
 */
export class msdyn_GetMessageIdsForOpportunityCustomActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetMessageIdsForOpportunityCustomActionResponse>
{
  constructor(public opportunityId?: string) {
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
        "content-type": "application/json",
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
}

/**
 * msdyn_GetMessageIdsForOpportunityCustomAction response message
 */
export class msdyn_GetMessageIdsForOpportunityCustomActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetMessageIdsForOpportunityCustomActionResponseData) {
    super("msdyn_GetMessageIdsForOpportunityCustomAction");
  }

  static fromResponse(data: unknown): msdyn_GetMessageIdsForOpportunityCustomActionResponse {
    return new msdyn_GetMessageIdsForOpportunityCustomActionResponse(
      responseObject<msdyn_GetMessageIdsForOpportunityCustomActionResponseData>(data)
    );
  }
}
