import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsResponse as msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsResponseData } from "./types/index.js";

/**
 * msdyn_GetAllSuggestedActionCardsForPrioritizedLeads request message
 *
 * Web API Action: msdyn_GetAllSuggestedActionCardsForPrioritizedLeads
 */
export class msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsResponse>
{
  constructor(
    public clientContext: string,
    public otherData: string
  ) {
    super("msdyn_GetAllSuggestedActionCardsForPrioritizedLeads");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAllSuggestedActionCardsForPrioritizedLeads`;

    const body: Record<string, unknown> = {
      ClientContext: this.clientContext,
      OtherData: this.otherData,
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
  ): Promise<msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsResponse> {
    const data = await response.json();
    return msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetAllSuggestedActionCardsForPrioritizedLeads response message
 */
export class msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsResponseData) {
    super("msdyn_GetAllSuggestedActionCardsForPrioritizedLeads");
  }

  static fromResponse(data: unknown): msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsResponse {
    return new msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsResponse(
      responseObject<msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsResponseData>(data)
    );
  }
}
