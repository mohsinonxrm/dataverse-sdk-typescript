import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsResponse as msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetAllSuggestedActionCardsForPrioritizedLeads message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsRequestParameters {
  ClientContext?: string;
  OtherData?: string;
}

/**
 * msdyn_GetAllSuggestedActionCardsForPrioritizedLeads request message
 *
 * Web API Action: msdyn_GetAllSuggestedActionCardsForPrioritizedLeads
 */
export class msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsRequestParameters>;

  constructor(
    parameters: msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsRequestParameters = {}
  ) {
    super("msdyn_GetAllSuggestedActionCardsForPrioritizedLeads", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAllSuggestedActionCardsForPrioritizedLeads`;

    const body = requestBody({
      ClientContext: this.Parameters.ClientContext,
      OtherData: this.Parameters.OtherData,
    });

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
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
